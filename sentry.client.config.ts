import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f8f6f744b86fb3883455505718b82254@o4510984809873408.ingest.de.sentry.io/4510984813477968",

  // Performance monitoring - Web Vitals are automatically tracked with tracing
  // LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
  // FCP (First Contentful Paint), TTFB (Time to First Byte)
  tracesSampleRate: 1.0,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",

  // Filter out common non-critical errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    /Loading chunk \d+ failed/,
  ],

  // Environment tags
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Sample rate for replays (set to 0 to disable)
  replaysSessionSampleRate: 0,
  
  // Sample rate for error replays
  replaysOnErrorSampleRate: 1.0,
  
  // ═══════════════════════════════════════════════════════════════
  // NOT: Web Vitals otomatik olarak "tracesSampleRate" ile birlikte çalışır
  // Performance sekmesinde şunları görebilirsiniz:
  // - LCP (Largest Contentful Paint) - < 2.5s iyi
  // - FID (First Input Delay) - < 100ms iyi
  // - CLS (Cumulative Layout Shift) - < 0.1 iyi
  // - FCP (First Contentful Paint) - < 1.8s iyi
  // - TTFB (Time to First Byte) - < 600ms iyi
  // ═══════════════════════════════════════════════════════════════
});
