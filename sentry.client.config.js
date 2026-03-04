import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // DSN environment variable'dan veya sabit değerden al
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://f8f6f744b86fb3883455505718b82254@o4510984809873408.ingest.de.sentry.io/4510984813477968",

  // Performance monitoring - %100 trace
  tracesSampleRate: 1.0,
  
  // Web Vitals - her sayfa yüklenmesinde otomatik topla
  // Bu LCP, FID, CLS, TTFB, INP'yi otomatik izler
  vitals: [
    { name: 'LCP', endpoint: '/vital' },
    { name: 'FID', endpoint: '/vital' },
    { name: 'CLS', endpoint: '/vital' },
    { name: 'TTFB', endpoint: '/vital' },
    { name: 'INP', endpoint: '/vital' },
  ],
  
  // Session replay - kullanıcı davranışları
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Debug mode - sadece development'ta
  debug: process.env.NODE_ENV === "development",
  
  // Environment
  environment: process.env.NODE_ENV || "production",
  
  // Release - versiyon takibi için
  release: "buyuk-aytac-travel@1.0.0",
  
  // Integrations - TÜMÜ EKLENMELİ
  integrations: [
    // Browser routing izleme - Next.js router
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    // Browser tracing - web vitals ve performans
    Sentry.browserTracingIntegration({
      // Routing izleme için
      tracePropagationTargets: ['localhost', /^\//],
    }),
  ],
  
  // Başlangıçta transaction başlat
  initialScope: {
    tags: {
      app: 'buyuk-aytac-travel',
    },
  },
});
