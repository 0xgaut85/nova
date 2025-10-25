'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ServiceMarketplace } from '../components/x402/ServiceMarketplace';
import { TestingInterface } from '../components/x402/TestingInterface';
import { CodeGenerator } from '../components/x402/CodeGenerator';
import { ServiceRegistration } from '../components/x402/ServiceRegistration';
import { RealPaymentHandler } from '../components/x402/RealPaymentHandler';
import { X402Service } from '@/lib/payai-client';

export default function DappPage() {
  const router = useRouter();
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'dashboard'>('marketplace');
  const [testingServiceId, setTestingServiceId] = useState<string | null>(null);
  const [codeGenServiceId, setCodeGenServiceId] = useState<string | null>(null);
  const [isTestingActive, setIsTestingActive] = useState(false);
  const [showServiceRegistration, setShowServiceRegistration] = useState(false);
  const [paymentService, setPaymentService] = useState<X402Service | null>(null);
  const [services, setServices] = useState<X402Service[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<Array<{
    txHash: string;
    service: string;
    amount: string;
    timestamp: number;
    network: string;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    // Load payment history from localStorage
    const savedHistory = localStorage.getItem('x402_payment_history');
    if (savedHistory) {
      try {
        setPaymentHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load payment history:', e);
      }
    }
  }, []);

  const handleTestService = (serviceId: string) => {
    setTestingServiceId(serviceId);
    setIsTestingActive(true);
  };

  const handleCloseTestingInterface = () => {
    setTestingServiceId(null);
    setIsTestingActive(false);
  };

  const handleGetCode = (serviceId: string) => {
    setCodeGenServiceId(serviceId);
  };

  const handleCloseCodeGenerator = () => {
    setCodeGenServiceId(null);
  };

  const handlePayAndUse = async (serviceId: string) => {
    // Fetch service details
    const response = await fetch('/api/x402/discover');
    const data = await response.json();
    
    if (data.success) {
      const service = data.services.find((s: X402Service) => s.id === serviceId);
      if (service) {
        setServices(data.services);
        setPaymentService(service);
      }
    }
  };

  const handlePaymentSuccess = async (txHash: string) => {
    console.log('Payment successful:', txHash);
    
    // Save payment to history
    const newPayment = {
      txHash,
      service: paymentService?.name || 'Unknown Service',
      amount: paymentService?.price.amount || '0',
      timestamp: Date.now(),
      network: getNetworkName(chainId)
    };
    
    const updatedHistory = [newPayment, ...paymentHistory];
    setPaymentHistory(updatedHistory);
    localStorage.setItem('x402_payment_history', JSON.stringify(updatedHistory));
    
    setPaymentService(null);
    
    // Show success message
    alert(`Payment successful! Transaction: ${txHash.slice(0, 10)}...`);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error}`);
  };

  const connectWallet = () => {
    const injectedConnector = connectors.find(c => c.id === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getNetworkName = (chainId: number | undefined) => {
    if (!chainId) return 'Not Connected';
    const networks: Record<number, string> = {
      8453: 'Base Mainnet',
      84532: 'Base Sepolia',
      137: 'Polygon',
      3338: 'Peaq',
      56: 'BSC',
      97: 'BSC Testnet',
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5]">
        <header className="backdrop-blur-xl bg-white/70 border-b border-black/5 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center gap-2 sm:gap-4">
                <img src="/logo.png" alt="Dock402" className="w-8 h-8 sm:w-12 sm:h-12" />
                <div>
                  <h1 className="text-lg sm:text-2xl font-light italic text-[#1E1E1E]">Dock402</h1>
                  <p className="text-xs sm:text-sm text-black/60 font-light italic">The App Store for x402</p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5]">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/70 border-b border-black/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <img src="/logo.png" alt="Dock402" className="w-8 h-8 sm:w-12 sm:h-12" />
              <div>
                <h1 className="text-lg sm:text-2xl font-light italic text-[#1E1E1E]">Dock402</h1>
                <p className="text-xs sm:text-sm text-black/60 font-light italic hidden sm:block">The App Store for x402</p>
              </div>
            </div>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`px-6 py-3 text-base font-light italic rounded-2xl transition-all duration-300 ${
                  activeTab === 'marketplace'
                    ? 'bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white shadow-lg shadow-[#FF7B00]/30'
                    : 'text-black/70 hover:text-black hover:bg-white/50 backdrop-blur-sm'
                }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-3 text-base font-light italic rounded-2xl transition-all duration-300 ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white shadow-lg shadow-[#FF7B00]/30'
                    : 'text-black/70 hover:text-black hover:bg-white/50 backdrop-blur-sm'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setShowServiceRegistration(true)}
                className="px-6 py-3 text-base font-light italic bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white rounded-2xl hover:shadow-lg hover:shadow-[#FF7B00]/30 transition-all duration-300"
              >
                + Register Service
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Return to Main Website */}
              <a
                href="/"
                className="px-4 py-3 text-base font-light italic text-black/70 hover:text-black hover:bg-white/50 backdrop-blur-sm rounded-2xl transition-all duration-300"
              >
                ← Main Site
              </a>
              
              {/* Wallet Connection */}
              {isConnected ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/40 backdrop-blur-xl text-black rounded-2xl text-base font-light italic shadow-lg border border-white/60">
                    <div className="w-3 h-3 bg-[#FF7B00] rounded-full animate-pulse"></div>
                    {formatAddress(address!)}
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="px-4 py-3 text-base font-light italic text-black/70 hover:text-black hover:bg-white/50 backdrop-blur-sm rounded-2xl transition-all duration-300"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white rounded-2xl text-base font-light italic hover:shadow-lg hover:shadow-[#FF7B00]/30 transition-all duration-300"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        {activeTab === 'marketplace' && (
          <div>
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light italic text-black mb-4 sm:mb-6 leading-tight">
                The App Store for x402
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-black/80 max-w-4xl mx-auto leading-relaxed font-light italic px-4">
                Discover, test, and integrate AI services using the revolutionary x402 payment protocol. 
                Pay per request, no subscriptions, instant settlements.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 px-4">
                <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg border border-white/60 min-w-[140px] sm:min-w-[160px]">
                  <div className="text-3xl sm:text-4xl font-light italic text-[#FF7B00] mb-1">80+</div>
                  <div className="text-sm sm:text-base text-black/70 font-light italic">Live Services</div>
                </div>  
                <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg border border-white/60 min-w-[140px] sm:min-w-[160px]">
                  <div className="text-3xl sm:text-4xl font-light italic text-black mb-1">6</div>
                  <div className="text-sm sm:text-base text-black/70 font-light italic">Categories</div>
                </div>
                <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg border border-white/60 min-w-[140px] sm:min-w-[160px]">
                  <div className="text-3xl sm:text-4xl font-light italic text-[#FF7B00] mb-1">$0.01+</div>
                  <div className="text-sm sm:text-base text-black/70 font-light italic">Starting at</div>
                </div>
                <div className="text-center bg-white/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg border border-white/60 min-w-[140px] sm:min-w-[160px]">
                  <div className="text-3xl sm:text-4xl font-light italic text-[#FF7B00] flex items-center gap-2 sm:gap-3 justify-center mb-1">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FF7B00] rounded-full animate-pulse"></span>
                    <span>Live</span>
                  </div>
                  <div className="text-sm sm:text-base text-black/70 font-light italic">Real-time</div>
                </div>
              </div>
            </div>

            {/* Marketplace */}
            <ServiceMarketplace
              onTestService={handleTestService}
              onGetCode={handleGetCode}
              onPayAndUse={handlePayAndUse}
              isTestingActive={isTestingActive}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <h2 className="text-4xl font-light italic text-black mb-8">Dashboard & Developer Tools</h2>
            
            {/* User Stats Section */}
            {!isConnected ? (
              <div className="text-center py-16 bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <div className="w-8 h-8 border-3 border-white rounded-xl"></div>
                </div>
                <h3 className="text-black font-light italic text-2xl mb-4">Connect Your Wallet</h3>
                <p className="text-black/70 text-lg font-light italic mb-6 max-w-2xl mx-auto leading-relaxed">
                  Connect your wallet to view payment history and manage your x402 transactions
                </p>
                <button
                  onClick={connectWallet}
                  className="px-10 py-4 bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white rounded-2xl text-lg font-light italic hover:shadow-lg hover:shadow-[#FF7B00]/30 transition-all duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Wallet Info */}
                <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/60">
                  <h3 className="text-xl font-light italic text-black mb-6">Wallet Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 px-5 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <span className="text-black/70 text-base font-light italic">Address:</span>
                      <span className="font-mono text-base text-black font-light italic">{address}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-5 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <span className="text-black/70 text-base font-light italic">Network:</span>
                      <span className="text-black text-base font-light italic">{getNetworkName(chainId)}</span>
                    </div>
                  </div>
                </div>

                {/* Supported Networks */}
                <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/60">
                  <h3 className="text-xl font-light italic text-black mb-4">Supported Networks</h3>
                  <p className="text-black/70 text-base font-light italic mb-6">
                    x402 works across multiple high-performance blockchains
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <img src="/logos/base.jpg" alt="Base" className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="font-light italic text-sm text-black">Base</p>
                        <p className="text-xs text-black/60 font-light italic">Mainnet</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <img src="/logos/solana.jpg" alt="Solana" className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="font-light italic text-sm text-black">Solana</p>
                        <p className="text-xs text-black/60 font-light italic">Coming Soon</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <img src="/logos/polygon.jpg" alt="Polygon" className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="font-light italic text-sm text-black">Polygon</p>
                        <p className="text-xs text-black/60 font-light italic">Coming Soon</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <img src="/logos/sei.jpg" alt="Sei" className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="font-light italic text-sm text-black">Sei</p>
                        <p className="text-xs text-black/60 font-light italic">Coming Soon</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <img src="/logos/BSC.jpg" alt="BSC" className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="font-light italic text-sm text-black">BSC</p>
                        <p className="text-xs text-black/60 font-light italic">Coming Soon</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <img src="/logos/peaq.jpg" alt="Peaq" className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="font-light italic text-sm text-black">Peaq</p>
                        <p className="text-xs text-black/60 font-light italic">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/60">
                  <h3 className="text-xl font-light italic text-black mb-4">Recent x402 Payments</h3>
                  {paymentHistory.length === 0 ? (
                    <div className="text-center py-10 text-black/60">
                      <p className="text-base font-light italic">Payment history will appear here once you start using x402 services</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paymentHistory.slice(0, 10).map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all">
                          <div className="flex-1">
                            <p className="font-light italic text-sm text-black mb-1">{payment.service}</p>
                            <p className="text-xs text-black/60 font-light italic">
                              {new Date(payment.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-light italic text-sm text-black">{payment.amount}</p>
                              <p className="text-xs text-black/60 font-light italic">{payment.network}</p>
                            </div>
                            <a
                              href={`https://basescan.org/tx/${payment.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white rounded-lg text-xs font-light italic hover:shadow-lg transition-all"
                            >
                              View TX
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Developer Tools Section */}
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg p-10 border border-white/60">
              <h2 className="text-3xl font-light italic mb-6 text-black">Build Your Own x402 Service</h2>
              <p className="text-black/70 mb-8 text-lg font-light italic leading-relaxed">
                Deploy your own x402-enabled API and register it on the marketplace. 
                Start accepting payments per request using the revolutionary HTTP 402 protocol.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Express Starter */}
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:bg-white/50 transition-all duration-300 border border-white/50">
                  <h3 className="font-light italic text-xl mb-3 text-black">Express Starter</h3>
                  <p className="text-black/70 text-base mb-5 font-light italic leading-relaxed">
                    Get started with Express.js and x402 in minutes
                  </p>
                  <button
                    onClick={() => router.push('/docs/server-express')}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] text-white rounded-xl hover:shadow-lg hover:shadow-[#1E1E1E]/30 transition-all duration-300 text-base font-light italic"
                  >
                    View Docs →
                  </button>
                </div>

                {/* Python Starter */}
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:bg-white/50 transition-all duration-300 border border-white/50">
                  <h3 className="font-light italic text-xl mb-3 text-black">Python Starter</h3>
                  <p className="text-black/70 text-base mb-5 font-light italic leading-relaxed">
                    FastAPI/Flask with x402 payment integration
                  </p>
                  <button
                    onClick={() => router.push('/docs/server-python')}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] text-white rounded-xl hover:shadow-lg hover:shadow-[#1E1E1E]/30 transition-all duration-300 text-base font-light italic"
                  >
                    View Docs →
                  </button>
                </div>

                {/* Echo Merchant */}
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:bg-white/50 transition-all duration-300 border border-white/50">
                  <h3 className="font-light italic text-xl mb-3 text-black">Echo Merchant</h3>
                  <p className="text-black/70 text-base mb-5 font-light italic leading-relaxed">
                    FREE testing service to try x402 protocol
                  </p>
                  <button
                    onClick={() => router.push('/docs/echo-merchant')}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] text-white rounded-xl hover:shadow-lg hover:shadow-[#1E1E1E]/30 transition-all duration-300 text-base font-light italic"
                  >
                    View Docs →
                  </button>
                </div>

                {/* Client Libraries */}
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:bg-white/50 transition-all duration-300 border border-white/50">
                  <h3 className="font-light italic text-xl mb-3 text-black">Client Libraries</h3>
                  <p className="text-black/70 text-base mb-5 font-light italic leading-relaxed">
                    Axios, Fetch, HTTPX integrations for x402
                  </p>
                  <button
                    onClick={() => router.push('/docs/clients')}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] text-white rounded-xl hover:shadow-lg hover:shadow-[#1E1E1E]/30 transition-all duration-300 text-base font-light italic"
                  >
                    View Docs →
                  </button>
                </div>

                {/* Facilitator API */}
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:bg-white/50 transition-all duration-300 border border-white/50">
                  <h3 className="font-light italic text-xl mb-3 text-black">Facilitator API</h3>
                  <p className="text-black/70 text-base mb-5 font-light italic leading-relaxed">
                    Payment verification and settlement
                  </p>
                  <button
                    onClick={() => router.push('/docs/facilitators')}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] text-white rounded-xl hover:shadow-lg hover:shadow-[#1E1E1E]/30 transition-all duration-300 text-base font-light italic"
                  >
                    View Docs →
                  </button>
                </div>

                {/* Register Service */}
                <div className="bg-gradient-to-br from-[#FF7B00]/20 to-[#FF9500]/20 backdrop-blur-xl rounded-xl p-6 hover:shadow-lg hover:from-[#FF7B00]/30 hover:to-[#FF9500]/30 transition-all duration-300 border border-[#FF7B00]/30">
                  <h3 className="font-light italic text-xl mb-3 text-black">Register Your Service</h3>
                  <p className="text-black/70 text-base mb-5 font-light italic leading-relaxed">
                    List your x402 service on the marketplace
                  </p>
                  <button
                    onClick={() => setShowServiceRegistration(true)}
                    className="w-full px-5 py-3 bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF7B00]/30 transition-all duration-300 text-base font-light italic"
                  >
                    Register Now →
                  </button>
                </div>
              </div>

              <div className="mt-12 p-8 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40">
                <h3 className="font-light italic text-2xl mb-6 text-black">How it Works</h3>
                <ol className="space-y-5 text-black/80">
                  <li className="flex gap-4 items-start">
                    <span className="font-light italic text-[#FF7B00] text-xl bg-white/50 rounded-full w-9 h-9 flex items-center justify-center">1</span>
                    <span className="text-lg font-light italic leading-relaxed">Deploy your API with x402 support (Express, FastAPI, etc.)</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="font-light italic text-[#FF7B00] text-xl bg-white/50 rounded-full w-9 h-9 flex items-center justify-center">2</span>
                    <span className="text-lg font-light italic leading-relaxed">Test with Echo Merchant to ensure HTTP 402 responses work</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="font-light italic text-[#FF7B00] text-xl bg-white/50 rounded-full w-9 h-9 flex items-center justify-center">3</span>
                    <span className="text-lg font-light italic leading-relaxed">Register your service on the marketplace</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="font-light italic text-[#FF7B00] text-xl bg-white/50 rounded-full w-9 h-9 flex items-center justify-center">4</span>
                    <span className="text-lg font-light italic leading-relaxed">Users discover and pay for your API per request</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Testing Interface Modal */}
      {testingServiceId && (
        <TestingInterface
          selectedServiceId={testingServiceId}
          onClose={handleCloseTestingInterface}
        />
      )}

      {/* Code Generator Modal */}
      {codeGenServiceId && (
        <CodeGenerator
          serviceId={codeGenServiceId}
          onClose={handleCloseCodeGenerator}
        />
      )}

      {/* Service Registration Modal */}
      {showServiceRegistration && (
        <ServiceRegistration
          onClose={() => setShowServiceRegistration(false)}
        />
      )}

      {/* Real Payment Handler */}
      {paymentService && (
        <RealPaymentHandler
          service={paymentService}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onClose={() => setPaymentService(null)}
        />
      )}
    </div>
  );
}
