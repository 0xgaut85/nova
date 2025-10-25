'use client';

import { http, createConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Configure chains
export const chains = [bsc, bscTestnet] as const;

// Configure wagmi with BSC support
export const config = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    // Injected connector handles both MetaMask and Rabby
    // Both wallets inject themselves as window.ethereum
    injected({
      target: {
        id: 'injected',
        name: 'MetaMask / Rabby',
        provider: (window) => window?.ethereum,
      },
    }),
  ],
  transports: {
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
  },
});

