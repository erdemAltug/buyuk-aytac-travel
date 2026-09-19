import type { Metadata } from 'next';
import KayitClient from './KayitClient';

export const metadata: Metadata = {
  title: 'Kayıt Ol',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KayitClient />;
}
