'use client';

import Link from 'next/link';

export default function ExpressServerPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Express.js Server
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        Start accepting x402 payments in your Express server in minutes. Build a monetized API with just a few lines of code.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">Quick Start</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          Use the PayAI Express starter template to bootstrap a ready-to-run x402-enabled server. 
          No payment infrastructure needed - just add your wallet address and start earning.
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Step 1: Create Project</h2>

      <p className="text-sm text-black/80 mb-4">
        Use your favorite package manager to create a new server from the starter template:
      </p>

      <div className="space-y-3 mb-8 not-prose">
        <div>
          <p className="text-xs font-light italic text-black/80 mb-2">npm (npx)</p>
          <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90">
            <code>npx @payai/x402-express-starter my-first-server</code>
          </div>
        </div>

        <div>
          <p className="text-xs font-light italic text-black/80 mb-2">pnpm</p>
          <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90">
            <code>pnpm dlx @payai/x402-express-starter my-first-server</code>
          </div>
        </div>

        <div>
          <p className="text-xs font-light italic text-black/80 mb-2">bun</p>
          <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90">
            <code>bunx @payai/x402-express-starter my-first-server</code>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Step 2: Configure Environment</h2>

      <p className="text-sm text-black/80 mb-4">
        Open your project's <code className="text-xs bg-black/5 px-2 py-1 rounded">.env</code> file and set:
      </p>

      <ul className="text-sm text-black/80 space-y-2 mb-4">
        <li>
          <code className="text-xs bg-black/5 px-2 py-1 rounded">FACILITATOR_URL</code> - Facilitator base URL (defaults to: https://facilitator.payai.network)
        </li>
        <li>
          <code className="text-xs bg-black/5 px-2 py-1 rounded">NETWORK</code> - Network to use (e.g., base-sepolia, base, solana)
        </li>
        <li>
          <code className="text-xs bg-black/5 px-2 py-1 rounded">ADDRESS</code> - Your wallet public address to receive payments
        </li>
      </ul>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 overflow-x-auto not-prose">
        <pre className="whitespace-pre-wrap break-all">
{`FACILITATOR_URL=https://facilitator.payai.network
NETWORK=base-sepolia # or base, solana, polygon
ADDRESS=0x... # your wallet public address

# Required if using Base mainnet facilitator
CDP_API_KEY_ID="Coinbase Developer Platform Key"
CDP_API_KEY_SECRET="Coinbase Developer Platform Key Secret"`}
        </pre>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Step 3: Server Code</h2>

      <p className="text-sm text-black/80 mb-4">
        This is the generated <code className="text-xs bg-black/5 px-2 py-1 rounded">index.ts</code>. 
        It loads your environment, applies the x402 payment middleware, and defines protected routes:
      </p>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 overflow-x-auto not-prose">
        <pre className="whitespace-pre-wrap">
{`import { config } from "dotenv";
import express from "express";
import { paymentMiddleware, Resource } from "x402-express";
config();

const facilitatorUrl = process.env.FACILITATOR_URL as Resource;
const payTo = process.env.ADDRESS as \`0x\${string}\`;

if (!facilitatorUrl || !payTo) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();

app.use(
  paymentMiddleware(
    payTo,
    {
      "GET /weather": {
        // USDC amount in dollars
        price: "$0.001",
        network: "base-sepolia",
      },
      "/premium/*": {
        // Define atomic amounts in any EIP-3009 token
        price: {
          amount: "100000",
          asset: {
            address: "0xabc",
            decimals: 18,
            eip712: {
              name: "WETH",
              version: "1",
            },
          },
        },
        network: "base-sepolia",
      },
    },
    {
      url: facilitatorUrl,
    },
  ),
);

app.get("/weather", (req, res) => {
  res.send({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.get("/premium/content", (req, res) => {
  res.send({
    content: "This is premium content",
  });
});

app.listen(4021, () => {
  console.log(\`Server listening at http://localhost:\${4021}\`);
});`}
        </pre>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Step 4: Run Your Server</h2>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 not-prose">
        <code>npm run dev</code>
      </div>

      <p className="text-sm text-black/80 mb-8">
        Your server is now accepting x402 payments! Test it by making a request to http://localhost:4021/weather
      </p>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">How It Works</h2>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">1. Client Requests Resource</h3>
          <p className="text-sm text-black/80 m-0">
            When a client calls a protected endpoint, the middleware intercepts the request.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">2. Server Returns 402</h3>
          <p className="text-sm text-black/80 m-0">
            The server responds with HTTP 402 and payment instructions in the headers.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">3. Client Pays</h3>
          <p className="text-sm text-black/80 m-0">
            The client creates and signs a blockchain transaction to your wallet address.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">4. Payment Verified</h3>
          <p className="text-sm text-black/80 m-0">
            The facilitator verifies the payment on-chain and the middleware allows the request through.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <h3 className="text-sm font-light italic text-black mb-2">5. Resource Delivered</h3>
          <p className="text-sm text-black/80 m-0">
            Your endpoint handler runs and returns the requested resource to the client.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Pricing Options</h2>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-4">
        <h3 className="text-sm font-light italic text-black mb-3">Dollar-Based Pricing</h3>
        <p className="text-sm text-black/80 mb-3">
          Simplest option - specify price in dollars and let the system handle conversion:
        </p>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose">
          <pre className="whitespace-pre-wrap">
{`"GET /weather": {
  price: "$0.001",
  network: "base-sepolia"
}`}
          </pre>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-8">
        <h3 className="text-sm font-light italic text-black mb-3">Token-Based Pricing</h3>
        <p className="text-sm text-black/80 mb-3">
          Define atomic amounts in any EIP-3009 token for more control:
        </p>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose">
          <pre className="whitespace-pre-wrap">
{`"/premium/*": {
  price: {
    amount: "100000",
    asset: {
      address: "0xabc...",
      decimals: 18,
      eip712: {
        name: "WETH",
        version: "1"
      }
    }
  },
  network: "base-sepolia"
}`}
          </pre>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Deploy to Production</h2>

      <p className="text-sm text-black/80 mb-4">
        To deploy your x402 server to production:
      </p>

      <ul className="text-sm text-black/80 space-y-2 mb-8">
        <li>Change <code className="text-xs bg-black/5 px-2 py-1 rounded">NETWORK</code> from <code className="text-xs bg-black/5 px-2 py-1 rounded">base-sepolia</code> to <code className="text-xs bg-black/5 px-2 py-1 rounded">base</code> (or your chosen mainnet)</li>
        <li>Add Coinbase Developer Platform API keys for Base mainnet</li>
        <li>Deploy to your hosting provider (Vercel, Railway, AWS, etc.)</li>
        <li>Register your service on Dock402 marketplace</li>
      </ul>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose">
        <h3 className="text-lg font-light italic mb-2">Next Steps</h3>
        <p className="text-sm opacity-90 mb-4">
          Learn how to consume x402 services from your client applications.
        </p>
        <div className="flex gap-3">
          <Link
            href="/docs/clients"
            className="px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
          >
            Client Integration
          </Link>
          <a
            href="https://github.com/payai-network/x402-express-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-light italic hover:bg-white/20 transition-all"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}


