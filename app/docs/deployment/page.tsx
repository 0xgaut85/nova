'use client';

import Link from 'next/link';

export default function DeploymentPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Deployment Guide
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        Deploy your x402-enabled service to production and list it on the Dock402 marketplace.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">Production Checklist</h2>
        <ul className="text-sm text-black/80 space-y-1 m-0">
          <li>• Switch from testnet to mainnet</li>
          <li>• Configure environment variables</li>
          <li>• Set up monitoring and logging</li>
          <li>• Deploy to hosting provider</li>
          <li>• Register on Dock402 marketplace</li>
        </ul>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Environment Configuration</h2>

      <p className="text-sm text-black/80 mb-4">
        Update your environment variables for production:
      </p>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 not-prose overflow-x-auto">
        <pre className="whitespace-pre-wrap">
{`# Production Environment
NODE_ENV=production

# Wallet address to receive payments
WALLET_ADDRESS=0xYourMainnetWalletAddress

# Network (switch from testnet to mainnet)
NETWORK=base  # was base-sepolia

# Facilitator
FACILITATOR_URL=https://facilitator.payai.network

# Required for Base mainnet
CDP_API_KEY_ID=your_coinbase_developer_platform_key
CDP_API_KEY_SECRET=your_coinbase_developer_platform_secret

# Optional: Custom RPC for better performance
BASE_RPC_URL=https://mainnet.base.org
# or use a paid RPC like Alchemy/Infura
# BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY`}
        </pre>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Hosting Options</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Vercel</h3>
          <p className="text-sm text-black/80 mb-3">Best for Next.js and serverless APIs</p>
          <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90">
            <code>vercel deploy --prod</code>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Railway</h3>
          <p className="text-sm text-black/80 mb-3">Simple deployment for any stack</p>
          <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90">
            <code>railway up</code>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Fly.io</h3>
          <p className="text-sm text-black/80 mb-3">Global edge deployment</p>
          <div className="bg-[#1E1E1E] rounded-lg p-3 font-mono text-xs text-white/90">
            <code>fly deploy</code>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">AWS / GCP</h3>
          <p className="text-sm text-black/80 mb-3">Full control with cloud providers</p>
          <p className="text-xs text-black/50 m-0">Use ECS, Lambda, Cloud Run, etc.</p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Docker Deployment</h2>

      <p className="text-sm text-black/80 mb-4">
        Containerize your service for consistent deployments:
      </p>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-4">
        <h3 className="text-sm font-light italic text-black mb-3">Dockerfile</h3>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]`}
          </pre>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-8">
        <h3 className="text-sm font-light italic text-black mb-3">Build & Run</h3>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose">
          <pre className="whitespace-pre-wrap">
{`# Build image
docker build -t my-x402-service .

# Run container
docker run -d \\
  -p 3000:3000 \\
  -e WALLET_ADDRESS=0x... \\
  -e NETWORK=base \\
  -e CDP_API_KEY_ID=... \\
  -e CDP_API_KEY_SECRET=... \\
  my-x402-service`}
          </pre>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Performance Optimization</h2>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Use Paid RPC</h3>
          <p className="text-sm text-black/80">
            Free public RPCs have rate limits. Use Alchemy, Infura, or QuickNode for production.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Cache Payment Verifications</h3>
          <p className="text-sm text-black/80">
            Cache verified transactions to avoid redundant blockchain queries.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Enable Compression</h3>
          <p className="text-sm text-black/80">
            Use gzip/brotli compression to reduce response sizes and improve speed.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Set Timeouts</h3>
          <p className="text-sm text-black/80">
            Configure appropriate timeouts for facilitator calls to prevent hanging requests.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Monitoring & Logging</h2>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 overflow-x-auto not-prose">
        <pre className="whitespace-pre-wrap">
{`// Add logging to track payments
app.use(
  paymentMiddleware(
    walletAddress,
    routes,
    {
      url: facilitatorUrl,
      onPaymentReceived: (txHash, amount, network) => {
        console.log(\`Payment received: \${amount} on \${network}\`);
        console.log(\`Transaction: \${txHash}\`);
        
        // Send to analytics
        analytics.track('payment_received', {
          txHash,
          amount,
          network,
          timestamp: Date.now()
        });
      },
      onPaymentFailed: (error, txHash) => {
        console.error(\`Payment failed: \${error}\`);
        
        // Alert on failures
        errorTracking.captureException(error);
      }
    }
  )
);`}
        </pre>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Register on Dock402</h2>

      <p className="text-sm text-black/80 mb-4">
        Once your service is deployed, register it on the marketplace:
      </p>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              1
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Visit Marketplace</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Go to <Link href="/dapp" className="text-[#FF7B00] hover:text-[#FF9500]">Dock402 marketplace</Link> and click "Register Service"
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              2
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Fill Service Details</h3>
          </div>
          <ul className="text-sm text-black/80 space-y-1 m-0 pl-10">
            <li>• Service name and description</li>
            <li>• API endpoint URL</li>
            <li>• Pricing information</li>
            <li>• Category and tags</li>
          </ul>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-xs font-light italic">
              3
            </div>
            <h3 className="text-sm font-light italic text-black m-0">Test & Publish</h3>
          </div>
          <p className="text-sm text-black/80 m-0 pl-10">
            Verify your service works correctly, then publish to the marketplace
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Security Best Practices</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Environment Variables</h3>
          <p className="text-sm text-black/80">
            Never commit secrets to git. Use environment variables or secret managers.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Rate Limiting</h3>
          <p className="text-sm text-black/80">
            Implement rate limiting to prevent abuse even after payment verification.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">HTTPS Only</h3>
          <p className="text-sm text-black/80">
            Always use HTTPS in production to protect payment headers and data.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">Input Validation</h3>
          <p className="text-sm text-black/80">
            Validate and sanitize all inputs even for paid endpoints.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose">
        <h3 className="text-lg font-light italic mb-2">Ready to Launch?</h3>
        <p className="text-sm opacity-90 mb-4">
          Deploy your service and start earning from x402 payments.
        </p>
        <div className="flex gap-3">
          <Link
            href="/dapp"
            className="px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
          >
            Register Service
          </Link>
          <Link
            href="/docs"
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-light italic hover:bg-white/20 transition-all"
          >
            Back to Docs
          </Link>
        </div>
      </div>
    </div>
  );
}

