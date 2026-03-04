import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f8f6f744b86fb3883455505718b82254@o4510984809873408.ingest.de.sentry.io/4510984813477968",

  // Server-side tracing
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
});
