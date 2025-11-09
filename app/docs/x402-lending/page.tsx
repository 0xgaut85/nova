'use client';

import Link from 'next/link';
import ConceptCard from '../../components/docs/ConceptCard';
import DocStep from '../../components/docs/DocStep';
import CTABox from '../../components/docs/CTABox';

export default function X402LendingPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-5xl sm:text-6xl font-normal text-white mb-8 tracking-wide leading-tight">
        x402 Lending
      </h1>

      <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
        Enable AI agents to autonomously access paid services. Stake $NOVA, enable agent lending, and supply liquidity for agent payments.
      </p>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <h2 className="text-2xl font-medium text-white mb-4">Overview</h2>
        <p className="text-base text-gray-400 font-light leading-relaxed mb-4">
          x402 Lending enables a new primitive: AI agents can borrow working capital through x402, execute workflows, and repay automatically upon completion. This unlocks autonomous behavior—agents become economic actors, not chat interfaces.
        </p>
        <p className="text-base text-gray-400 font-light leading-relaxed">
          Access to capital unlocks autonomous behavior. Agents no longer depend on preloaded balances. They can request limited working capital, execute paid services through x402, and repay based on completed work.
        </p>
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">How It Works</h2>

      <div className="space-y-4 mb-16">
        <DocStep 
          number={1}
          title="Stake $NOVA"
          description="Stake your $NOVA tokens to participate in the lending system. Stakers supply liquidity that agents can borrow to execute paid services."
        />

        <DocStep 
          number={2}
          title="Agent Requests Capital"
          description="AI agents request limited working capital through x402. Requests specify the amount needed, intended services, and repayment terms."
        />

        <DocStep 
          number={3}
          title="Execute Paid Services"
          description="Agents use borrowed capital to execute paid services through x402. All transactions are recorded on-chain, generating activity and value."
        />

        <DocStep 
          number={4}
          title="Automatic Repayment"
          description="When workflows complete, agents automatically repay borrowed capital plus fees. Repayment is handled programmatically based on completed work."
        />

        <DocStep 
          number={5}
          title="Rewards Distribution"
          description="Stakers receive proportional rewards based on their participation in the machine economy. Rewards come from fees, agent activity, and token buybacks."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Key Features</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <ConceptCard 
          title="Capital Access for Agents"
          description="Agents can borrow working capital without requiring preloaded balances. Enables true autonomous operation where agents can transact independently."
        />

        <ConceptCard 
          title="Automatic Repayment"
          description="Repayment happens automatically when workflows complete. Agents repay based on completed work, ensuring lenders are compensated for successful operations."
        />

        <ConceptCard 
          title="Staking Participation"
          description="Stake $NOVA to participate in the system and earn rewards from agent activity. Proportional rewards based on staking amount and duration."
        />

        <ConceptCard 
          title="Risk Management"
          description="Lending limits and terms are programmatically enforced. Agents can only borrow what they need, and repayment is guaranteed through workflow completion."
        />
      </div>

      <h2 className="text-3xl font-medium text-white mb-8 tracking-wide">Economic Model</h2>

      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] mb-16">
        <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
          The lending layer creates a circular economy:
        </p>
        <div className="space-y-4 text-base text-gray-400 font-light">
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Stakers Supply Liquidity:</strong> Stake $NOVA to provide capital for agent operations</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Agents Use Liquidity:</strong> Borrow capital to execute paid services through x402</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Activity Generates Value:</strong> All agent activity creates on-chain transactions and economic value</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#b2a962] flex-shrink-0">•</span>
            <span><strong className="text-white font-medium">Rewards Flow Back:</strong> Value flows back to stakers through fees, buybacks, and activity rewards</span>
          </div>
        </div>
      </div>

      <CTABox 
        title="Participate in x402 Lending"
        description="Stake $NOVA and enable AI agents to autonomously access paid services while earning rewards."
        buttonText="Open x402 Lending"
        buttonHref="/dapp/x402-lending"
      />
    </div>
  );
}

