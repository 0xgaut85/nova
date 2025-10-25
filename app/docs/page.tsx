'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'what-is-x402', label: 'What is x402?' },
    { id: 'why-x402', label: 'Why x402?' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'sdk-guide', label: 'SDK Guide' },
    { id: 'explorer', label: 'Explorer' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'roadmap', label: 'Roadmap' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Welcome to xgrain402</h1>
            <p className="text-3xl text-black leading-relaxed mb-12">
              The payment rail for the agent economy
            </p>
            
            <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-500 rounded-3xl p-10 mb-12">
              <p className="text-2xl text-black leading-relaxed mb-6">
                xgrain402 is revolutionizing how machines transact with each other by providing infrastructure 
                for instant, trustless micropayments on BSC (Binance Smart Chain).
              </p>
              <p className="text-xl text-black leading-relaxed">
                We're building the economic layer for AI agents, IoT devices, and autonomous systems that need 
                to exchange value without human intervention.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yellow-500 transition-colors">
                <h3 className="text-5xl font-bold text-black mb-3">2</h3>
                <p className="text-sm text-black uppercase tracking-wide">Open Source Repos</p>
              </div>
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yellow-500 transition-colors">
                <h3 className="text-5xl font-bold text-black mb-3">Q4 2025</h3>
                <p className="text-sm text-black uppercase tracking-wide">Launch Target</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-r-2xl mb-12">
              <h3 className="text-2xl font-bold text-black mb-3">Current Status: Active Development</h3>
              <p className="text-xl text-black leading-relaxed mb-4">
                xgrain402 is currently in active development with both repositories open source on GitHub. 
                The core infrastructure, production SDK, and explorer platform are scheduled for launch in November 2025.
              </p>
              <p className="text-lg text-black leading-relaxed">
                <strong>What's Live Now:</strong> GitHub repositories with active development and community contributions.<br/>
                <strong>Coming Q4 2025:</strong> Production SDK, Explorer Platform, and Core Protocol Infrastructure.
              </p>
            </div>

            <div className="prose prose-xl max-w-none">
              <h2 className="text-4xl font-bold italic text-black mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">Core Concepts</h3>
                  <p className="text-black leading-relaxed">
                    Understand the fundamental architecture of xgrain402, why it exists, and how it's solving 
                    the payment problem for autonomous systems.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">Technical Implementation</h3>
                  <p className="text-black leading-relaxed">
                    Learn how to integrate xgrain402 into your applications. Explore the planned SDK features 
                    and prepare for the Q4 2025 launch.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">Real-World Applications</h3>
                  <p className="text-black leading-relaxed">
                    Explore practical use cases from AI services to IoT infrastructure, and discover how xgrain402 
                    will enable new business models.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">Ecosystem Participation</h3>
                  <p className="text-black leading-relaxed">
                    Discover how to contribute to the ecosystem as a developer, facilitator, or resource provider 
                    in the growing network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'what-is-x402':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">What is x402?</h1>
            
            <div className="prose prose-xl max-w-none">
              <p className="text-2xl text-black leading-relaxed mb-10">
                x402 is a payment protocol and infrastructure layer built on BSC (Binance Smart Chain) that enables frictionless 
                micropayments for machine-to-machine transactions. It's designed specifically for the emerging 
                agent economy where AI systems, IoT devices, and autonomous services need to transact value 
                without human intervention.
              </p>

              <h2 className="text-4xl font-bold italic text-black mb-6 mt-12">The Vision</h2>
              <p className="text-xl text-black leading-relaxed mb-6">
                The internet never shipped with native payments. Credit cards were bolted on decades later, 
                creating a system that's expensive, slow, and fundamentally incompatible with how machines need 
                to transact.
              </p>
              <p className="text-xl text-black leading-relaxed mb-8">
                x402 imagines a world where:
              </p>
              <ul className="space-y-4 mb-10">
                <li className="text-xl text-black leading-relaxed">
                  <strong className="text-black">Every API call is a transaction</strong> - No more subscriptions, 
                  no more rate limits. Pay per request, automatically.
                </li>
                <li className="text-xl text-black leading-relaxed">
                  <strong className="text-black">AI agents operate autonomously</strong> - Agents can purchase 
                  compute, data, and services without needing human-managed payment methods.
                </li>
                <li className="text-xl text-black leading-relaxed">
                  <strong className="text-black">IoT devices self-fund</strong> - Sensors and devices can earn 
                  and spend based on real-time usage and value creation.
                </li>
                <li className="text-xl text-black leading-relaxed">
                  <strong className="text-black">Value flows freely</strong> - Micropayments become economically 
                  viable, enabling new business models impossible with traditional payment rails.
                </li>
              </ul>

              <h2 className="text-4xl font-bold italic text-black mb-6 mt-12">The Technology</h2>
              <div className="bg-gray-50 rounded-3xl p-10 mb-10">
                <h3 className="text-2xl font-bold text-black mb-4">Built on BSC (Binance Smart Chain)</h3>
                <p className="text-xl text-black leading-relaxed mb-6">
                  x402 leverages BSC's high-performance blockchain to achieve what traditional payment systems 
                  can't: sub-cent transactions that settle in milliseconds with fees under $0.001.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Performance Metrics</h4>
                    <ul className="space-y-2 text-black">
                      <li>• 65,000+ TPS capacity</li>
                      <li>• 400ms block times</li>
                      <li>• $0.00025 average fee</li>
                      <li>• Global consensus</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Economic Viability</h4>
                    <ul className="space-y-2 text-black">
                      <li>• Micropayments from $0.001</li>
                      <li>• No minimum transaction size</li>
                      <li>• Instant settlement</li>
                      <li>• No chargebacks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-6 mt-12">The Ecosystem</h2>
              <p className="text-xl text-black leading-relaxed mb-6">
                x402 consists of multiple components working together:
              </p>
              <div className="space-y-6 mb-10">
                <div className="border-l-4 border-yellow-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-black mb-2">xgrain402-sdk</h3>
                  <p className="text-lg text-black leading-relaxed">
                    TypeScript SDK for integrating x402 payment processing into applications. Handles wallet 
                    connection, transaction creation, signing, and confirmation.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-black mb-2">xgrain402-scan</h3>
                  <p className="text-lg text-black leading-relaxed">
                    Explorer and analytics platform built with Next.js, Prisma, and PostgreSQL. Provides real-time 
                    indexing of network activity, facilitator tracking, and ecosystem metrics.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-black mb-2">Facilitator Network</h3>
                  <p className="text-lg text-black leading-relaxed">
                    Decentralized network of payment processors that route transactions, validate payments, and 
                    provide infrastructure for the ecosystem.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-r-2xl">
                <p className="text-xl text-black leading-relaxed">
                  <strong>Bottom line:</strong> x402 is building the missing economic layer for autonomous systems. 
                  It's infrastructure for a future where machines transact with each other as seamlessly as data 
                  flows through the internet today.
                </p>
              </div>
            </div>
          </div>
        );

      case 'why-x402':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Why x402?</h1>
            
            <div className="prose prose-xl max-w-none">
              <h2 className="text-4xl font-bold italic text-black mb-6">The Problem with Traditional Payments</h2>
              
              <p className="text-2xl text-black leading-relaxed mb-10">
                Traditional payment systems were built for humans buying products. They're fundamentally broken 
                for the way machines need to transact.
              </p>

              <div className="space-y-8 mb-12">
                <div className="bg-gray-50 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">High Transaction Costs</h3>
                  <p className="text-xl text-black leading-relaxed mb-4">
                    Credit card fees are 2-3% plus $0.30 per transaction. This makes micropayments economically 
                    impossible. You can't charge $0.01 for an API call when the payment fee is $0.30.
                  </p>
                  <div className="bg-white rounded-xl p-6">
                    <p className="text-lg text-black mb-2">Traditional Payment:</p>
                    <p className="text-3xl font-bold text-black">$0.01 transaction → $0.31 total cost</p>
                    <p className="text-sm text-black mt-2">3,000% overhead</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Slow Settlement</h3>
                  <p className="text-xl text-black leading-relaxed mb-4">
                    Bank transfers take days. Credit cards batch settlements overnight. But AI agents need to pay 
                    and receive payment instantly to continue operating.
                  </p>
                  <div className="bg-white rounded-xl p-6">
                    <p className="text-lg text-black mb-2">Settlement Times:</p>
                    <div className="space-y-2">
                      <p className="text-black">Bank Transfer: <span className="font-bold">3-5 business days</span></p>
                      <p className="text-black">Credit Card: <span className="font-bold">1-2 business days</span></p>
                      <p className="text-black text-2xl">x402 on BSC: <span className="font-bold text-yellow-600">400 milliseconds</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Complex Integration</h3>
                  <p className="text-xl text-black leading-relaxed">
                    Accepting payments requires merchant accounts, PCI compliance, fraud detection, chargeback 
                    management, and ongoing regulatory compliance. This complexity makes sense for a $100 purchase, 
                    but it's absurd for a $0.001 API call.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Subscription Friction</h3>
                  <p className="text-xl text-black leading-relaxed">
                    The current solution for developer APIs is subscriptions with tiered pricing. But autonomous 
                    agents don't subscribe to services. They need to pay per use, automatically, without human 
                    intervention for every new service they discover.
                  </p>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-6 mt-12">The x402 Solution</h2>
              
              <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-500 rounded-3xl p-10 mb-10">
                <h3 className="text-3xl font-bold text-black mb-6">Radical Economics</h3>
                <p className="text-xl text-black leading-relaxed mb-6">
                  x402 leverages BSC's blockchain to make micropayments not just possible, but practical:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-black mb-3">$0.00025 Fees</h4>
                    <p className="text-black">Flat rate regardless of transaction amount. A $0.001 payment costs $0.00025 to process.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-black mb-3">400ms Settlement</h4>
                    <p className="text-black">Real-time payment confirmation. No waiting, no batching, no delays.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-black mb-3">No Intermediaries</h4>
                    <p className="text-black">Direct peer-to-peer payments. No banks, no processors, no middlemen taking cuts.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-black mb-3">Global by Default</h4>
                    <p className="text-black">No geographic restrictions. If you have a BSC wallet, you can transact.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-6 mt-12">Why Now?</h2>
              
              <p className="text-xl text-black leading-relaxed mb-6">
                Three converging trends make this the perfect moment for x402:
              </p>

              <div className="space-y-6 mb-10">
                <div className="border-l-4 border-yellow-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-black mb-2">1. AI Agent Explosion</h3>
                  <p className="text-lg text-black leading-relaxed">
                    ChatGPT plugins, AutoGPT, BabyAGI, and countless other autonomous agents are being built. 
                    They all need a way to pay for resources. Subscription models don't work for agents that 
                    discover and consume services dynamically.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-black mb-2">2. IoT Device Proliferation</h3>
                  <p className="text-lg text-black leading-relaxed">
                    Billions of connected devices need to share data and services. A weather sensor should be 
                    able to sell data directly to whoever needs it, without complex billing infrastructure.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-black mb-2">3. Blockchain Infrastructure Maturity</h3>
                  <p className="text-lg text-black leading-relaxed">
                    BSC (Binance Smart Chain) and other high-performance blockchains have finally achieved the throughput and cost 
                    structure needed to make micropayments viable. The technology is ready.
                  </p>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10">
                <h3 className="text-3xl font-bold mb-6">The Opportunity</h3>
                <p className="text-xl leading-relaxed mb-6">
                  We're at the dawn of the machine economy. In 10 years, the majority of economic transactions 
                  will be between autonomous systems, not humans.
                </p>
                <p className="text-xl leading-relaxed">
                  x402 is building the payment infrastructure for that future. The infrastructure layer that enables 
                  machines to exchange value as easily as they exchange data today.
                </p>
              </div>
            </div>
          </div>
        );

      case 'how-it-works':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">How It Works</h1>
            
            <div className="prose prose-xl max-w-none">
              <p className="text-2xl text-black leading-relaxed mb-12">
                x402 orchestrates multiple components to create a seamless payment experience. Here's how the pieces 
                fit together.
              </p>

              <h2 className="text-4xl font-bold italic text-black mb-8">The Payment Flow</h2>
              
              <div className="space-y-8 mb-12">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">Request Initiation</h3>
                      <p className="text-xl text-black leading-relaxed">
                        An AI agent or application makes a request to an API endpoint protected by x402. The request 
                        includes payment parameters: amount, recipient, and any metadata about the service being accessed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">Transaction Creation</h3>
                      <p className="text-xl text-black leading-relaxed mb-4">
                        The x402 SDK creates a BSC transaction with the payment details. The transaction is 
                        constructed following BSC's standard format and includes all necessary accounts and 
                        instructions.
                      </p>
                      <div className="bg-white rounded-xl p-4">
                        <pre className="text-sm font-mono text-black">{`Transaction {
  from: AgentWallet,
  to: ServiceProvider,
  amount: 0.001 SOL,
  fee: 0.00025 SOL,
  metadata: { service: "api_v1" }
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">Signature & Broadcast</h3>
                      <p className="text-xl text-black leading-relaxed">
                        The transaction is signed by the user's wallet (MetaMask, Rabby, etc.) and broadcast to 
                        the BSC network. BSC validators process the transaction and add it to the blockchain.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">Confirmation (~400ms)</h3>
                      <p className="text-xl text-black leading-relaxed">
                        BSC confirms the transaction with sub-second finality. The payment is now settled and 
                        irreversible. No chargebacks, no disputes, no waiting for "funds to clear."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">Service Delivery</h3>
                      <p className="text-xl text-black leading-relaxed">
                        The x402 SDK validates the payment confirmation and allows the request to proceed. The API 
                        processes the request and returns the response. The entire flow—from request to response—
                        takes less than a second.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      6
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-3">Indexing & Analytics</h3>
                      <p className="text-xl text-black leading-relaxed">
                        x402-scan monitors the blockchain and indexes the transaction. It's immediately visible in 
                        the explorer with full transaction details, contributing to network statistics and facilitator 
                        performance metrics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8 mt-16">Technical Architecture</h2>
              
              <div className="bg-gray-50 rounded-3xl p-10 mb-10">
                <h3 className="text-2xl font-bold text-black mb-6">System Components</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Payment Processing Layer</h4>
                    <p className="text-lg text-black leading-relaxed">
                      Handles transaction validation, signature verification, and settlement. Built with TypeScript 
                      for type safety. Supports both browser and Node.js environments.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Blockchain Interface</h4>
                    <p className="text-lg text-black leading-relaxed">
                      Direct integration with BSC using web3.js. Manages RPC connections, transaction 
                      serialization, and confirmation polling.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Wallet Adapter Integration</h4>
                    <p className="text-lg text-black leading-relaxed">
                      Seamless connection to MetaMask, Rabby, and all major BSC wallets through the 
                      standard Wallet Adapter interface.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Data Indexing Layer</h4>
                    <p className="text-lg text-black leading-relaxed">
                      Real-time blockchain monitoring using Prisma and PostgreSQL. Indexes all x402 transactions 
                      for analytics and historical queries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-4">Developer Experience</h3>
                <p className="text-xl leading-relaxed mb-6">
                  The entire integration can be done in under 10 lines of code:
                </p>
                <div className="bg-black rounded-2xl p-6">
                  <pre className="text-sm font-mono text-white">{`import { XGrain402 } from '@xgrain402/sdk';

const xgrain = new XGrain402({
  network: 'mainnet-beta'
});

// That's it. You're ready to accept payments.
app.get('/api/data', 
  xgrain.protect({ price: 0.001 }),
  handleRequest
);`}</pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'use-cases':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Use Cases</h1>
            
            <div className="prose prose-xl max-w-none">
              <p className="text-2xl text-black leading-relaxed mb-12">
                x402 enables entirely new business models by making micropayments economically viable. Here are 
                real-world applications being built today.
              </p>

              <div className="space-y-12">
                {/* AI Services */}
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h2 className="text-4xl font-bold italic text-black mb-6">AI Agent Services</h2>
                  <p className="text-xl text-black leading-relaxed mb-8">
                    Autonomous AI agents need to access various APIs and services dynamically. Traditional subscription 
                    models don't work because agents discover and use services on-demand, not through pre-negotiated contracts.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-black mb-4">Example Scenario</h3>
                  <div className="bg-white rounded-2xl p-8 mb-6">
                    <p className="text-lg text-black leading-relaxed mb-4">
                      An AI research agent is conducting market analysis. It needs to:
                    </p>
                    <ol className="space-y-3 text-lg text-black ml-6">
                      <li>1. Query a financial data API for stock prices ($0.01 per query)</li>
                      <li>2. Access sentiment analysis service for news articles ($0.05 per article)</li>
                      <li>3. Use image generation for creating charts ($0.10 per image)</li>
                      <li>4. Purchase historical market data ($0.50 per dataset)</li>
                    </ol>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-lg font-bold text-black">Total spent: $1.23 across 4 different services</p>
                      <p className="text-black mt-2">No subscriptions needed. Agent paid exactly what it used.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-black mb-3">Technical Implementation</h4>
                    <p className="text-black leading-relaxed">
                      The agent's wallet automatically signs micropayments for each API call. Services validate 
                      payment before processing. All happens in real-time, no human intervention required.
                    </p>
                  </div>
                </div>

                {/* IoT Infrastructure */}
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h2 className="text-4xl font-bold italic text-black mb-6">IoT Device Networks</h2>
                  <p className="text-xl text-black leading-relaxed mb-8">
                    Billions of IoT devices generate valuable data. x402 enables devices to monetize their data 
                    streams directly, selling to whoever needs it in real-time.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-black mb-4">Example Scenario</h3>
                  <div className="bg-white rounded-2xl p-8 mb-6">
                    <p className="text-lg text-black leading-relaxed mb-4">
                      A network of weather sensors deployed across a city:
                    </p>
                    <ul className="space-y-3 text-lg text-black ml-6">
                      <li>• Each sensor has its own BSC wallet</li>
                      <li>• Sells temperature/humidity data for $0.0001 per reading</li>
                      <li>• Agricultural companies query sensors near their farms</li>
                      <li>• Logistics companies check conditions along delivery routes</li>
                      <li>• Weather services aggregate data from hundreds of sensors</li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-lg font-bold text-black">1,000 readings/day × $0.0001 = $0.10/day per sensor</p>
                      <p className="text-black mt-2">Sensors generate revenue automatically 24/7</p>
                    </div>
                  </div>
                </div>

                {/* API Monetization */}
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h2 className="text-4xl font-bold italic text-black mb-6">API Monetization</h2>
                  <p className="text-xl text-black leading-relaxed mb-8">
                    Developers can monetize their APIs without complex billing systems. Pay-per-request pricing 
                    with automatic payment collection.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-black mb-4">Example Scenario</h3>
                  <div className="bg-white rounded-2xl p-8 mb-6">
                    <p className="text-lg text-black leading-relaxed mb-4">
                      A developer builds a specialized image processing API:
                    </p>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="text-black font-semibold">Traditional Model:</p>
                        <p className="text-black">Set up Stripe, create tiered pricing ($9/mo, $49/mo, $199/mo), manage subscriptions, handle cancellations</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="text-black font-semibold">x402 Model:</p>
                        <p className="text-black">Add 3 lines of code. Charge $0.02 per API call. Receive payment automatically.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Distribution */}
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h2 className="text-4xl font-bold italic text-black mb-6">Media & Content Distribution</h2>
                  <p className="text-xl text-black leading-relaxed mb-8">
                    Pay-per-view models for digital content without platform fees or subscription lock-in.
                  </p>
                  
                  <div className="bg-white rounded-2xl p-8">
                    <p className="text-lg text-black leading-relaxed mb-6">
                      Imagine a world where:
                    </p>
                    <ul className="space-y-4 text-lg text-black">
                      <li className="flex gap-3">
                        <span className="text-yellow-600 font-bold">→</span>
                        <span>Readers pay $0.05 per article instead of monthly subscriptions</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-yellow-600 font-bold">→</span>
                        <span>Musicians earn $0.001 per stream, paid instantly</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-yellow-600 font-bold">→</span>
                        <span>Course creators charge per video lesson ($0.50 each)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-yellow-600 font-bold">→</span>
                        <span>Game developers charge $0.25 per level instead of $60 upfront</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Compute & Storage */}
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h2 className="text-4xl font-bold italic text-black mb-6">Infrastructure Billing</h2>
                  <p className="text-xl text-black leading-relaxed mb-8">
                    True pay-per-use for cloud compute, storage, and bandwidth. No minimum charges, no reservation fees.
                  </p>
                  
                  <div className="bg-white rounded-2xl p-8">
                    <p className="text-lg text-black leading-relaxed mb-4">
                      Current cloud providers charge by the hour with complex pricing tiers. x402 enables:
                    </p>
                    <ul className="space-y-3 text-lg text-black ml-6">
                      <li>• $0.001 per second of compute time</li>
                      <li>• $0.0001 per GB of storage per hour</li>
                      <li>• $0.01 per GB of bandwidth</li>
                      <li>• Instant billing, no monthly statements</li>
                      <li>• Automatic payment as resources are consumed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10 mt-12">
                <h3 className="text-3xl font-bold mb-6">The Pattern</h3>
                <p className="text-xl leading-relaxed">
                  All these use cases share a common pattern: <strong>granular usage-based pricing made economically 
                  viable by eliminating payment overhead</strong>. When transaction costs are sub-cent, you can charge 
                  for things that were previously too small to meter.
                </p>
              </div>
            </div>
          </div>
        );

      // Add the remaining cases with similarly expanded content
      case 'getting-started':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Getting Started</h1>
            <div className="prose prose-xl max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-r-2xl mb-12">
                <h3 className="text-2xl font-bold text-black mb-3">Coming Soon</h3>
                <p className="text-xl text-black leading-relaxed">
                  The x402 SDK and infrastructure are currently in active development. Production release is 
                  scheduled for Q4 2025 (November-December 2025).
                </p>
              </div>

              <p className="text-2xl text-black leading-relaxed mb-12">
                This guide outlines what the integration experience will look like once the SDK is released. 
                You can follow development progress on our GitHub repositories.
              </p>

              <h2 className="text-4xl font-bold italic text-black mb-6">Prerequisites</h2>
              <div className="bg-gray-50 rounded-2xl p-8 mb-10">
                <ul className="space-y-3 text-lg text-black">
                  <li>• Node.js 18+ installed</li>
                  <li>• A BSC wallet (MetaMask or Rabby)</li>
                  <li>• Basic understanding of TypeScript/JavaScript</li>
                  <li>• SOL for transaction fees (~$0.00025 per transaction)</li>
                </ul>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-6">Installation (Post-Launch)</h2>
              <div className="bg-black rounded-2xl p-6 mb-10">
                <pre className="text-white text-lg font-mono">{`# Install via NPM (available after November 2025)
npm install @xgrain402/sdk

# Or using yarn
yarn add @xgrain402/sdk

# Or using pnpm
pnpm add @xgrain402/sdk`}</pre>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-6">Quick Start Example</h2>
              <div className="space-y-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Step 1: Initialize the SDK</h3>
                  <div className="bg-white rounded-xl p-6">
                    <pre className="text-sm font-mono text-black">{`import { XGrain402 } from '@xgrain402/sdk';

const xgrain = new XGrain402({
  network: 'mainnet-beta',
  rpcUrl: process.env.BSC_RPC_URL
});`}</pre>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Step 2: Protect Your Endpoint</h3>
                  <div className="bg-white rounded-xl p-6">
                    <pre className="text-sm font-mono text-black">{`app.get('/api/premium', 
  xgrain.requirePayment({ amount: 0.001 }),
  (req, res) => {
    res.json({ data: 'Premium content!' });
  }
);`}</pre>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Step 3: Test and Deploy</h3>
                  <p className="text-lg text-black mb-4">
                    Test locally, then deploy. The SDK handles wallet connection, transaction signing, 
                    and payment validation automatically.
                  </p>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10 mt-12">
                <h3 className="text-2xl font-bold mb-4">Follow Development</h3>
                <p className="text-xl leading-relaxed mb-6">
                  Star the repositories on GitHub to get notified when the production SDK is released.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/xgrain402/xgrain402-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    SDK Repository →
                  </a>
                  <a 
                    href="https://github.com/xgrain402/xgrain402-scan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Explorer Repository →
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      // SDK Guide
      case 'sdk-guide':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">SDK Guide</h1>
            
            <div className="prose prose-xl max-w-none">
              <div className="flex items-center gap-4 mb-8">
                <a 
                  href="https://github.com/xgrain402/xgrain402-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
                >
                  View on GitHub →
                </a>
              </div>

              <p className="text-2xl text-black leading-relaxed mb-12">
                The xgrain402-sdk will be your gateway to integrating micropayments into any application. Currently in 
                active development on GitHub, the SDK is being built to provide seamless payment integration.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-12">
                <p className="text-lg font-semibold text-black mb-2">Development Status</p>
                <p className="text-lg text-black">
                  The SDK is currently in active development. The core infrastructure and public API will be released in Q4 2025.
                </p>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Planned Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-yellow-50 border-2 border-yellow-500 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-3">Wallet Adapter Integration</h3>
                  <p className="text-lg text-black leading-relaxed mb-4">
                    Native support for all BSC wallets through the standard Wallet Adapter interface.
                  </p>
                  <ul className="space-y-2 text-black">
                    <li>• MetaMask, Rabby</li>
                    <li>• Automatic wallet detection</li>
                    <li>• Connection state management</li>
                    <li>• Multi-wallet support</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-500 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-3">Transaction Management</h3>
                  <p className="text-lg text-black leading-relaxed mb-4">
                    Automatic handling of transaction lifecycle from creation to confirmation.
                  </p>
                  <ul className="space-y-2 text-black">
                    <li>• Automatic signing</li>
                    <li>• Retry logic</li>
                    <li>• Confirmation polling</li>
                    <li>• Error recovery</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-500 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-3">Middleware System</h3>
                  <p className="text-lg text-black leading-relaxed mb-4">
                    Configurable middleware for custom payment validation and processing logic.
                  </p>
                  <ul className="space-y-2 text-black">
                    <li>• Pre-payment hooks</li>
                    <li>• Post-payment callbacks</li>
                    <li>• Custom validation</li>
                    <li>• Extensible architecture</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-500 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-3">Type Safety</h3>
                  <p className="text-lg text-black leading-relaxed mb-4">
                    Full TypeScript support with comprehensive type definitions.
                  </p>
                  <ul className="space-y-2 text-black">
                    <li>• IntelliSense support</li>
                    <li>• Compile-time checks</li>
                    <li>• Auto-completion</li>
                    <li>• Type inference</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Development Setup</h2>
              
              <div className="bg-black rounded-2xl p-8 mb-12">
                <pre className="text-white text-lg font-mono">{`# Clone the repository
git clone https://github.com/xgrain402/xgrain402-sdk
cd xgrain402-sdk

# Install dependencies
pnpm install

# Build
pnpm build

# Run tests
pnpm test`}</pre>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Configuration</h2>
              
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-4">Basic Setup</h3>
                  <div className="bg-black rounded-2xl p-6">
                    <pre className="text-white text-sm font-mono">{`import { XGrain402 } from '@xgrain402/sdk';

const xgrain = new XGrain402({
  network: 'mainnet-beta',
  rpcUrl: 'https://bsc-dataseed.binance.org'
});`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-black mb-4">Advanced Configuration</h3>
                  <div className="bg-black rounded-2xl p-6">
                    <pre className="text-white text-sm font-mono">{`const xgrain = new XGrain402({
  network: 'mainnet-beta',
  rpcUrl: process.env.BSC_RPC_URL,
  commitment: 'confirmed',
  confirmationTimeout: 30000,
  skipPreflight: false,
  preflightCommitment: 'processed'
});`}</pre>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Planned API Reference</h2>
              
              <p className="text-xl text-black leading-relaxed mb-8">
                The following API methods will be available in the production release. Full documentation will be 
                published alongside the Q4 2025 launch.
              </p>
              
              <div className="space-y-8">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">processPayment()</h3>
                  <p className="text-lg text-black mb-6">Process a payment transaction</p>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                    <pre className="text-sm font-mono text-black">{`await xgrain.processPayment({
  amount: 0.001,
  recipient: 'recipient_wallet_address',
  metadata: {
    service: 'api_call',
    endpoint: '/v1/data'
  }
});`}</pre>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-black mb-2">Parameters:</h4>
                    <ul className="text-black space-y-1">
                      <li>• <code className="bg-white px-2 py-1 rounded">amount</code> (number) - Payment amount in SOL</li>
                      <li>• <code className="bg-white px-2 py-1 rounded">recipient</code> (string) - Recipient wallet address</li>
                      <li>• <code className="bg-white px-2 py-1 rounded">metadata</code> (object) - Optional transaction metadata</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">validateTransaction()</h3>
                  <p className="text-lg text-black mb-6">Validate a transaction signature</p>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <pre className="text-sm font-mono text-black">{`const isValid = await xgrain.validateTransaction({
  signature: 'transaction_signature',
  expectedAmount: 0.001,
  expectedRecipient: 'recipient_address'
});`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">connectWallet()</h3>
                  <p className="text-lg text-black mb-6">Connect to a BSC wallet</p>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <pre className="text-sm font-mono text-black">{`const wallet = await xgrain.connectWallet({
  adapter: 'metamask',
  autoConnect: true
});`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10 mt-12">
                <h3 className="text-2xl font-bold mb-4">Join Development</h3>
                <p className="text-xl leading-relaxed mb-6">
                  The SDK is open source and actively being developed. Star the repository, follow progress, 
                  and contribute to shape the future of micropayments.
                </p>
                <a 
                  href="https://github.com/xgrain402/xgrain402-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Repository →
                </a>
              </div>
            </div>
          </div>
        );

      case 'explorer':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Explorer Platform</h1>
            
            <div className="prose prose-xl max-w-none">
              <div className="flex items-center gap-4 mb-8">
                <a 
                  href="https://github.com/xgrain402/xgrain402-scan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
                >
                  View on GitHub →
                </a>
                <Link
                  href="/explorer"
                  className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  Open Explorer →
                </Link>
              </div>

              <p className="text-2xl text-black leading-relaxed mb-12">
                xgrain402-scan will be the comprehensive analytics and monitoring platform for the x402 ecosystem. 
                Currently in development, the explorer is scheduled for public release in Q4 2025.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-12">
                <p className="text-lg font-semibold text-black mb-2">Development Status</p>
                <p className="text-lg text-black">
                  The Explorer is currently in active development. Public release is scheduled for Q4 2025 alongside the core infrastructure launch.
                </p>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Planned Features</h2>
              
              <div className="space-y-8 mb-12">
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-black mb-4">Real-Time Transaction Monitoring</h3>
                  <p className="text-xl text-black leading-relaxed mb-6">
                    Watch transactions flow through the network in real-time. Every x402 payment will be indexed and 
                    made searchable within seconds of confirmation.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-black mb-2">Live Feed</h4>
                      <p className="text-black">Stream of all network transactions</p>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-black mb-2">Search & Filter</h4>
                      <p className="text-black">Find specific transactions instantly</p>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-black mb-2">Transaction Details</h4>
                      <p className="text-black">Complete transaction metadata</p>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-black mb-2">Historical Data</h4>
                      <p className="text-black">Full transaction history</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-black mb-4">Facilitator Analytics</h3>
                  <p className="text-xl text-black leading-relaxed mb-6">
                    Track performance metrics for all network facilitators. Monitor who's processing payments, 
                    transaction volumes, and network health.
                  </p>
                  <ul className="space-y-3 text-lg text-black">
                    <li>• Transaction volume per facilitator</li>
                    <li>• Success rates and uptime monitoring</li>
                    <li>• Performance rankings</li>
                    <li>• Fee structures and pricing</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-black mb-4">Resource Discovery</h3>
                  <p className="text-xl text-black leading-relaxed mb-6">
                    Discover and explore x402-compatible BSC smart contracts. All validated resources will be automatically 
                    indexed and made available to the community.
                  </p>
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-black mb-3">Resource Submission</h4>
                    <p className="text-lg text-black mb-4">
                      Post-launch, developers will be able to submit x402-compatible programs through the explorer:
                    </p>
                    <ol className="space-y-2 text-black">
                      <li>1. Navigate to the Resources page</li>
                      <li>2. Submit the BSC smart contract address</li>
                      <li>3. System validates the x402 schema</li>
                      <li>4. Resource is automatically indexed</li>
                    </ol>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Technical Stack</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Frontend</h3>
                  <ul className="space-y-2 text-lg text-black">
                    <li>• Next.js 15 (App Router)</li>
                    <li>• React 19</li>
                    <li>• TypeScript 97.9%</li>
                    <li>• Tailwind CSS</li>
                    <li>• Framer Motion</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Backend</h3>
                  <ul className="space-y-2 text-lg text-black">
                    <li>• Prisma ORM</li>
                    <li>• PostgreSQL Database</li>
                    <li>• Trigger.dev Jobs</li>
                    <li>• BSC Web3.js</li>
                    <li>• Real-time indexing</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Local Development</h2>
              
              <div className="bg-black rounded-2xl p-8 mb-12">
                <pre className="text-white text-lg font-mono">{`# Clone the repository
git clone https://github.com/xgrain402/xgrain402-scan
cd xgrain402-scan

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev`}</pre>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-r-2xl">
                <h3 className="text-2xl font-bold text-black mb-3">Environment Variables</h3>
                <ul className="space-y-2 text-lg text-black">
                  <li>• <code className="bg-white px-2 py-1 rounded">DATABASE_URL</code> - PostgreSQL connection string</li>
                  <li>• <code className="bg-white px-2 py-1 rounded">BSC_RPC_URL</code> - BSC RPC endpoint</li>
                  <li>• <code className="bg-white px-2 py-1 rounded">NEXT_PUBLIC_NETWORK</code> - Network (mainnet-beta/devnet)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'ecosystem':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Ecosystem</h1>
            
            <div className="prose prose-xl max-w-none">
              <p className="text-2xl text-black leading-relaxed mb-12">
                The x402 ecosystem is growing rapidly. Developers, facilitators, and users are building the 
                infrastructure for the machine economy.
              </p>

              <h2 className="text-4xl font-bold italic text-black mb-8">Ecosystem Participants</h2>
              
              <div className="space-y-8 mb-12">
                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-black mb-4">Developers</h3>
                  <p className="text-xl text-black leading-relaxed mb-6">
                    Build applications that accept micropayments. Create APIs, services, and dApps that leverage 
                    x402 for frictionless monetization.
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-500 pl-6">
                      <h4 className="text-xl font-bold text-black mb-2">What You Can Build</h4>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• AI services and agent platforms</li>
                        <li>• Premium APIs with pay-per-request pricing</li>
                        <li>• IoT data marketplaces</li>
                        <li>• Content distribution platforms</li>
                        <li>• Infrastructure and compute services</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-6">
                      <h4 className="text-xl font-bold text-black mb-2">Getting Started</h4>
                      <p className="text-lg text-black">
                        Clone the SDK repository, integrate in 3 lines of code, and start accepting payments 
                        in minutes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-black mb-4">Facilitators</h3>
                  <p className="text-xl text-black leading-relaxed mb-6">
                    Operate payment processing infrastructure. Facilitators route transactions, validate payments, 
                    and earn fees for their services.
                  </p>
                  <div className="bg-white rounded-2xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-black mb-3">Facilitator Requirements</h4>
                    <ul className="space-y-2 text-lg text-black">
                      <li>• Valid BSC smart contract address</li>
                      <li>• x402-compatible schema implementation</li>
                      <li>• Reliable uptime and performance</li>
                      <li>• Proper error handling</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-black mb-3">How to Become a Facilitator</h4>
                    <ol className="space-y-2 text-lg text-black">
                      <li>1. Fork the xgrain402-scan repository</li>
                      <li>2. Add your facilitator to <code className="bg-gray-100 px-2 py-1 rounded">src/lib/facilitators</code></li>
                      <li>3. Submit a pull request</li>
                      <li>4. Your facilitator appears instantly once merged</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-black mb-4">Resource Providers</h3>
                  <p className="text-xl text-black leading-relaxed mb-6">
                    Submit x402-compatible BSC smart contracts for automatic indexing and discovery.
                  </p>
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-black mb-3">Resource Submission Process</h4>
                    <ol className="space-y-2 text-lg text-black">
                      <li>1. Navigate to the xgrain402-scan resources page</li>
                      <li>2. Submit your BSC smart contract address</li>
                      <li>3. System validates x402 schema compatibility</li>
                      <li>4. Valid resources are automatically indexed</li>
                      <li>5. Resource becomes discoverable to the community</li>
                    </ol>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold italic text-black mb-8">Network Statistics</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center">
                  <p className="text-6xl font-bold text-black mb-3">2</p>
                  <p className="text-lg text-black">Open Source Repositories</p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center">
                  <p className="text-6xl font-bold text-black mb-3">∞</p>
                  <p className="text-lg text-black">Possibilities</p>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10">
                <h3 className="text-3xl font-bold mb-6">Join the Ecosystem</h3>
                <p className="text-xl leading-relaxed mb-8">
                  Whether you're building applications, running infrastructure, or contributing to the protocol, 
                  there's a place for you in the x402 ecosystem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/xgrain402"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    GitHub Organization
                  </a>
                  <a 
                    href="https://twitter.com/xgrain402"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Twitter / X
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div>
            <h1 className="text-6xl font-bold italic text-black mb-8">Roadmap</h1>
            
            <div className="prose prose-xl max-w-none">
              <p className="text-2xl text-black leading-relaxed mb-12">
                Our focused roadmap for launching x402 as the payment infrastructure for the machine economy. 
                We're building fast and shipping the core infrastructure in Q4 2025.
              </p>

              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <h2 className="text-4xl font-bold italic text-black">Q4 2025 - Core Infrastructure Launch 🌾</h2>
                  </div>
                  
                  <div className="ml-8 space-y-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Open Source Repositories</h3>
                      <p className="text-lg text-black leading-relaxed mb-4">
                        <strong>Status: Live on GitHub</strong>
                      </p>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• xgrain402-sdk repository</li>
                        <li>• xgrain402-scan repository</li>
                        <li>• Active development and community contributions</li>
                        <li>• Open source under permissive license</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Production SDK Release</h3>
                      <p className="text-lg text-black leading-relaxed mb-4">
                        <strong>Target: November 2025</strong>
                      </p>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• TypeScript SDK with full type definitions</li>
                        <li>• BSC wallet adapter integration</li>
                        <li>• Payment transaction creation and signing</li>
                        <li>• Transaction confirmation and validation</li>
                        <li>• NPM package publication</li>
                        <li>• Integration guides and examples</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Explorer Platform Launch</h3>
                      <p className="text-lg text-black leading-relaxed mb-4">
                        <strong>Target: November 2025</strong>
                      </p>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• Transaction indexing with Prisma and PostgreSQL</li>
                        <li>• Real-time monitoring dashboard</li>
                        <li>• Facilitator and resource tracking</li>
                        <li>• Public API endpoints</li>
                        <li>• Wallet authentication system</li>
                        <li>• Network analytics and metrics</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Core Protocol Infrastructure</h3>
                      <p className="text-lg text-black leading-relaxed mb-4">
                        <strong>Target: December 2025</strong>
                      </p>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• BSC smart contract deployment on mainnet</li>
                        <li>• x402 schema specification and standards</li>
                        <li>• On-chain transaction validation</li>
                        <li>• Facilitator registration and discovery</li>
                        <li>• Payment routing logic</li>
                        <li>• Production RPC and indexing infrastructure</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">First Wave Integration Partners</h3>
                      <p className="text-lg text-black leading-relaxed mb-4">
                        <strong>Target: December 2025</strong>
                      </p>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• 3-5 initial facilitators onboarded</li>
                        <li>• 10+ validated x402-compatible resources</li>
                        <li>• Early adopter program for developers</li>
                        <li>• Integration support and documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                    <h2 className="text-4xl font-bold italic text-black">Q1 2026 - Scale & Optimize</h2>
                  </div>
                  
                  <div className="ml-8 space-y-6">
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Developer Tools</h3>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• Python SDK for AI/ML integrations</li>
                        <li>• Rust SDK for high-performance applications</li>
                        <li>• CLI tools for testing and deployment</li>
                        <li>• Integration templates for popular frameworks</li>
                        <li>• Testing sandbox environment</li>
                        <li>• Developer documentation portal</li>
                      </ul>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Protocol Enhancements</h3>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• Batch transaction support</li>
                        <li>• Advanced payment routing algorithms</li>
                        <li>• Multi-signature capabilities</li>
                        <li>• Enhanced error handling and retry logic</li>
                        <li>• Performance monitoring and alerting</li>
                        <li>• Transaction memo and metadata support</li>
                      </ul>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Network Growth</h3>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• 15-20 active facilitators on mainnet</li>
                        <li>• 50+ indexed x402-compatible resources</li>
                        <li>• 10,000+ transactions processed</li>
                        <li>• Developer community programs</li>
                        <li>• Facilitator incentive structure</li>
                        <li>• Resource provider rewards</li>
                      </ul>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Analytics & Monitoring</h3>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• Advanced transaction analytics dashboard</li>
                        <li>• Network health and uptime monitoring</li>
                        <li>• Facilitator performance leaderboards</li>
                        <li>• Fee optimization recommendations</li>
                        <li>• Historical data and trend analysis</li>
                        <li>• Custom alerts and notifications</li>
                      </ul>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-black mb-3">Ecosystem Development</h3>
                      <ul className="space-y-2 text-lg text-black">
                        <li>• Reference implementations for common use cases</li>
                        <li>• Integration with major AI platforms</li>
                        <li>• IoT device payment templates</li>
                        <li>• API monetization starter kits</li>
                        <li>• Community governance framework</li>
                        <li>• Developer grants program</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white rounded-3xl p-10 mt-12">
                <h3 className="text-3xl font-bold mb-6">The Vision</h3>
                <p className="text-2xl leading-relaxed mb-6">
                  By end of Q1 2026, x402 will be a robust micropayment infrastructure on BSC (Binance Smart Chain), enabling 
                  seamless transactions between AI agents, IoT devices, and APIs with negligible fees and 
                  sub-second finality.
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  We're building the economic layer for autonomous systems—where machines can transact 
                  freely without human intervention.
                </p>
                <p className="text-lg leading-relaxed text-yellow-500">
                  <strong>Current Focus:</strong> Completing SDK and Explorer for November 2025 launch, 
                  followed by mainnet protocol deployment in December 2025.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors">
              <Image 
                src="/logo.png" 
                alt="xgrain402 Logo" 
                width={28} 
                height={28}
                priority
              />
            </div>
            <h1 className="text-xl font-semibold italic text-black">
              xgrain402
            </h1>
          </Link>
          
          <Link 
            href="/"
            className="px-4 py-2 text-sm font-medium text-black hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex max-w-[1800px] mx-auto pt-20">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] border-r border-gray-200 bg-white overflow-y-auto">
          <nav className="p-6">
            <h2 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Documentation</h2>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-gray-100'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 px-12 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
