'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Treasury address
const TREASURY_ADDRESS = 'HuPuDBW6Mvn37y7VepYHqBmEhAiGhJjuzggR3cFzwR7v';

export default function NovaMintPage() {
  const [amount, setAmount] = useState<string>('10');
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(TREASURY_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amountNum = parseFloat(amount) || 0;
  const isValid = amountNum >= 10 && amountNum <= 1000;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-title mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              $NOVA Mint
            </h1>
            <p className="text-gray-400 text-lg">
              Send USDC on Solana to mint $NOVA tokens
            </p>
          </div>

          {/* Mint Card */}
          <div className="bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
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
                  className={`w-full bg-black/50 border rounded-lg px-4 py-4 text-white text-2xl font-semibold focus:outline-none transition-colors ${
                    isValid ? 'border-white/20 focus:border-purple-500' : 'border-red-500/50 focus:border-red-500'
                  }`}
                  placeholder="10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  USDC
                </span>
              </div>
              <div className="flex justify-between mt-2 text-xs">
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
                  className={`border rounded-lg py-2 text-sm transition-colors ${
                    amount === preset.toString()
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>

            {/* Treasury Address */}
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Send USDC to this address:</div>
              <div className="relative bg-black/30 border border-white/10 rounded-lg p-4">
                <div className="font-mono text-sm text-gray-300 break-all pr-12">
                  {TREASURY_ADDRESS}
                </div>
                <button
                  onClick={copyAddress}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors text-xs"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <div className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <span>📝</span> How to Mint:
              </div>
              <ol className="text-sm text-gray-300 space-y-2 ml-6 list-decimal">
                <li>Choose your amount (${amount} USDC)</li>
                <li>Copy the treasury address above</li>
                <li>Open your Solana wallet (Phantom, Solflare, etc.)</li>
                <li>Send exactly <span className="font-semibold text-white">{amount} USDC</span> to the address</li>
                <li>$NOVA tokens will be sent to your wallet automatically</li>
              </ol>
            </div>

            {/* Warning */}
            {!isValid && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
                ⚠️ Amount must be between $10 and $1,000
              </div>
            )}

            {/* Open Wallet Button */}
            <a
              href={`solana:${TREASURY_ADDRESS}?amount=${isValid ? amountNum : 10}&spl-token=${USDC_MINT}`}
              className={`block w-full text-center font-semibold py-4 rounded-lg transition-all duration-300 transform ${
                isValid
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Open Wallet App
            </a>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-white mb-1">Instant Delivery</div>
              <div className="text-xs text-gray-400">Receive $NOVA immediately</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm font-semibold text-white mb-1">Secure</div>
              <div className="text-xs text-gray-400">Non-custodial minting</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💎</div>
              <div className="text-sm font-semibold text-white mb-1">Fair Launch</div>
              <div className="text-xs text-gray-400">Equal opportunity</div>
            </div>
          </div>

          {/* Token Info */}
          <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="text-xl font-semibold text-white mb-2">$NOVA Token</div>
              <div className="text-sm text-gray-400">Official Nova402 utility token</div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs">
              <div className="font-mono text-gray-400">
                Bt7rUdZ62TWyHB5HsBjLhFqQ3VDg42VUb5Ttwiqvpump
              </div>
              <a
                href="https://dexscreener.com/solana/5kwqfa3rtzrdiyvfyspemnyudhbzmilbucyd1em4rrzs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                View Chart
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
            <p>⚠️ This is a one-way transaction. Please verify the treasury address before sending.</p>
            <p>Transactions on blockchain are final and cannot be reversed.</p>
            <p>Only send USDC on Solana network. Sending other tokens or on wrong network will result in loss of funds.</p>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
