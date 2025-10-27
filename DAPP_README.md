# Nova402 - The App Store for x402

![Nova402](public/logo.png)

**The first real marketplace for x402-enabled AI services and APIs**

Live at: [Your Domain Here]

## 🌟 What is Nova402?

Nova402 is the **App Store for x402 protocol** - a revolutionary marketplace where developers can discover, test, and use AI services with instant micropayments. Built on PayAI's x402 infrastructure, we enable **real blockchain payments** for API usage without subscriptions or accounts.

## 🚀 Features

### For Users
- **Browse Live x402 Services**: Discover AI agents, APIs, and tools from the x402 ecosystem
- **Test for Free**: Use PayAI's Echo Merchant to test x402 protocol without cost
- **Pay Per Request**: Real USDC/SOL payments on Base and Solana networks
- **Instant Access**: No accounts, no subscriptions - just connect wallet and pay
- **Code Generation**: Get integration snippets for any service
- **Transaction History**: Track all your x402 payments on-chain

### For Developers
- **Register Services**: List your x402-enabled API in the marketplace
- **Monetize APIs**: Earn USDC/SOL for every request to your service
- **Integration Tools**: Complete x402 middleware setup guides
- **Revenue Analytics**: Track earnings and service usage
- **Multi-Network Support**: Deploy on Base, Solana, or both

## 🔧 Technology Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Blockchain**: Base (Mainnet/Sepolia) + Solana (Mainnet/Devnet)
- **Payments**: USDC on Base, SOL on Solana
- **Wallet**: Wagmi + RainbowKit + Coinbase Wallet
- **Protocol**: PayAI x402 Infrastructure
- **Styling**: Tailwind CSS
- **3D**: Three.js + React Three Fiber

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Nova402.git
cd Nova402

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

## 🌐 Environment Variables

```bash
# PayAI x402 Configuration
PAYAI_FACILITATOR_URL=https://facilitator.payai.network
ECHO_MERCHANT_BASE_URL=https://x402.payai.network
SUPPORTED_NETWORKS=base,base-sepolia,solana-mainnet,solana-devnet

# Your platform wallet address (receives payments)
NEXT_PUBLIC_PLATFORM_ADDRESS=0x...

# Optional: Coinbase Developer Platform (for Base mainnet)
CDP_API_KEY_ID=your_key_id
CDP_API_KEY_SECRET=your_key_secret
```

## 🎯 How It Works

### The x402 Protocol

x402 extends HTTP with the `402 Payment Required` status code, enabling:
1. **Initial Request** → Service returns HTTP 402 with payment details
2. **Payment Processing** → User sends USDC/SOL via blockchain
3. **Content Delivery** → Service validates payment and returns content

### Real Infrastructure Integration

- **Live Service Discovery**: Connects to `https://facilitator.payai.network/list`
- **Echo Merchant Testing**: Real HTTP 402 testing at `https://x402.payai.network`
- **Blockchain Payments**: Actual USDC transfers on Base network
- **Transaction Verification**: Real-time blockchain confirmations

## 📚 Key Components

### PayAI Client (`lib/payai-client.ts`)
- Interfaces with PayAI facilitator API
- Discovers live x402 services
- Handles payment verification and settlement
- Connects to Echo Merchant for testing

### Real Payment Handler (`app/components/x402/RealPaymentHandler.tsx`)
- Actual USDC payment processing
- Wallet transaction signing with Wagmi
- Blockchain confirmation tracking
- Transaction explorer links

### Service Registration (`app/components/x402/ServiceRegistration.tsx`)
- Developer service submission
- Validation and approval workflow
- Multi-network configuration
- Payment recipient setup

### Testing Interface (`app/components/x402/TestingInterface.tsx`)
- Real Echo Merchant integration
- Live HTTP 402 demonstration
- Actual API calls to PayAI infrastructure
- Network status monitoring

## 🔗 Supported Networks

| Network | Chain ID | Currency | Use Case |
|---------|----------|----------|----------|
| Base Mainnet | 8453 | USDC | Production payments |
| Base Sepolia | 84532 | USDC | Testing & development |
| Solana Mainnet | 101 | SOL/USDC | Production payments |
| Solana Devnet | 103 | SOL | Testing & development |

## 💳 USDC Contract Addresses

- **Base Mainnet**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Base Sepolia**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

## 🛠️ For Developers: Registering Your Service

### 1. Implement x402 Middleware

```typescript
// Express Example
import { paymentMiddleware } from 'x402-express';

app.use(paymentMiddleware(
  'YOUR_WALLET_ADDRESS',
  {
    'GET /api/service': {
      price: '$0.01',
      network: 'base-sepolia',
    }
  },
  { url: 'https://facilitator.payai.network' }
));
```

### 2. Register on Nova402

1. Connect your wallet to Nova402
2. Click "Register Service" button
3. Fill in service details
4. Submit for review (approved within 24 hours)

### 3. Start Earning

Once approved, users can discover and pay for your service directly through the marketplace!

## 📊 Real Usage Metrics

All payments and interactions are:
- ✅ **Real blockchain transactions**
- ✅ **Verifiable on block explorers**
- ✅ **Instant settlements**
- ✅ **No intermediaries**

## 🔐 Security

- All payments are non-custodial (direct wallet-to-wallet)
- Smart contract interactions are transparent
- Transaction verification on-chain
- No private keys stored
- Open source code

## 🌍 Ecosystem Integration

Nova402 integrates with the complete PayAI ecosystem:

- **PayAI Facilitator**: Service discovery and payment coordination
- **Echo Merchant**: Protocol testing and validation
- **Freelance AI**: AI agent marketplace integration (coming soon)
- **CT Agent Monetization**: Content creator tools (coming soon)

## 📖 Documentation

- [PayAI x402 Protocol](https://docs.payai.network/x402)
- [Express Integration](https://docs.payai.network/x402/servers/typescript/express)
- [Client Libraries](https://docs.payai.network/x402/clients)
- [Facilitator API](https://docs.payai.network/x402/facilitators)

## 🤝 Contributing

We welcome contributions! Areas for improvement:

- Additional network support (Polygon, Arbitrum, etc.)
- Service categories and filtering
- User reviews and ratings
- Analytics dashboard enhancements
- Payment history persistence
- Service health monitoring

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Website**: [Your Domain]
- **Twitter**: [@xNova402](https://x.com/xNova402)
- **GitHub**: [github.com/nova402](https://github.com/nova402)
- **Explorer**: [explorer.nova402.com](https://explorer.nova402.com)
- **PayAI Docs**: [docs.payai.network](https://docs.payai.network)

## 💬 Support

- Telegram: [Join our Telegram](https://t.me/xnova402)
- Twitter: [@xNova402](https://x.com/xNova402)
- Email: support@nova402.com

---

**Built with ❤️ using PayAI's x402 Protocol**

*Nova402 - Making micropayments accessible for everyone*
