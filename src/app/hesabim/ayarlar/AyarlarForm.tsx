'use client';

import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';

type Gender = '' | 'female' | 'male' | 'unspecified';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  hasPassword: boolean;
};

const fieldClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

export default function AyarlarForm({
  firstName: initialFirstName,
  lastName: initialLastName,
  email,
  phone: initialPhone,
  gender: initialGender,
  hasPassword,
}: Props) {
  const { update } = useSession();
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [phone, setPhone] = useState(initialPhone);
  const [gender, setGender] = useState<Gender>(initialGender);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess('');

    if (newPassword || confirmPassword || currentPassword) {
      if (newPassword !== confirmPassword) {
        setErrors(['Yeni şifreler eşleşmiyor']);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          gender: gender || undefined,
          ...(newPassword
            ? { currentPassword, newPassword }
            : {}),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setErrors(data.errors || [data.message || 'Güncelleme başarısız']);
        setLoading(false);
        return;
      }

      await update({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Bilgilerin güncellendi');
    } catch {
      setErrors(['Bir hata oluştu']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Ad
          </label>
          <input
            id="firstName"
            className={fieldClass}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Soyad
          </label>
          <input
            id="lastName"
            className={fieldClass}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-slate-400">
          E-posta
        </label>
        <input
          id="email"
          className={`${fieldClass} cursor-not-allowed bg-slate-50 text-slate-500`}
          value={email}
          disabled
          readOnly
        />
        <p className="mt-1 text-xs text-slate-400">E-posta değiştirilemez</p>
      </div>

      <div>
        <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Telefon
        </label>
        <input
          id="phone"
          type="tel"
          className={fieldClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05xx xxx xx xx"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="gender" className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Cinsiyet
        </label>
        <select
          id="gender"
          className={fieldClass}
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
        >
          <option value="">Seçin</option>
          <option value="female">Kadın</option>
          <option value="male">Erkek</option>
          <option value="unspecified">Belirtmek istemiyorum</option>
        </select>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="text-sm font-semibold text-slate-900">Şifre değiştir</p>
        <p className="mt-0.5 text-xs text-slate-500">
          {hasPassword
            ? 'Boş bırakırsan şifren aynı kalır'
            : 'Bu hesap Google ile açıldı; şifre burada değiştirilemez'}
        </p>

        {hasPassword && (
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="currentPassword" className="text-xs font-medium text-slate-500">
                Mevcut şifre
              </label>
              <input
                id="currentPassword"
                type="password"
                className={fieldClass}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="text-xs font-medium text-slate-500">
                Yeni şifre
              </label>
              <input
                id="newPassword"
                type="password"
                className={fieldClass}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-xs font-medium text-slate-500">
                Yeni şifre (tekrar)
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={fieldClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
              />
            </div>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <ul className="space-y-1 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {success && (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    </form>
  );
}
