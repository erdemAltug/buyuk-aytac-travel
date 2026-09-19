'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.assign('/admin/login');
  };

  const initials =
    `${session?.user?.firstName?.[0] || 'A'}${session?.user?.lastName?.[0] || ''}`.toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-blue-600 lg:hidden">Admin Panel</span>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
              {initials}
            </div>
            <span className="hidden text-sm text-gray-700 sm:block">
              {session?.user?.firstName || 'Admin'}
            </span>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white py-1 shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
