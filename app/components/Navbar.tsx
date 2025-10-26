'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setNavVisible(true);
      } else if (currentScrollY > prevScrollY) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: navVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logosvg.svg" 
              alt="Lumen402" 
              width={72} 
              height={72}
              className="w-[72px] h-[72px] transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-2xl font-normal text-white font-title tracking-wide">Lumen402</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/docs" 
              className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
            >
              Docs
            </Link>
            <Link 
              href="/dapp" 
              className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
            >
              DApp
            </Link>
            <Link 
              href="/roadmap" 
              className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
            >
              Roadmap
            </Link>
            <a 
              href="https://github.com/lumen402" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
            >
              GitHub
            </a>
            <a 
              href="https://x.com/lumen402" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
            >
              Twitter
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-6 border-t border-white/[0.06]"
          >
            <div className="flex flex-col gap-5">
              <Link 
                href="/docs" 
                className="text-gray-400 hover:text-white transition-colors duration-300 py-2 font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link 
                href="/dapp" 
                className="text-gray-400 hover:text-white transition-colors duration-300 py-2 font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                DApp
              </Link>
              <Link 
                href="/roadmap" 
                className="text-gray-400 hover:text-white transition-colors duration-300 py-2 font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Roadmap
              </Link>
              <a 
                href="https://github.com/lumen402" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 py-2 font-light"
              >
                GitHub
              </a>
              <a 
                href="https://x.com/lumen402" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 py-2 font-light"
              >
                Twitter
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
