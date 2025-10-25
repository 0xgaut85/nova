'use client';

import Link from 'next/link';

export default function X402ProtocolPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        What is x402?
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        x402 (HTTP 402) is a payment protocol that enables micropayments for HTTP requests. 
        It brings native payments to APIs, allowing services to charge per request with instant, 
        blockchain-based settlements.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">The Vision</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          HTTP 402 "Payment Required" has existed since HTTP/1.1 but was never implemented. 
          x402 brings this vision to life using blockchain technology for instant, trustless micropayments.
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">How x402 Works</h2>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              1
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Client Makes Request</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            A client sends an HTTP request to an x402-protected endpoint
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              2
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Server Returns 402</h3>
          </div>
          <p className="text-sm text-black/80 mb-3 pl-10">
            Server responds with HTTP 402 and payment instructions:
          </p>
          <div className="bg-[#1E1E1E] rounded-lg p-4 ml-10 font-mono text-xs text-white/90 overflow-x-auto">
            <pre className="m-0 whitespace-pre-wrap break-all">
{`HTTP/1.1 402 Payment Required
X-Accept-Payment: pay.sol 0.001 SOL
X-Payment-Address: 7xKXtg2CW...`}
            </pre>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              3
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Client Pays</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Client creates and signs a blockchain transaction to the payment address
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              4
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Retry with Proof</h3>
          </div>
          <p className="text-sm text-black/80 mb-3 pl-10">
            Client retries the request with transaction signature:
          </p>
          <div className="bg-[#1E1E1E] rounded-lg p-4 ml-10 font-mono text-xs text-white/90 overflow-x-auto">
            <pre className="m-0 whitespace-pre-wrap break-all">
{`GET /api/service HTTP/1.1
X-Payment-Proof: 5KJp9c3...signature...
X-Payment-Network: solana`}
            </pre>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              5
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Server Validates & Responds</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Server verifies the payment on-chain and returns the requested resource
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Key Benefits</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Micropayments</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Charge as little as $0.0001 per request. Traditional payment processors can't handle this.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Instant Settlement</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Payments settle in seconds on-chain. No waiting days for payment processors.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Global by Default</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Anyone with a crypto wallet can pay. No credit cards, no regional restrictions.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">No Chargebacks</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Blockchain transactions are final. No fraud risk or payment disputes.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Machine-to-Machine</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Perfect for AI agents that need to autonomously pay for services.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Usage-Based Pricing</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Users pay only for what they use. No subscriptions to manage.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Supported Networks</h2>

      <p className="text-sm text-black/80 mb-4">
        x402 works across multiple blockchain networks, each optimized for different use cases:
      </p>

      <div className="grid md:grid-cols-3 gap-3 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logos/base.jpg" alt="Base" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h4 className="text-sm font-light italic text-black">Base</h4>
              <p className="text-xs text-black/50">L2 Ethereum</p>
            </div>
          </div>
          <p className="text-xs text-black/80">Low fees, fast, EVM-compatible</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logos/solana.jpg" alt="Solana" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h4 className="text-sm font-light italic text-black">Solana</h4>
              <p className="text-xs text-black/50">High Performance</p>
            </div>
          </div>
          <p className="text-xs text-black/80">Ultra-fast, sub-cent fees</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logos/polygon.jpg" alt="Polygon" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h4 className="text-sm font-light italic text-black">Polygon</h4>
              <p className="text-xs text-black/50">L2 Scaling</p>
            </div>
          </div>
          <p className="text-xs text-black/80">Ethereum-compatible</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logos/BSC.jpg" alt="BSC" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h4 className="text-sm font-light italic text-black">BSC</h4>
              <p className="text-xs text-black/50">Binance Chain</p>
            </div>
          </div>
          <p className="text-xs text-black/80">Fast blocks, low cost</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logos/sei.jpg" alt="Sei" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h4 className="text-sm font-light italic text-black">Sei</h4>
              <p className="text-xs text-black/50">Optimized L1</p>
            </div>
          </div>
          <p className="text-xs text-black/80">Built for speed</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-black/5 hover:border-[#FF7B00]/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logos/peaq.jpg" alt="Peaq" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h4 className="text-sm font-light italic text-black">Peaq</h4>
              <p className="text-xs text-black/50">DePIN Network</p>
            </div>
          </div>
          <p className="text-xs text-black/80">IoT & Machine Economy</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose mt-8">
        <h3 className="text-lg font-light italic mb-2">Start Building with x402</h3>
        <p className="text-sm opacity-90 mb-4">
          Ready to integrate x402 payments into your service?
        </p>
        <div className="flex gap-3">
          <Link
            href="/docs/server-express"
            className="px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
          >
            Express.js Server
          </Link>
          <Link
            href="/docs/server-python"
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-light italic hover:bg-white/20 transition-all"
          >
            Python Server
          </Link>
        </div>
      </div>
    </div>
  );
}
