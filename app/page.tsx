'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 500, 600], [1, 1, 0]);
  const navDisplay = useTransform(scrollY, (value) => value > 700 ? 'none' : 'flex');
  
  const [explorerText, setExplorerText] = useState('explorer');
  const [isBlinking, setIsBlinking] = useState(false);

  const handleExplorerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExplorerText('coming soon');
    setIsBlinking(true);
    
    setTimeout(() => {
      setExplorerText('explorer');
      setIsBlinking(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Sidebar Navigation - Hidden on mobile, shows as top bar */}
      <motion.div 
        className="fixed left-0 top-0 h-full w-full md:w-80 bg-[#FF7B00] z-50 flex flex-col md:h-full h-auto md:border-r border-b border-[#FF9500]"
        style={{ 
          opacity: navOpacity,
          display: navDisplay
        }}
      >
        {/* Logo Section */}
        <div className="p-4 md:p-8 border-b border-[#FF9500]">
          <Image 
            src="/logoblack.png" 
            alt="Dock402" 
            width={60} 
            height={60}
            className="mb-2 md:mb-4 w-12 h-12 md:w-20 md:h-20"
            priority
          />
          <h1 className="text-xl md:text-3xl font-bold italic text-white">Dock402</h1>
          <p className="text-white/80 text-xs md:text-sm">The App Store for x402</p>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="flex-1 p-4 md:p-8 hidden md:flex flex-col gap-4 md:gap-6 overflow-y-auto">
          <a 
            href="https://x.com/dock402" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-lg font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-4 transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @dock402
          </a>
        
          <a 
            href="/docs" 
            className="flex items-center gap-4 text-lg font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-4 transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            docs
          </a>
        
          <a 
            href="https://github.com/dock402" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-lg font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-4 transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            github
          </a>
        
          <a 
            href="/dapp"
            className="flex items-center gap-4 text-lg font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-4 transition-all duration-300"
          >
            <img src="/logotransp.png" alt="dapp" width="28" height="28" className="object-contain" />
            <span>dapp</span>
          </a>
        
          <a 
            href="https://explorer.xgrain402.xyz" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleExplorerClick}
            className={`flex items-center gap-4 text-lg font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-4 transition-all duration-300 ${isBlinking ? 'blink-animation' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            {explorerText}
          </a>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden p-4 overflow-y-auto max-h-[60vh]">
          <div className="flex flex-col gap-4">
            <a 
              href="https://x.com/dock402" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-3 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @dock402
            </a>
            <a 
              href="/docs" 
              className="flex items-center gap-3 text-sm font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-3 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              docs
            </a>
            <a 
              href="https://github.com/dock402" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-3 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              github
            </a>
            <a 
              href="/dapp"
              className="flex items-center gap-3 text-sm font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-3 transition-all duration-300"
            >
              <img src="/logotransp.png" alt="dapp" width="18" height="18" className="object-contain" />
              <span>dapp</span>
            </a>
            <a 
              href="https://explorer.xgrain402.xyz" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExplorerClick}
              className={`flex items-center gap-3 text-sm font-light italic text-white no-underline hover:bg-white/10 rounded-2xl p-3 transition-all duration-300 ${isBlinking ? 'blink-animation' : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              {explorerText}
            </a>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex-1 md:ml-80 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 gap-6 sm:gap-8 snap-start pt-32 md:pt-0">
        {/* Animated Hero Section */}
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-center">
          {/* Dock402 Title Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-center mb-4 md:mb-8"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic text-[#FF7B00] drop-shadow-2xl">
          Dock402
        </h1>
          </motion.div>

          {/* Subtitle Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-center mb-8 md:mb-12"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-black/80">
              the appstore for x402
            </p>
          </motion.div>

          {/* Blockchain Networks Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full overflow-hidden relative"
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="relative py-4">
              <motion.div
                animate={{
                  x: [0, -1400],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                className="flex gap-4 md:gap-6 items-center"
              >
                {/* First set of logos */}
                <div className="flex gap-4 md:gap-6 items-center min-w-max">
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/base.jpg" alt="Base" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Base</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/solana.jpg" alt="Solana" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Solana</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/polygon.jpg" alt="Polygon" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Polygon</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/peaq.jpg" alt="Peaq" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Peaq</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/sei.jpg" alt="Sei" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Sei</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/BSC.jpg" alt="BSC" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">BSC</span>
                  </div>
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-6 items-center min-w-max">
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/base.jpg" alt="Base" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Base</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/solana.jpg" alt="Solana" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Solana</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/polygon.jpg" alt="Polygon" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Polygon</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/peaq.jpg" alt="Peaq" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Peaq</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/sei.jpg" alt="Sei" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">Sei</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img src="/logos/BSC.jpg" alt="BSC" className="w-10 h-10 object-contain rounded-lg" />
                    <span className="font-semibold text-[#1E1E1E] text-sm">BSC</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Background Accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ 
              duration: 1.5,
              delay: 0.2,
              ease: "easeOut"
            }}
            className="absolute inset-0 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] rounded-3xl blur-3xl -z-10"
          />
        </div>
      </main>
      
      {/* Copyright Footer */}
      <footer className="fixed bottom-2 right-2 sm:bottom-4 sm:right-6 text-xs sm:text-sm text-gray-600 z-50">
        © 2025 Dock402
      </footer>
    </div>
  );
}
