'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const BubbleBackground = dynamic(() => import('./BubbleBackground'), { ssr: false });

export default function Hero() {
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const titleY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <motion.section 
      style={{ y: heroY }}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-32 overflow-hidden"
    >
      {/* Three.js Bubble Background */}
      <div className="absolute inset-0 w-full h-full">
        <BubbleBackground />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12">
        <div className="space-y-16">
          {/* Hero Title - Split Layout */}
          <motion.div
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Left: Lumen */}
            <div className="text-left -ml-2 sm:-ml-4 lg:-ml-8">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-normal font-title leading-none tracking-wide text-white">
                Lumen
              </h1>
            </div>
            
            {/* Right: Description */}
            <div className="text-left lg:text-right">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-400 font-light leading-relaxed">
                Unlocking the next economy of APIs, AI and digital services through x402 pay-per-request rails
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/dapp"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-10 sm:py-4 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-normal rounded-lg transition-all duration-300 min-h-[44px] w-full sm:w-auto"
            >
              <span>Launch App</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="/docs"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-10 sm:py-4 bg-transparent hover:bg-white/[0.04] border border-white/[0.12] text-white font-normal rounded-lg transition-all duration-300 min-h-[44px] w-full sm:w-auto"
            >
              <span>Documentation</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Stats Grid - ROBA Style with + corners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative grid grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto mt-32"
          >
            {/* Corner + markers - each stat item gets all 4 corners */}
            <style jsx>{`
              .stats-grid-item {
                position: relative;
              }
              /* Top-left corner */
              .stats-grid-item::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
              }
              /* Top-right corner */
              .stats-grid-item::after {
                content: '';
                position: absolute;
                top: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
              }
              /* Bottom-left corner */
              .corner-bottom-left {
                position: absolute;
                bottom: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
              }
              /* Bottom-right corner */
              .corner-bottom-right {
                position: absolute;
                bottom: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
              }
            `}</style>

            <div className="stats-grid-item bg-black/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center border border-white/[0.15]">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 sm:mb-6">6+</div>
              <div className="text-xs sm:text-sm text-gray-400 font-light">Blockchains</div>
            </div>
            <div className="stats-grid-item bg-black/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center border border-white/[0.15]">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 sm:mb-6">&lt;1s</div>
              <div className="text-xs sm:text-sm text-gray-400 font-light">Settlement Time</div>
            </div>
            <div className="stats-grid-item bg-black/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center border border-white/[0.15]">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 sm:mb-6">100+</div>
              <div className="text-xs sm:text-sm text-gray-400 font-light">Active Services</div>
            </div>
            <div className="stats-grid-item bg-black/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center border border-white/[0.15]">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 sm:mb-6">100%</div>
              <div className="text-xs sm:text-sm text-gray-400 font-light">On-Chain</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
