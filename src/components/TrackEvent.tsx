'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Sunucu sayfalarından bir kez analitik olayı göndermek için (ör. tour_view) */
export default function TrackEvent({ event, props }: { event: string; props?: Record<string, unknown> }) {
  const key = JSON.stringify(props ?? {});
  useEffect(() => {
    track(event, JSON.parse(key));
  }, [event, key]);
  return null;
}
