// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // React の Strict Mode を有効にする
  experimental: {
    appDir: true,  // appディレクトリを有効にする
  },
};

export default nextConfig;
