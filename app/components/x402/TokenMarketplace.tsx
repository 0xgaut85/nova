'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X402Service } from '@/lib/payai-client';
import { TokenCard } from './TokenCard';

interface TokenMarketplaceProps {
  onMintToken: (serviceId: string) => void;
}

export function TokenMarketplace({ onMintToken }: TokenMarketplaceProps) {
  const router = useRouter();
  const [services, setServices] = useState<X402Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<X402Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showAll, setShowAll] = useState(false);

  const networks = ['All', 'base', 'base-sepolia', 'solana-mainnet', 'solana-devnet', 'polygon', 'peaq'];

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 9);
  const hasMore = filteredServices.length > 9;

  useEffect(() => {
    fetchServices();
    
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing tokens...');
      fetchServices();
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [services, selectedNetwork, searchQuery]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/x402/discover');
      const data = await response.json();

      if (data.success) {
        setServices(data.services);
        setError(null);
        setLastRefresh(new Date());
      } else {
        setError(data.error || 'Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Unable to connect to x402 network');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...services];

    // Only show Tokens category
    filtered = filtered.filter(service => service.category === 'Tokens');

    // Network filter
    if (selectedNetwork !== 'All') {
      filtered = filtered.filter(service => service.price.network === selectedNetwork);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  };

  const handleRefresh = () => {
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b2a962] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-light">Loading x402 tokens...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-white font-light mb-2">Connection Error</h3>
          <p className="text-gray-400 text-sm mb-4 font-light">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#b2a962] text-white rounded hover:bg-[#c4b876] transition-colors text-sm font-light"
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
          <h2 className="text-3xl font-light text-white">Available x402 Tokens</h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-400 font-light">
              {filteredServices.length} tokens available
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="inline-flex items-center gap-2 text-[#b2a962] font-light">
              <span className="w-2 h-2 bg-[#b2a962] rounded-full animate-pulse"></span>
              <span>Live</span>
            </span>
            <span className="text-gray-700">|</span>
            <span className="text-gray-500 font-light">
              Updated: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="px-6 py-3 border border-white/20 text-white rounded hover:bg-white/10 transition-all font-light"
        >
          Refresh
        </button>
      </div>

      {/* Filters - Search and Network only */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-light text-white mb-2">Search Tokens</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-4 py-3 border border-white/20 rounded focus:outline-none focus:border-[#b2a962] bg-white/5 text-white placeholder-gray-500 font-light"
            />
          </div>

          {/* Network Filter */}
          <div>
            <label className="block text-sm font-light text-white mb-2">Network</label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full px-4 py-3 border border-white/20 rounded focus:outline-none focus:border-[#b2a962] bg-white/5 text-white font-light"
            >
              {networks.map(net => (
                <option key={net} value={net} className="bg-black">{net}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg">
          <h3 className="text-2xl font-light text-white mb-4">No tokens found</h3>
          <p className="text-gray-400 font-light mb-6">
            {searchQuery || selectedNetwork !== 'All' 
              ? 'Try adjusting your filters'
              : 'No x402 tokens available yet'}
          </p>
        </div>
      )}

      {/* Token Grid */}
      {filteredServices.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <TokenCard
                key={service.id}
                service={service}
                onMint={() => onMintToken(service.id)}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && !showAll && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-all font-light"
              >
                Load More Tokens
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

