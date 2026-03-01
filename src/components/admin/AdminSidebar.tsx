'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(path);
  };
  
  const menuItems = [
    { name: 'Gösterge Paneli', href: '/admin', icon: HomeIcon },
    { name: 'Turlar', href: '/admin/tours', icon: GlobeAltIcon },
    { name: 'Blog', href: '/admin/blogs', icon: DocumentTextIcon },
  ];

  useEffect(() => {
    if (isOpen && onClose) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-blue-800 text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          <h1 className="text-lg font-bold">BÜYÜK AYTAÇ</h1>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-blue-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  onClick={onClose}
                  className={`
                    flex items-center px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${isActive(item.href) 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-100 hover:bg-blue-700/50'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
