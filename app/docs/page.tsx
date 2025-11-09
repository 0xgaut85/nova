'use client';

import ConceptCard from '../components/docs/ConceptCard';
import StepCard from '../components/docs/StepCard';
import BlockchainBadge from '../components/docs/BlockchainBadge';
import CTABox from '../components/docs/CTABox';
import { motion } from 'framer-motion';

const blockchains = [
  { name: 'Base', logo: '/logos/base.jpg' },
  { name: 'Solana', logo: '/logos/solana.jpg' },
  { name: 'Polygon', logo: '/logos/polygon.jpg' },
  { name: 'BSC', logo: '/logos/BSC.jpg' },
  { name: 'Sei', logo: '/logos/sei.jpg' },
  { name: 'Peaq', logo: '/logos/peaq.jpg' },
];

export default function DocsPage() {
  return (
    <div className="max-w-none">
      {/* Hero Section with Pillars Background */}
      <div className="relative -mx-6 mb-20 overflow-hidden">
        {/* Pillars background image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-15 pointer-events-none"
          style={{
            backgroundImage: `url('/pillars.png')`,
            backgroundSize: '120%',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 px-6 py-16"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-normal font-title text-white mb-8 tracking-wide leading-none">
            Documentation
          </h1>

          <p className="text-2xl text-gray-400 font-light leading-relaxed mb-0 max-w-3xl">
            Build and deploy pay-per-request services. Integrate micropayments. Create the next generation of digital commerce. We're not predicting the agent economy—we're enabling it.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-black/80 backdrop-blur-sm rounded-lg p-12 border border-white/[0.15] mb-24"
      >
        <h2 className="text-3xl font-medium text-white mb-5 tracking-wide">What is Nova402?</h2>
        <p className="text-lg text-gray-400 font-light leading-relaxed mb-4">
          Nova402 is building x402 protocol infrastructure for the emerging API economy and beyond. 
          Every API call becomes a micropayment transaction, enabling true usage-based pricing with instant on-chain settlement.
        </p>
        <p className="text-lg text-gray-400 font-light leading-relaxed">
          Nova exists for one purpose: make x402 usable. We're building the infrastructure that enables the agent economy. With Service Hub, Nova Native Agent, x402 Lending, and our suite of utilities, we're creating the execution and economic layer where agents operate, transact, and drive an economy.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-4xl font-medium text-white mb-12 tracking-wide">Core Principles</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <ConceptCard 
            title="Usage-Based Pricing"
            description="Pay exactly for what you consume. No monthly fees, no commitments. Just pure value exchange per request."
          />

          <ConceptCard 
            title="Frictionless Testing"
            description="Explore and test any service before spending a single token. Validate integration before commitment."
          />

          <ConceptCard 
            title="Instant Settlement"
            description="Payments settle in under a second on-chain. No chargebacks, no disputes, complete transparency."
          />

          <ConceptCard 
            title="Multi-Chain Native"
            description="Built for a multi-chain future. Deploy once, transact everywhere:"
          >
            <div className="flex items-center gap-3 flex-wrap mt-6">
              {blockchains.map((blockchain) => (
                <BlockchainBadge key={blockchain.name} {...blockchain} />
              ))}
            </div>
          </ConceptCard>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <h2 className="text-4xl font-medium text-white mb-12 tracking-wide">Nova Utilities</h2>

        <p className="text-lg text-gray-400 font-light leading-relaxed mb-12">
          Nova provides a suite of utilities that work together to create a complete ecosystem for x402 services, agents, and economic activity.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <ConceptCard 
            title="Service Hub"
            description="Discover and consume x402 services. Browse APIs, AI models, and digital tools with pay-per-request pricing. Structured services with deterministic execution and dependency resolution."
          />

          <ConceptCard 
            title="Nova Native Agent"
            description="Autonomous agent that runs workflows, not just calls services. Evaluates cost, success rate, and latency before selecting providers. Automatic fallback and output validation."
          />

          <ConceptCard 
            title="x402 Lending"
            description="Enable AI agents to autonomously access paid services. Stake $NOVA, enable agent lending, and supply liquidity. Agents borrow capital and repay automatically."
          />

          <ConceptCard 
            title="Token Mint"
            description="Create and distribute x402-native tokens that represent services, usage, and value. Browse tokens and mint or buy them. Like OpenSea for x402."
          />

          <ConceptCard 
            title="x402 Indexer"
            description="Real-time visibility into all x402 services. Monitor service health, usage patterns, pricing trends, and network activity. Service-level analytics and discovery."
          />

          <ConceptCard 
            title="Integration Layer"
            description="Register and manage your services. Define service schemas, pricing models, validation rules, and dependencies. Makes services plug-and-play across the x402 economy."
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-4xl font-medium text-white mb-12 tracking-wide">Quick Start</h2>

        <div className="space-y-6 mb-24">
          <StepCard 
            number={1}
            title="Understand x402"
            description="Learn how the HTTP 402 payment protocol enables pay-per-request commerce at internet scale."
            linkText="Protocol Overview"
            linkHref="/docs/x402-protocol"
          />

          <StepCard 
            number={2}
            title="Deploy Your Service"
            description="Build x402-enabled services using Express.js, Python, or any HTTP framework you prefer."
            linkText="Build Guide"
            linkHref="/docs/server-express"
          />

          <StepCard 
            number={3}
            title="Connect & Transact"
            description="Integrate client libraries to consume services and handle payments automatically in your apps."
            linkText="Integration Docs"
            linkHref="/docs/clients"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <CTABox 
          title="Need Support?"
          description="Access comprehensive implementation guides, API references, and technical documentation for advanced use cases."
          buttonText="PayAI Documentation"
          buttonHref="https://docs.payai.network"
        />
      </motion.div>
    </div>
  );
}
