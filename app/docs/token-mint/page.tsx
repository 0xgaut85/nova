'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function TokenMintPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        Token Mint
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Create and distribute x402-native tokens that represent services, usage, and value.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          Token Mint is like OpenSea for x402—focused on browsing tokens and minting or buying them. Create x402-native tokens that represent service access, usage credits, participation in specific services, or any value proposition within the x402 ecosystem.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          Tokens can represent various forms of value: service access passes, usage credits, participation rights, governance tokens for specific services, or custom value propositions. Each token is tied to x402 services and can be used within the Nova ecosystem.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Key Features</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Token Creation"
          description="Mint new x402-native tokens with custom parameters. Define supply, pricing, utility, and integration with x402 services."
        />

        <ConceptCard 
          title="Token Marketplace"
          description="Browse available tokens, view token details, pricing, utility, and associated services. Discover tokens that match your needs."
        />

        <ConceptCard 
          title="Service Integration"
          description="Tokens can be integrated with x402 services to provide access, discounts, or special privileges. Link tokens to specific services or service categories."
        />

        <ConceptCard 
          title="Value Representation"
          description="Tokens represent various forms of value: service access, usage credits, participation rights, or custom value propositions within the ecosystem."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">How It Works</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Browse Tokens"
          description="Explore the Token Mint marketplace to discover available x402-native tokens. View token details, pricing, utility, and associated services."
        />

        <DocStep 
          number={2}
          title="Create or Purchase"
          description="Mint new tokens with custom parameters or purchase existing tokens. Define token utility, supply, pricing, and service integration."
        />

        <DocStep 
          number={3}
          title="Define Utility"
          description="Specify how tokens can be used: service access, usage credits, discounts, governance rights, or custom value propositions."
        />

        <DocStep 
          number={4}
          title="Service Integration"
          description="Link tokens to x402 services. Services can accept tokens for payment, provide discounts, or grant special access based on token holdings."
        />

        <DocStep 
          number={5}
          title="Trade & Use"
          description="Trade tokens on the marketplace or use them within the Nova ecosystem. Tokens can be transferred, traded, or used to access services."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Token Types</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          Tokens can represent various forms of value:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Service Access Tokens:</strong> Provide access to specific services or service categories</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Usage Credits:</strong> Represent prepaid usage credits for services</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Participation Tokens:</strong> Grant participation rights in specific services or communities</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Governance Tokens:</strong> Provide governance rights for specific services or the ecosystem</span>
          </div>
        </div>
      </div>

      <CTABox 
        title="Explore Token Mint"
        description="Browse tokens, mint new ones, or purchase existing tokens to access services and participate in the x402 ecosystem."
        buttonText="Open Token Mint"
        buttonHref="/dapp/token-mint"
      />
    </div>
  );
}

