/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/LoginPage/LoginPage'
      },
      {
        source: '/dashboard',
        destination: '/Dashboard/Dashboard'
      }
    ]
  }
}

module.exports = nextConfig