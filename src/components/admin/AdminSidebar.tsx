'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, DocumentTextIcon, EnvelopeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return pathname?.startsWith(path) ? 'bg-blue-700' : '';
  };
  
  const menuItems = [
    { name: 'Gösterge Paneli', href: '/admin', icon: HomeIcon },
    { name: 'Turlar', href: '/admin/tours', icon: GlobeAltIcon },
    { name: 'Blog', href: '/admin/blogs', icon: DocumentTextIcon },
    { name: 'İletişim Formları', href: '/admin/contacts', icon: EnvelopeIcon },
    { name: 'Ayarlar', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="h-screen flex-1 max-w-[250px] bg-blue-800 text-white">
      <div className="p-4 flex items-center justify-between">
        <h1 className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>BÜYÜK AYATAÇ</h1>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-white p-1 rounded-full hover:bg-blue-700 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      </div>
      <nav className="mt-5">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-700 ${isActive(item.href) && pathname === item.href ? 'bg-blue-700' : ''}`}
              >
                <item.icon 
                  className="h-5 w-5" 
                  aria-hidden="true" 
                />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 