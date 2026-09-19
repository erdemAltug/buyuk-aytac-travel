'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import AuthModal from '@/components/AuthModal';

const WHATSAPP_URL =
  'https://wa.me/905393459559?text=Merhaba,%20tur%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.';

type AuthMenuProps = {
  light?: boolean;
};

export default function AuthMenu({ light = false }: AuthMenuProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (status === 'loading') {
    return (
      <span
        className={`inline-flex h-10 w-24 items-center justify-center rounded-full text-sm ${
          light ? 'bg-white/25 text-white/80' : 'bg-slate-100 text-slate-400'
        }`}
      >
        …
      </span>
    );
  }

  if (!session?.user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setAuthOpen(true)}
          className={`inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-semibold shadow-md transition-colors ${
            light
              ? 'bg-white text-blue-700 hover:bg-blue-50'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <UserCircleIcon className="h-5 w-5 shrink-0" aria-hidden />
          Giriş Yap
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  const displayName =
    `${session.user.firstName || ''} ${session.user.lastName || ''}`.trim() ||
    session.user.name ||
    'Hesabım';
  const initials =
    `${session.user.firstName?.[0] || ''}${session.user.lastName?.[0] || ''}`.toUpperCase() ||
    'U';

  const itemClass = 'block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50';

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex cursor-pointer items-center gap-3 rounded-full px-3 py-1.5 transition-transform hover:scale-[1.02] ${
          light
            ? 'bg-black/20 text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/35 backdrop-blur-md'
            : 'bg-white text-slate-800 shadow-md ring-1 ring-slate-300'
        }`}
        aria-expanded={open}
        aria-label="Hesap menüsü"
        title={displayName}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wide text-white ${
            light ? 'bg-blue-500' : 'bg-blue-600'
          }`}
        >
          {initials}
        </span>
        <span className="max-w-[9rem] truncate text-sm font-semibold leading-none tracking-wide sm:max-w-[11rem]">
          {displayName}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-[60] mt-2 max-h-[min(70vh,28rem)] w-60 overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
          <div className="border-b border-slate-100 px-4 py-2.5">
            <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
            <p className="truncate text-xs text-slate-500">{session.user.email}</p>
          </div>

          <Link href="/hesabim" className={itemClass} onClick={() => setOpen(false)}>
            Profil
          </Link>
          <Link
            href="/hesabim/seyahatlerim"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Seyahatlerim
          </Link>
          <Link
            href="/hesabim/favorilerim"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Favorilerim
          </Link>

          <div className="my-1 border-t border-slate-100" />

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            onClick={() => setOpen(false)}
          >
            WhatsApp ile yaz
          </a>
          <Link
            href="/tour-calendar"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Tur takvimi
          </Link>
          <Link
            href="/tours/last-minute"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Kampanyalar / Son dakika
          </Link>
          <Link
            href="/hesabim/ayarlar"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Ayarlar
          </Link>
          <Link
            href="/hesabim/bildirimler"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Bildirimler
          </Link>

          {session.user.role === 'admin' && (
            <>
              <div className="my-1 border-t border-slate-100" />
              <Link
                href="/admin"
                className="block px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  window.location.assign('/admin');
                }}
              >
                Admin Paneli
              </Link>
            </>
          )}

          <button
            type="button"
            className="block w-full border-t border-slate-100 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
            onClick={async () => {
              setOpen(false);
              await signOut({ redirect: false });
              window.location.assign('/');
            }}
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
