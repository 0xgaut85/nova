'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DocsPage() {
        return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Welcome to Dock402 Documentation
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        Everything you need to build, integrate, and deploy x402-enabled services on the Dock402 marketplace.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-8 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-xl font-light italic text-black mb-3">What is Dock402?</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          Dock402 is the app store of x402 - a revolutionary marketplace where AI services, APIs, 
          and tools are discovered, tested, and monetized using the HTTP 402 payment protocol. 
          Every API request becomes a micropayment transaction settled instantly on the blockchain.
              </p>
            </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-12">Key Concepts</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <h3 className="text-base font-light italic text-black mb-2">Pay Per Request</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            No subscriptions. Users pay only for what they use with instant blockchain settlements.
          </p>
              </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <h3 className="text-base font-light italic text-black mb-2">Test Before You Pay</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Try services for free with built-in testing interfaces before committing to payments.
          </p>
              </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <h3 className="text-base font-light italic text-black mb-2">Instant Integration</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Generate integration code and start using services in your applications within minutes.
          </p>
              </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <h3 className="text-base font-light italic text-black mb-2">Multi-Chain Support</h3>
          <p className="text-sm text-black/80 leading-relaxed mb-3">
            Works across multiple blockchain networks:
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-lg border border-black/5">
              <img src="/logos/base.jpg" alt="Base" className="w-4 h-4 rounded" />
              <span className="text-xs font-light italic text-black">Base</span>
              </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-lg border border-black/5">
              <img src="/logos/solana.jpg" alt="Solana" className="w-4 h-4 rounded" />
              <span className="text-xs font-light italic text-black">Solana</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-lg border border-black/5">
              <img src="/logos/polygon.jpg" alt="Polygon" className="w-4 h-4 rounded" />
              <span className="text-xs font-light italic text-black">Polygon</span>
          </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-lg border border-black/5">
              <img src="/logos/BSC.jpg" alt="BSC" className="w-4 h-4 rounded" />
              <span className="text-xs font-light italic text-black">BSC</span>
                  </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-lg border border-black/5">
              <img src="/logos/sei.jpg" alt="Sei" className="w-4 h-4 rounded" />
              <span className="text-xs font-light italic text-black">Sei</span>
                </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-lg border border-black/5">
              <img src="/logos/peaq.jpg" alt="Peaq" className="w-4 h-4 rounded" />
              <span className="text-xs font-light italic text-black">Peaq</span>
                    </div>
                  </div>
                </div>
                </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-12">Getting Started</h2>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 items-start bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
                      1
                    </div>
                    <div>
            <h3 className="text-sm font-light italic text-black mb-1">Learn About x402</h3>
            <p className="text-sm text-black/80 leading-relaxed mb-2">
              Understand how the HTTP 402 payment protocol works and why it's revolutionary.
            </p>
            <Link
              href="/docs/x402-protocol"
              className="text-sm font-light italic text-[#FF7B00] hover:text-[#FF9500] transition-colors"
            >
              Read about x402 →
            </Link>
                  </div>
                </div>

        <div className="flex gap-4 items-start bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
                      2
                    </div>
                    <div>
            <h3 className="text-sm font-light italic text-black mb-1">Build Your Service</h3>
            <p className="text-sm text-black/80 leading-relaxed mb-2">
              Create an x402-enabled API using Express.js, Python, or your preferred framework.
            </p>
            <Link
              href="/docs/server-express"
              className="text-sm font-light italic text-[#FF7B00] hover:text-[#FF9500] transition-colors"
            >
              Server guides →
            </Link>
                  </div>
                </div>

        <div className="flex gap-4 items-start bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
                      3
                    </div>
                    <div>
            <h3 className="text-sm font-light italic text-black mb-1">Integrate Payments</h3>
            <p className="text-sm text-black/80 leading-relaxed mb-2">
              Use client libraries to consume x402 services and handle payments automatically.
            </p>
                <Link
              href="/docs/clients"
              className="text-sm font-light italic text-[#FF7B00] hover:text-[#FF9500] transition-colors"
                >
              Client integration →
                </Link>
              </div>
                  </div>
                </div>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-8 text-white not-prose mt-12">
        <h3 className="text-lg font-light italic mb-2">Need Help?</h3>
        <p className="text-sm opacity-90 mb-4">
          Check out the full PayAI documentation for detailed implementation guides and API references.
        </p>
        <a
          href="https://docs.payai.network"
                    target="_blank"
                    rel="noopener noreferrer"
          className="inline-block px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
        >
          Visit PayAI Docs
        </a>
            </div>
          </div>
        );
}
