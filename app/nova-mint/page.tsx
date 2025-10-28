'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Treasury address
const TREASURY_ADDRESS = 'DY8zJxPE8G9Ks9LtLUwBT2ux5txYMgPBZqTvopy7X5N6';

// USDC Mint Address on Solana Mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// Solana RPC - Use Helius from environment variable
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

const getConnection = () => {
  return new Connection(SOLANA_RPC_URL, 'confirmed');
};

export default function NovaMintPage() {
  const [amount, setAmount] = useState<string>('10');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const { address, isConnected, caipAddress } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  const { open } = useAppKit();

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(TREASURY_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amountNum = parseFloat(amount) || 0;
  const isValid = amountNum >= 10 && amountNum <= 1000;

  const handleSendUSDC = async () => {
    if (!isConnected || !walletProvider || !address) {
      setError('Please connect your Solana wallet first');
      return;
    }

    if (!isValid) {
      setError('Amount must be between $10 and $1,000');
      return;
    }

    setLoading(true);
    setError('');
    setTxSignature('');

    try {
      const connection = getConnection();
      
      // USDC has 6 decimals
      const usdcAmount = Math.floor(amountNum * 1_000_000);
      
      const senderPubkey = new PublicKey(address);
      const receiverPubkey = new PublicKey(TREASURY_ADDRESS);

      console.log('Sender address:', address);
      console.log('Using RPC:', SOLANA_RPC_URL);

      // Get token accounts
      const senderTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        senderPubkey
      );

      const receiverTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        receiverPubkey
      );

      console.log('Sender USDC token account:', senderTokenAccount.toBase58());

      // Check USDC balance and create account if needed
      let balanceAmount = 0;
      let needsTokenAccount = false;
      
      try {
        const balance = await connection.getTokenAccountBalance(senderTokenAccount);
        balanceAmount = parseInt(balance.value.amount);
        console.log('USDC balance:', balanceAmount / 1_000_000, 'USDC');
      } catch (balanceError: any) {
        console.error('Balance check error:', balanceError);
        if (balanceError.message?.includes('could not find account')) {
          setError('You need USDC in your wallet. Please buy USDC and send it to your Solana wallet, or swap SOL for USDC on Jupiter/Raydium.');
          setLoading(false);
          return;
        }
        throw balanceError;
      }
      
      if (balanceAmount < usdcAmount) {
        const currentBalance = (balanceAmount / 1_000_000).toFixed(2);
        setError(`Insufficient USDC balance. You have ${currentBalance} USDC, but need ${amountNum} USDC.`);
        setLoading(false);
        return;
      }

      // Check if receiver needs token account created
      const receiverAccountInfo = await connection.getAccountInfo(receiverTokenAccount);
      const transaction = new Transaction();
      
      if (!receiverAccountInfo) {
        console.log('Creating receiver token account...');
        transaction.add(
          createAssociatedTokenAccountInstruction(
            senderPubkey, // payer
            receiverTokenAccount, // ata
            receiverPubkey, // owner
            USDC_MINT, // mint
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );
      }

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          senderTokenAccount,
          receiverTokenAccount,
          senderPubkey,
          usdcAmount,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      // Get latest blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPubkey;

      console.log('Sending transaction...');

      // Sign and send transaction
      const signedTx = await walletProvider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'finalized'
      });

      console.log('Transaction sent:', signature);

      // Confirm transaction
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'finalized');

      console.log('Transaction confirmed!');

      setTxSignature(signature);
      setAmount('10');
      setError('');
    } catch (err: any) {
      console.error('Transaction error:', err);
      
      // Better error messages
      if (err.message?.includes('User rejected')) {
        setError('Transaction was rejected.');
      } else if (err.message?.includes('Attempt to debit')) {
        setError('You need USDC in your wallet. Please add USDC to your Solana wallet first.');
      } else if (err.message?.includes('insufficient funds')) {
        setError('Insufficient SOL for transaction fees. You need a small amount of SOL (~0.001 SOL) for fees.');
      } else {
        setError(err.message || 'Transaction failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = () => {
    open({ view: 'Connect' });
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background gradient orbs - matching landing page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b2a962] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#b2a962] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#b2a962] rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-blob animation-delay-4000" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-title mb-4 text-white">
                x402 $NOVA Mint
              </h1>
              <p className="text-gray-400 text-lg font-light">
                Connect your Solana wallet and mint x402 $NOVA tokens instantly
              </p>
            </div>

            {/* Mint Card */}
            <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-8 relative">
              {/* Corner decorations */}
              <style jsx>{`
                .mint-card::before {
                  content: '';
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 10px;
                  height: 10px;
                  border-top: 1px solid rgba(255, 255, 255, 0.25);
                  border-left: 1px solid rgba(255, 255, 255, 0.25);
                }
                .mint-card::after {
                  content: '';
                  position: absolute;
                  top: -1px;
                  right: -1px;
                  width: 10px;
                  height: 10px;
                  border-top: 1px solid rgba(255, 255, 255, 0.25);
                  border-right: 1px solid rgba(255, 255, 255, 0.25);
                }
                .corner-bottom-left {
                  position: absolute;
                  bottom: -1px;
                  left: -1px;
                  width: 10px;
                  height: 10px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                  border-left: 1px solid rgba(255, 255, 255, 0.25);
                }
                .corner-bottom-right {
                  position: absolute;
                  bottom: -1px;
                  right: -1px;
                  width: 10px;
                  height: 10px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                  border-right: 1px solid rgba(255, 255, 255, 0.25);
                }
              `}</style>
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />

              {/* Wallet Connection */}
              {!isConnected ? (
                <div className="text-center py-8 mb-6">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Image
                      src="/logosvg.svg"
                      alt="Nova402"
                      width={80}
                      height={80}
                      className="w-20 h-20 opacity-80"
                    />
                  </div>
                  <h3 className="text-xl font-normal text-white mb-3">Connect Your Wallet</h3>
                  <p className="text-gray-400 text-sm font-light mb-6 max-w-sm mx-auto">
                    Connect your Solana wallet to mint x402 $NOVA tokens with USDC
                  </p>
                  <button
                    onClick={connectWallet}
                    className="px-8 py-3 bg-[#b2a962] hover:bg-[#c4b876] text-black font-normal rounded-lg transition-all duration-300"
                  >
                    Connect Wallet
                  </button>
                </div>
              ) : (
                <>
                  {/* Connected Wallet Info */}
                  <div className="mb-6 p-4 bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#b2a962] rounded-full animate-pulse" />
                        <span className="text-sm font-normal text-white">Connected: {formatAddress(address!)}</span>
                      </div>
                      <button
                        onClick={connectWallet}
                        className="text-xs text-gray-400 hover:text-white transition-colors font-light"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2 font-light">
                      Amount (USDC)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        step="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full bg-black/50 border rounded-lg px-4 py-4 text-white text-2xl font-normal focus:outline-none transition-colors ${
                          isValid ? 'border-white/[0.15] focus:border-[#b2a962]' : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-light">
                        USDC
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-light">
                      <span className={amountNum < 10 ? 'text-red-400' : 'text-gray-500'}>
                        Min: $10
                      </span>
                      <span className={amountNum > 1000 ? 'text-red-400' : 'text-gray-500'}>
                        Max: $1,000
                      </span>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-8">
                    {[10, 50, 100, 500].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset.toString())}
                        className={`border rounded-lg py-2 text-sm transition-all duration-300 font-normal ${
                          amount === preset.toString()
                            ? 'bg-[#b2a962]/20 border-[#b2a962] text-[#b2a962]'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.12] text-white'
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {/* Treasury Address */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-2 font-light">Receiving Address:</div>
                    <div className="relative bg-black/30 border border-white/[0.15] rounded-lg p-4">
                      <div className="font-mono text-xs text-gray-300 break-all pr-12 font-light">
                        {TREASURY_ADDRESS}
                      </div>
                      <button
                        onClick={copyAddress}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] rounded-lg px-3 py-2 transition-colors text-xs font-normal"
                      >
                        {copied ? '✓' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm font-light">
                      {error}
                    </div>
                  )}

                  {/* Success Message */}
                  {txSignature && (
                    <div className="mb-6 p-4 bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg">
                      <div className="text-[#b2a962] font-normal mb-2">
                        Transaction Successful!
                      </div>
                      <a
                        href={`https://solscan.io/tx/${txSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white hover:text-[#b2a962] font-mono break-all underline transition-colors"
                      >
                        {txSignature}
                      </a>
                    </div>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={handleSendUSDC}
                    disabled={loading || !isValid}
                    className={`w-full text-center font-normal py-4 rounded-lg transition-all duration-300 transform ${
                      loading || !isValid
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-[#b2a962] hover:bg-[#c4b876] text-black hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Send ${amount} USDC`
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Info Section */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Image
                    src="/logosvg.svg"
                    alt="Instant"
                    width={40}
                    height={40}
                    className="w-10 h-10 opacity-60"
                  />
                </div>
                <div className="text-sm font-normal text-white mb-1">Instant</div>
                <div className="text-xs text-gray-400 font-light">Automatic delivery</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Image
                    src="/logosvg.svg"
                    alt="Secure"
                    width={40}
                    height={40}
                    className="w-10 h-10 opacity-60"
                  />
                </div>
                <div className="text-sm font-normal text-white mb-1">Secure</div>
                <div className="text-xs text-gray-400 font-light">Non-custodial</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Image
                    src="/logosvg.svg"
                    alt="Fair"
                    width={40}
                    height={40}
                    className="w-10 h-10 opacity-60"
                  />
                </div>
                <div className="text-sm font-normal text-white mb-1">Fair</div>
                <div className="text-xs text-gray-400 font-light">Equal access</div>
              </div>
            </div>

            {/* Token Info */}
            <div className="mt-8 bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-xl font-normal text-white mb-2">x402 $NOVA Token</div>
                <div className="text-sm text-gray-400 font-light">Official Nova402 x402 utility token</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs mb-4">
                <div className="font-mono text-gray-400 font-light break-all text-center">
                  Bt7rUdZ62TWyHB5HsBjLhFqQ3VDg42VUb5Ttwiqvpump
                </div>
                <a
                  href="https://dexscreener.com/solana/5kwqfa3rtzrdiyvfyspemnyudhbzmilbucyd1em4rrzs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b2a962] hover:text-[#c4b876] underline transition-colors whitespace-nowrap"
                >
                  View Chart
                </a>
              </div>

              {/* Bridge Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  disabled
                  className="w-full px-6 py-3 bg-white/5 border border-white/10 text-gray-500 rounded-lg text-sm font-normal cursor-not-allowed flex items-center justify-center gap-2"
                  title="Coming soon"
                >
                  <span>Nova to x402 Nova Bridge</span>
                  <span className="text-xs text-gray-600">(Coming Soon)</span>
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center text-xs text-gray-500 space-y-2 font-light">
              <p>Transactions are final and cannot be reversed.</p>
              <p>Only send USDC on Solana network. Other tokens or networks will result in loss of funds.</p>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="text-gray-400 hover:text-[#b2a962] transition-colors text-sm font-light"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
