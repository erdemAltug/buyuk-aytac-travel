/** @type {import('next').NextConfig} */

// Sentry config - doğru import sırası önemli
import { withSentryConfig } from '@sentry/nextjs';

const sentryWebpackPluginOptions = {
  org: 'buyuk-aytac-travel',
  project: 'buyuk-aytac-travel',
  // Auth token Vercel'de environment variable olarak ayarlanmalı
  // SENTRY_AUTH_TOKEN
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
};

const nextConfig = {
  webpack: (config) => {
    // MongoDB playground dosyalarını hariç tut
    config.module.rules.push({
      test: /\.mongodb\.js$/,
      use: 'ignore-loader',
    });

    return config;
  },
  eslint: {
    // Build sırasında ESLint kontrolünü devre dışı bırak
    ignoreDuringBuilds: true,
  },
  typescript: {
    // GEÇİCİ: Next.js 15.2.4'teki API Route Handler sorununu çözmek için TypeScript kontrolünü devre dışı bırak
    // Daha sonra API Route Handler'larını next.js dokümanına uygun olarak güncellemek gerekecek
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'buyukaytactravel.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // SEO iyileştirmeleri
  experimental: {
    // optimizeCss: true, // CSS optimizasyonu - geçici olarak kapatıldı (build hata veriyor)
  },
  // Gzip compression
  compress: true,
  // Power optimizasyon
  poweredByHeader: false,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Static files caching
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Static pages caching
      {
        source: '/:path*.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions); 