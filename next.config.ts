import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // When accessing from explorer subdomain, rewrite root to /explorer
        {
          source: '/',
          destination: '/explorer',
          has: [
            {
              type: 'host',
              value: 'explorer.xgrain402.xyz',
            },
          ],
        },
      ],
    };
  },
};

export default nextConfig;



