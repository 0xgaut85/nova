'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import StepCard from '../../components/docs/StepCard';
import CTABox from '../../components/docs/CTABox';

export default function IntroductionPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        Introduction
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Building x402 protocol infrastructure for the emerging API economy and beyond. Nova exists for one purpose: make x402 usable.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Platform Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          Nova402 is the execution and economic layer of x402. We're building the infrastructure that enables the agent economy. Every API request becomes a micropayment transaction settling instantly on-chain, but Nova goes beyond simple payments—we're creating the rails that power autonomous economic activity.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          With Nova, services are no longer static endpoints—they become monetizable, verifiable, and composable units of work. AI agents don't just talk—they operate, transact, and drive an economy.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Nova Utilities</h2>

      <p className="text-lg text-gray-400 font-light leading-relaxed mb-12">
        Nova provides a suite of utilities that work together to create a complete ecosystem for x402 services, agents, and economic activity.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Service Hub"
          description="Discover and consume x402 services. Browse APIs, AI models, and digital tools with pay-per-request pricing. Every service defines pricing, accepted currency, and validation rules directly in x402 format. Services can reference other services internally through dependency resolution, enabling composable workflows."
        />

        <ConceptCard 
          title="Token Mint"
          description="Create and distribute x402-native tokens that represent services, usage, and value. Like OpenSea for x402—focused on browsing tokens and minting or buying them. Tokens can represent service access, usage credits, or participation in specific services."
        />

        <ConceptCard 
          title="x402 Indexer"
          description="Real-time visibility into all x402 services, providing transparency, tracking and trust across the network. Monitor service health, usage patterns, pricing trends, and network activity. Excludes tokens—focused on service-level analytics and discovery."
        />

        <ConceptCard 
          title="Integration Layer"
          description="Register and manage your services. A connective fabric that makes services plug-and-play across the x402 economy. Define service schemas, pricing models, validation rules, and dependencies. Enables seamless integration between services."
        />

        <ConceptCard 
          title="Nova Native Agent"
          description="Autonomous agent with access to all x402 services, capable of interacting on behalf of builders, applications, and machines. Evaluates cost, success rate, and latency before selecting providers. Automatically falls back to alternative services on failure. Validates outputs against service schemas and routes work through the lending layer."
        />

        <ConceptCard 
          title="x402 Lending"
          description="Enable AI agents to autonomously access paid services. Stake $NOVA, enable agent lending, and supply liquidity for agent payments. Agents borrow working capital through x402, execute workflows, and repay automatically upon completion. Enables agents to become economic actors with access to capital."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">$NOVA Token & Machine Economy</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-8">
        <h3 className="text-xl font-medium text-white mb-6">Token Utility & Staking</h3>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          $NOVA is directly tied to how activity flows through the network. The token powers the machine economy, agent-driven economic activity, staking participation, and x402 flows including payments, usage, and operations.
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Staking Participation:</strong> Stake $NOVA to participate in economic activity generated by AI agents and services running on Nova</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Token Buybacks & Distribution:</strong> 50% of buybacks are burned permanently, 50% redistributed to stakers participating in the machine economy</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Direct Alignment:</strong> Supply structure designed for real utility with direct alignment between product, token, and growth</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Economic Participation:</strong> Users don't watch from the sidelines—they participate in the economy they help grow</span>
          </div>
        </div>
      </div>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h3 className="text-xl font-medium text-white mb-6">How It Works</h3>
        <div className="space-y-3 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Stake $NOVA:</strong> Participate in the system and earn rewards from agent activity</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Agents Use Liquidity:</strong> Borrow capital to execute paid services through x402</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Rewards Distribution:</strong> Proportional rewards based on participation in the machine economy</span>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Usage Flow</h2>

      <div className="space-y-6 mb-16">
        <StepCard 
          number={1}
          title="Explore Marketplace"
          description="Discover AI services, data APIs, image processing, and specialized tools across categories through the Service Hub."
          linkText="Browse Services"
          linkHref="/dapp/service-hub"
        />

        <StepCard 
          number={2}
          title="Validate Functionality"
          description="Use built-in testing interfaces to verify service behavior without payment. Check pricing, output schemas, and integration requirements."
          linkText="Learn More"
          linkHref="/docs/quickstart"
        />

        <StepCard 
          number={3}
          title="Connect Wallet"
          description="Link MetaMask, Phantom, or any supported wallet to enable transactions. For agents, configure lending access through x402 Lending."
          linkText="Wallet Setup"
          linkHref="/docs/clients"
        />

        <StepCard 
          number={4}
          title="Integrate & Deploy"
          description="Generate integration code, embed in your application, and start transacting. Use Integration Layer to register your own services."
          linkText="Integration Guide"
          linkHref="/docs/examples"
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">For Builders</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h3 className="text-xl font-medium text-white mb-6">Monetize Your Services</h3>
        <ul className="space-y-4 text-base text-gray-400 font-light">
          <li className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Zero Payment Infrastructure:</strong> x402 handles all payment processing and settlements</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Immediate Settlement:</strong> Receive funds on-chain instantly with no intermediaries</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Structured Services:</strong> Define pricing, validation rules, and dependencies in x402 format</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Composable Workflows:</strong> Reference other services internally for complex multi-step operations</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Global Distribution:</strong> List once, reach anyone with a crypto wallet</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Request Pricing:</strong> Charge per-use without subscription complexity</span>
          </li>
        </ul>
      </div>

      <CTABox 
        title="Start Building"
        description="Learn the x402 protocol and deploy your first service in under 10 minutes."
        buttonText="Protocol Docs"
        buttonHref="/docs/x402-protocol"
      />
    </div>
  );
}
