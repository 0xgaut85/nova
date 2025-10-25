'use client';

import { useState } from 'react';
import { X402Service } from '@/lib/payai-client';

interface ServiceCardProps {
  service: X402Service;
  onTest: (serviceId: string) => void;
  onGetCode: (serviceId: string) => void;
  onPayAndUse?: (serviceId: string) => void;
  isTestingActive?: boolean;
}

export function ServiceCard({ service, onTest, onGetCode, onPayAndUse, isTestingActive = false }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-[#FF7B00]';
      case 'offline': return 'bg-[#1E1E1E]';
      case 'maintenance': return 'bg-[#FAFAFA]';
      default: return 'bg-[#1E1E1E]';
    }
  };

  const formatPrice = (price: any) => {
    return `$${price.amount} ${price.currency}`;
  };

  const isEchoMerchant = service.id.includes('echo-merchant') || service.endpoint.includes('x402.payai.network');
  
  return (
    <div 
      className={`bg-white border-2 rounded-lg p-6 transition-all duration-300 ${
        isHovered ? 'border-[#FF7B00] shadow-lg' : 'border-[#1E1E1E]'
      } ${isEchoMerchant ? 'bg-[#FAFAFA]' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Type Badge */}
      <div className="mb-4">
        {isEchoMerchant ? (
          <span className="px-3 py-1 bg-[#1E1E1E] text-white text-xs font-medium rounded">
            TEST SERVICE - FREE
          </span>
        ) : (
          <span className="px-3 py-1 bg-[#FF7B00] text-white text-xs font-medium rounded">
            PRODUCTION
          </span>
        )}
      </div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-[#1E1E1E] mb-1">{service.name}</h3>
          <span className="text-sm text-[#1E1E1E]/60">{service.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
          <span className="text-xs text-[#1E1E1E]/60 capitalize">{service.status}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#1E1E1E]/80 mb-4 line-clamp-2">
        {service.description}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#FAFAFA] rounded p-3">
          <div className="text-xs text-[#1E1E1E]/60 mb-1">Price</div>
          <div className="text-sm font-bold text-[#1E1E1E]">{formatPrice(service.price)}</div>
        </div>
        <div className="bg-[#FAFAFA] rounded p-3">
          <div className="text-xs text-[#1E1E1E]/60 mb-1">Network</div>
          <div className="text-sm font-bold text-[#1E1E1E]">{service.price.network}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {isEchoMerchant && (
          <button
            onClick={() => onTest(service.id)}
            disabled={service.status !== 'online' || isTestingActive}
            className="flex-1 px-4 py-2 bg-[#1E1E1E] text-white rounded hover:bg-[#FF7B00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isTestingActive ? 'Testing...' : 'Test Free'}
          </button>
        )}
        {!isEchoMerchant && onPayAndUse && (
          <button
            onClick={() => onPayAndUse(service.id)}
            disabled={service.status !== 'online'}
            className="flex-1 px-4 py-2 bg-[#FF7B00] text-white rounded hover:bg-[#1E1E1E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Pay & Use
          </button>
        )}
        <button
          onClick={() => onGetCode(service.id)}
          className="flex-1 px-4 py-2 border-2 border-[#1E1E1E] text-[#1E1E1E] rounded hover:bg-[#1E1E1E] hover:text-white transition-colors text-sm font-medium"
        >
          Get Code
        </button>
      </div>
    </div>
  );
}
