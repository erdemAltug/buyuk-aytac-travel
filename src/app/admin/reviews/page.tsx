'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ReviewRow = {
  _id: string;
  rating: number;
  comment: string;
  status: string;
  tourId?: { name?: string; slug?: string };
  userId?: { firstName?: string; lastName?: string; email?: string };
};

export default function AdminReviewsPage() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/reviews');
    const data = await res.json();
    if (data.success) setRows(data.reviews);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Yorum Moderasyonu</h1>
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">
          ← Panel
        </Link>
      </div>
      {loading && <p>Yükleniyor…</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r._id} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-medium text-slate-900">
              {r.tourId?.name || 'Tur'} · {r.rating}★
            </p>
            <p className="text-sm text-slate-500">
              {r.userId?.firstName} {r.userId?.lastName} ({r.userId?.email})
            </p>
            <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{r.status}</span>
              <button
                type="button"
                onClick={() => setStatus(r._id, 'approved')}
                className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white"
              >
                Onayla
              </button>
              <button
                type="button"
                onClick={() => setStatus(r._id, 'rejected')}
                className="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white"
              >
                Reddet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
