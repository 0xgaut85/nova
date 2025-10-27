'use client';

import { X402Service } from '@/lib/payai-client';
import { useState } from 'react';

interface TokenCardProps {
  service: X402Service;
  onMint: () => void;
}

export function TokenCard({ service, onMint }: TokenCardProps) {
  const [imageError, setImageError] = useState(false);

  // Extract domain from endpoint for preview
  const getWebsiteUrl = (endpoint: string) => {
    try {
      const url = new URL(endpoint);
      return `${url.protocol}//${url.hostname}`;
    } catch {
      return null;
    }
  };

  const websiteUrl = getWebsiteUrl(service.endpoint);
  
  // Use screenshot API service for website preview
  const getScreenshotUrl = (url: string) => {
    // Using ApiFlash for website screenshots
    return `https://api.apiflash.com/v1/urltoimage?access_key=182f19ef948340c29ef9b9eada082156&url=${encodeURIComponent(url)}&format=png&width=1280&height=720`;
  };

  return (
    <div className="group bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg overflow-hidden hover:border-[#b2a962]/30 transition-all duration-300">
      {/* Website Preview */}
      <div className="relative w-full h-48 bg-gradient-to-br from-[#b2a962]/5 to-black overflow-hidden">
        {websiteUrl && !imageError ? (
          <>
            <img
              src={getScreenshotUrl(websiteUrl)}
              alt={`${service.name} preview`}
              className="w-full h-full object-cover object-top"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#b2a962]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#b2a962]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 font-light">Token Preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Token Info */}
      <div className="p-6 space-y-4">
        {/* Token Name */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-light text-white group-hover:text-[#b2a962] transition-colors">
              {service.name}
            </h3>
            {websiteUrl && (
              <span className="text-sm text-gray-600 font-light truncate">
                {websiteUrl}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-gray-500 font-light">{service.price.network}</span>
            <span className="text-gray-700">•</span>
            <span className="text-[#b2a962] font-light">
              {service.price.amount} {service.price.currency}
            </span>
          </div>
        </div>

        {/* Mint Button */}
        <button
          onClick={onMint}
          className="w-full px-6 py-3 bg-[#b2a962] text-white rounded-lg text-sm font-light hover:bg-[#c4b876] transition-all duration-300 shadow-lg shadow-[#b2a962]/10"
        >
          Mint
        </button>
      </div>
    </div>
  );
}

