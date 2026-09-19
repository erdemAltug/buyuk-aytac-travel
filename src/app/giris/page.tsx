import { Suspense } from 'react';
import type { Metadata } from 'next';
import GirisClient from './GirisClient';

export const metadata: Metadata = {
  title: 'Giriş Yap',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-28 text-center">Yükleniyor…</div>}>
      <GirisClient />
    </Suspense>
  );
}
