import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-middleware-cache',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'explorer.xgrain402.xyz',
            },
          ],
          destination: '/explorer/:path*',
        },
      ],
      afterFiles: [
        // Don't rewrite static assets
        {
          source: '/_next/static/:path*',
          has: [
            {
              type: 'host',
              value: 'explorer.xgrain402.xyz',
            },
          ],
          destination: '/_next/static/:path*',
        },
        {
          source: '/_next/image/:path*',
          has: [
            {
              type: 'host',
              value: 'explorer.xgrain402.xyz',
            },
          ],
          destination: '/_next/image/:path*',
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;


