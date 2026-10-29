'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactDock from '@/components/ContactDock';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <ContactDock />
      {children}
      <Footer />
    </>
  );
}
