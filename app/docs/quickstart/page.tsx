'use client';

import Link from 'next/link';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function QuickStartPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        Quick Start
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Deploy your first x402-enabled service or start consuming paid APIs in under 5 minutes.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Choose Your Path</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          Building a service to monetize? Or consuming existing services? Pick your path and get started. Nova provides the complete infrastructure to make x402 usable at scale.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          Use our Service Hub to discover services, Nova Native Agent for autonomous workflows, or x402 Lending to enable agents with capital access. All utilities work together to create a complete machine economy.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Service Providers</h2>

      <p className="text-base text-gray-400 font-light mb-8">
        Launch an API that accepts x402 micropayments:
      </p>

      <div className="space-y-4 mb-16">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#b2a962] text-black rounded-lg flex items-center justify-center text-sm font-medium">
              1
            </div>
            <h3 className="text-lg font-medium text-white m-0">Select Framework</h3>
          </div>
          <div className="pl-11 space-y-3">
            <Link href="/docs/server-express" className="block text-base text-[#b2a962] hover:text-[#c4b876] transition-colors">
              → Express.js / Node.js
            </Link>
            <Link href="/docs/server-python" className="block text-base text-[#b2a962] hover:text-[#c4b876] transition-colors">
              → Python (FastAPI/Flask)
            </Link>
          </div>
        </div>

        <DocStep 
          number={2}
          title="Install Package"
          description="Add the x402 middleware to your project via npm or pip"
        />

        <DocStep 
          number={3}
          title="Configure Middleware"
          description="Set your payment address and facilitator endpoint in the middleware"
        />

        <DocStep 
          number={4}
          title="Deploy"
          description="Push to production and start accepting micropayments instantly"
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Consumers</h2>

      <p className="text-base text-gray-400 font-light mb-8">
        Start calling x402-protected APIs:
      </p>

      <div className="space-y-4 mb-16">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#b2a962] text-black rounded-lg flex items-center justify-center text-sm font-medium">
              1
            </div>
            <h3 className="text-lg font-medium text-white m-0">Discover Services</h3>
          </div>
          <p className="text-base text-gray-400 font-light pl-11">
            Browse the <Link href="/dapp" className="text-[#b2a962] hover:text-[#c4b876] transition-colors">marketplace</Link> to find AI services, data APIs, and specialized tools
          </p>
        </div>

        <DocStep 
          number={2}
          title="Test Free"
          description="Use built-in testing interfaces to validate service behavior before spending"
        />

        <DocStep 
          number={3}
          title="Connect Wallet"
          description="Link your MetaMask, Phantom, or preferred wallet for transactions"
        />

        <DocStep 
          number={4}
          title="Install Client"
          description="Add the x402 client library to handle payments automatically"
        />

        <DocStep 
          number={5}
          title="Start Transacting"
          description="Make API calls with automatic payment handling - just use standard HTTP methods"
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Quick Example</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15] mb-16">
        <h3 className="text-lg font-medium text-white mb-4">Server (Express.js)</h3>
        <div className="bg-black rounded-lg p-6 font-mono text-sm text-gray-300 border border-white/[0.08] overflow-x-auto mb-6">
          <pre className="whitespace-pre-wrap">
{`import { x402Middleware } from '@payai/x402-server';

app.use('/api/*', x402Middleware({
  payTo: "0x742d35Cc...",
  network: "base"
}));

app.get('/api/data', (req, res) => {
  res.json({ result: "paid data" });
});`}
          </pre>
        </div>

        <h3 className="text-lg font-medium text-white mb-4">Client (Node.js)</h3>
        <div className="bg-black rounded-lg p-6 font-mono text-sm text-gray-300 border border-white/[0.08] overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`import { X402Client } from '@payai/x402-client';

const client = new X402Client({
  signer: wallet,
  network: "base"
});

const data = await client.get('https://api.example.com/api/data');
console.log(data);`}
          </pre>
        </div>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Nova Utilities</h2>

      <p className="text-base text-gray-400 font-light mb-8">
        Enhance your x402 integration with Nova's utilities:
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-lg font-medium text-white mb-3">Service Hub</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Browse and discover x402 services. Test services free, validate integration, and integrate with structured output validation.
          </p>
          <Link href="/docs/service-hub" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Explore Service Hub →
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-lg font-medium text-white mb-3">Integration Layer</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Register your service with comprehensive metadata. Define schemas, pricing, and make your service discoverable.
          </p>
          <Link href="/docs/integration-layer" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Register Service →
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-lg font-medium text-white mb-3">Nova Native Agent</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Use autonomous agents to run workflows. Agents evaluate cost, handle fallbacks, and route through the lending layer.
          </p>
          <Link href="/docs/nova-agent" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Learn About Agent →
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-lg font-medium text-white mb-3">x402 Lending</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Enable agents to access paid services autonomously. Stake $NOVA to participate and earn rewards from agent activity.
          </p>
          <Link href="/docs/x402-lending" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            About Lending →
          </Link>
        </div>
      </div>

      <CTABox 
        title="Dive Deeper"
        description="Explore comprehensive guides, API references, and integration examples for production deployments."
        buttonText="Full Documentation"
        buttonHref="/docs/server-express"
      />
    </div>
  );
}
