import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "./components/WalletProvider";

export const metadata: Metadata = {
  title: "Lumen402 - Unlocking the Next Economy of APIs",
  description: "Unlocking the next economy of APIs, AI and digital services through x402 pay-per-request rails. Build and deploy pay-per-request services with instant on-chain micropayments.",
  icons: {
    icon: '/logoblack.png',
    shortcut: '/logoblack.png',
    apple: '/logoblack.png',
  },
  openGraph: {
    title: "Lumen402 - Unlocking the Next Economy of APIs",
    description: "Unlocking the next economy of APIs, AI and digital services through x402 pay-per-request rails. Build and deploy pay-per-request services with instant on-chain micropayments.",
    images: ['/logoblack.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumen402 - Unlocking the Next Economy of APIs",
    description: "Unlocking the next economy of APIs, AI and digital services through x402 pay-per-request rails.",
    images: ['/logoblack.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
