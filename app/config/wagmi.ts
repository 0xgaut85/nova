'use client';

import { http, createConfig } from 'wagmi';
import { base, baseSepolia, bsc, bscTestnet } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';

// Configure chains - Adding Base networks for x402 support
export const chains = [base, baseSepolia, bsc, bscTestnet] as const;

// Configure wagmi with Base and BSC support for x402 payments
export const config = createConfig({
  chains: [base, baseSepolia, bsc, bscTestnet],
  connectors: [
    // Injected connector for MetaMask and Rabby
    injected({
      target: {
        id: 'injected',
        name: 'MetaMask / Rabby',
        provider: (window) => window?.ethereum,
      },
    }),
    // Coinbase Wallet for Base network optimization
    coinbaseWallet({
      appName: 'Lumen402',
      appLogoUrl: '/logo.png',
    }),
  ],
  transports: {
    // Base networks for x402 payments
    [base.id]: http('https://mainnet.base.org'),
    [baseSepolia.id]: http('https://sepolia.base.org'),
    // BSC networks (existing)
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
  },
});

