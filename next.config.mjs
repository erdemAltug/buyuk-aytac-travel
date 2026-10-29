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
  // CORS hatasını önlemek için: event'ler kendi domain'imiz üzerinden Sentry'ye iletilir
  tunnelRoute: '/monitoring',
};


const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.posthog.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.posthog.com https://*.google-analytics.com https://www.googletagmanager.com https://*.sentry.io",
  "frame-src 'self' https://www.google.com https://www.youtube.com https://www.instagram.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig = {
  // Googlebot tam HTML alsın - önceki ayar tüm botları engelliyordu
  // htmlLimitedBots: /.*/,

  webpack: (config) => {
    // MongoDB playground dosyalarını hariç tut
    config.module.rules.push({
      test: /\.mongodb\.js$/,
      use: 'ignore-loader',
    });

    return config;
  },
  // Eski lint hataları temizlendi; ESLint ve TypeScript kontrolleri derlemede açık.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Hydration uyumsuzluğunu önlemek: tüm Image src'leri göreli URL (sunucu/istemci aynı)
    loader: 'default',
    loaderFile: './imageLoader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'buyukaytactravel.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.buyukaytactravel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        pathname: '/images/download/**',
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
  async redirects() {
    return [
      {
        source: '/destinations',
        destination: '/destinasyonlar',
        permanent: true,
      },
      {
        source: '/destinations/:slug',
        destination: '/destinasyonlar/:slug',
        permanent: true,
      },
      {
        source: '/tours',
        has: [{ type: 'query', key: 'accommodationType', value: 'daily' }],
        destination: '/tours/daily',
        permanent: true,
      },
      {
        source: '/tours',
        has: [
          { type: 'query', key: 'accommodationType', value: 'with_accommodation' },
        ],
        destination: '/tours/overnight',
        permanent: true,
      },
    ];
  },
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
          {
            // Önce rapor modunda: hiçbir şeyi engellemez, sadece tarayıcı konsoluna ihlalleri yazar.
            // Birkaç gün sorunsuz görününce anahtarı 'Content-Security-Policy' yapın.
            key: 'Content-Security-Policy-Report-Only',
            value: contentSecurityPolicy,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Görsel optimizasyon endpoint'i indirme yerine sayfada gösterilsin (Googlebot + tarayıcı)
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
      // Görseller: 1 hafta önbellek. "immutable" kullanılmıyor — public/ altındaki bir görsel aynı adla
      // değiştirilirse ziyaretçiler bir yıl boyunca eskisini görüyordu.
      // JS/CSS için kural yok: Next.js /_next/static dosyalarını zaten içerik hash'iyle ve doğru başlıkla sunuyor;
      // önceki "/:path*.(js|css) immutable" kuralı geliştirmede yeni CSS'in hiç yüklenmemesine yol açıyordu.
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions); 