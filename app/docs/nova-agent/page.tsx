'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function NovaAgentPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        Nova Native Agent
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Autonomous agent with access to all x402 services, capable of interacting on behalf of builders, applications, and machines.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          Nova Native Agent runs workflows, not just calls services. Autonomous execution becomes economic execution with intelligent routing through the lending layer. The agent evaluates cost, success rate, and latency before selecting providers, automatically falls back to alternative services on failure, and validates outputs against service schemas.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          Nova doesn't interact with services—Nova operates them. Not agents that talk. Agents that operate. Agents that transact. Agents that drive an economy.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Core Capabilities</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Provider Selection"
          description="Nova evaluates cost, success rate, and latency before choosing a provider. Intelligent routing ensures optimal service selection based on multiple factors."
        />

        <ConceptCard 
          title="Automatic Fallback"
          description="If execution fails, Nova reroutes to another service without stopping the workflow. Ensures reliability and continuity even when individual services fail."
        />

        <ConceptCard 
          title="Output Validation"
          description="Responses are checked against schema rules defined by the service developer. Invalid outputs trigger fallback or retry mechanisms."
        />

        <ConceptCard 
          title="Lending Layer Integration"
          description="Routes work through the lending layer, generating on-chain activity that flows back to $NOVA stakers. Enables economic execution, not just autonomous execution."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">How It Works</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Request Processing"
          description="Nova receives a request and analyzes available services that can fulfill it. Considers service capabilities, pricing, historical performance, and current network conditions."
        />

        <DocStep 
          number={2}
          title="Provider Evaluation"
          description="Evaluates each potential provider based on cost, success rate, latency, and output quality. Selects the optimal provider for the specific request."
        />

        <DocStep 
          number={3}
          title="Execution & Payment"
          description="Routes the request through the lending layer if needed, executes the service call, and handles payment automatically. Validates output against service schema."
        />

        <DocStep 
          number={4}
          title="Fallback Handling"
          description="If execution fails or output validation fails, automatically selects an alternative provider and retries. Workflow continues without interruption."
        />

        <DocStep 
          number={5}
          title="Result Delivery"
          description="Returns validated, structured output to the requester. All activity is recorded on-chain, generating rewards for $NOVA stakers."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Economic Execution</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          Nova Native Agent goes beyond simple service calls—it enables economic execution:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Capital Access:</strong> Uses the lending layer to access working capital when needed</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Cost Optimization:</strong> Selects providers based on cost efficiency, not just availability</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Value Generation:</strong> All activity generates on-chain value that flows back to stakers</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Autonomous Operation:</strong> Operates independently without requiring pre-loaded balances</span>
          </div>
        </div>
      </div>

      <CTABox 
        title="Try Nova Native Agent"
        description="Interact with Nova Native Agent and see how it operates services, manages workflows, and drives economic activity."
        buttonText="Open Agent"
        buttonHref="/dapp/agent"
      />
    </div>
  );
}

