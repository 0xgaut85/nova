'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getMint } from '@solana/spl-token';

// Bridge destination address
const BRIDGE_ADDRESS = '25daQDoDavjLehaQiTzFtHi5BoPhCmFBF2WP9uJpLih1';

// $NOVA Token Mint Address on Solana Mainnet
const NOVA_MINT = new PublicKey('Bt7rUdZ62TWyHB5HsBjLhFqQ3VDg42VUb5Ttwiqvpump');

// Bonus percentage
const BONUS_PERCENTAGE = 10;

// Solana RPC - Use Helius from environment variable or fallback to Helius directly
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=112de5d5-6530-46c2-b382-527e71c48e68';

const getConnection = () => {
  return new Connection(SOLANA_RPC_URL, 'confirmed');
};

// Get bridged balance from localStorage
const getBridgedBalance = (address: string): number => {
  if (typeof window === 'undefined') return 0;
  const key = `bridged_x402_balance_${address}`;
  const stored = localStorage.getItem(key);
  return stored ? parseFloat(stored) : 0;
};

// Save bridged balance to localStorage
const saveBridgedBalance = (address: string, amount: number) => {
  if (typeof window === 'undefined') return;
  const key = `bridged_x402_balance_${address}`;
  const currentBalance = getBridgedBalance(address);
  const newBalance = currentBalance + amount;
  localStorage.setItem(key, newBalance.toString());
};

export default function BridgePage() {
  const [amount, setAmount] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [tokenDecimals, setTokenDecimals] = useState<number>(6);
  const [bridgedBalance, setBridgedBalance] = useState<number>(0);

  const { address, isConnected, caipAddress } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  const { open } = useAppKit();

  useEffect(() => {
    setMounted(true);
    console.log('Wallet connection status:', { address, isConnected, caipAddress });
  }, [address, isConnected, caipAddress]);

  // Load bridged balance and token balance when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      // Load bridged balance from localStorage
      const storedBalance = getBridgedBalance(address);
      setBridgedBalance(storedBalance);

      // Load token balance
      loadTokenBalance();
    }
  }, [isConnected, address]);

  const loadTokenBalance = async () => {
    if (!isConnected || !address || !walletProvider) return;

    try {
      const connection = getConnection();
      let solanaAddress = address;
      
      if (caipAddress && caipAddress.includes('solana:')) {
        const parts = caipAddress.split(':');
        solanaAddress = parts[parts.length - 1];
      }

      if (!solanaAddress || solanaAddress === address) {
        try {
          const publicKey = await walletProvider.publicKey;
          if (publicKey) {
            solanaAddress = publicKey.toBase58();
          }
        } catch (e) {
          console.log('Could not get address from provider:', e);
        }
      }

      const senderPubkey = new PublicKey(solanaAddress);
      const senderTokenAccount = await getAssociatedTokenAddress(
        NOVA_MINT,
        senderPubkey
      );

      // Get token decimals
      try {
        const mintInfo = await getMint(connection, NOVA_MINT);
        setTokenDecimals(mintInfo.decimals);
      } catch (e) {
        console.log('Could not get mint info, using default 6 decimals');
      }

      // Get balance
      try {
        const balance = await connection.getTokenAccountBalance(senderTokenAccount);
        const balanceAmount = parseInt(balance.value.amount);
        setTokenBalance(balanceAmount / Math.pow(10, tokenDecimals));
      } catch (balanceError: any) {
        if (balanceError.message?.includes('could not find account')) {
          setTokenBalance(0);
        }
      }
    } catch (err) {
      console.error('Error loading token balance:', err);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(BRIDGE_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amountNum = parseFloat(amount) || 0;
  const bonusAmount = amountNum * (BONUS_PERCENTAGE / 100);
  const totalX402 = amountNum + bonusAmount;
  const isValid = amountNum > 0 && amountNum <= tokenBalance;

  const handleBridge = async () => {
    if (!isConnected || !walletProvider || !address) {
      setError('Please connect your Solana wallet first');
      return;
    }

    if (!isValid) {
      if (amountNum <= 0) {
        setError('Please enter a valid amount');
      } else if (amountNum > tokenBalance) {
        setError(`Insufficient $NOVA balance. You have ${tokenBalance.toFixed(4)} $NOVA.`);
      }
      return;
    }

    setLoading(true);
    setError('');
    setTxSignature('');

    try {
      const connection = getConnection();
      
      console.log('=== BRIDGE DEBUG INFO ===');
      console.log('useAppKitAccount address:', address);
      console.log('caipAddress:', caipAddress);
      console.log('isConnected:', isConnected);
      
      // Extract actual Solana address from CAIP format if needed
      let solanaAddress = address;
      
      if (caipAddress && caipAddress.includes('solana:')) {
        const parts = caipAddress.split(':');
        solanaAddress = parts[parts.length - 1];
        console.log('Extracted Solana address from CAIP:', solanaAddress);
      }
      
      if (!solanaAddress || solanaAddress === address) {
        try {
          const publicKey = await walletProvider.publicKey;
          if (publicKey) {
            solanaAddress = publicKey.toBase58();
            console.log('Got address from wallet provider:', solanaAddress);
          }
        } catch (e) {
          console.log('Could not get address from provider:', e);
        }
      }
      
      console.log('Final Solana address to use:', solanaAddress);
      
      // Get token decimals if not already set
      let decimals = tokenDecimals;
      try {
        const mintInfo = await getMint(connection, NOVA_MINT);
        decimals = mintInfo.decimals;
        setTokenDecimals(decimals);
      } catch (e) {
        console.log('Using default decimals:', decimals);
      }
      
      // Calculate token amount with decimals
      const tokenAmount = Math.floor(amountNum * Math.pow(10, decimals));
      
      const senderPubkey = new PublicKey(solanaAddress);
      const receiverPubkey = new PublicKey(BRIDGE_ADDRESS);

      // Get token accounts
      const senderTokenAccount = await getAssociatedTokenAddress(
        NOVA_MINT,
        senderPubkey
      );

      const receiverTokenAccount = await getAssociatedTokenAddress(
        NOVA_MINT,
        receiverPubkey
      );

      console.log('Sender token account:', senderTokenAccount.toBase58());
      console.log('Checking balance...');

      // Check $NOVA balance
      let balanceAmount = 0;
      
      try {
        const balance = await connection.getTokenAccountBalance(senderTokenAccount);
        balanceAmount = parseInt(balance.value.amount);
        console.log('✅ $NOVA balance found:', balanceAmount / Math.pow(10, decimals), '$NOVA');
      } catch (balanceError: any) {
        console.error('❌ Balance check error:', balanceError);
        
        if (balanceError.message?.includes('could not find account')) {
          setError('You need $NOVA tokens in your wallet. Please acquire $NOVA tokens first.');
          setLoading(false);
          return;
        } else {
          throw balanceError;
        }
      }
      
      if (balanceAmount < tokenAmount) {
        const currentBalance = (balanceAmount / Math.pow(10, decimals)).toFixed(4);
        setError(`Insufficient $NOVA balance. You have ${currentBalance} $NOVA, but need ${amountNum} $NOVA.`);
        setLoading(false);
        return;
      }

      console.log('✅ Balance check passed');

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
            NOVA_MINT, // mint
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
          tokenAmount,
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

      console.log('✅ Transaction confirmed!');

      // Save bridged balance to localStorage (fake x402 balance)
      saveBridgedBalance(address, totalX402);
      setBridgedBalance(getBridgedBalance(address));

      setTxSignature(signature);
      setAmount('');
      setError('');
      
      // Reload token balance
      await loadTokenBalance();
    } catch (err: any) {
      console.error('Transaction error:', err);
      
      // Better error messages
      if (err.message?.includes('User rejected')) {
        setError('Transaction was rejected.');
      } else if (err.message?.includes('Attempt to debit')) {
        setError('You need $NOVA tokens in your wallet. Please add $NOVA tokens to your Solana wallet first.');
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
      {/* Animated background gradient orbs */}
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
                Bridge $NOVA to x402
              </h1>
              <p className="text-gray-400 text-lg font-light mb-4">
                Bridge your $NOVA tokens to x402 version with a 10% bonus
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 text-sm font-light">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Limited to first 50 users
              </div>
            </div>

            {/* Bridge Card */}
            <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-8 relative">
              {/* Corner decorations */}
              <style jsx>{`
                .bridge-card::before {
                  content: '';
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 10px;
                  height: 10px;
                  border-top: 1px solid rgba(255, 255, 255, 0.25);
                  border-left: 1px solid rgba(255, 255, 255, 0.25);
                }
                .bridge-card::after {
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

              {/* x402 Balance Display */}
              {isConnected && bridgedBalance > 0 && (
                <div className="mb-6 p-4 bg-[#b2a962]/20 border border-[#b2a962]/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1 font-light">Your x402 $NOVA Balance</div>
                  <div className="text-2xl font-normal text-[#b2a962]">
                    {bridgedBalance.toFixed(4)} x402 $NOVA
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-light">✓ Bridge confirmed</div>
                </div>
              )}

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
                    Connect your Solana wallet to bridge $NOVA tokens to x402 version
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
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#b2a962] rounded-full animate-pulse" />
                          <div>
                            <span className="text-xs text-gray-400 block">Connected Wallet</span>
                            <span className="text-sm font-mono text-white">{formatAddress(address!)}</span>
                          </div>
                        </div>
                        <button
                          onClick={connectWallet}
                          className="text-xs text-gray-400 hover:text-white transition-colors font-light"
                        >
                          Change
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-xs text-gray-400">$NOVA Balance</span>
                        <span className="text-sm font-mono text-white">{tokenBalance.toFixed(4)} $NOVA</span>
                      </div>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2 font-light">
                      Amount to Bridge ($NOVA)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.0001"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full bg-black/50 border rounded-lg px-4 py-4 text-white text-2xl font-normal focus:outline-none transition-colors ${
                          isValid || amount === '' ? 'border-white/[0.15] focus:border-[#b2a962]' : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="0.0"
                      />
                      <button
                        onClick={() => setAmount(tokenBalance.toFixed(4))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#b2a962] hover:text-[#c4b876] transition-colors font-light"
                      >
                        MAX
                      </button>
                    </div>
                    <div className="mt-2 text-xs font-light text-gray-500">
                      Available: {tokenBalance.toFixed(4)} $NOVA
                    </div>
                  </div>

                  {/* Bonus Display */}
                  {amountNum > 0 && (
                    <div className="mb-6 p-4 bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 font-light">Bridging:</span>
                        <span className="text-sm font-mono text-white">{amountNum.toFixed(4)} $NOVA</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 font-light">Bonus ({BONUS_PERCENTAGE}%):</span>
                        <span className="text-sm font-mono text-[#b2a962]">+{bonusAmount.toFixed(4)} x402 $NOVA</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-sm font-normal text-white">You will receive:</span>
                        <span className="text-lg font-normal text-[#b2a962]">{totalX402.toFixed(4)} x402 $NOVA</span>
                      </div>
                    </div>
                  )}

                  {/* Bridge Address */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-2 font-light">Bridge Address:</div>
                    <div className="relative bg-black/30 border border-white/[0.15] rounded-lg p-4">
                      <div className="font-mono text-xs text-gray-300 break-all pr-12 font-light">
                        {BRIDGE_ADDRESS}
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
                        ✓ Bridge Successful!
                      </div>
                      <div className="text-xs text-gray-400 mb-2 font-light">
                        You have received {totalX402.toFixed(4)} x402 $NOVA with {BONUS_PERCENTAGE}% bonus
                      </div>
                      <a
                        href={`https://solscan.io/tx/${txSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white hover:text-[#b2a962] font-mono break-all underline transition-colors"
                      >
                        View Transaction: {txSignature.slice(0, 20)}...
                      </a>
                    </div>
                  )}

                  {/* Bridge Button */}
                  <button
                    onClick={handleBridge}
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
                        Bridging...
                      </span>
                    ) : (
                      `Bridge ${amountNum > 0 ? amountNum.toFixed(4) : ''} $NOVA`
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
                <div className="text-sm font-normal text-white mb-1">10% Bonus</div>
                <div className="text-xs text-gray-400 font-light">Extra tokens on bridge</div>
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
                    alt="Instant"
                    width={40}
                    height={40}
                    className="w-10 h-10 opacity-60"
                  />
                </div>
                <div className="text-sm font-normal text-white mb-1">Instant</div>
                <div className="text-xs text-gray-400 font-light">Immediate confirmation</div>
              </div>
            </div>

            {/* Token Info */}
            <div className="mt-8 bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-xl font-normal text-white mb-2">$NOVA Token</div>
                <div className="text-sm text-gray-400 font-light">Solana Token Contract</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs mb-4">
                <div className="font-mono text-gray-400 font-light break-all text-center">
                  {NOVA_MINT.toBase58()}
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
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center text-xs text-gray-500 space-y-2 font-light">
              <p>Bridge transactions are final and cannot be reversed.</p>
              <p>Only bridge $NOVA tokens on Solana network. Other tokens will result in loss of funds.</p>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link 
                href="/dapp"
                className="text-gray-400 hover:text-[#b2a962] transition-colors text-sm font-light"
              >
                ← Back to Nova Hub
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

