'use client';

import Link from 'next/link';

export default function IntroductionPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Introduction to Dock402
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        Dock402 is the app store of x402 - a revolutionary marketplace where AI services, APIs, 
        and tools are discovered, tested, and monetized using the HTTP 402 payment protocol.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">The Vision</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          Imagine an app store where every service charges per request, payments settle in seconds, 
          and there are no subscription fees. That's Dock402 - enabling true micropayments for APIs 
          through blockchain technology.
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">What Makes Dock402 Different?</h2>

      <div className="space-y-4 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-base font-light italic text-black mb-2">Service Discovery</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Browse and discover AI services, APIs, and tools from developers around the world. 
            All services are x402-enabled for instant payment integration.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-base font-light italic text-black mb-2">Test Before You Pay</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Every service includes a built-in testing interface. Try APIs for free before making 
            any payment commitment.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-base font-light italic text-black mb-2">Pay Per Request</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            No subscriptions, no monthly fees. Pay only for the API calls you make, with payments 
            as low as $0.0001 per request.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-base font-light italic text-black mb-2">Instant Integration</h3>
          <p className="text-sm text-black/80 leading-relaxed">
            Generate integration code instantly. Copy and paste into your application to start 
            using services within minutes.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">How It Works</h2>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            1
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Browse the Marketplace</h3>
            <p className="text-sm text-black/80 leading-relaxed m-0">
              Explore categories like AI services, data APIs, image processing, and more.
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            2
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Test Services</h3>
            <p className="text-sm text-black/80 leading-relaxed m-0">
              Use the testing interface to try services without any payment.
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            3
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-black/80 leading-relaxed m-0">
              Connect MetaMask, Phantom, or any supported wallet to enable payments.
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            4
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Integrate & Use</h3>
            <p className="text-sm text-black/80 leading-relaxed m-0">
              Generate code, integrate into your app, and start making paid requests.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">For Service Providers</h2>

      <p className="text-sm text-black/80 leading-relaxed mb-4">
        Dock402 makes it incredibly easy to monetize your APIs and AI services:
      </p>

      <ul className="space-y-2 text-sm text-black/80 mb-8">
        <li>
          <strong className="text-black">No Payment Infrastructure:</strong> Let x402 handle all payment processing and settlements
        </li>
        <li>
          <strong className="text-black">Instant Settlements:</strong> Receive payments immediately on-chain, no waiting for payment processors
        </li>
        <li>
          <strong className="text-black">Global Reach:</strong> List your service once, make it accessible to anyone with a wallet
        </li>
        <li>
          <strong className="text-black">Usage-Based Pricing:</strong> Charge per request with no subscription management overhead
        </li>
      </ul>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose">
        <h3 className="text-lg font-light italic mb-2">Ready to Get Started?</h3>
        <p className="text-sm opacity-90 mb-4">
          Learn about the x402 protocol and start building your first service.
        </p>
        <div className="flex gap-3">
          <Link
            href="/docs/x402-protocol"
            className="px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
          >
            Learn x402
          </Link>
          <Link
            href="/docs/server-express"
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-light italic hover:bg-white/20 transition-all"
          >
            Build a Service
          </Link>
        </div>
      </div>
    </div>
  );
}
