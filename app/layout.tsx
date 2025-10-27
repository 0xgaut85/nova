import type { Metadata } from "next";
import { headers } from 'next/headers';
import "./globals.css";
import { WalletProvider } from "./components/WalletProvider";

export const metadata: Metadata = {
  title: "Nova402",
  description: "x402 protocol infrastructure. Every API call becomes an instant micropayment—pay-per-request with no subscriptions.",
  icons: {
    icon: '/logox.png',
    shortcut: '/logox.png',
    apple: '/logox.png',
  },
  openGraph: {
    title: "Nova402",
    description: "x402 protocol infrastructure. Every API call becomes an instant micropayment—pay-per-request with no subscriptions.",
    images: ['/logox.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nova402",
    description: "x402 protocol infrastructure. Every API call becomes an instant micropayment—pay-per-request with no subscriptions.",
    images: ['/logox.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          .wallet-adapter-button {
            background-color: rgba(178, 169, 98, 0.1) !important;
            color: #b2a962 !important;
            border: 1px solid rgba(178, 169, 98, 0.3) !important;
          }
          .wallet-adapter-button:hover {
            background-color: rgba(178, 169, 98, 0.2) !important;
          }
          .wallet-adapter-modal {
            background: #0a0a0a !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .wallet-adapter-modal-title {
            color: white !important;
          }
          .wallet-adapter-modal-list-item {
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .wallet-adapter-modal-list-item:hover {
            background: rgba(178, 169, 98, 0.1) !important;
            border-color: rgba(178, 169, 98, 0.3) !important;
          }
        `}} />
      </head>
      <body className="antialiased">
        <WalletProvider cookies={cookies}>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
