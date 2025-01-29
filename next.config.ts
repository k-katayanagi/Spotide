// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // React �� Strict Mode ��L���ɂ���
  experimental: {
    appDir: true,  // app�f�B���N�g����L���ɂ���
  },
};

export default nextConfig;
