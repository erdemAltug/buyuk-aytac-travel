'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AuthMenu from '@/components/AuthMenu';

const desktopLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/tours?tourType=domestic', label: 'Yurtiçi' },
  { href: '/tours?tourType=international', label: 'Yurtdışı' },
  { href: '/tours/daily', label: 'Günübirlik' },
  { href: '/tours/overnight', label: 'Konaklamalı' },
  { href: '/tours/last-minute', label: 'Son Dakika' },
  { href: '/tour-calendar', label: 'Tur Takvimi' },
  { href: '/group-tour', label: 'Özel Grup' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'İletişim' },
];

const mobileLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/tours?tourType=domestic', label: 'Yurtiçi Turları' },
  { href: '/tours?tourType=international', label: 'Yurtdışı Turları' },
  { href: '/tours/daily', label: 'Günübirlik Turlar' },
  { href: '/tours/overnight', label: 'Konaklamalı Turlar' },
  { href: '/cerkezkoy-gunubirlik-turlar', label: 'Çerkezköy Günübirlik' },
  { href: '/cerkezkoy-konakamali-turlar', label: 'Çerkezköy Konaklamalı' },
  { href: '/tours/last-minute', label: 'Son Dakika Fırsatları' },
  { href: '/tour-calendar', label: 'Tur Takvimi' },
  { href: '/group-tour', label: 'Özel Grup Turu' },
  { href: '/annual-program', label: 'Yıllık Program' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'İletişim' },
];

function linkIsActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  const pathOnly = href.split('?')[0];
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const isSolidNav = !isHomepage || scrolled || isMenuOpen;

  const navbarBg = isSolidNav
    ? 'bg-white shadow-lg border-b border-slate-200'
    : 'bg-transparent';

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 ${
        isMenuOpen ? 'z-[100] h-dvh bg-white' : 'z-50'
      } ${navbarBg}`}
    >
      <div className="relative flex h-20 w-full shrink-0 items-center pl-3 pr-3 sm:pl-5 sm:pr-4 lg:pl-6 lg:pr-5">
        {/* Logo — sol */}
        <Link href="/" className="relative z-10 flex shrink-0 items-center" onClick={closeMenu}>
          <div className="relative h-14 w-14">
            <Image
              src="/images/LOGO.png"
              alt="Büyük Aytaç Travel"
              fill
              className="object-contain object-center brightness-105"
              priority
            />
          </div>
          <span
            className={`ml-2 hidden whitespace-nowrap text-base font-bold xl:inline ${
              isSolidNav ? 'text-gray-800' : 'text-white'
            }`}
          >
            Büyük Aytaç Travel
          </span>
        </Link>

        {/* Nav — ekran ortası */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-20 items-center justify-center lg:flex">
          <div
            className={`pointer-events-auto flex items-center gap-x-0.5 xl:gap-x-1 ${
              isSolidNav
                ? 'rounded-full border border-slate-200 bg-slate-50/90 px-1.5 py-1 shadow-sm'
                : ''
            }`}
          >
            {desktopLinks.map((link) => {
              const active = linkIsActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm ${
                    isSolidNav
                      ? active
                        ? 'border border-blue-200 bg-white text-blue-700 shadow-sm'
                        : 'border border-transparent text-slate-700 hover:border-slate-200 hover:bg-white hover:text-blue-600'
                      : active
                        ? 'text-white'
                        : 'text-white/95 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Auth — ekranın sağ kenarı */}
        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2">
          <AuthMenu light={!isSolidNav} />
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden ${
              isSolidNav
                ? 'border border-slate-200 bg-white text-blue-600'
                : 'bg-white/20 text-white'
            }`}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">{isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } h-[calc(100dvh-5rem)] flex-col overflow-y-auto overscroll-contain bg-white lg:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 py-3 pb-28">
          {mobileLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={closeMenu}
            />
          ))}
          <div className="border-t border-gray-100 px-3 pt-3">
            <MobileNavLink href="/hesabim" label="Hesabım" onClick={closeMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = linkIsActive(pathname, href);

  return (
    <Link
      href={href}
      className={`block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-900 hover:bg-blue-50 hover:text-blue-600'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
