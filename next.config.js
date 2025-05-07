/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude server directory from build
  exclude: ['../server/**/*'],
}

module.exports = nextConfig
