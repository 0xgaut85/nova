'use client';

import Image from 'next/image';
import ScrollExperience from './components/ScrollExperience';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 500, 600], [1, 1, 0]);
  const navDisplay = useTransform(scrollY, (value) => value > 700 ? 'none' : 'flex');
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleDappClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logo - Absolute positioned */}
      <motion.div 
        className="fixed top-8 left-8 z-50"
        style={{ opacity: navOpacity, display: navDisplay }}
      >
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={80} 
            height={80}
          priority
        />
      </motion.div>
      
      {/* Navigation Links - Absolute positioned */}
      <motion.div 
        className="fixed z-50"
        style={{ 
          top: '32px', 
          right: '200px',
          flexDirection: 'column',
          gap: '80px',
          opacity: navOpacity,
          display: navDisplay
        }}
      >
          <a 
            href="https://x.com/xgrain402" 
            target="_blank"
            rel="noopener noreferrer"
          style={{ 
            fontWeight: 600, 
            fontStyle: 'italic', 
            fontSize: '20px', 
            color: '#000000', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          @xgrain402
        </a>
        
        <a 
          href="/docs" 
          style={{ 
            fontWeight: 600, 
            fontStyle: 'italic', 
            fontSize: '20px', 
            color: '#000000', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          docs
        </a>
        
          <a 
            href="https://github.com/xgrain402" 
            target="_blank"
            rel="noopener noreferrer"
          style={{ 
            fontWeight: 600, 
            fontStyle: 'italic', 
            fontSize: '20px', 
            color: '#000000', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          github
        </a>
        
        <a 
          href="#dapp"
          onClick={handleDappClick}
          style={{ 
            fontWeight: 600, 
            fontStyle: 'italic', 
            fontSize: '20px', 
            color: '#000000', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <img src="/logo.png" alt="dapp" width="26" height="26" style={{ objectFit: 'contain' }} />
          <span className={showComingSoon ? 'blink-animation' : ''} style={{ transition: 'opacity 0.3s ease' }}>
            {showComingSoon ? 'coming soon' : 'dapp'}
          </span>
        </a>
        
        <a 
          href="https://explorer.xgrain402.xyz" 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            fontWeight: 600, 
            fontStyle: 'italic', 
            fontSize: '20px', 
            color: '#000000', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          explorer
        </a>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-8 gap-8 snap-start">
        {/* Title above video */}
        <h1 className="text-5xl lg:text-7xl font-normal italic" style={{ color: '#000000' }}>
          xGrain402
        </h1>
        
        {/* Hero Section with Video Background */}
        <div 
          className="relative overflow-hidden rounded-3xl"
          style={{
            width: '900px',
            height: '600px',
            maxWidth: '90vw'
          }}
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src="/videowheat.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
      
      {/* Immersive Scrolling Experience */}
      <ScrollExperience />
      
      {/* Copyright Footer */}
      <footer className="fixed bottom-4 right-6 text-sm text-gray-600 z-50">
        © 2025 xGrain402
      </footer>
    </div>
  );
}
