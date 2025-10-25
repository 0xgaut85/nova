'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const docSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs' },
      { label: 'What is x402?', href: '/docs/x402-protocol' },
      { label: 'Quick Start', href: '/docs/quickstart' },
    ]
  },
  {
    title: 'Building Services',
    items: [
      { label: 'Express.js Server', href: '/docs/server-express' },
      { label: 'Python Server', href: '/docs/server-python' },
      { label: 'Echo Merchant', href: '/docs/echo-merchant' },
    ]
  },
  {
    title: 'Client Integration',
    items: [
      { label: 'Client Libraries', href: '/docs/clients' },
      { label: 'Payment Flow', href: '/docs/payment-flow' },
      { label: 'Code Examples', href: '/docs/examples' },
    ]
  },
  {
    title: 'Advanced',
    items: [
      { label: 'Facilitators', href: '/docs/facilitators' },
      { label: 'API Reference', href: '/docs/api-reference' },
      { label: 'Deployment', href: '/docs/deployment' },
    ]
  }
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/5">
        <div className="px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.png" 
              alt="Dock402" 
              width={32} 
              height={32}
              className="transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="text-base font-light italic text-[#1E1E1E]">Dock402</h1>
              <p className="text-xs font-light italic text-[#1E1E1E]/50">Documentation</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-[#1E1E1E] hover:bg-black/5 rounded-xl transition-all"
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
              className="px-4 py-2 text-sm font-light italic text-[#1E1E1E]/60 hover:text-[#1E1E1E] hover:bg-black/5 rounded-xl transition-all"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <div className="flex pt-[73px]">
        {/* Sidebar - Responsive with mobile drawer */}
        <aside className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] w-56 overflow-y-auto border-r border-black/5 bg-white z-40 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-4 space-y-6">
            {docSections.map((section, idx) => (
              <div key={section.title}>
                <h3 className="text-xs font-light italic text-black uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-3 py-1.5 text-sm font-light italic rounded-lg transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-[#FF7B00] to-[#FF9500] text-white shadow-lg shadow-[#FF7B00]/20'
                              : 'text-black hover:text-[#FF7B00] hover:bg-black/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* External Links */}
            <div className="pt-4 border-t border-black/5">
              <h3 className="text-xs font-light italic text-black uppercase tracking-wider mb-2">
                Resources
              </h3>
              <ul className="space-y-0.5">
                <li>
                  <a
                    href="https://docs.payai.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-1.5 text-sm font-light italic text-black hover:text-[#FF7B00] hover:bg-black/5 rounded-lg transition-all"
                  >
                    PayAI Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/dock402"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-1.5 text-sm font-light italic text-black hover:text-[#FF7B00] hover:bg-black/5 rounded-lg transition-all"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Much Wider */}
        <main className="lg:ml-56 flex-1 min-h-[calc(100vh-73px)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}


