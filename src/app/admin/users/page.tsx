'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type UserRow = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt?: string;
};

export default function AdminUsersPage() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (data.success) setRows(data.users);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const patch = async (id: string, body: { role?: string; isActive?: boolean }) => {
    setBusyId(id);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        setMessage(data.message || 'Güncelleme başarısız');
      } else {
        setMessage('Güncellendi');
        await load();
      }
    } catch {
      setMessage('Bir hata oluştu');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Kullanıcılar</h1>
          <p className="text-sm text-slate-600">Rol ve hesap durumu yönetimi</p>
        </div>
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">
          ← Panel
        </Link>
      </div>

      {message && (
        <p className="mb-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">{message}</p>
      )}

      {loading && <p className="text-sm text-slate-500">Yükleniyor…</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Kullanıcı</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((u) => (
              <tr key={u._id} className="align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                  {u.phone && <p className="text-xs text-slate-400">{u.phone}</p>}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      u.role === 'admin'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {u.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      u.isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {u.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {u.role === 'user' ? (
                      <button
                        type="button"
                        disabled={busyId === u._id}
                        onClick={() => patch(u._id, { role: 'admin' })}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        Admin yap
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busyId === u._id}
                        onClick={() => patch(u._id, { role: 'user' })}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        User yap
                      </button>
                    )}
                    {u.isActive ? (
                      <button
                        type="button"
                        disabled={busyId === u._id}
                        onClick={() => patch(u._id, { isActive: false })}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        Pasif et
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busyId === u._id}
                        onClick={() => patch(u._id, { isActive: true })}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Aktif et
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">Henüz kullanıcı yok</p>
        )}
      </div>
    </div>
  );
}
