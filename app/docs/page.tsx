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
            Build and deploy pay-per-request services. Integrate micropayments. Create the next generation of digital commerce.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-black/80 backdrop-blur-sm rounded-lg p-12 border border-white/[0.15] mb-24"
      >
        <h2 className="text-3xl font-medium text-white mb-5 tracking-wide">What is Lumen402?</h2>
        <p className="text-lg text-gray-400 font-light leading-relaxed">
          Lumen402 is unlocking the next economy of APIs, AI and digital services through x402 pay-per-request rails. 
          Every API call becomes a micropayment transaction, enabling true usage-based pricing with instant on-chain settlement.
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
