"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function SentryPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Her sayfa değiştiğinde Sentry'ye bildir
    if (pathname) {
      const url = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // Sentry'nin transaction'ını güncelle
      if (typeof window !== "undefined" && (window as any).Sentry) {
        (window as any).Sentry.captureEvent({
          message: `Page View: ${url}`,
          type: "transaction",
          tags: {
            page: pathname,
            type: "pageview",
          },
        });
      }

      // Performance timing gönder
      const performanceData = {
        name: "Page Load",
        value: performance.now(),
        unit: "milliseconds",
        tags: {
          page: pathname,
        },
      };

      console.log("[Sentry] Page tracked:", url, performanceData);
    }
  }, [pathname, searchParams]);

  return null;
}
