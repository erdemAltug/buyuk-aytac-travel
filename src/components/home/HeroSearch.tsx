'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { openWeekendAssistant } from '@/components/WeekendAssistant';

const QUICK = [
  { label: 'Günübirlik', href: '/tours/daily' },
  { label: 'Konaklamalı', href: '/tours/overnight' },
  { label: 'Kapadokya', href: '/kapadokya-turu' },
  { label: 'Karadeniz', href: '/karadeniz-turu' },
  { label: 'Yurtdışı', href: '/tours/international' },
];

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/tours?search=${encodeURIComponent(term)}` : '/tours');
  };

  return (
    <div>
      <form
        onSubmit={submit}
        role="search"
        className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-brand-950/40 ring-1 ring-white/40"
      >
        <label htmlFor="hero-search" className="sr-only">
          Nereye gitmek istiyorsunuz?
        </label>
        <svg className="ml-2 h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
        <input
          id="hero-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nereye gitmek istersin? Kapadokya, Assos, Batum…"
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          autoComplete="off"
          enterKeyHint="search"
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-xl bg-sunset-600 px-5 text-sm font-bold text-white transition-colors hover:bg-sunset-700 sm:px-7 sm:text-base"
        >
          Tur Bul
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={openWeekendAssistant}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
          Hafta sonu ne yapsam?
        </button>
        {QUICK.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="inline-flex h-10 items-center rounded-full bg-white/10 px-4 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
