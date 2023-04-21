/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'tva1.sinaimg.cn',
      'rentero-resource.s3.ap-east-1.amazonaws.com',
      'firstplay-crm.s3.ap-east-1.amazonaws.com',
      'p2.bahamut.com.tw',
      'cdn2.ettoday.net',
      'ik.imagekit.io',
      'd2yhjjdyh5ugcy.cloudfront.net',
      's3.ap-northeast-1.amazonaws.com',
    ],
    // deviceSizes: [320]
  },
  i18n: {
    // locales: ["en-US", "zh-CN", "id-ID", "vi-VN"],
    locales: ['en-US', 'id-ID', 'vi-VN'],
    // locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
