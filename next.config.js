/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'tva1.sinaimg.cn',
      'rentero-resource.s3.ap-east-1.amazonaws.com',
      'p2.bahamut.com.tw',
      'cdn2.ettoday.net',
      'ik.imagekit.io',
      'd2yhjjdyh5ugcy.cloudfront.net',
      'https://image.com',
      'https://logo.com',
    ],
    // deviceSizes: [320]
  },
  i18n: {
    // locales: ["en-US", "zh-CN"],
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
