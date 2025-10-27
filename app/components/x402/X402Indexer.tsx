'use client';

import { useState, useEffect } from 'react';
import { X402Service } from '@/lib/payai-client';
import Link from 'next/link';

export function X402Indexer() {
  const [services, setServices] = useState<X402Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<X402Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showAll, setShowAll] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const categories = ['All', 'AI', 'Content', 'Development', 'Data', 'Social', 'Other'];
  const networks = ['All', 'base', 'base-sepolia', 'solana-mainnet', 'solana-devnet', 'polygon', 'peaq'];

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 12);
  const hasMore = filteredServices.length > 12;

  useEffect(() => {
    fetchServices();
    
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing x402 indexer...');
      fetchServices();
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [services, selectedCategory, selectedNetwork, searchQuery]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/x402/discover');
      const data = await response.json();

      if (data.success) {
        // Deduplicate services by ID to avoid showing duplicates
        const uniqueServices = Array.from(
          new Map(data.services.map(service => [service.id, service])).values()
        );
        setServices(uniqueServices);
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

    // Exclude Tokens category - x402 Indexer is for services only
    filtered = filtered.filter(service => service.category !== 'Tokens');

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
        service.description.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  };

  const handleRefresh = () => {
    fetchServices();
  };

  // Extract facilitator name from URL
  const getFacilitatorName = (facilitatorUrl: string): string => {
    try {
      console.log('Extracting facilitator from URL:', facilitatorUrl);
      
      if (!facilitatorUrl || facilitatorUrl.trim() === '') {
        console.log('Empty facilitator URL');
        return 'Unknown Facilitator';
      }
      
      const url = new URL(facilitatorUrl);
      const hostname = url.hostname;
      
      console.log('Extracted hostname:', hostname);
      
      // Known facilitators
      if (hostname.includes('payai.network') || hostname.includes('facilitator.payai')) {
        return 'PayAI Facilitator';
      }
      
      if (hostname.includes('coinbase')) {
        return 'Coinbase Facilitator';
      }
      
      // Extract domain name and format nicely
      const domain = hostname.replace('www.', '');
      const parts = domain.split('.');
      const name = parts[0];
      
      console.log('Extracted name:', name);
      
      // Capitalize first letter
      return name.charAt(0).toUpperCase() + name.slice(1) + ' Facilitator';
    } catch (error) {
      console.log('Error extracting facilitator name:', error, facilitatorUrl);
      return `Facilitator: ${facilitatorUrl.substring(0, 30)}...`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b2a962] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 font-light">Loading x402 services...</p>
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
          <h2 className="text-3xl font-light text-white">Global x402 Service Index</h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-400 font-light">
              {filteredServices.length} services indexed
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
            <span className="text-gray-700">|</span>
            <span className="text-gray-500 font-light">
              (auto-refresh: 60s)
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

      {/* Filters */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-light text-white mb-2">Search Services</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-4 py-3 border border-white/20 rounded focus:outline-none focus:border-[#b2a962] bg-white/5 text-white placeholder-gray-500 font-light"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-light text-white mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-white/20 rounded focus:outline-none focus:border-[#b2a962] bg-white/5 text-white font-light"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-black">{cat}</option>
              ))}
            </select>
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
          <h3 className="text-2xl font-light text-white mb-4">No services found</h3>
          <p className="text-gray-400 font-light mb-6">
            {searchQuery || selectedCategory !== 'All' || selectedNetwork !== 'All'
              ? 'Try adjusting your filters'
              : 'No x402 services available yet'}
          </p>
        </div>
      )}

      {/* Service Grid */}
      {filteredServices.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg overflow-hidden hover:border-[#b2a962]/30 transition-all"
              >
                {/* Card Header */}
                <div className="p-6 space-y-4">
                  {/* Service Name & Category */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-light text-white flex-1">{service.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs bg-[#b2a962]/10 text-[#b2a962] rounded font-light whitespace-nowrap">
                        {service.category}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 font-light line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-gray-500 font-light mb-1">Network</div>
                      <div className="text-white font-light">{service.price.network}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 font-light mb-1">Price</div>
                      <div className="text-[#b2a962] font-light">
                        {service.price.amount} {service.price.currency}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedService === service.id && (
                    <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                      {/* Full Description */}
                      <div>
                        <div className="text-gray-500 font-light mb-1">Full Description</div>
                        <p className="text-gray-300 font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Endpoint */}
                      <div>
                        <div className="text-gray-500 font-light mb-1">Endpoint</div>
                        <a 
                          href={service.endpoint}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#b2a962] hover:text-[#c4b876] font-light break-all transition-colors"
                        >
                          {service.endpoint}
                        </a>
                      </div>

                      {/* Facilitator */}
                      <div>
                        <div className="text-gray-500 font-light mb-1">Facilitator</div>
                        <div className="space-y-1">
                          <div className="text-white font-light">
                            {getFacilitatorName(service.facilitator)}
                          </div>
                          <a 
                            href={service.facilitator}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[#b2a962] font-light break-all transition-colors text-[10px]"
                          >
                            {service.facilitator}
                          </a>
                        </div>
                      </div>

                      {/* Service ID */}
                      <div>
                        <div className="text-gray-500 font-light mb-1">Service ID</div>
                        <code className="text-gray-400 font-mono text-[10px] break-all">
                          {service.id}
                        </code>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-all text-xs font-light"
                    >
                      {expandedService === service.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <Link
                      href="/dapp/service-hub"
                      className="flex-1 px-4 py-2 bg-[#b2a962] text-white rounded hover:bg-[#c4b876] transition-all text-xs font-light text-center"
                    >
                      Test Service
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && !showAll && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-all font-light"
              >
                Load More Services
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

