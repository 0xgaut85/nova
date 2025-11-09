'use client';

import Link from 'next/link';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function X402ProtocolPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        x402 Protocol
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        The HTTP 402 payment protocol reimagined for the blockchain era. Native micropayments for every HTTP request.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Protocol Vision</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          HTTP 402 "Payment Required" was defined in HTTP/1.1 but never implemented. x402 brings this vision to reality using blockchain technology, enabling instant trustless micropayments at internet scale.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Request Flow</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Client Request"
          description="Client sends HTTP request to an x402-protected API endpoint"
        />

        <DocStep 
          number={2}
          title="402 Response"
          description="Server returns HTTP 402 with payment instructions: amount, address, and accepted tokens"
        />

        <DocStep 
          number={3}
          title="Payment Execution"
          description="Client creates and signs blockchain transaction to specified payment address"
        />

        <DocStep 
          number={4}
          title="Proof Submission"
          description="Client retries request with transaction signature as payment proof in headers"
        />

        <DocStep 
          number={5}
          title="Validation & Response"
          description="Server verifies payment on-chain and returns requested resource if valid"
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Core Advantages</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 border border-white/[0.12]">
          <h3 className="text-lg font-medium text-white mb-3">True Micropayments</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed">
            Charge $0.0001 per request. Traditional payment rails collapse at this scale.
          </p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 border border-white/[0.12]">
          <h3 className="text-lg font-medium text-white mb-3">Sub-Second Settlement</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed">
            Payments finalize on-chain in under a second. No multi-day clearing windows.
          </p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 border border-white/[0.12]">
          <h3 className="text-lg font-medium text-white mb-3">Borderless Commerce</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed">
            Anyone with a wallet can transact. No geographic restrictions or card networks.
          </p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 border border-white/[0.12]">
          <h3 className="text-lg font-medium text-white mb-3">Machine Economy Ready</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed">
            Perfect for AI agents and autonomous systems. With x402 Lending, agents can borrow capital, execute workflows, and repay automatically—enabling true economic autonomy.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Nova's x402 Infrastructure</h2>

      <p className="text-lg text-gray-400 font-light leading-relaxed mb-12">
        Nova provides the execution and economic layer for x402, making the protocol usable at scale. Our suite of utilities transforms x402 from a payment protocol into a complete machine economy.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-xl font-medium text-white mb-4">Service Hub</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Discover and consume x402 services with deterministic execution. Every service defines pricing, accepted currency, and validation rules in x402 format. Services can reference other services internally through dependency resolution.
          </p>
          <Link href="/docs/service-hub" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Learn more →
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-xl font-medium text-white mb-4">Nova Native Agent</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Autonomous agent that runs workflows, not just calls services. Evaluates cost, success rate, and latency before selecting providers. Routes work through the lending layer, generating economic activity.
          </p>
          <Link href="/docs/nova-agent" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Learn more →
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-xl font-medium text-white mb-4">x402 Lending Layer</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Enable AI agents to autonomously access paid services. Agents borrow working capital through x402, execute workflows, and repay automatically. Stake $NOVA to participate and earn rewards from agent activity.
          </p>
          <Link href="/docs/x402-lending" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Learn more →
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/[0.15]">
          <h3 className="text-xl font-medium text-white mb-4">Integration Layer</h3>
          <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
            Register and manage your x402 services. Define service schemas, pricing models, validation rules, and dependencies. Makes services plug-and-play across the x402 economy.
          </p>
          <Link href="/docs/integration-layer" className="text-[#b2a962] hover:text-[#c4b876] text-sm font-light transition-colors">
            Learn more →
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">x402 in Practice</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          With Nova's infrastructure, x402 goes beyond simple request-payment flows:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Composable Services:</strong> Services can call other x402 services internally, with payments flowing automatically</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Agent Autonomy:</strong> AI agents operate independently with access to capital through the lending layer</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Economic Participation:</strong> $NOVA stakers earn rewards from all x402 activity flowing through the network</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Deterministic Execution:</strong> Structured output validation ensures reliable, predictable service responses</span>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Multi-Chain Support</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {[
          { name: 'Base', logo: '/logos/base.jpg', desc: 'L2 Ethereum • Low fees' },
          { name: 'Solana', logo: '/logos/solana.jpg', desc: 'High performance • Sub-cent fees' },
          { name: 'Polygon', logo: '/logos/polygon.jpg', desc: 'EVM compatible • Fast' },
          { name: 'BSC', logo: '/logos/BSC.jpg', desc: 'Binance chain • Low cost' },
          { name: 'Sei', logo: '/logos/sei.jpg', desc: 'Optimized L1 • Speed' },
          { name: 'Peaq', logo: '/logos/peaq.jpg', desc: 'DePIN network • IoT' }
        ].map((chain) => (
          <div key={chain.name} className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-white/[0.15] hover:border-[#b2a962]/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <img src={chain.logo} alt={chain.name} className="w-10 h-10 rounded-lg object-cover" />
              <h4 className="text-base font-medium text-white">{chain.name}</h4>
            </div>
            <p className="text-sm text-gray-400 font-light">{chain.desc}</p>
          </div>
        ))}
      </div>

      <CTABox 
        title="Start Building"
        description="Ready to integrate x402 payments? Choose your stack and start building in minutes."
        buttonText="View Guides"
        buttonHref="/docs/server-express"
      />
    </div>
  );
}
