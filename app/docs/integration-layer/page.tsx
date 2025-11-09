'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function IntegrationLayerPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        Integration Layer
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Register and manage your services. A connective fabric that makes services plug-and-play across the x402 economy.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          Integration Layer is the connective fabric that makes services plug-and-play across the x402 economy. Register your services, define service schemas, pricing models, validation rules, and dependencies. Enable seamless integration between services.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          The Integration Layer provides the infrastructure for service registration, discovery, and composition. Define how your service works, what it accepts, what it returns, and how it integrates with other services. Make your service discoverable, composable, and interoperable within the Nova ecosystem.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Key Features</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Service Registration"
          description="Register your x402-enabled services with comprehensive metadata. Define service endpoints, capabilities, pricing, and integration requirements."
        />

        <ConceptCard 
          title="Schema Definition"
          description="Define input and output schemas for your services. Specify validation rules, data types, required fields, and response formats."
        />

        <ConceptCard 
          title="Pricing Configuration"
          description="Configure pricing models, accepted currencies, and payment terms. Define per-request costs, bulk pricing, or custom pricing models."
        />

        <ConceptCard 
          title="Dependency Management"
          description="Specify service dependencies and integration points. Enable composable workflows by defining how services connect and interact."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">How It Works</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Register Service"
          description="Create a service profile with basic information: name, description, category, endpoint URL, and network. Provide clear documentation and examples."
        />

        <DocStep 
          number={2}
          title="Define Schema"
          description="Specify input and output schemas using JSON Schema or similar formats. Define validation rules, required fields, and response structures."
        />

        <DocStep 
          number={3}
          title="Configure Pricing"
          description="Set up pricing models: per-request costs, accepted currencies, payment terms, and any bulk or subscription options."
        />

        <DocStep 
          number={4}
          title="Set Dependencies"
          description="Optionally define service dependencies and integration points. Specify which services your service can call or integrate with."
        />

        <DocStep 
          number={5}
          title="Publish & Discover"
          description="Publish your service to make it discoverable in the Service Hub. Services become available for browsing, testing, and integration."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Service Configuration</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          The Integration Layer enables comprehensive service configuration:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Service Metadata:</strong> Name, description, category, tags, and documentation</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Endpoint Configuration:</strong> API endpoints, network, authentication, and access methods</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Schema Definition:</strong> Input/output schemas, validation rules, and data formats</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Pricing Models:</strong> Per-request pricing, accepted currencies, and payment terms</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Integration Points:</strong> Dependencies, composability, and service interconnections</span>
          </div>
        </div>
      </div>

      <CTABox 
        title="Register Your Service"
        description="Use the Integration Layer to register your x402-enabled service and make it discoverable in the Nova ecosystem."
        buttonText="Open Integration Layer"
        buttonHref="/dapp/integration-layer"
      />
    </div>
  );
}

