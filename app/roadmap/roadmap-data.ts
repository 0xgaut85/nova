// Roadmap data configuration
// Edit this file to update roadmap items easily

export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  quarter?: string;
  year?: number;
  features?: string[];
}

export interface RoadmapPhase {
  id: string;
  phase: string;
  period: string;
  items: RoadmapItem[];
}

export const roadmapData: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1',
    period: 'Early Q4 2025',
    items: [
      {
        id: 'marketplace-live',
        title: 'Service Marketplace',
        description: 'Live marketplace for discovering and consuming x402 services',
        status: 'completed',
        features: [
          'Service discovery API',
          'Real-time availability',
          'Payment integration',
          'Web3 wallet support',
        ],
      },
      {
        id: 'aggregator',
        title: 'Payment Aggregator',
        description: 'Unified payment routing and aggregation layer',
        status: 'completed',
        features: [
          'Multi-service payments',
          'Batch processing',
          'Fee optimization',
          'Analytics dashboard',
        ],
      },
      {
        id: 'token-launch',
        title: '$LUMEN Token Launch',
        description: 'Native token for governance and network incentives',
        status: 'in-progress',
        features: [
          'Token economics design',
          'Fair launch mechanism',
          'Liquidity provision',
          'Staking infrastructure',
        ],
      },
      {
        id: 'community-growth',
        title: 'Community & Ecosystem',
        description: 'Building a vibrant developer and user community',
        status: 'in-progress',
        features: [
          'Social channels launch',
          'Developer grants program',
          'Bug bounty program',
          'Ambassador program',
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    period: 'Late Q4 2025',
    items: [
      {
        id: 'multi-chain',
        title: 'Multi-Chain Expansion',
        description: 'Expand beyond Base to multiple networks',
        status: 'planned',
        features: [
          'Solana integration',
          'Polygon support',
          'BSC support',
          'Peaq integration',
          'Sei support',
        ],
      },
      {
        id: 'developer-tools',
        title: 'Advanced Developer Tools',
        description: 'Enhanced toolkit for building x402-enabled services',
        status: 'planned',
        features: [
          'No-code integrations',
          'Advanced SDKs',
          'Testing framework',
          'Code generation tools',
        ],
      },
    ],
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    period: 'Early Q1 2026',
    items: [
      {
        id: 'governance',
        title: 'DAO & Governance',
        description: 'Decentralized governance with $LUMEN token',
        status: 'planned',
        features: [
          'Governance proposals',
          'On-chain voting',
          'Treasury management',
          'Protocol upgrades',
        ],
      },
      {
        id: 'advanced-features',
        title: 'Advanced Features',
        description: 'Next-generation payment capabilities',
        status: 'planned',
        features: [
          'Subscription models',
          'Credit systems',
          'Dispute resolution',
          'Advanced analytics',
        ],
      },
      {
        id: 'partnerships',
        title: 'Enterprise & Partnerships',
        description: 'Strategic partnerships and enterprise adoption',
        status: 'planned',
        features: [
          'Enterprise integrations',
          'API partnerships',
          'White-label solutions',
          'Compliance frameworks',
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    period: 'Late Q1 2026',
    items: [
      {
        id: 'global-expansion',
        title: 'Global Scale',
        description: 'Scaling to millions of transactions',
        status: 'planned',
        features: [
          'L2 optimizations',
          'Global CDN',
          'Regional facilitators',
          'Multi-currency support',
        ],
      },
      {
        id: 'ai-integration',
        title: 'AI-Powered Features',
        description: 'Intelligent payment routing and optimization',
        status: 'planned',
        features: [
          'AI payment routing',
          'Fraud detection',
          'Usage predictions',
          'Smart recommendations',
        ],
      },
      {
        id: 'ecosystem-maturity',
        title: 'Ecosystem Maturity',
        description: 'Self-sustaining decentralized ecosystem',
        status: 'planned',
        features: [
          'Community-driven development',
          'Native marketplaces',
          'Education platform',
          'Research grants',
        ],
      },
    ],
  },
];

