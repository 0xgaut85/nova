'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { roadmapData } from './roadmap-data';
import RoadmapPhase from './RoadmapPhase';

const NovaHero = dynamic(() => import('../components/NovaHero'), { ssr: false });

export default function RoadmapPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  // Calculate statistics
  const allItems = roadmapData.flatMap(phase => phase.items);
  const stats = {
    total: allItems.length,
    completed: allItems.filter(item => item.status === 'completed').length,
    inProgress: allItems.filter(item => item.status === 'in-progress').length,
    planned: allItems.filter(item => item.status === 'planned').length,
  };

  // Total slides: 1 hero + phases + 1 CTA
  const totalSlides = 1 + roadmapData.length + 1;

  // Handle scroll with debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      // Debounce: only allow scroll every 600ms
      if (now - lastScrollTime.current < 600) return;
      
      lastScrollTime.current = now;
      
      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSlide, totalSlides]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  // Handle touch navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          setCurrentSlide(prev => prev + 1);
        } else if (diff < 0 && currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, totalSlides]);

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden fixed inset-0">
      {/* Global animated background gradient orbs - SAME AS LANDING PAGE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b2a962] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#b2a962] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#b2a962] rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <Image
                src="/logosvg.svg"
                alt="Nova402"
                width={72}
                height={72}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl sm:text-2xl font-normal text-white font-title tracking-wide">Nova402</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light"
              >
                Home
              </Link>
              <Link 
                href="/docs" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light"
              >
                Docs
              </Link>
              <Link 
                href="/dapp" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-light"
              >
                Nova Hub
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide Indicators */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 min-h-[28px] min-w-[28px] flex items-center justify-center ${
              currentSlide === index 
                ? 'bg-[#b2a962] h-8 w-2' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides Container - Full screen per slide */}
      <motion.div
        animate={{ y: `-${currentSlide * 100}vh` }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20,
          mass: 1,
        }}
        className="relative"
        style={{ height: `${totalSlides * 100}vh` }}
      >
        {/* Hero Slide with Three.js Background - IDENTICAL to landing page */}
        <div className="h-screen w-screen relative flex items-center justify-center px-6 sm:px-8">
          {/* Three.js Nova Animation */}
          <div className="absolute inset-0 w-full h-full z-0">
            <NovaHero />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-0" />

          <motion.div
            className="relative z-10 max-w-5xl mx-auto text-center px-4"
          >
            {/* Massive Title with Stagger */}
            <motion.div className="overflow-hidden mb-6">
              <motion.h1 
                className="text-6xl sm:text-7xl lg:text-[120px] font-light text-white leading-none"
                initial={{ y: 200, opacity: 0 }}
                animate={currentSlide === 0 ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Roadmap
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={currentSlide === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Building the future of decentralized micropayments
            </motion.p>

            {/* Stats - Minimal Design */}
            <motion.div 
              className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap"
              initial={{ opacity: 0 }}
              animate={currentSlide === 0 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {[
                { label: 'Total', value: stats.total },
                { label: 'Completed', value: stats.completed, accent: true },
                { label: 'In Progress', value: stats.inProgress },
                { label: 'Planned', value: stats.planned },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={currentSlide === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1.4 + i * 0.1 }}
                >
                  <div className={`text-5xl sm:text-6xl font-light mb-2 ${stat.accent ? 'text-[#b2a962]' : 'text-white'}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-light uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={currentSlide === 0 ? { opacity: 1, y: [0, 10, 0] } : { opacity: 0 }}
              transition={{ 
                opacity: { duration: 1, delay: 2 },
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#b2a962] to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Phase Slides - Each full screen */}
        {roadmapData.map((phase, index) => (
          <div key={phase.id} className="h-screen w-screen relative flex items-center px-6 sm:px-8 py-20">
            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
              <RoadmapPhase 
                phase={phase} 
                index={index} 
                isActive={currentSlide === index + 1}
              />
            </div>
          </div>
        ))}

        {/* CTA Slide - Full screen */}
        <div className="h-screen w-screen relative flex items-center justify-center px-6 sm:px-8">
          <motion.div
            className="relative z-10 max-w-3xl mx-auto text-center px-4"
          >
            {/* Massive CTA Title */}
            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={currentSlide === totalSlides - 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Join the
              <br />
              <span className="text-[#b2a962]">Revolution</span>
            </motion.h2>

            <motion.p 
              className="text-lg sm:text-xl text-gray-400 mb-12 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={currentSlide === totalSlides - 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Building x402 in the open. Contribute, collaborate, create.
            </motion.p>

            {/* CTA Buttons - Minimal */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={currentSlide === totalSlides - 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <a
                href="https://github.com/nova402"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 sm:px-10 py-3 sm:py-4 text-white font-light text-sm sm:text-base overflow-hidden w-full sm:w-auto text-center"
              >
                <span className="relative z-10">GitHub</span>
                <motion.div
                  className="absolute inset-0 bg-[#b2a962]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
                <div className="absolute inset-0 border border-[#b2a962]" />
              </a>

              <Link
                href="/docs"
                className="group relative px-8 sm:px-10 py-3 sm:py-4 text-white font-light text-sm sm:text-base overflow-hidden w-full sm:w-auto text-center"
              >
                <span className="relative z-10">Documentation</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
                <div className="absolute inset-0 border border-white/20" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

