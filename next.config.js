/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tva1.sinaimg.cn', 'rentero-resource.s3.ap-east-1.amazonaws.com', 'p2.bahamut.com.tw', 'cdn2.ettoday.net'],
  },
}

module.exports = nextConfig
