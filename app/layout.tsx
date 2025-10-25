import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "xGrain402",
  description: "Per-request micropayments for APIs & AI agents on BSC (Binance Smart Chain) using the 402 standard. Instant settlement in USDC/SOL. No accounts, no subscriptions.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "xGrain402",
    description: "Per-request micropayments for APIs & AI agents on BSC (Binance Smart Chain) using the 402 standard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={garamond.className}>{children}</body>
    </html>
  );
}
