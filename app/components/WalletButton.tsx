'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';
import { X } from 'lucide-react';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showModal, setShowModal] = useState(false);

  const handleConnect = () => {
    // Use the injected connector which handles both MetaMask and Rabby
    const injectedConnector = connectors[0];
    if (injectedConnector) {
      connect({ connector: injectedConnector });
      setShowModal(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="bg-black hover:bg-gray-900 rounded-lg text-sm font-medium px-4 py-2 h-auto text-white transition-colors"
      >
        {formatAddress(address)}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-black hover:bg-gray-900 rounded-lg text-sm font-medium px-4 py-2 h-auto text-white transition-colors"
      >
        Connect Wallet
      </button>

      {showModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm w-full relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              
              <p className="text-sm text-gray-600 mb-6">
                Connect with MetaMask or Rabby to access xgrain402 explorer
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleConnect}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                    {/* MetaMask Icon */}
                    <svg width="24" height="24" viewBox="0 0 212 189" fill="none">
                      <g clipPath="url(#clip0)">
                        <path d="M202.3 1.6l-79.3 58.8 14.7-34.8 64.6-24z" fill="#E17726" stroke="#E17726" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.7 1.6l78.7 59.3-13.9-35.3L9.7 1.6zM172.9 136.3l-21.2 32.4 45.4 12.5 13-44.2-37.2-.7zM1.9 136.9l13 44.2 45.3-12.5-21.1-32.4-37.2.7z" fill="#E27625" stroke="#E27625" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M58.3 81.6l-12.5 18.8 45 2-1.5-48.3-31 27.5zM153.7 81.6l-31.5-28 -1 48.8 45-2-12.5-18.8zM60.1 168.7l27-13.1-23.3-18.2-3.7 31.3zM124.9 155.6l27 13.1-3.7-31.3-23.3 18.2z" fill="#E27625" stroke="#E27625" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M151.9 168.7l-27-13.1 2.2 17.6-.2 7.1 25-11.6zM60.1 168.7l25 11.6-.2-7.1 2.1-17.6-26.9 13.1z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M85.4 125.5l-22.4-6.6 15.8-7.2 6.6 13.8zM126.6 125.5l6.6-13.8 15.9 7.2-22.5 6.6z" fill="#233447" stroke="#233447" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M60.1 168.7l3.8-32.4-24.9.7 21.1 31.7zM148.1 136.3l3.8 32.4 21.1-31.7-24.9-.7zM166.2 100.4l-45 2 4.2 23.1 6.6-13.8 15.9 7.2 18.3-18.5zM63 118.9l15.9-7.2 6.6 13.8 4.1-23.1-45-2L63 118.9z" fill="#CC6228" stroke="#CC6228" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M45.7 100.4l17.8 34.7-0.6-17.3-17.2-17.4zM147.9 117.8l-.6 17.3 17.8-34.7-17.2 17.4zM89.5 102.4l-4.1 23.1 5.2 26.9 1.2-35.2-2.3-14.8zM121.2 102.4l-2.2 14.7 1 35.3 5.3-26.9-4.1-23.1z" fill="#E27525" stroke="#E27525" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M125.3 125.5l-5.3 26.9 3.8 2.6 23.3-18.2.6-17.3-22.4 6zM63 118.9l.6 17.3 23.3 18.2 3.8-2.6-5.2-26.9-22.5-6z" fill="#F5841F" stroke="#F5841F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M125.7 180.3l.2-7.1-2-1.7h-29.5l-1.8 1.7.2 7.1-25-11.6 8.7 7.1 17.7 12.3h30l17.8-12.3 8.7-7.1-25 11.6z" fill="#C0AC9D" stroke="#C0AC9D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M123.8 155l-3.8-2.6h-28l-3.8 2.6-2.1 17.6 1.8-1.7h29.5l2 1.7-2.1-17.6z" fill="#161616" stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M205.7 63.2l6.7-32-10-30-75.7 56.1 29.1 24.6 41.1 12 9.1-10.6-3.9-2.8 6.3-5.7-4.8-3.7 6.3-4.8-4.2-3.1zM.3 31.2l6.7 32-4.3 3.2 6.3 4.8-4.8 3.7 6.3 5.7-3.9 2.8 9 10.6 41.1-12L85.8 57.3 10.1 1.2l-9.8 30z" fill="#763E1A" stroke="#763E1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M196.3 106.2l-41.1-12 12.5 18.8-17.8 34.7 23.4-.3h37.2l-14.2-41.2zM56.8 94.2l-41.1 12-14.1 41.2h37.2l23.3.3-17.8-34.7 12.5-18.8zM121.2 102.4l2.6-45.1 12-32.4h-53l11.9 32.4 2.7 45.1 1 15 .1 35.2h28l.1-35.2 1.6-15z" fill="#F5841F" stroke="#F5841F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="212" height="189" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">MetaMask / Rabby</p>
                    <p className="text-xs text-gray-500">Connect to BSC network</p>
                  </div>
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    By connecting, you agree to xgrain402's terms of service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

