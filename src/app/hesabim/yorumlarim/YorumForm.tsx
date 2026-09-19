'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type TourOption = { slug: string; name: string };

export default function YorumForm({
  defaultTourSlug,
  tourOptions = [],
}: {
  defaultTourSlug?: string;
  tourOptions?: TourOption[];
}) {
  const router = useRouter();
  const [tourSlug, setTourSlug] = useState(defaultTourSlug || tourOptions[0]?.slug || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourSlug, rating, comment }),
      });
      const data = await res.json();
      if (!data.success) {
        setMessage(data.message || 'Yorum kaydedilemedi');
      } else {
        setMessage('Yorumun alındı, onay sonrası yayınlanır.');
        setComment('');
        router.refresh();
      }
    } catch {
      setMessage('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (tourOptions.length === 0 && !defaultTourSlug) {
    return (
      <p className="mt-4 text-sm text-slate-600">
        Yorum yazmak için onaylanmış bir rezervasyonun olmalı. Ofis rezervasyonunu
        hesabına bağladıktan sonra burada görünecek.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      {tourOptions.length > 0 ? (
        <select
          required
          value={tourSlug}
          onChange={(e) => setTourSlug(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {tourOptions.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          required
          placeholder="Tur slug"
          value={tourSlug}
          onChange={(e) => setTourSlug(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      )}
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} yıldız
          </option>
        ))}
      </select>
      <textarea
        required
        rows={3}
        placeholder="Deneyimini yaz…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      {message && <p className="text-sm text-slate-600">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Gönderiliyor…' : 'Yorumu Gönder'}
      </button>
    </form>
  );
}
