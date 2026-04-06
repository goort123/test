import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',

  basePath: isProd ? '/test' : '',
  assetPrefix: isProd ? '/test' : '',

  images: {
    unoptimized: true,
  },


  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
