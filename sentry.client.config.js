import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f8f6f744b86fb3883455505718b82254@o4510984809873408.ingest.de.sentry.io/4510984813477968",

  // Set tracesSampleRate to 1.0 to capture 100%
  tracesSampleRate: 1.0,
  
  // Debug mode
  debug: true,
});
