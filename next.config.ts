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
};

export default nextConfig;


