'use client';

import { motion } from 'framer-motion';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana';
import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token';

// Nova v1 Token Mint Address on Solana Mainnet
const NOVA_V1_MINT = new PublicKey('Bt7rUdZ62TWyHB5HsBjLhFqQ3VDg42VUb5Ttwiqvpump');

// Solana RPC - Use Helius from environment variable or fallback to Helius directly
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=112de5d5-6530-46c2-b382-527e71c48e68';

const getConnection = () => {
  return new Connection(SOLANA_RPC_URL, 'confirmed');
};

export default function ClaimNova() {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  const { open } = useAppKit();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [novaV1Balance, setNovaV1Balance] = useState<string>('0');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState<number>(6);
  const [isSnapshotActive, setIsSnapshotActive] = useState(false);

  // Snapshot time: 5pm UTC, Nov 9, 2025
  const SNAPSHOT_TIME = new Date('2025-11-09T17:00:00Z');

  // Check if snapshot time has passed
  const isSnapshotTimePassed = () => {
    return new Date() >= SNAPSHOT_TIME;
  };

  // Fetch Nova v1 token balance (from snapshot if time passed, real-time if before)
  useEffect(() => {
    const loadTokenBalance = async () => {
      if (!address || !walletProvider) {
        setNovaV1Balance('0');
        return;
      }

      setIsLoadingBalance(true);
      try {
        const snapshotTimePassed = isSnapshotTimePassed();
        setIsSnapshotActive(snapshotTimePassed);

        // Get Solana address from wallet provider
        let solanaAddress = address;
        try {
          const publicKey = await walletProvider.publicKey;
          if (publicKey) {
            solanaAddress = publicKey.toBase58();
          }
        } catch (e) {
          console.log('Could not get address from provider:', e);
        }

        // Fetch balance from API (handles snapshot logic)
        const response = await fetch(`/api/nova-claim/balance?address=${solanaAddress}`);
        const data = await response.json();

        if (data.error) {
          console.error('Error fetching balance:', data.error);
          setNovaV1Balance('0');
        } else {
          setNovaV1Balance(data.balance || '0');
          setIsSnapshotActive(data.isSnapshot || false);
        }
      } catch (err) {
        console.error('Error loading token balance:', err);
        setNovaV1Balance('0');
      } finally {
        setIsLoadingBalance(false);
      }
    };

    loadTokenBalance();
    
    // Refresh balance every 10 seconds if before snapshot, or once if after
    const interval = setInterval(() => {
      if (!isSnapshotTimePassed()) {
        loadTokenBalance();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [address, walletProvider]);

  // Claimable amount is same as v1 balance (1:1 conversion)
  const claimableAmount = novaV1Balance;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnectWallet = () => {
    // Open wallet modal - user can select Solana from the available networks
    open().catch(console.error);
  };

  const handleClaim = async () => {
    if (!address) {
      handleConnectWallet();
      return;
    }

    setIsClaiming(true);
    // Simulate claim process
    setTimeout(() => {
      setIsClaiming(false);
      setClaimSuccess(true);
      setTimeout(() => setClaimSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <style jsx>{`
        .corner-tl {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 12px;
          height: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          border-left: 1px solid rgba(255, 255, 255, 0.25);
          z-index: 10;
          pointer-events: none;
        }
        .corner-tr {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 12px;
          height: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          border-right: 1px solid rgba(255, 255, 255, 0.25);
          z-index: 10;
          pointer-events: none;
        }
        .corner-bl {
          position: absolute;
          bottom: -1px;
          left: -1px;
          width: 12px;
          height: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          border-left: 1px solid rgba(255, 255, 255, 0.25);
          z-index: 10;
          pointer-events: none;
        }
        .corner-br {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 12px;
          height: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          border-right: 1px solid rgba(255, 255, 255, 0.25);
          z-index: 10;
          pointer-events: none;
        }
      `}</style>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b2a962]/5 via-transparent to-black" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide">
            Claim <span className="font-title text-[#b2a962]">$Nova</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Migrate your $Nova v1 tokens to $Nova v2 with a 1:1 conversion rate
          </p>
        </motion.div>

        {/* Main Claim Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-black/80 backdrop-blur-sm border border-white/[0.15] p-8 md:p-12"
        >
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />

          {/* Snapshot Info */}
          <div className="mb-8 pb-8 border-b border-white/[0.1]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm text-gray-400 font-light mb-2">Snapshot Date</h3>
                <p className="text-xl text-white font-normal">Sunday, November 9th, 2025</p>
                <p className="text-sm text-gray-400 font-light mt-1">5:00 PM UTC</p>
              </div>
              <div className="text-right">
                <h3 className="text-sm text-gray-400 font-light mb-2">Conversion Rate</h3>
                <p className="text-2xl text-[#b2a962] font-normal">1:1</p>
                <p className="text-sm text-gray-400 font-light mt-1">$Nova v1 → $Nova v2</p>
              </div>
            </div>
          </div>

          {/* Wallet Connection Section */}
          {!address ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <p className="text-gray-400 font-light mb-6">
                Connect your Solana wallet to check your claimable $Nova v2 tokens
              </p>
              <button
                onClick={handleConnectWallet}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#b2a962]/10 hover:bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] font-normal rounded-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Connect Solana Wallet</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Connected Wallet Info */}
              <div className="mb-8 p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Connected Wallet</p>
                    <p className="text-lg text-white font-normal font-mono">{formatAddress(address)}</p>
                  </div>
                  <button
                    onClick={() => open().catch(console.error)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Balance Display */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                  <p className="text-sm text-gray-400 font-light mb-2">
                    $Nova v1 Balance {isSnapshotActive ? '(Snapshot)' : '(Live)'}
                  </p>
                  {isLoadingBalance ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-spin text-[#b2a962]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-3xl text-white font-normal">Loading...</p>
                    </div>
                  ) : (
                    <p className="text-3xl text-white font-normal">{novaV1Balance}</p>
                  )}
                  {isSnapshotActive && (
                    <p className="text-xs text-gray-500 font-light mt-1">
                      Balance locked at snapshot time
                    </p>
                  )}
                </div>
                <div className="p-6 bg-[#b2a962]/10 border border-[#b2a962]/20 rounded-lg">
                  <p className="text-sm text-[#b2a962] font-light mb-2">Claimable $Nova v2</p>
                  {isLoadingBalance ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-spin text-[#b2a962]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-3xl text-[#b2a962] font-normal">Loading...</p>
                    </div>
                  ) : (
                    <p className="text-3xl text-[#b2a962] font-normal">{claimableAmount}</p>
                  )}
                </div>
              </div>

              {/* Claim Button */}
              <button
                onClick={handleClaim}
                disabled={isClaiming || claimSuccess}
                className={`w-full py-4 px-8 rounded-lg font-normal text-lg transition-all duration-300 ${
                  claimSuccess
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : isClaiming
                    ? 'bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] cursor-wait'
                    : 'bg-[#b2a962]/10 hover:bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] hover:border-[#b2a962]/50'
                }`}
              >
                {claimSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Claim Successful!
                  </span>
                ) : isClaiming ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Claim...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Claim {claimableAmount} $Nova v2
                  </span>
                )}
              </button>

              {claimSuccess && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-gray-400 mt-4"
                >
                  Your $Nova v2 tokens will be available in your wallet shortly
                </motion.p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg"
        >
          <div className="flex items-start gap-4">
            <svg className="w-5 h-5 text-[#b2a962] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-400 font-light leading-relaxed">
              <p className="mb-2">
                <strong className="text-white">Important:</strong> Only wallets that held $Nova v1 tokens at the snapshot time (Sunday, November 9th, 2025 at 5:00 PM UTC) are eligible to claim $Nova v2 tokens.
              </p>
              <p>
                The conversion rate is 1:1, meaning you will receive 1 $Nova v2 token for every 1 $Nova v1 token you held at the snapshot.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

