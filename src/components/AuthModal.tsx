'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type Step = 'email' | 'login' | 'register';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const id = window.setTimeout(() => setEntered(true), 10);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep('email');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setGreeting('');
      setError('');
      setLoading(false);
      setGoogleLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const field =
    'w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 text-[15px] text-slate-900 shadow-sm placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

  const onGoogle = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await signIn('google', {
        callbackUrl: `${window.location.origin}/hesabim`,
      });
    } catch {
      setError('Google ile giriş şu an kullanılamıyor');
      setGoogleLoading(false);
    }
  };

  const onEmailContinue = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'E-posta kontrol edilemedi');
        setLoading(false);
        return;
      }
      if (data.exists && data.active === false) {
        setError('Bu hesap pasif. Ofisimizle iletişime geçin.');
        setLoading(false);
        return;
      }
      if (data.exists) {
        setGreeting(data.firstName || '');
        setStep('login');
      } else {
        setStep('register');
      }
    } catch {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Şifre hatalı');
      return;
    }
    onClose();
    window.location.assign('/hesabim');
  };

  const onRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, phone }),
      });
      const data = await res.json();
      if (!data.success) {
        setError((data.errors || ['Kayıt başarısız']).join(', '));
        setLoading(false);
        return;
      }
      const login = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (login?.error) {
        setError('Kayıt oldu, şimdi giriş yapmayı dene');
        setStep('login');
        setLoading(false);
        return;
      }
      onClose();
      window.location.assign('/hesabim');
    } catch {
      setError('Kayıt sırasında hata oluştu');
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep('email');
    setPassword('');
    setError('');
  };

  const title =
    step === 'email'
      ? 'Giriş Yap veya Üye Ol'
      : step === 'login'
        ? greeting
          ? `Merhaba, ${greeting}`
          : 'Şifreni gir'
        : 'Üye ol';

  return (
    <div className="fixed inset-0 z-[200] flex items-stretch justify-center sm:items-center sm:px-4 sm:py-6">
      <button
        type="button"
        aria-label="Kapat"
        onClick={onClose}
        className={`absolute inset-0 bg-[#0b1220]/70 backdrop-blur-[6px] transition-opacity duration-300 max-sm:hidden ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className={`relative z-10 flex h-full w-full max-w-none flex-col overflow-y-auto bg-[#f7f8fb] transition-all duration-300 ease-out sm:h-auto sm:max-h-[90vh] sm:w-[340px] sm:overflow-hidden sm:rounded-[28px] sm:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.55)] sm:ring-1 sm:ring-white/40 ${
          entered
            ? 'translate-y-0 opacity-100'
            : 'translate-y-5 opacity-0'
        }`}
      >
        {/* Top brand band */}
        <div className="relative bg-gradient-to-b from-blue-700 to-blue-600 px-5 pb-8 pt-[max(1.25rem,env(safe-area-inset-top))] text-center text-white sm:pt-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/15 p-1.5 text-white/90 transition hover:bg-white/25"
            aria-label="Kapat"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>

          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] ring-4 ring-white/25">
            <div className="relative h-14 w-14">
              <Image
                src="/images/LOGO.png"
                alt="Büyük Aytaç Travel"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-100">
            Büyük Aytaç Travel
          </p>
          <h2
            id="auth-modal-title"
            className="mt-2 text-[1.25rem] font-bold leading-tight tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-1.5 text-[13px] leading-snug text-blue-50/90">
            {step === 'email'
              ? 'Turlarını takip et, favorilerini kaydet'
              : step === 'login'
                ? email
                : 'Birkaç saniyede hesabını oluştur'}
          </p>
        </div>

        {/* Body card overlapping header */}
        <div className="-mt-4 flex flex-1 flex-col rounded-t-[24px] bg-[#f7f8fb] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 sm:pb-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-3 py-2.5 text-[13px] text-red-700">
              {error}
            </div>
          )}

          {step === 'email' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={onGoogle}
                disabled={googleLoading || loading}
                className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white py-3.5 text-[14px] font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
              >
                <GoogleIcon className="h-[18px] w-[18px]" />
                {googleLoading ? 'Yönlendiriliyor…' : 'Google ile devam et'}
              </button>

              <div className="flex items-center gap-3 py-0.5">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-[11px] font-medium tracking-wide text-slate-400">
                  veya e-posta
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <form onSubmit={onEmailContinue} className="space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                    E-posta
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className={`${field} pl-11`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full rounded-2xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(37,99,235,0.65)] transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? 'Kontrol…' : 'Devam et'}
                </button>
              </form>
            </div>
          )}

          {step === 'login' && (
            <form onSubmit={onLogin} className="space-y-3.5">
              <div>
                <label className="mb-1.5 block text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                  Şifre
                </label>
                <div className="relative">
                  <LockClosedIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    autoFocus
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifreni gir"
                    className={`${field} pl-11`}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(37,99,235,0.65)] transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? 'Giriş…' : 'Giriş Yap'}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="w-full py-1 text-[13px] font-medium text-slate-500 hover:text-blue-600"
              >
                ← Geri dön
              </button>
            </form>
          )}

          {step === 'register' && (
            <form onSubmit={onRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="mb-1.5 block text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                    Ad
                  </label>
                  <input
                    required
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={field}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                    Soyad
                  </label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={field}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Opsiyonel"
                  className={field}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                  Şifre
                </label>
                <div className="relative">
                  <LockClosedIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="En az 8 karakter"
                    className={`${field} pl-11`}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-2xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(37,99,235,0.65)] transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? 'Kaydediliyor…' : 'Üye Ol'}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="w-full py-1 text-[13px] font-medium text-slate-500 hover:text-blue-600"
              >
                ← Geri dön
              </button>
            </form>
          )}

          <p className="mt-auto pt-8 text-center text-[11px] leading-relaxed text-slate-400 sm:mt-5 sm:pt-0">
            Devam ederek tur hesabını oluşturmuş olursun.
          </p>
        </div>
      </div>
    </div>
  );
}
