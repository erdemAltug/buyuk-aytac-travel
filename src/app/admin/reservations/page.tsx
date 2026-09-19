'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ReservationRow = {
  _id: string;
  tourName: string;
  tourSlug: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  createdAt: string;
};

const statuses = ['new', 'contacted', 'confirmed', 'cancelled', 'completed'];

export default function AdminReservationsPage() {
  const [rows, setRows] = useState<ReservationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reservations');
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Yüklenemedi');
      setRows(data.reservations);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) load();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Rezervasyonlar</h1>
          <p className="text-sm text-slate-600">Gelen talepler ve durum güncelleme</p>
        </div>
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">
          ← Panel
        </Link>
      </div>

      {loading && <p className="text-slate-500">Yükleniyor…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && rows.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          Henüz rezervasyon yok.
        </p>
      )}

      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row._id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{row.tourName}</p>
                <p className="text-sm text-slate-600">
                  {row.firstName} {row.lastName} ·{' '}
                  <a href={`tel:${row.phone}`} className="text-blue-600">
                    {row.phone}
                  </a>
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(row.createdAt).toLocaleString('tr-TR')}
                </p>
              </div>
              <select
                value={row.status}
                onChange={(e) => updateStatus(row._id, e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
