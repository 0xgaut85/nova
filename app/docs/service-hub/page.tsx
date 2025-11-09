'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function ServiceHubPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        Service Hub
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Discover and consume x402 services. Browse APIs, AI models, and digital tools with pay-per-request pricing.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          Service Hub is Nova's marketplace for x402-enabled services. Every service defines pricing, accepted currency, and validation rules directly in x402 format. Services are no longer static endpoints—they become monetizable, verifiable, and composable units of work.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          The Hub introduces a service execution runtime for x402. Requests are executed through a deterministic engine that returns structured output, eliminating loose JSON blobs. Services can reference other services internally through dependency resolution, enabling composable workflows.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Key Features</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Structured Pricing"
          description="Every service defines pricing, accepted currency, and validation rules directly in x402 format. No ambiguity, no guesswork—clear pricing models for every service."
        />

        <ConceptCard 
          title="Deterministic Execution"
          description="Requests are executed through a deterministic engine that returns structured output. No more loose JSON blobs—predictable, validated responses every time."
        />

        <ConceptCard 
          title="Dependency Resolution"
          description="Services can reference other services internally, enabling composable workflows. Build complex multi-step operations by chaining services together."
        />

        <ConceptCard 
          title="Service Discovery"
          description="Browse AI services, APIs, and tools from builders worldwide. Filter by category, pricing, network, and service type. Find exactly what you need."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">How It Works</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Browse Services"
          description="Explore the Service Hub to discover available x402 services. View service descriptions, pricing, accepted currencies, and output schemas."
        />

        <DocStep 
          number={2}
          title="Test Services"
          description="Use built-in testing interfaces to verify service behavior without payment. Validate integration, pricing, and output schemas before committing funds."
        />

        <DocStep 
          number={3}
          title="Connect Wallet"
          description="Link your wallet to enable transactions. Services accept various currencies including USDC on Base, SOL on Solana, and other supported tokens."
        />

        <DocStep 
          number={4}
          title="Execute Requests"
          description="Make requests to services with automatic payment handling. The deterministic execution engine processes requests and returns structured, validated output."
        />

        <DocStep 
          number={5}
          title="Compose Workflows"
          description="Chain services together using dependency resolution. Services can reference other services internally, enabling complex multi-step operations."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Service Structure</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          Every service in the Hub follows a structured format:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Pricing Model:</strong> Defined in x402 format with clear per-request costs</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Accepted Currency:</strong> Specifies which tokens the service accepts</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Validation Rules:</strong> Schema definitions for input and output validation</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Dependencies:</strong> Optional references to other services for composable workflows</span>
          </div>
        </div>
      </div>

      <CTABox 
        title="Explore Service Hub"
        description="Browse available services and start integrating x402 payments into your applications."
        buttonText="Open Service Hub"
        buttonHref="/dapp/service-hub"
      />
    </div>
  );
}

