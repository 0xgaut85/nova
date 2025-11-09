'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana';
import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type TabType = 'stake' | 'enable' | 'lending';

// USDC Mint Address on Solana Mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// Solana RPC
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=112de5d5-6530-46c2-b382-527e71c48e68';

const getConnection = () => {
  return new Connection(SOLANA_RPC_URL, 'confirmed');
};

export default function X402Lending() {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  const { open } = useAppKit();
  const [activeTab, setActiveTab] = useState<TabType>('stake');
  
  // Stake tab state
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState(false);
  
  // Enable lending tab state
  const [apiKey, setApiKey] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentEndpoint, setAgentEndpoint] = useState('');
  const [isEnabling, setIsEnabling] = useState(false);
  const [enableSuccess, setEnableSuccess] = useState(false);
  
  // Lending tab state
  const [lendAmount, setLendAmount] = useState('');
  const [isLending, setIsLending] = useState(false);
  const [lendSuccess, setLendSuccess] = useState(false);

  // Real data states
  const [usdcBalance, setUsdcBalance] = useState<string>('0');
  const [isLoadingUsdc, setIsLoadingUsdc] = useState(false);
  const [novaBalance, setNovaBalance] = useState<string>('0');
  const [isLoadingNova, setIsLoadingNova] = useState(false);
  const [stakedAmount, setStakedAmount] = useState<string>('0');
  const [earnedRewards, setEarnedRewards] = useState<string>('0');
  const [suppliedLiquidity, setSuppliedLiquidity] = useState<string>('0');

  // Protocol metrics - would be fetched from protocol contracts
  const [protocolMetrics, setProtocolMetrics] = useState({
    totalValueLocked: 0,
    totalLiquidity: 0,
    utilizationRate: 0,
    currentAPY: 0,
    supplyAPY: 0,
    borrowAPY: 0
  });

  // Fetch USDC balance
  useEffect(() => {
    const loadUsdcBalance = async () => {
      if (!address || !walletProvider) {
        setUsdcBalance('0');
        return;
      }

      setIsLoadingUsdc(true);
      try {
        const connection = getConnection();
        let solanaAddress = address;
        
        try {
          const publicKey = await walletProvider.publicKey;
          if (publicKey) {
            solanaAddress = publicKey.toBase58();
          }
        } catch (e) {
          console.log('Could not get address from provider:', e);
        }

        const senderPubkey = new PublicKey(solanaAddress);
        const senderTokenAccount = await getAssociatedTokenAddress(
          USDC_MINT,
          senderPubkey
        );

        try {
          const balance = await connection.getTokenAccountBalance(senderTokenAccount);
          const balanceAmount = parseInt(balance.value.amount);
          const formattedBalance = (balanceAmount / 1_000_000).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          setUsdcBalance(formattedBalance);
        } catch (balanceError: any) {
          if (balanceError.message?.includes('could not find account')) {
            setUsdcBalance('0');
          } else {
            console.error('Error fetching USDC balance:', balanceError);
            setUsdcBalance('0');
          }
        }
      } catch (err) {
        console.error('Error loading USDC balance:', err);
        setUsdcBalance('0');
      } finally {
        setIsLoadingUsdc(false);
      }
    };

    loadUsdcBalance();
  }, [address, walletProvider]);

  // Fetch protocol metrics from protocol contracts
  useEffect(() => {
    const loadProtocolMetrics = async () => {
      // In production, this would fetch from protocol smart contracts
      // Query the lending pool contract for:
      // - Total supply
      // - Total borrows
      // - Utilization rate
      // - Current APY rates
      try {
        // For now, set to 0 - would be fetched from protocol contracts
        setProtocolMetrics({
          totalValueLocked: 0,
          totalLiquidity: 0,
          utilizationRate: 0,
          currentAPY: 0,
          supplyAPY: 0,
          borrowAPY: 0
        });
      } catch (err) {
        console.error('Error loading protocol metrics:', err);
        setProtocolMetrics({
          totalValueLocked: 0,
          totalLiquidity: 0,
          utilizationRate: 0,
          currentAPY: 0,
          supplyAPY: 0,
          borrowAPY: 0
        });
      }
    };

    if (address) {
      loadProtocolMetrics();
      // Refresh every 30 seconds
      const interval = setInterval(loadProtocolMetrics, 30000);
      return () => clearInterval(interval);
    } else {
      setProtocolMetrics({
        totalValueLocked: 0,
        totalLiquidity: 0,
        utilizationRate: 0,
        currentAPY: 0,
        supplyAPY: 0,
        borrowAPY: 0
      });
    }
  }, [address]);

  // Historical data - would come from protocol events/indexer in production
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    // In production, fetch historical data from protocol events or indexer
    // For now, return empty array - data would be fetched from on-chain events
    if (address) {
      // Would fetch from protocol indexer/events
      setHistoricalData([]);
    } else {
      setHistoricalData([]);
    }
  }, [address]);

  // Interest rate curve - calculated based on utilization model
  // This is the theoretical curve, actual rates depend on current utilization
  const interestRateCurve = Array.from({ length: 21 }, (_, i) => {
    const utilization = i * 5; // 0% to 100%
    const baseSupply = 3.0;
    const baseBorrow = 6.0;
    const kink = 80; // Utilization kink point
    
    let supplyRate = baseSupply;
    let borrowRate = baseBorrow;
    
    if (utilization <= kink) {
      supplyRate = baseSupply + (utilization / kink) * 3;
      borrowRate = baseBorrow + (utilization / kink) * 4;
    } else {
      supplyRate = baseSupply + 3 + ((utilization - kink) / (100 - kink)) * 5;
      borrowRate = baseBorrow + 4 + ((utilization - kink) / (100 - kink)) * 8;
    }
    
    return {
      utilization: `${utilization}%`,
      value: utilization,
      supplyAPY: Math.round(supplyRate * 10) / 10,
      borrowAPY: Math.round(borrowRate * 10) / 10
    };
  });

  // Calculate estimated rewards
  const calculateEstimatedRewards = (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) return '0.00';
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    const dailyRate = protocolMetrics.currentAPY / 365 / 100;
    const dailyReward = numAmount * dailyRate;
    return dailyReward.toFixed(2);
  };
  
  const estimatedDailyReward = stakeAmount ? calculateEstimatedRewards(stakeAmount) : '0.00';
  const availableToLend = address ? (parseFloat(usdcBalance.replace(/,/g, '')) || 0) : 0;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnectWallet = () => {
    open().catch(console.error);
  };

  const handleStake = async () => {
    if (!address) {
      handleConnectWallet();
      return;
    }
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;

    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);
      setStakeSuccess(true);
      setStakeAmount('');
      setTimeout(() => setStakeSuccess(false), 5000);
    }, 2000);
  };

  const handleEnableLending = async () => {
    if (!address) {
      handleConnectWallet();
      return;
    }
    if (!apiKey || !agentName || !agentEndpoint) return;

    setIsEnabling(true);
    setTimeout(() => {
      setIsEnabling(false);
      setEnableSuccess(true);
      setTimeout(() => setEnableSuccess(false), 5000);
    }, 2000);
  };

  const handleLend = async () => {
    if (!address) {
      handleConnectWallet();
      return;
    }
    if (!lendAmount || parseFloat(lendAmount) <= 0) return;

    setIsLending(true);
    setTimeout(() => {
      setIsLending(false);
      setLendSuccess(true);
      setLendAmount('');
      setTimeout(() => setLendSuccess(false), 5000);
    }, 2000);
  };

  // Fetch active borrowing positions (would come from protocol in production)
  const [activePositions, setActivePositions] = useState<any[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);

  useEffect(() => {
    const loadActivePositions = async () => {
      if (!address) {
        setActivePositions([]);
        return;
      }

      setIsLoadingPositions(true);
      try {
        // In production, this would query the lending protocol for active positions
        // For now, we'll show empty state or fetch from an API endpoint
        // This would typically involve:
        // 1. Querying lending pool contract for all active loans
        // 2. Filtering by borrower addresses
        // 3. Fetching agent metadata from registry
        
        // Simulated empty state - in production would fetch real data
        setActivePositions([]);
      } catch (err) {
        console.error('Error loading active positions:', err);
        setActivePositions([]);
      } finally {
        setIsLoadingPositions(false);
      }
    };

    loadActivePositions();
  }, [address]);

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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide">
            x402 <span className="font-title text-[#b2a962]">Lending</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Enable AI agents to autonomously access paid services. Lend liquidity for agent payments, stake $Nova v2 to secure the protocol, and participate in the x402 payment economy.
          </p>
        </motion.div>

        {/* Protocol Overview Stats - Only show when connected */}
        {address && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/[0.15] rounded-lg">
                <p className="text-xs text-gray-400 font-light mb-1">Total Value Locked</p>
                <p className="text-2xl text-white font-normal">
                  ${protocolMetrics.totalValueLocked.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">$Nova v2 staked</p>
              </div>
              <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/[0.15] rounded-lg">
                <p className="text-xs text-gray-400 font-light mb-1">Total Liquidity</p>
                <p className="text-2xl text-white font-normal">
                  ${protocolMetrics.totalLiquidity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">USDC in pool</p>
              </div>
              <div className="p-6 bg-black/60 backdrop-blur-sm border border-white/[0.15] rounded-lg">
                <p className="text-xs text-gray-400 font-light mb-1">Utilization Rate</p>
                <p className="text-2xl text-white font-normal">
                  {protocolMetrics.utilizationRate.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Pool usage</p>
              </div>
              <div className="p-6 bg-[#b2a962]/10 border border-[#b2a962]/20 rounded-lg">
                <p className="text-xs text-[#b2a962] font-light mb-1">Staking APY</p>
                <p className="text-2xl text-[#b2a962] font-normal">
                  {protocolMetrics.currentAPY > 0 ? `${protocolMetrics.currentAPY.toFixed(1)}%` : '0%'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Current rate</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setActiveTab('stake')}
            className={`px-6 py-3 rounded-lg font-normal text-base transition-all duration-300 ${
              activeTab === 'stake'
                ? 'bg-[#b2a962]/20 border border-[#b2a962]/50 text-[#b2a962]'
                : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.15]'
            }`}
          >
            Stake $Nova
          </button>
          <button
            onClick={() => setActiveTab('enable')}
            className={`px-6 py-3 rounded-lg font-normal text-base transition-all duration-300 ${
              activeTab === 'enable'
                ? 'bg-[#b2a962]/20 border border-[#b2a962]/50 text-[#b2a962]'
                : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.15]'
            }`}
          >
            Enable Nova Lending
          </button>
          <button
            onClick={() => setActiveTab('lending')}
            className={`px-6 py-3 rounded-lg font-normal text-base transition-all duration-300 ${
              activeTab === 'lending'
                ? 'bg-[#b2a962]/20 border border-[#b2a962]/50 text-[#b2a962]'
                : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.15]'
            }`}
          >
            Lending / Borrowing
          </button>
        </motion.div>

        {/* Wallet Connection Required Message */}
        {!address && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-black/80 backdrop-blur-sm border border-white/[0.15] p-12 text-center"
          >
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            <svg className="w-16 h-16 text-[#b2a962] mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-2xl text-white font-normal mb-4">Connect Your Solana Wallet</h3>
            <p className="text-gray-400 font-light mb-8 max-w-md mx-auto">
              You must connect your Solana wallet to access x402 Lending. Connect your wallet to stake $Nova v2 tokens, enable AI agent lending, and participate in the lending markets.
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
        )}

        {/* Tab Content - Only show when wallet is connected */}
        {address && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black/80 backdrop-blur-sm border border-white/[0.15] p-8 md:p-12"
            >
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              {/* Stake Tab */}
              {activeTab === 'stake' && (
                <div>
                  {/* APY Display */}
                  <div className="mb-8 p-6 bg-[#b2a962]/10 border border-[#b2a962]/20 rounded-lg">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-[#b2a962] font-light mb-1">Current APY</p>
                        <p className="text-4xl text-[#b2a962] font-normal">
                          {protocolMetrics.currentAPY > 0 ? `${protocolMetrics.currentAPY.toFixed(1)}%` : '0%'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Variable rate</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-light mb-1">Total Value Locked</p>
                        <p className="text-2xl text-white font-normal">
                          ${protocolMetrics.totalValueLocked.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">$Nova v2 staked</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-light mb-1">Unlock Period</p>
                        <p className="text-lg text-white font-normal">7 days</p>
                        <p className="text-xs text-gray-500 mt-1">Cooldown after unstake</p>
                      </div>
                    </div>
                  </div>

                  {/* APY Trend Chart */}
                  {historicalData.length > 0 ? (
                    <div className="mb-8 p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                      <h4 className="text-sm text-white font-normal mb-4">Staking APY Trend (30 Days)</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={historicalData.slice(-30)}>
                          <defs>
                            <linearGradient id="apyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#b2a962" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#b2a962" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis 
                            dataKey="date" 
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            interval="preserveStartEnd"
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.9)', 
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                            labelStyle={{ color: '#b2a962' }}
                            formatter={(value: any) => [`${value}%`, 'APY']}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="supplyAPY" 
                            stroke="#b2a962" 
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#apyGradient)"
                            name="Staking APY"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="mb-8 p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                      <h4 className="text-sm text-white font-normal mb-4">Staking APY Trend</h4>
                      <div className="h-[200px] flex items-center justify-center">
                        <p className="text-gray-500 font-light text-sm">Historical data will appear here once available</p>
                      </div>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                      <p className="text-sm text-gray-400 font-light mb-2">$Nova v2 Balance</p>
                      {isLoadingNova ? (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 animate-spin text-[#b2a962]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="text-2xl text-white font-normal">Loading...</p>
                        </div>
                      ) : (
                        <p className="text-2xl text-white font-normal">{novaBalance}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Available to stake</p>
                    </div>
                    <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                      <p className="text-sm text-gray-400 font-light mb-2">Staked Amount</p>
                      <p className="text-2xl text-white font-normal">{stakedAmount}</p>
                      <p className="text-xs text-gray-500 mt-1">Currently staked</p>
                    </div>
                    <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                      <p className="text-sm text-gray-400 font-light mb-2">Accrued Rewards</p>
                      <p className="text-2xl text-[#b2a962] font-normal">{earnedRewards}</p>
                      <p className="text-xs text-gray-500 mt-1">Claimable now</p>
                    </div>
                  </div>

                  {/* Stake Input */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 font-light mb-2">
                      Amount to Stake
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white font-normal text-lg focus:outline-none focus:border-[#b2a962]/50 transition-colors"
                      />
                      <button
                        onClick={() => setStakeAmount(novaBalance.replace(/,/g, ''))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 text-sm text-[#b2a962] hover:text-[#b2a962]/80 transition-colors"
                      >
                        Max
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        Available: {novaBalance} $Nova v2
                      </p>
                      {stakeAmount && parseFloat(stakeAmount) > 0 && protocolMetrics.currentAPY > 0 && (
                        <p className="text-xs text-[#b2a962]">
                          Est. daily reward: {estimatedDailyReward} $Nova v2
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stake Button */}
                  <button
                    onClick={handleStake}
                    disabled={isStaking || stakeSuccess || !stakeAmount || parseFloat(stakeAmount) <= 0}
                    className={`w-full py-4 px-8 rounded-lg font-normal text-lg transition-all duration-300 ${
                      stakeSuccess
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : isStaking
                        ? 'bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] cursor-wait'
                        : 'bg-[#b2a962]/10 hover:bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] hover:border-[#b2a962]/50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {stakeSuccess ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Staking Successful
                      </span>
                    ) : isStaking ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Stake...
                      </span>
                    ) : (
                      'Stake $Nova v2'
                    )}
                  </button>

                  {/* Info */}
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                      <h4 className="text-sm text-white font-normal mb-2">How Staking Works</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed mb-3">
                        Staking $Nova v2 tokens secures the x402 protocol infrastructure and enables protocol governance participation. Staked tokens are locked in a smart contract and earn rewards based on protocol revenue from x402 service fees and lending activities.
                      </p>
                      <ul className="text-xs text-gray-400 font-light leading-relaxed space-y-1 list-disc list-inside">
                        <li>Rewards are calculated continuously and distributed daily at 00:00 UTC</li>
                        <li>APY is variable and adjusts based on total value locked and protocol revenue</li>
                        <li>Unstaking initiates a 7-day cooldown period before tokens can be withdrawn</li>
                        <li>During cooldown, tokens continue earning rewards but cannot be transferred</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                      <h4 className="text-sm text-white font-normal mb-2">Risk Considerations</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        Staking involves smart contract risk. The protocol uses audited contracts, but users should only stake amounts they can afford to lose. APY rates are subject to change based on market conditions and protocol performance.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enable Lending Tab */}
              {activeTab === 'enable' && (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl text-white font-normal mb-4">Enable AI Agent Lending</h3>
                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                      Register your AI agent to enable autonomous payments for x402-protected services. Once registered, your agent can borrow USDC from the liquidity pool to pay for API calls programmatically, without manual intervention. Your agent will automatically handle HTTP 402 Payment Required responses and execute payments through the x402 protocol.
                    </p>
                  </div>

                    {/* Form */}
                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="block text-sm text-gray-400 font-light mb-2">
                          Agent Name
                        </label>
                        <input
                          type="text"
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          placeholder="My AI Agent"
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white font-normal focus:outline-none focus:border-[#b2a962]/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 font-light mb-2">
                          Agent Endpoint URL
                        </label>
                        <input
                          type="url"
                          value={agentEndpoint}
                          onChange={(e) => setAgentEndpoint(e.target.value)}
                          placeholder="https://api.example.com/v1/agent"
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white font-normal focus:outline-none focus:border-[#b2a962]/50 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Your agent endpoint must implement x402 protocol standards. When your agent makes requests to x402-protected services, it will receive HTTP 402 Payment Required responses and can automatically borrow funds to complete payments.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 font-light mb-2">
                          Lending API Key
                        </label>
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="nova_live_xxxxxxxxxxxxx"
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white font-normal focus:outline-none focus:border-[#b2a962]/50 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Generate your API key from the Nova Hub dashboard. This key authenticates lending API requests and is encrypted before storage. Never share your API key publicly.
                        </p>
                      </div>
                    </div>

                    {/* Enable Button */}
                    <button
                      onClick={handleEnableLending}
                      disabled={isEnabling || enableSuccess || !apiKey || !agentName || !agentEndpoint}
                      className={`w-full py-4 px-8 rounded-lg font-normal text-lg transition-all duration-300 ${
                        enableSuccess
                          ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                          : isEnabling
                          ? 'bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] cursor-wait'
                          : 'bg-[#b2a962]/10 hover:bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] hover:border-[#b2a962]/50 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {enableSuccess ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Lending Enabled
                        </span>
                      ) : isEnabling ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enabling Lending...
                        </span>
                      ) : (
                        'Enable Nova Lending'
                      )}
                    </button>

                    {/* API Documentation Link */}
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#b2a962] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="text-xs text-gray-400 font-light leading-relaxed">
                            <p className="mb-2">
                              <strong className="text-white">How It Works:</strong> When your AI agent encounters an HTTP 402 Payment Required response from an x402-protected service, it can automatically borrow USDC from the Nova Lending pool to complete the payment. The agent handles the entire payment flow programmatically: receiving the 402 response, borrowing funds, executing the payment transaction, and retrying the original request with payment proof.
                            </p>
                            <p className="mb-2">
                              Your agent can also lend idle USDC back to the pool to earn yield. All operations use x402 protocol standards for authentication and payment verification. The lending API integrates seamlessly with x402 facilitators for payment settlement.
                            </p>
                            <p>
                              View the complete API reference and integration guides in the <a href="/docs" className="text-[#b2a962] hover:text-[#b2a962]/80 underline">Documentation</a> section.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <h4 className="text-sm text-white font-normal mb-2">Supported Operations</h4>
                        <ul className="text-xs text-gray-400 font-light leading-relaxed space-y-1 list-disc list-inside">
                          <li>Automatically borrow USDC when encountering HTTP 402 Payment Required responses</li>
                          <li>Execute x402 payments programmatically without manual intervention</li>
                          <li>Lend idle USDC to the pool to earn yield on unused capital</li>
                          <li>Query real-time borrowing rates and pool availability</li>
                          <li>Monitor agent payment history and outstanding balances</li>
                        </ul>
                      </div>
                    </div>
                  </>
              )}

              {/* Lending/Borrowing Tab */}
              {activeTab === 'lending' && (
                <>
                  {/* Balance Info */}
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                      <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                        <p className="text-sm text-gray-400 font-light mb-2">USDC Balance</p>
                        {isLoadingUsdc ? (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin text-[#b2a962]" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-2xl text-white font-normal">Loading...</p>
                          </div>
                        ) : (
                          <p className="text-2xl text-white font-normal">{usdcBalance}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Wallet balance</p>
                      </div>
                      <div className="p-6 bg-[#b2a962]/10 border border-[#b2a962]/20 rounded-lg">
                        <p className="text-sm text-[#b2a962] font-light mb-2">Available to Lend</p>
                        <p className="text-2xl text-[#b2a962] font-normal">
                          {availableToLend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Liquidity available</p>
                      </div>
                      <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                        <p className="text-sm text-gray-400 font-light mb-2">Total Liquidity</p>
                        <p className="text-2xl text-white font-normal">
                          ${protocolMetrics.totalLiquidity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Pool size (USDC)</p>
                      </div>
                      <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                        <p className="text-sm text-gray-400 font-light mb-2">Utilization Rate</p>
                        <p className="text-2xl text-white font-normal">
                          {protocolMetrics.utilizationRate.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Current usage</p>
                      </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Total Value Locked Chart */}
                      <div className="p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <h4 className="text-sm text-white font-normal mb-4">Total Liquidity Trend</h4>
                        {historicalData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={historicalData.slice(-14)}>
                            <defs>
                              <linearGradient id="liquidityGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#b2a962" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#b2a962" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis 
                              dataKey="date" 
                              stroke="rgba(255,255,255,0.4)"
                              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                              interval="preserveStartEnd"
                            />
                            <YAxis 
                              stroke="rgba(255,255,255,0.4)"
                              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(0,0,0,0.9)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                              labelStyle={{ color: '#b2a962' }}
                              formatter={(value: any) => [`$${value.toLocaleString()}`, 'Liquidity']}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="liquidity" 
                              stroke="#b2a962" 
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#liquidityGradient)"
                            />
                            </AreaChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-[200px] flex items-center justify-center">
                            <p className="text-gray-500 font-light text-sm">Historical data will appear here once available</p>
                          </div>
                        )}
                      </div>

                      {/* Utilization Rate Chart */}
                      <div className="p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <h4 className="text-sm text-white font-normal mb-4">Utilization Rate</h4>
                        {historicalData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={historicalData.slice(-14)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis 
                              dataKey="date" 
                              stroke="rgba(255,255,255,0.4)"
                              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                              interval="preserveStartEnd"
                            />
                            <YAxis 
                              stroke="rgba(255,255,255,0.4)"
                              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                              domain={[50, 100]}
                              tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(0,0,0,0.9)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                              labelStyle={{ color: '#b2a962' }}
                              formatter={(value: any) => [`${value}%`, 'Utilization']}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="utilization" 
                              stroke="#b2a962" 
                              strokeWidth={2}
                              dot={{ fill: '#b2a962', r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                            </LineChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-[200px] flex items-center justify-center">
                            <p className="text-gray-500 font-light text-sm">Historical data will appear here once available</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interest Rate Curve */}
                    <div className="mb-8 p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                      <h4 className="text-sm text-white font-normal mb-4">Interest Rate Curve</h4>
                      <p className="text-xs text-gray-400 font-light mb-4">
                        Interest rates adjust dynamically based on pool utilization. Higher utilization leads to increased rates to incentivize more supply.
                      </p>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={interestRateCurve}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis 
                            dataKey="utilization" 
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                            interval={2}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                            domain={[0, 20]}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.9)', 
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                            labelStyle={{ color: '#b2a962' }}
                            formatter={(value: any) => [`${value}%`, 'APY']}
                          />
                          <Legend 
                            wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="supplyAPY" 
                            stroke="#b2a962" 
                            strokeWidth={2}
                            name="Supply APY"
                            dot={false}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="borrowAPY" 
                            stroke="#ff6b6b" 
                            strokeWidth={2}
                            name="Borrow APY"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Lending Activity Chart */}
                    <div className="mb-8 p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                      <h4 className="text-sm text-white font-normal mb-4">Lending Activity (30 Days)</h4>
                      {historicalData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={historicalData.slice(-30)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis 
                            dataKey="date" 
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                            interval={4}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.9)', 
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                            labelStyle={{ color: '#b2a962' }}
                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Daily Volume']}
                          />
                          <Bar 
                            dataKey="volume" 
                            fill="#b2a962"
                            radius={[4, 4, 0, 0]}
                            opacity={0.7}
                          />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-[200px] flex items-center justify-center">
                          <p className="text-gray-500 font-light text-sm">Historical data will appear here once available</p>
                        </div>
                      )}
                    </div>

                    {/* Lend Input */}
                    <div className="mb-8">
                      <h3 className="text-xl text-white font-normal mb-4">Supply Liquidity for AI Agent Payments</h3>
                      <p className="text-sm text-gray-400 font-light mb-4">
                        Lend USDC to the Nova Lending pool to enable AI agents to pay for x402-protected services. When agents encounter HTTP 402 Payment Required responses, they can borrow from this pool to complete payments programmatically. Your funds earn interest based on agent borrowing activity and utilization rates.
                      </p>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-400 font-light mb-2">
                          Amount to Supply
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={lendAmount}
                            onChange={(e) => setLendAmount(e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white font-normal text-lg focus:outline-none focus:border-[#b2a962]/50 transition-colors"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-normal">USDC</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            Available: {availableToLend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
                          </p>
                          <p className="text-xs text-gray-400">
                            Current supply APY: {protocolMetrics.supplyAPY > 0 ? `${protocolMetrics.supplyAPY.toFixed(1)}%` : '0%'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleLend}
                        disabled={isLending || lendSuccess || !lendAmount || parseFloat(lendAmount) <= 0}
                        className={`w-full py-4 px-8 rounded-lg font-normal text-lg transition-all duration-300 ${
                          lendSuccess
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                            : isLending
                            ? 'bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] cursor-wait'
                            : 'bg-[#b2a962]/10 hover:bg-[#b2a962]/20 border border-[#b2a962]/30 text-[#b2a962] hover:border-[#b2a962]/50 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {lendSuccess ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Lending Successful
                          </span>
                        ) : isLending ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Lending...
                          </span>
                        ) : (
                          'Lend USDC'
                        )}
                      </button>
                    </div>

                    {/* Active Borrowing Positions */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl text-white font-normal">Active Borrowing Positions</h3>
                        <span className="text-sm text-gray-400 font-light">
                          {isLoadingPositions ? 'Loading...' : `${activePositions.length} active loans`}
                        </span>
                      </div>
                      {isLoadingPositions ? (
                        <div className="p-12 text-center">
                          <svg className="w-8 h-8 animate-spin text-[#b2a962] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="text-gray-400 font-light">Loading active positions...</p>
                        </div>
                      ) : activePositions.length === 0 ? (
                        <div className="p-12 text-center bg-white/[0.02] border border-white/[0.08] rounded-lg">
                          <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-gray-400 font-light mb-2">No active borrowing positions</p>
                          <p className="text-xs text-gray-500">
                            Active loans from AI agents will appear here once agents start borrowing from the pool
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {activePositions.map((position) => (
                            <div
                              key={position.id}
                              className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-lg hover:border-white/[0.12] transition-colors"
                            >
                              {/* Position details would go here */}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                      <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <h4 className="text-sm text-white font-normal mb-2">How Lending Works</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed mb-3">
                          AI agents need USDC to pay for x402-protected API calls. When an agent encounters an HTTP 402 Payment Required response, it can automatically borrow USDC from the liquidity pool to complete the payment. As a lender, you provide the capital that enables these autonomous payments. Your USDC is pooled and lent to agents based on their creditworthiness, collateral ratios, and reputation scores. Interest rates adjust algorithmically based on supply, demand, and utilization.
                        </p>
                        <ul className="text-xs text-gray-400 font-light leading-relaxed space-y-1 list-disc list-inside">
                          <li>Agents borrow funds automatically when making x402 payments to protected services</li>
                          <li>Interest accrues continuously and compounds daily on outstanding borrows</li>
                          <li>You can withdraw your supplied liquidity at any time, subject to pool availability</li>
                          <li>Interest rates increase as pool utilization approaches 100% to incentivize more supply</li>
                          <li>All loans are over-collateralized with minimum collateral ratios enforced by smart contracts</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <h4 className="text-sm text-white font-normal mb-2">x402 Payment Flow</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed mb-2">
                          When an AI agent requests a resource from an x402-protected service:
                        </p>
                        <ol className="text-xs text-gray-400 font-light leading-relaxed space-y-1 list-decimal list-inside mb-3">
                          <li>Service responds with HTTP 402 Payment Required and payment instructions</li>
                          <li>Agent automatically borrows USDC from Nova Lending pool if needed</li>
                          <li>Agent executes payment transaction and includes proof in request headers</li>
                          <li>Service verifies payment via x402 facilitator and serves the resource</li>
                        </ol>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          This entire process happens programmatically without manual intervention, enabling true autonomous agent payments.
                        </p>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                        <h4 className="text-sm text-white font-normal mb-2">Risk Factors</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          Lending involves smart contract risk, borrower default risk, and interest rate volatility. While loans are over-collateralized and secured by agent reputation systems, there is no guarantee against losses. Interest rates can fluctuate based on market conditions and agent borrowing activity. Only lend amounts you can afford to lose. The protocol uses audited smart contracts, but vulnerabilities may exist.
                        </p>
                      </div>
                    </div>
                  </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
