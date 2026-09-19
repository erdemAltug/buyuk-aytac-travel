'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

type FavoriteButtonProps = {
  tourId?: string;
  tourSlug: string;
  className?: string;
  size?: 'sm' | 'md';
};

export default function FavoriteButton({
  tourId,
  tourSlug,
  className = '',
  size = 'md',
}: FavoriteButtonProps) {
  const { data: session, status } = useSession();
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') {
      setActive(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const q = tourSlug
        ? `tourSlug=${encodeURIComponent(tourSlug)}`
        : `tourId=${encodeURIComponent(tourId || '')}`;
      const res = await fetch(`/api/wishlist?${q}`);
      const data = await res.json();
      if (!cancelled && data.success) setActive(!!data.inWishlist);
    })();
    return () => {
      cancelled = true;
    };
  }, [status, tourId, tourSlug]);

  if (status === 'unauthenticated') {
    return (
      <Link
        href={`/giris?callbackUrl=/tours/${tourSlug}`}
        className={`inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:text-rose-600 ${
          size === 'sm' ? 'h-9 w-9' : 'h-10 w-10'
        } ${className}`}
        aria-label="Favorilere eklemek için giriş yap"
        title="Favorilere eklemek için giriş yap"
      >
        <HeartOutline className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </Link>
    );
  }

  const toggle = async () => {
    if (busy || status !== 'authenticated') return;
    setBusy(true);
    const next = !active;
    setActive(next);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId,
          tourSlug,
          action: next ? 'add' : 'remove',
        }),
      });
      const data = await res.json();
      if (!data.success) setActive(!next);
    } catch {
      setActive(!next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy || status === 'loading'}
      className={`inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white transition-colors hover:border-rose-300 disabled:opacity-60 ${
        active ? 'text-rose-600' : 'text-slate-600 hover:text-rose-600'
      } ${size === 'sm' ? 'h-9 w-9' : 'h-10 w-10'} ${className}`}
      aria-label={active ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      aria-pressed={active}
    >
      {active ? (
        <HeartSolid className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      ) : (
        <HeartOutline className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      )}
    </button>
  );
}
