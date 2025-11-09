'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function X402IndexerPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        x402 Indexer
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Real-time visibility into all x402 services, providing transparency, tracking and trust across the network.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          x402 Indexer provides real-time visibility into all x402 services across the network. Monitor service health, usage patterns, pricing trends, and network activity. The Indexer excludes tokens—it focuses on service-level analytics and discovery.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          Track and monitor the entire ecosystem with detailed service information. Understand network dynamics, service performance, pricing trends, and usage patterns. Make informed decisions based on comprehensive network data.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Key Features</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Service Discovery"
          description="Discover all x402 services across the network. Filter by category, network, pricing, and service type. Find services that match your requirements."
        />

        <ConceptCard 
          title="Real-Time Monitoring"
          description="Monitor service health, availability, and performance in real-time. Track uptime, response times, and success rates across all services."
        />

        <ConceptCard 
          title="Usage Analytics"
          description="Analyze usage patterns, transaction volumes, and network activity. Understand how services are being used and identify trends."
        />

        <ConceptCard 
          title="Pricing Trends"
          description="Track pricing trends across services and networks. Compare pricing models, identify cost-effective options, and understand market dynamics."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">How It Works</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Service Indexing"
          description="The Indexer continuously scans the network for x402 services, indexing service metadata, pricing, availability, and performance metrics."
        />

        <DocStep 
          number={2}
          title="Data Collection"
          description="Collects real-time data on service health, usage patterns, transaction volumes, pricing changes, and network activity."
        />

        <DocStep 
          number={3}
          title="Analytics Processing"
          description="Processes collected data to generate insights: service rankings, usage trends, pricing analysis, and network health metrics."
        />

        <DocStep 
          number={4}
          title="Data Presentation"
          description="Presents indexed data through searchable interfaces, filters, analytics dashboards, and detailed service profiles."
        />

        <DocStep 
          number={5}
          title="Continuous Updates"
          description="Continuously updates service information, metrics, and analytics as new data becomes available from the network."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Service Information</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          The Indexer tracks comprehensive service information:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Service Metadata:</strong> Name, description, category, network, and endpoint information</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Pricing Information:</strong> Per-request costs, accepted currencies, and pricing models</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Performance Metrics:</strong> Uptime, response times, success rates, and reliability scores</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Usage Statistics:</strong> Transaction volumes, user counts, and usage patterns</span>
          </div>
        </div>
      </div>

      <CTABox 
        title="Explore x402 Indexer"
        description="Monitor the x402 ecosystem, discover services, and analyze network activity with comprehensive service-level analytics."
        buttonText="Open Indexer"
        buttonHref="/dapp/token-indexer"
      />
    </div>
  );
}

