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
        Unlocking the next economy of APIs, AI and digital services through x402 pay-per-request rails.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Platform Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          Lumen402 is a marketplace where services are discovered, tested, and monetized through the HTTP 402 payment protocol. Every API request is a micropayment transaction settling instantly on-chain.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Platform Features</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Service Discovery"
          description="Browse AI services, APIs, and tools from builders worldwide. All services support instant x402 payment integration."
        />

        <ConceptCard 
          title="Risk-Free Testing"
          description="Test any service completely free before committing funds. Validate integration before transacting."
        />

        <ConceptCard 
          title="Request-Based Pricing"
          description="Zero subscription overhead. Pay precisely for the API calls you execute."
        />

        <ConceptCard 
          title="Instant Code Generation"
          description="Copy production-ready integration code. Deploy in minutes, not days."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Usage Flow</h2>

      <div className="space-y-6 mb-16">
        <StepCard 
          number={1}
          title="Explore Marketplace"
          description="Discover AI services, data APIs, image processing, and specialized tools across categories."
          linkText="Browse Services"
          linkHref="/dapp"
        />

        <StepCard 
          number={2}
          title="Validate Functionality"
          description="Use built-in testing interfaces to verify service behavior without payment."
          linkText="Learn More"
          linkHref="/docs/quickstart"
        />

        <StepCard 
          number={3}
          title="Connect Wallet"
          description="Link MetaMask, Phantom, or any supported wallet to enable transactions."
          linkText="Wallet Setup"
          linkHref="/docs/clients"
        />

        <StepCard 
          number={4}
          title="Integrate & Deploy"
          description="Generate integration code, embed in your application, and start transacting."
          linkText="Integration Guide"
          linkHref="/docs/examples"
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">For Builders</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h3 className="text-xl font-medium text-white mb-6">Monetize Your Services</h3>
        <ul className="space-y-4 text-base text-gray-400 font-light">
          <li className="flex gap-3">
            <span className="text-[#74a180] flex-shrink-0">→</span>
            <span><strong className="text-white font-medium">Zero Payment Infrastructure:</strong> x402 handles all payment processing and settlements</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#74a180] flex-shrink-0">→</span>
            <span><strong className="text-white font-medium">Immediate Settlement:</strong> Receive funds on-chain instantly with no intermediaries</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#74a180] flex-shrink-0">→</span>
            <span><strong className="text-white font-medium">Global Distribution:</strong> List once, reach anyone with a crypto wallet</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#74a180] flex-shrink-0">→</span>
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
