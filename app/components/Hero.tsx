'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const NovaHero = dynamic(() => import('./NovaHero'), { ssr: false });

export default function Hero() {
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const titleY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <motion.section 
      style={{ y: heroY }}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-32 mb-16 md:mb-24 lg:mb-32"
    >
      {/* Three.js Animation Background */}
      <div className="absolute inset-0 z-0 overflow-hidden min-h-[500px]">
        <NovaHero />
      </div>

      {/* Dark gradient overlay for text contrast */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-[2]" />

      <div className="relative z-10 w-full h-full flex items-center">
        {/* Asymmetric Diagonal Layout Container */}
        <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          {/* Left Side: Description + CTA Buttons */}
          <div className="flex-1 max-w-3xl">
            {/* Description - Flows diagonally */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-12 lg:mb-16"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400 font-light leading-relaxed">
                x402 protocol infrastructure. Every API call becomes an instant micropayment—pay-per-request with no subscriptions.
              </p>
            </motion.div>

            {/* CTA Buttons - Bottom Left Vertical Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4 max-w-sm"
            >
              <Link 
                href="/dapp"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-normal rounded-lg transition-all duration-300"
              >
                <span>Launch App</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/docs"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-white/[0.04] border border-white/[0.12] text-white font-normal rounded-lg transition-all duration-300"
              >
                <span>Documentation</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid - Vertical Sidebar slightly left - Only visible in hero viewport */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hidden xl:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col w-32 z-50"
        >
          {/* Corner + markers - each stat item gets all 4 corners */}
          <style jsx>{`
            .stats-sidebar-item {
              position: relative;
            }
            /* Top-left corner */
            .stats-sidebar-item::before {
              content: '';
              position: absolute;
              top: -1px;
              left: -1px;
              width: 10px;
              height: 10px;
              border-top: 1px solid rgba(255, 255, 255, 0.25);
              border-left: 1px solid rgba(255, 255, 255, 0.25);
            }
            /* Top-right corner */
            .stats-sidebar-item::after {
              content: '';
              position: absolute;
              top: -1px;
              right: -1px;
              width: 10px;
              height: 10px;
              border-top: 1px solid rgba(255, 255, 255, 0.25);
              border-right: 1px solid rgba(255, 255, 255, 0.25);
            }
            /* Bottom-left corner */
            .corner-bottom-left-stat {
              position: absolute;
              bottom: -1px;
              left: -1px;
              width: 10px;
              height: 10px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.25);
              border-left: 1px solid rgba(255, 255, 255, 0.25);
              pointer-events: none;
            }
            /* Bottom-right corner */
            .corner-bottom-right-stat {
              position: absolute;
              bottom: -1px;
              right: -1px;
              width: 10px;
              height: 10px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.25);
              border-right: 1px solid rgba(255, 255, 255, 0.25);
              pointer-events: none;
            }
          `}</style>

          <div className="stats-sidebar-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
            <div className="corner-bottom-left-stat" />
            <div className="corner-bottom-right-stat" />
            <div className="text-3xl font-normal mb-2">x402</div>
            <div className="text-xs text-gray-400 font-light">Protocol</div>
          </div>
          <div className="stats-sidebar-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
            <div className="corner-bottom-left-stat" />
            <div className="corner-bottom-right-stat" />
            <div className="text-3xl font-normal mb-2">Base + SOL</div>
            <div className="text-xs text-gray-400 font-light">Networks</div>
          </div>
          <div className="stats-sidebar-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
            <div className="corner-bottom-left-stat" />
            <div className="corner-bottom-right-stat" />
            <div className="text-3xl font-normal mb-2">5 Tools</div>
            <div className="text-xs text-gray-400 font-light">Utilities</div>
          </div>
          <div className="stats-sidebar-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
            <div className="corner-bottom-left-stat" />
            <div className="corner-bottom-right-stat" />
            <div className="text-3xl font-normal mb-2">Live</div>
            <div className="text-xs text-gray-400 font-light">Beta</div>
          </div>
        </motion.div>

        {/* Mobile Stats Grid - Horizontal for small screens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="xl:hidden w-full px-6 mt-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-white/[0.08] max-w-4xl mx-auto">
            <style jsx>{`
              .stats-mobile-item {
                position: relative;
              }
              .stats-mobile-item::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                width: 10px;
                height: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
              }
              .stats-mobile-item::after {
                content: '';
                position: absolute;
                top: -1px;
                right: -1px;
                width: 10px;
                height: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
              }
            `}</style>
            <div className="stats-mobile-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
              <div className="corner-bottom-left-stat" />
              <div className="corner-bottom-right-stat" />
              <div className="text-3xl font-normal mb-2">x402</div>
              <div className="text-xs text-gray-400 font-light">Protocol</div>
            </div>
            <div className="stats-mobile-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
              <div className="corner-bottom-left-stat" />
              <div className="corner-bottom-right-stat" />
              <div className="text-3xl font-normal mb-2">2 Chains</div>
              <div className="text-xs text-gray-400 font-light">Live</div>
            </div>
            <div className="stats-mobile-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
              <div className="corner-bottom-left-stat" />
              <div className="corner-bottom-right-stat" />
              <div className="text-3xl font-normal mb-2">5 Tools</div>
              <div className="text-xs text-gray-400 font-light">Utilities</div>
            </div>
            <div className="stats-mobile-item bg-black/80 backdrop-blur-sm p-6 text-center border border-white/[0.15]">
              <div className="corner-bottom-left-stat" />
              <div className="corner-bottom-right-stat" />
              <div className="text-3xl font-normal mb-2">Beta</div>
              <div className="text-xs text-gray-400 font-light">Status</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
