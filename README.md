# @nova402/x402-sdk

*Multi-chain x402 payment infrastructure for the decentralized web*

The Nova402 x402 SDK provides production-ready payment processing capabilities built for multiple high-performance blockchains. This SDK enables developers to integrate sophisticated microtransaction functionality into web applications, supporting automated payment flows with HTTP 402 Payment Required protocol.

## Overview

Nova402's x402 SDK delivers comprehensive tooling for implementing payment-gated resources across multiple blockchain networks. Applications can leverage automated transaction processing, multi-wallet compatibility, and enterprise-grade security features without complex blockchain integrations.

**Core Capabilities:**
- **Multi-Chain Support**: Base, Solana, Polygon, BSC, Sei, and Peaq
- Automated HTTP 402 payment interception and processing
- Multi-wallet adapter compatibility (MetaMask, Phantom, RainbowKit)
- Type-safe TypeScript implementation with comprehensive validation
- Framework-agnostic architecture supporting major web frameworks
- Production-optimized performance with sub-second transaction finality
- Comprehensive audit trails and compliance logging

## Installation

Add the Nova402 x402 SDK to your project:

```bash
npm install @nova402/x402-sdk
# or
yarn add @nova402/x402-sdk  
# or
pnpm add @nova402/x402-sdk
```

## Quick Start

### Client-Side Integration

Implement automatic payment handling in browser environments:

```typescript
import { createX402Client } from '@nova402/x402-sdk/client';
import { useAccount } from 'wagmi';

export function usePaymentClient() {
  const { address, signTransaction } = useAccount();

  const client = createX402Client({
    wallet: { 
      address: address, 
      signTransaction 
    },
    network: 'base-mainnet', // or 'solana-mainnet', 'polygon', etc.
    maxAmount: '1000000', // 1 USDC (6 decimals)
  });

  const requestPaidResource = async (endpoint: string, options?: RequestInit) => {
    return await client.fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  };

  return { requestPaidResource };
}
```

### Server-Side Configuration

Configure payment verification and settlement on your backend:

```typescript
import { X402PaymentProcessor } from '@nova402/x402-sdk/server';
import { Request, Response } from 'express';

const processor = new X402PaymentProcessor({
  network: 'base-mainnet',
  treasuryWallet: process.env.TREASURY_WALLET_ADDRESS!,
  facilitatorEndpoint: 'https://facilitator.payai.network',
});

export async function handlePaymentGatedEndpoint(req: Request, res: Response) {
  const incomingPayment = processor.extractPayment(req.headers);
  
  const paymentSpec = await processor.createPaymentRequirements({
    price: {
      amount: "10000", // 0.01 USDC (6 decimals)
      asset: {
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" // USDC on Base
      }
    },
    network: 'base-mainnet',
    config: {
      description: 'API Access Fee',
      resource: req.url,
    }
  });
  
  if (!incomingPayment) {
    const paymentRequest = processor.createPaymentRequest(paymentSpec);
    return res.status(402).json(paymentRequest);
  }

  const verified = await processor.verifyPayment(incomingPayment, paymentSpec);
  if (!verified) {
    return res.status(402).json({ error: 'Invalid payment' });
  }

  // Execute protected business logic
  const result = await processProtectedOperation(req.body);
  
  // Complete payment settlement
  await processor.settlePayment(incomingPayment, paymentSpec);
  
  res.json({ data: result });
}
```

## Supported Networks

| Network | Chain ID | Status | Currency |
|---------|----------|--------|----------|
| Base Mainnet | 8453 | ✅ Live | USDC |
| Base Sepolia | 84532 | ✅ Testnet | USDC |
| Solana Mainnet | solana-mainnet | 🔜 Coming Soon | USDC, SOL |
| Solana Devnet | solana-devnet | 🔜 Coming Soon | USDC, SOL |
| Polygon | 137 | 🔜 Coming Soon | USDC |
| BSC | 56 | 🔜 Coming Soon | USDC, BNB |
| Sei | 1329 | 🔜 Coming Soon | USDC |
| Peaq | 3338 | 🔜 Coming Soon | USDC |

## Project Structure

```
@nova402/x402-sdk/
├── client/
│   ├── payment-interceptor.ts    # Automatic HTTP 402 detection
│   ├── transaction-builder.ts    # Multi-chain transaction assembly
│   └── wallet-adapter.ts         # Universal wallet interface
├── server/  
│   ├── payment-processor.ts      # Payment validation engine
│   ├── facilitator-client.ts     # PayAI network integration
│   └── middleware.ts             # Framework integration utilities  
├── types/
│   ├── x402-protocol.ts          # HTTP 402 protocol definitions
│   ├── chain-types.ts            # Multi-chain type definitions
│   └── payment-types.ts          # Payment interface contracts
└── utils/
    ├── crypto.ts                 # Cryptographic operations
    ├── validation.ts             # Input sanitization
    └── conversion.ts             # Multi-currency handling
```

## Configuration

### Environment Variables

```bash
# Network Settings
NEXT_PUBLIC_CHAIN_NETWORK=base-mainnet
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# Payment Processing
TREASURY_WALLET_ADDRESS=your_treasury_address
FACILITATOR_ENDPOINT=https://facilitator.payai.network

# Application Config  
NEXT_PUBLIC_BASE_URL=https://your-application.com
X402_MAX_PAYMENT_AMOUNT=1000000
```

### Supported Tokens

```typescript
// USDC on Base
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

// USDC on Polygon
const USDC_POLYGON = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

// USDC on BSC
const USDC_BSC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";

const paymentConfiguration = {
  price: {
    amount: "10000", // 0.01 USDC (6 decimals)
    asset: { address: USDC_BASE }
  },
  network: 'base-mainnet'
};
```

## Security

**Cryptographic Security:**
- End-to-end encryption for all payment communications
- Non-custodial architecture - applications never control user funds  
- Complete audit logging for regulatory compliance
- Built-in rate limiting and abuse prevention
- Cryptographic signature verification for payment authenticity
- Multi-chain security best practices

## Wallet Compatibility

| Provider | EVM Chains | Solana | Features |
|----------|------------|--------|----------|
| MetaMask | ✅ | ❌ | Mobile support, auto-approval |
| Phantom | ❌ | ✅ | Mobile-first, Multi-chain |
| RainbowKit | ✅ | ❌ | Beautiful UI, Multiple wallets |
| Coinbase Wallet | ✅ | ✅ | Native integration |
| WalletConnect | ✅ | ✅ | Universal connection |

## Testing

```bash
npm run test              # Unit tests
npm run test:integration  # Integration tests  
npm run test:e2e          # End-to-end tests
```

## Performance

**Network Performance:**
- Transaction confirmation: < 3 seconds average on Base
- Transaction cost: ~$0.01-0.05 per operation
- Network uptime: 99.9%+ availability
- Payment verification latency: Sub-100ms

## Advanced Features

### Custom Payment Processing

```typescript
const advancedClient = createX402Client({
  wallet,
  network: 'base-mainnet',
  customRPC: 'https://mainnet.base.org',
  retryPolicy: {
    attempts: 5,
    backoff: 'exponential'
  },
  middleware: [
    metricsMiddleware,
    validationMiddleware
  ]
});
```

### Batch Transaction Processing

```typescript
const batchOperations = await x402.processBatch([
  { endpoint: '/api/data-processing', amount: '10000' },
  { endpoint: '/api/content-access', amount: '5000' },
  { endpoint: '/api/computation-task', amount: '2500' }
]);
```

## Framework Support

Compatible with modern web development stacks:

**Frontend:** Next.js, React, Vue.js, Svelte, Solid  
**Backend:** Express.js, Fastify, NestJS, Koa.js, Hono  
**Runtime:** Node.js, Bun, Deno, Edge Runtime, Serverless  
**Blockchain:** Native multi-chain dApp compatibility

## Use Cases

**AI Services:** Per-request AI model inference and API access  
**Media Distribution:** Pay-per-view content and streaming  
**IoT Micropayments:** Machine-to-machine payment automation  
**API Monetization:** Usage-based billing for developers  
**Gaming:** In-game microtransactions and rewards

## Development

```bash
git clone https://github.com/nova402/nova402
cd nova402
npm install
npm run build  
npm test
```

## Resources

- **Documentation:** [nova402.com/docs](https://nova402.com/docs)
- **GitHub:** [github.com/nova402/nova402](https://github.com/nova402/nova402)
- **Twitter:** [@xNova402](https://x.com/xNova402)
- **Website:** [nova402.com](https://nova402.com)

## License

MIT License - see [LICENSE](LICENSE) for details

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Nova402** - The App Store for x402. Built on the HTTP 402 Payment Required standard.

*Powered by [PayAI Network](https://payai.network) facilitator infrastructure*
