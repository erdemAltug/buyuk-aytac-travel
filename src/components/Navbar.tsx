'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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

  const navbarBg =
    !isHomepage || scrolled
      ? 'bg-white/95 backdrop-blur-md shadow-lg'
      : 'bg-transparent';

  const linkIdle =
    !isHomepage || scrolled
      ? 'text-gray-900 hover:text-blue-600'
      : 'text-white hover:text-blue-100';

  const linkActive =
    !isHomepage || scrolled ? 'text-blue-600' : 'text-blue-100';

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${navbarBg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <div className="relative h-16 w-16">
                <Image
                  src="/images/LOGO.png"
                  alt="Büyük Aytaç Travel"
                  fill
                  className="object-contain object-center brightness-105"
                  priority
                />
              </div>
              <span
                className={`ml-1 hidden font-bold text-lg xl:inline ${
                  !isHomepage || scrolled ? 'text-gray-800' : 'text-white'
                } transition-colors duration-300`}
              >
                Büyük Aytaç Travel
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-x-3 lg:flex xl:gap-x-4">
            {desktopLinks.map((link) => {
              const active = linkIsActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center whitespace-nowrap px-0.5 pt-1 text-sm font-medium transition-colors duration-300 ${
                    active ? linkActive : linkIdle
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${
                !isHomepage || scrolled
                  ? 'bg-white/80 text-blue-600'
                  : 'bg-blue-600/50 text-white'
              } hover:bg-blue-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Menüyü aç</span>
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
      </div>

      <div
        className={`${
          isMenuOpen ? 'block max-h-[80vh] opacity-100' : 'hidden max-h-0 opacity-0'
        } overflow-y-auto bg-white shadow-lg transition-all duration-300 lg:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 py-3">
          {mobileLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={closeMenu}
            />
          ))}
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
