'use client';

import { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useSendTransaction, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { parseUnits, encodeFunctionData, erc20Abi } from 'viem';
import { X402Service } from '@/lib/payai-client';
import { USDC_CONTRACT_ADDRESS, getNetworkChainId, getNetworkName } from '@/lib/x402-utils';

interface RealPaymentHandlerProps {
  service: X402Service;
  onSuccess: (txHash: string) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

type PaymentStep = 'check' | 'switch-network' | 'approve' | 'approving' | 'pay' | 'paying' | 'success' | 'error';

export function RealPaymentHandler({ service, onSuccess, onError, onClose }: RealPaymentHandlerProps) {
  const { address, caipAddress } = useAppKitAccount();
  const { switchChain } = useSwitchChain();
  
  // Extract chainId from caipAddress (format: "eip155:8453:0x...")
  const chainId = caipAddress ? parseInt(caipAddress.split(':')[1]) : undefined;
  
  const [step, setStep] = useState<PaymentStep>('check');
  const [error, setError] = useState<string | null>(null);
  const [approveTxHash, setApproveTxHash] = useState<string>('');
  const [paymentTxHash, setPaymentTxHash] = useState<string>('');

  // Get payment details from service
  const payToAddress = service.accepts?.[0]?.payTo;
  const usdcAddress = USDC_CONTRACT_ADDRESS[service.price.network];
  const maxAmountRequired = service.accepts?.[0]?.maxAmountRequired || '10000'; // Default 0.01 USDC
  const targetChainId = getNetworkChainId(service.price.network);
  const networkName = getNetworkName(service.price.network);

  // Send approve transaction
  const { 
    sendTransaction: sendApprove, 
    data: approveData,
    isPending: isApprovePending,
    error: approveError 
  } = useSendTransaction();

  // Wait for approve confirmation
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveData,
  });

  // Send payment transaction
  const { 
    sendTransaction: sendPayment, 
    data: paymentData,
    isPending: isPaymentPending,
    error: paymentError 
  } = useSendTransaction();

  // Wait for payment confirmation
  const { isLoading: isPaymentConfirming, isSuccess: isPaymentSuccess } = useWaitForTransactionReceipt({
    hash: paymentData,
  });

  // Check if on correct network
  useEffect(() => {
    if (!address) {
      setError('Please connect your wallet');
      setStep('error');
      return;
    }

    if (!payToAddress || !usdcAddress || !targetChainId) {
      setError('Service payment configuration incomplete');
      setStep('error');
      return;
    }

    if (chainId !== targetChainId) {
      setStep('switch-network');
    } else {
      setStep('approve');
    }
  }, [address, chainId, targetChainId, payToAddress, usdcAddress]);

  // Handle approve confirmation
  useEffect(() => {
    if (isApproveSuccess && approveData) {
      setApproveTxHash(approveData);
      setStep('pay');
    }
  }, [isApproveSuccess, approveData]);

  // Handle payment confirmation
  useEffect(() => {
    if (isPaymentSuccess && paymentData) {
      setPaymentTxHash(paymentData);
      setStep('success');
      onSuccess(paymentData);
    }
  }, [isPaymentSuccess, paymentData, onSuccess]);

  // Handle errors
  useEffect(() => {
    if (approveError) {
      setError(approveError.message);
      setStep('error');
      onError(approveError.message);
    }
    if (paymentError) {
      setError(paymentError.message);
      setStep('error');
      onError(paymentError.message);
    }
  }, [approveError, paymentError, onError]);

  const handleSwitchNetwork = async () => {
    if (!targetChainId) return;
    try {
      await switchChain({ chainId: targetChainId });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch network');
      setStep('error');
    }
  };

  const handleApprove = () => {
    if (!usdcAddress || !payToAddress) return;
    
    setStep('approving');
    sendApprove({
      to: usdcAddress,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [payToAddress as `0x${string}`, BigInt(maxAmountRequired)]
      })
    });
  };

  const handlePayment = () => {
    if (!usdcAddress || !payToAddress) return;
    
    setStep('paying');
    sendPayment({
      to: usdcAddress,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [payToAddress as `0x${string}`, BigInt(maxAmountRequired)]
      })
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-black border border-white/[0.15] rounded-lg max-w-lg w-full p-8">
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-lg"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px'
          }}
        />

        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-light text-white mb-6">Pay & Use Service</h2>

          {/* Service Details */}
          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
            <h3 className="font-light text-white mb-2">{service.name}</h3>
            <p className="text-sm text-gray-400 mb-3 font-light">{service.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-light">Price:</span>
              <span className="font-light text-white">{service.price.amount} {service.price.currency}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-400 font-light">Network:</span>
              <span className="font-light text-white">{networkName}</span>
            </div>
          </div>

          {/* Payment Steps */}
          <div className="space-y-4">
            {/* Step 1: Switch Network */}
            {step === 'switch-network' && (
              <div className="border border-[#b2a962]/30 rounded-lg p-4 bg-[#b2a962]/10">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#b2a962] text-white rounded-full flex items-center justify-center text-sm font-light flex-shrink-0">1</span>
                  <div className="flex-1">
                    <h4 className="font-light text-white mb-2">Switch Network</h4>
                    <p className="text-sm text-gray-400 mb-3 font-light">
                      Please switch to {networkName} to continue
                    </p>
                    <button
                      onClick={handleSwitchNetwork}
                      className="w-full px-4 py-2 bg-[#b2a962] text-white rounded-lg hover:bg-[#c4b876] transition-colors font-light"
                    >
                      Switch to {networkName}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Approve USDC */}
            {(step === 'approve' || step === 'approving') && (
              <div className="border border-[#b2a962]/30 rounded-lg p-4 bg-[#b2a962]/10">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#b2a962] text-white rounded-full flex items-center justify-center text-sm font-light flex-shrink-0">1</span>
                  <div className="flex-1">
                    <h4 className="font-light text-white mb-2">Approve USDC Spending</h4>
                    <p className="text-sm text-gray-400 mb-3 font-light">
                      Allow the service to spend {service.price.amount} USDC from your wallet
                    </p>
                    <button
                      onClick={handleApprove}
                      disabled={isApprovePending || isApproveConfirming || step === 'approving'}
                      className="w-full px-4 py-2 bg-[#b2a962] text-white rounded-lg hover:bg-[#c4b876] transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isApprovePending || isApproveConfirming ? 'Approving...' : 'Approve USDC'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Send Payment */}
            {(step === 'pay' || step === 'paying') && (
              <div className="border border-[#b2a962]/30 rounded-lg p-4 bg-[#b2a962]/10">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#b2a962] text-white rounded-full flex items-center justify-center text-sm font-light flex-shrink-0">2</span>
                  <div className="flex-1">
                    <h4 className="font-light text-white mb-2">Send Payment</h4>
                    <p className="text-sm text-gray-400 mb-3 font-light">
                      Transfer {service.price.amount} USDC to the service
                    </p>
                    <button
                      onClick={handlePayment}
                      disabled={isPaymentPending || isPaymentConfirming || step === 'paying'}
                      className="w-full px-4 py-2 bg-[#b2a962] text-white rounded-lg hover:bg-[#c4b876] transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPaymentPending || isPaymentConfirming ? 'Processing Payment...' : 'Send Payment'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success */}
            {step === 'success' && (
              <div className="border border-[#b2a962]/30 rounded-lg p-4 bg-[#b2a962]/10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#b2a962] rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-light text-white mb-2">Payment Successful!</h4>
                  <p className="text-sm text-gray-400 mb-3 font-light">
                    Your payment has been processed
                  </p>
                  {paymentTxHash && (
                    <a
                      href={`https://basescan.org/tx/${paymentTxHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#b2a962] hover:text-[#c4b876] transition-colors font-light"
                    >
                      View Transaction →
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Error */}
            {step === 'error' && error && (
              <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/10">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-light text-red-400 mb-1">Payment Failed</h4>
                    <p className="text-sm text-red-300/80 font-light">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
