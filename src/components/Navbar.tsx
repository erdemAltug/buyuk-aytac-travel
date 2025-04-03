'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if we are on the homepage
  const isHomepage = pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine navbar background color
  // Only homepage has transparent background when not scrolled
  const navbarBg = (!isHomepage || scrolled) 
    ? 'bg-white/95 backdrop-blur-md shadow-lg' 
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="relative h-16 w-16 mr-2">
                <Image
                  src="/images/LOGO.png"
                  alt="Büyük Aytaç Seyahat"
                  fill
                  className="object-contain object-center brightness-105"
                  priority
                />
              </div>
              <span className={`hidden md:block font-bold text-lg ${(!isHomepage || scrolled) ? 'text-blue-600' : 'text-white'} transition-colors duration-300 ml-1`}>
                <span className={(!isHomepage || scrolled) ? 'text-gray-800' : 'text-white'}>Büyük Aytaç Travel</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              href="/"
              className={`inline-flex items-center ${(!isHomepage || scrolled) ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-100'} px-1 pt-1 text-sm font-medium transition-colors duration-300`}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/tours"
              className={`inline-flex items-center ${(!isHomepage || scrolled) ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-100'} px-1 pt-1 text-sm font-medium transition-colors duration-300`}
            >
              Turlar
            </Link>
            <Link
              href="/about"
              className={`inline-flex items-center ${(!isHomepage || scrolled) ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-100'} px-1 pt-1 text-sm font-medium transition-colors duration-300`}
            >
              Hakkımızda
            </Link>
            <Link
              href="/contact"
              className={`inline-flex items-center ${(!isHomepage || scrolled) ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-100'} px-1 pt-1 text-sm font-medium transition-colors duration-300`}
            >
              İletişim
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                (!isHomepage || scrolled) ? 'text-blue-600' : 'text-white'
              } hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors`}
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Menüyü aç</span>
              {/* Icon when menu is closed */}
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
              {/* Icon when menu is open */}
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

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} sm:hidden transition-all duration-300 overflow-hidden bg-white shadow-lg`} id="mobile-menu">
        <div className="px-2 py-3 space-y-1">
          <MobileNavLink href="/" label="Ana Sayfa" />
          <MobileNavLink href="/tours" label="Turlar" />
          <MobileNavLink href="/about" label="Hakkımızda" />
          <MobileNavLink href="/contact" label="İletişim" />
        </div>
      </div>
    </nav>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-900 hover:bg-blue-50 hover:text-blue-600'
      } transition-colors duration-200`}
    >
      {label}
    </Link>
  );
}