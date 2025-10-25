'use client';

import Link from 'next/link';

export default function QuickStartPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Quick Start Guide
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        Get started with x402 in 5 minutes. This guide will walk you through creating your first x402-enabled service and making your first payment.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">Choose Your Path</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          Are you building a service to accept payments, or consuming existing x402 services?
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">For Service Providers</h2>

      <p className="text-sm text-black/80 mb-4">
        Create an API that accepts x402 payments in minutes:
      </p>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              1
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Choose Your Stack</h3>
          </div>
          <div className="pl-10 space-y-2">
            <Link href="/docs/server-express" className="block text-sm text-[#FF7B00] hover:text-[#FF9500]">
              → Express.js / Node.js
            </Link>
            <Link href="/docs/server-python" className="block text-sm text-[#FF7B00] hover:text-[#FF9500]">
              → Python (FastAPI/Flask)
            </Link>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              2
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Install SDK</h3>
          </div>
          <div className="pl-10">
            <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90 not-prose mb-2">
              <code>npm install x402-express</code>
            </div>
            <p className="text-xs text-black/80 m-0">or for Python:</p>
            <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90 not-prose mt-2">
              <code>pip install x402-python</code>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              3
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Add Payment Middleware</h3>
          </div>
          <div className="pl-10">
            <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`app.use(paymentMiddleware(
  "0xYourWalletAddress",
  {
    "GET /api": {
      price: "$0.001",
      network: "base"
    }
  }
));`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              4
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Deploy & Register</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Deploy your service and register it on Dock402 marketplace
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">For Service Consumers</h2>

      <p className="text-sm text-black/80 mb-4">
        Start using x402 services in your application:
      </p>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              1
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Browse Marketplace</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Visit <Link href="/dapp" className="text-[#FF7B00] hover:text-[#FF9500]">Dock402 marketplace</Link> to discover services
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              2
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Test for Free</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Use built-in testing interface to try services before paying
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              3
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Install Client Library</h3>
          </div>
          <div className="pl-10">
            <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90 not-prose">
              <code>npm install x402-client</code>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              4
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Make Paid Requests</h3>
          </div>
          <div className="pl-10">
            <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`const client = new X402Client(wallet);
const data = await client.get(
  "https://api.example.com/data"
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Prerequisites</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">For Developers</h3>
          <ul className="text-sm text-black/80 space-y-1">
            <li>• Node.js 18+ or Python 3.9+</li>
            <li>• Basic web development knowledge</li>
            <li>• A crypto wallet address</li>
          </ul>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">For Users</h3>
          <ul className="text-sm text-black/80 space-y-1">
            <li>• MetaMask or compatible wallet</li>
            <li>• Small amount of crypto for payments</li>
            <li>• Basic understanding of blockchain</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose">
        <h3 className="text-lg font-light italic mb-2">Need Help?</h3>
        <p className="text-sm opacity-90 mb-4">
          Join our community or check the detailed guides for your specific use case.
        </p>
        <div className="flex gap-3">
          <a
            href="https://x.com/dock402"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
          >
            Follow on X
          </a>
          <a
            href="https://github.com/dock402"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-light italic hover:bg-white/20 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}


