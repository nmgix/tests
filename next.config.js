/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    PROD: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
