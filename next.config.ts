/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['https://oxhapmbatiykgcoydiij.supabase.co'],
  },
}

module.exports = nextConfig