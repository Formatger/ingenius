/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: ['storage.googleapis.com'],
  },
    reactStrictMode: false,
};

module.exports = {
  images: {
    domains: ['storage.googleapis.com'],
  },
}
