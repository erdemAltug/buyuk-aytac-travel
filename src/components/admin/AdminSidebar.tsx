'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return pathname?.startsWith(path) ? 'bg-blue-700' : '';
  };
  
  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-blue-800 text-white transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <Link href="/admin" className="text-xl font-bold">
            Aytaç Admin
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {collapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            )}
          </svg>
        </button>
      </div>

      <nav className="mt-5">
        <ul className="space-y-2 px-2">
          <li>
            <Link 
              href="/admin" 
              className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin') && pathname === '/admin' ? 'bg-blue-700' : ''}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              {!collapsed && <span className="ml-3">Ana Panel</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/tours" 
              className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin/tours')}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
                />
              </svg>
              {!collapsed && <span className="ml-3">Turlar</span>}
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/reservations" 
              className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-700 ${isActive('/admin/reservations')}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              {!collapsed && <span className="ml-3">Rezervasyonlar</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <Link 
          href="/"
          className="flex items-center px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          {!collapsed && <span className="ml-3">Siteye Dön</span>}
        </Link>
      </div>
    </div>
  );
} 