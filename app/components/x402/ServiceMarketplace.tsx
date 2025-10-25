'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X402Service } from '@/lib/payai-client';
import { ServiceCard } from './ServiceCard';

interface ServiceMarketplaceProps {
  onTestService: (serviceId: string) => void;
  onGetCode: (serviceId: string) => void;
  onPayAndUse?: (serviceId: string) => void;
  isTestingActive?: boolean;
}

export function ServiceMarketplace({ onTestService, onGetCode, onPayAndUse, isTestingActive = false }: ServiceMarketplaceProps) {
  const router = useRouter();
  const [services, setServices] = useState<X402Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<X402Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const categories = ['All', 'AI', 'Content', 'Development', 'Data', 'Tokens', 'Gaming', 'Social', 'Other'];
  const networks = ['All', 'base', 'base-sepolia', 'solana-mainnet', 'solana-devnet', 'polygon', 'peaq'];
  const [serviceType, setServiceType] = useState<'all' | 'production' | 'test'>('all');

  // Fetch services on component mount
  useEffect(() => {
    fetchServices(); // Initial load
    
    // Auto-refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing services...');
      fetchServices();
    }, 60000); // 60 seconds
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Filter services when filters change
  useEffect(() => {
    applyFilters();
  }, [services, selectedCategory, selectedNetwork, searchQuery, serviceType]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/x402/discover');
      const data = await response.json();
      
      if (data.success) {
        setServices(data.services);
        setLastRefresh(new Date());
      } else {
        setError(data.error || 'Failed to load services');
      }
    } catch (err) {
      setError('Failed to connect to x402 services');
      console.error('Service fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...services];

    // Service type filter (production vs test)
    if (serviceType === 'production') {
      filtered = filtered.filter(service => 
        !service.id.includes('echo-merchant') && 
        !service.name.toLowerCase().includes('test') && 
        !service.name.toLowerCase().includes('echo') &&
        !service.description.toLowerCase().includes('free testing')
      );
    } else if (serviceType === 'test') {
      filtered = filtered.filter(service => 
        service.id.includes('echo-merchant') || 
        service.name.toLowerCase().includes('test') || 
        service.name.toLowerCase().includes('echo') ||
        service.description.toLowerCase().includes('free testing')
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Network filter
    if (selectedNetwork !== 'All') {
      filtered = filtered.filter(service => service.price.network === selectedNetwork);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  };

  // Count production vs test services
  const productionCount = services.filter(s => 
    !s.id.includes('echo-merchant') && 
    !s.name.toLowerCase().includes('test') && 
    !s.name.toLowerCase().includes('echo') &&
    !s.description.toLowerCase().includes('free testing')
  ).length;
  const testCount = services.filter(s => 
    s.id.includes('echo-merchant') || 
    s.name.toLowerCase().includes('test') || 
    s.name.toLowerCase().includes('echo') ||
    s.description.toLowerCase().includes('free testing')
  ).length;

  const handleRefresh = () => {
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF7B00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1E1E1E]/60">Discovering x402 services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-[#FAFAFA] border-2 border-[#1E1E1E] rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-[#1E1E1E] font-semibold mb-2">Connection Error</h3>
          <p className="text-[#1E1E1E]/60 text-sm mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#FF7B00] text-white rounded hover:bg-[#1E1E1E] transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#1E1E1E]">x402 Service Marketplace</h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[#1E1E1E]/70">
              {filteredServices.length} services available
            </p>
            <span className="text-[#1E1E1E]/30">|</span>
            <p className="text-[#FF7B00] font-semibold">
              {productionCount} Production
            </p>
            <p className="text-[#1E1E1E]/70 font-semibold">
              {testCount} Test
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="inline-flex items-center gap-2 text-[#FF7B00] font-medium">
              <span className="w-2 h-2 bg-[#FF7B00] rounded-full animate-pulse"></span>
              <span>Live</span>
            </span>
            <span className="text-[#1E1E1E]/30">|</span>
            <span className="text-[#1E1E1E]/60">
              Updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <span className="text-[#1E1E1E]/30">|</span>
            <span className="text-[#1E1E1E]/50 text-xs">
              (auto-refresh: 60s)
            </span>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="px-6 py-3 border-2 border-[#1E1E1E] text-[#1E1E1E] rounded hover:bg-[#1E1E1E] hover:text-white transition-all font-semibold"
        >
          Refresh
        </button>
      </div>

      {/* Service Type Filter */}
      <div>
        <div className="flex gap-3">
          <button
            onClick={() => setServiceType('all')}
            className={`px-6 py-3 rounded font-semibold transition-all ${
              serviceType === 'all'
                ? 'bg-[#1E1E1E] text-white'
                : 'bg-[#FAFAFA] text-[#1E1E1E] border-2 border-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white'
            }`}
          >
            All Services ({services.length})
          </button>
          <button
            onClick={() => setServiceType('production')}
            className={`px-6 py-3 rounded font-semibold transition-all ${
              serviceType === 'production'
                ? 'bg-[#FF7B00] text-white'
                : 'bg-[#FAFAFA] text-[#1E1E1E] border-2 border-[#FF7B00] hover:bg-[#FF7B00] hover:text-white'
            }`}
          >
            Production ({productionCount})
          </button>
          <button
            onClick={() => setServiceType('test')}
            className={`px-6 py-3 rounded font-semibold transition-all ${
              serviceType === 'test'
                ? 'bg-[#1E1E1E] text-white'
                : 'bg-[#FAFAFA] text-[#1E1E1E] border-2 border-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white'
            }`}
          >
            Test ({testCount})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#FAFAFA] border-2 border-[#1E1E1E] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full px-4 py-3 border-2 border-[#1E1E1E] rounded focus:outline-none focus:border-[#FF7B00] bg-white text-[#1E1E1E] placeholder-[#1E1E1E]/40 font-medium"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#1E1E1E] rounded focus:outline-none focus:border-[#FF7B00] bg-white text-[#1E1E1E] font-medium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Network Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">Network</label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#1E1E1E] rounded focus:outline-none focus:border-[#FF7B00] bg-white text-[#1E1E1E] font-medium"
            >
              {networks.map(net => (
                <option key={net} value={net}>{net}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Empty State - No Production Services Yet */}
      {filteredServices.length === 0 && serviceType === 'production' && (
        <div className="text-center py-16 bg-[#FAFAFA] border-2 border-[#1E1E1E] rounded-lg">
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4">
            Be the First to List Your x402 Service
          </h3>
          <p className="text-[#1E1E1E]/60 mb-8 max-w-2xl mx-auto">
            The x402 ecosystem is growing. Deploy your x402-enabled API and register it here 
            to be discovered by users worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/docs/quickstart')}
              className="px-6 py-3 bg-[#1E1E1E] text-white rounded hover:bg-[#FF7B00] transition-colors font-medium"
            >
              View x402 Quickstart
            </button>
            <button
              onClick={() => {/* Service registration modal */}}
              className="px-6 py-3 bg-[#FF7B00] text-white rounded hover:bg-[#1E1E1E] transition-colors font-medium"
            >
              Register Your Service
            </button>
          </div>
          <div className="mt-8 text-sm text-[#1E1E1E]/60">
            <p>Using Echo Merchant? Switch to Test tab to test x402 protocol</p>
          </div>
        </div>
      )}

      {/* Services Grid */}
      {filteredServices.length === 0 && serviceType !== 'production' ? (
        <div className="text-center py-12">
          <h3 className="text-[#1E1E1E] font-semibold mb-2">No services found</h3>
          <p className="text-[#1E1E1E]/60">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onTest={onTestService}
              onGetCode={onGetCode}
              onPayAndUse={onPayAndUse}
              isTestingActive={isTestingActive}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
