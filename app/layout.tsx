import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "./components/WalletProvider";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Dock402",
  description: "Discover, test, and integrate AI services using the revolutionary x402 payment protocol. Pay per request with instant settlements on Base and Solana networks.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Dock402",
    description: "Discover, test, and integrate AI services using the revolutionary x402 payment protocol. Pay per request with instant settlements.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
