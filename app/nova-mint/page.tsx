'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Treasury address
const TREASURY_ADDRESS = 'DY8zJxPE8G9Ks9LtLUwBT2ux5txYMgPBZqTvopy7X5N6';

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
                $NOVA Mint
              </h1>
              <p className="text-gray-400 text-lg font-light">
                Send USDC on Solana to mint $NOVA tokens
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
                <div className="text-sm text-gray-400 mb-2 font-light">Send USDC to this address:</div>
                <div className="relative bg-black/30 border border-white/[0.15] rounded-lg p-4">
                  <div className="font-mono text-sm text-gray-300 break-all pr-12 font-light">
                    {TREASURY_ADDRESS}
                  </div>
                  <button
                    onClick={copyAddress}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] rounded-lg px-3 py-2 transition-colors text-xs font-normal"
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg p-4 mb-6">
                <div className="font-normal text-[#b2a962] mb-2 flex items-center gap-2">
                  <span>📝</span> How to Mint:
                </div>
                <ol className="text-sm text-gray-300 space-y-2 ml-6 list-decimal font-light">
                  <li>Choose your amount (${amount} USDC)</li>
                  <li>Copy the treasury address above</li>
                  <li>Open your Solana wallet (Phantom, Solflare, etc.)</li>
                  <li>Send exactly <span className="font-normal text-white">{amount} USDC</span> to the address</li>
                  <li>$NOVA tokens will be sent to your wallet automatically</li>
                </ol>
              </div>

              {/* Warning */}
              {!isValid && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm font-light">
                  ⚠️ Amount must be between $10 and $1,000
                </div>
              )}

              {/* Open Wallet Button */}
              <a
                href={`solana:${TREASURY_ADDRESS}?amount=${isValid ? amountNum : 10}&spl-token=${USDC_MINT}`}
                className={`block w-full text-center font-normal py-4 rounded-lg transition-all duration-300 transform ${
                  isValid
                    ? 'bg-[#b2a962] hover:bg-[#c4b876] text-black hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Open Wallet App
              </a>
            </div>

            {/* Info Section */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-normal text-white mb-1">Instant Delivery</div>
                <div className="text-xs text-gray-400 font-light">Receive $NOVA immediately</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-normal text-white mb-1">Secure</div>
                <div className="text-xs text-gray-400 font-light">Non-custodial minting</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">💎</div>
                <div className="text-sm font-normal text-white mb-1">Fair Launch</div>
                <div className="text-xs text-gray-400 font-light">Equal opportunity</div>
              </div>
            </div>

            {/* Token Info */}
            <div className="mt-8 bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-xl font-normal text-white mb-2">$NOVA Token</div>
                <div className="text-sm text-gray-400 font-light">Official Nova402 utility token</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
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
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center text-xs text-gray-500 space-y-2 font-light">
              <p>⚠️ This is a one-way transaction. Please verify the treasury address before sending.</p>
              <p>Transactions on blockchain are final and cannot be reversed.</p>
              <p>Only send USDC on Solana network. Sending other tokens or on wrong network will result in loss of funds.</p>
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

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
