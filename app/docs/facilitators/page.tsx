'use client';

import Link from 'next/link';

export default function FacilitatorsPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Facilitators
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        Facilitators are services that verify blockchain transactions for x402 payments, enabling servers to validate payments without running full blockchain nodes.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">What is a Facilitator?</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          A facilitator provides a simple REST API that x402 servers can call to verify if a payment transaction is valid. 
          This allows API servers to accept crypto payments without complex blockchain infrastructure.
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">How Facilitators Work</h2>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              1
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Server Receives Payment Proof</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Client sends transaction hash as payment proof in request headers
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              2
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Query Facilitator</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Server calls facilitator API to verify the transaction
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              3
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Facilitator Verifies On-Chain</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Facilitator queries blockchain to validate transaction details
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              4
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Return Verification Result</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Facilitator returns verification status to server
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Facilitator API</h2>

      <p className="text-sm text-black/80 mb-4">
        The official PayAI facilitator provides a simple REST API:
      </p>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-4">
        <h3 className="text-sm font-light italic text-black mb-3">Verify Transaction</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-green-500/10 text-green-600 rounded text-xs font-light italic">POST</span>
          <code className="text-xs font-mono text-black">https://facilitator.payai.network/verify</code>
        </div>
        <p className="text-xs text-black/80 mb-3">Request Body:</p>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose mb-3 overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`{
  "txHash": "0x5f2d8a...",
  "network": "base",
  "expectedAmount": "1000000", // in atomic units
  "expectedRecipient": "0x742d35Cc...",
  "tokenAddress": "0x833589fCD6..." // USDC on Base
}`}
          </pre>
        </div>
        <p className="text-xs text-black/80 mb-3">Response:</p>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`{
  "valid": true,
  "confirmed": true,
  "amount": "1000000",
  "recipient": "0x742d35Cc...",
  "timestamp": 1704067200,
  "blockNumber": 12345678
}`}
          </pre>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Using Facilitators</h2>

      <p className="text-sm text-black/80 mb-4">
        x402 middleware automatically uses facilitators. You just need to provide the URL:
      </p>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 overflow-x-auto not-prose">
        <pre className="whitespace-pre-wrap">
{`// Express.js
app.use(
  paymentMiddleware(
    "0xYourAddress",
    {
      "GET /api": { price: "$0.001", network: "base" }
    },
    {
      url: "https://facilitator.payai.network" // Facilitator URL
    }
  )
);`}
        </pre>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Official Facilitator</h2>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-8">
        <h3 className="text-sm font-light italic text-black mb-3">PayAI Facilitator</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-black/5">
            <span className="text-xs font-light italic text-black/80">URL</span>
            <code className="text-xs font-mono text-black">https://facilitator.payai.network</code>
          </div>
          <div className="flex justify-between py-2 border-b border-black/5">
            <span className="text-xs font-light italic text-black/80">Supported Networks</span>
            <div className="flex items-center gap-2">
              <img src="/logos/base.jpg" alt="Base" className="w-5 h-5 rounded" title="Base" />
              <img src="/logos/solana.jpg" alt="Solana" className="w-5 h-5 rounded" title="Solana" />
              <img src="/logos/polygon.jpg" alt="Polygon" className="w-5 h-5 rounded" title="Polygon" />
              <img src="/logos/peaq.jpg" alt="Peaq" className="w-5 h-5 rounded" title="Peaq" />
              <img src="/logos/sei.jpg" alt="Sei" className="w-5 h-5 rounded" title="Sei" />
              <img src="/logos/BSC.jpg" alt="BSC" className="w-5 h-5 rounded" title="BSC" />
            </div>
          </div>
          <div className="flex justify-between py-2 border-b border-black/5">
            <span className="text-xs font-light italic text-black/80">Rate Limit</span>
            <span className="text-xs text-black">1000 req/min</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-xs font-light italic text-black/80">Status</span>
            <span className="text-xs text-green-600 font-light italic">Live</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Running Your Own Facilitator</h2>

      <p className="text-sm text-black/80 mb-4">
        You can run your own facilitator for more control and privacy:
      </p>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">1. Clone Repository</h3>
          <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90 not-prose">
            <code>git clone https://github.com/payai-network/x402-facilitator</code>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">2. Configure Networks</h3>
          <p className="text-xs text-black/80 mb-2">Set RPC URLs for networks you want to support:</p>
          <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90 not-prose overflow-x-auto">
            <pre className="whitespace-pre-wrap">
{`BASE_RPC_URL=https://mainnet.base.org
POLYGON_RPC_URL=https://polygon-rpc.com
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com`}
            </pre>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">3. Deploy</h3>
          <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90 not-prose">
            <code>npm run build && npm start</code>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Facilitator Requirements</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Reliability</h3>
          <p className="text-sm text-black/80">
            High uptime required as services depend on facilitators for payment verification
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Performance</h3>
          <p className="text-sm text-black/80">
            Fast RPC connections and caching to minimize verification latency
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Security</h3>
          <p className="text-sm text-black/80">
            Accurate transaction verification to prevent payment fraud
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Multi-Chain</h3>
          <p className="text-sm text-black/80">
            Support for multiple blockchain networks increases reach
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose">
        <h3 className="text-lg font-light italic mb-2">Learn More</h3>
        <p className="text-sm opacity-90 mb-4">
          Check out the full API reference and deployment guides.
        </p>
        <div className="flex gap-3">
          <Link
            href="/docs/api-reference"
            className="px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
          >
            API Reference
          </Link>
          <Link
            href="/docs/deployment"
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-light italic hover:bg-white/20 transition-all"
          >
            Deployment
          </Link>
        </div>
      </div>
    </div>
  );
}

