/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    nodeENV: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
