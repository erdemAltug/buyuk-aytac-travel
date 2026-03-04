// Sentry Instrumentation for Next.js
// This file enables automatic Web Vitals tracking with Sentry

export function register() {
  // Sentry automatically tracks Web Vitals when tracing is enabled
  // The following metrics are tracked automatically:
  // - LCP (Largest Contentful Paint)
  // - FID (First Input Delay) 
  // - CLS (Cumulative Layout Shift)
  // - FCP (First Contentful Paint)
  // - TTFB (Time to First Byte)
  
  // No additional code needed - Web Vitals are sent automatically
  // when tracesSampleRate > 0 in sentry.client.config.ts
}
