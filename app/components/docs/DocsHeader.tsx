'use client';

import Link from 'next/link';
import Image from 'next/image';

interface DocsHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DocsHeader({ sidebarOpen, setSidebarOpen }: DocsHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/[0.06]">
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/logosvg.svg" 
            alt="Nova402" 
            width={40} 
            height={40}
            className="transition-transform group-hover:scale-105"
          />
          <div>
            <h1 className="text-xl font-normal font-title text-white tracking-wide">Nova402</h1>
            <p className="text-xs font-light text-gray-500">Documentation</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-3 text-white hover:bg-white/5 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
          
          <Link 
            href="/"
            className="px-4 py-2 text-sm font-light text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all min-h-[44px] flex items-center"
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
