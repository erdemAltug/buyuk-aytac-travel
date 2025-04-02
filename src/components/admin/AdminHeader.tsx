'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Remove admin auth from localStorage
    localStorage.removeItem('adminLoggedIn');
    
    // Redirect to login page
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Büyük Aytaç Seyahat</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <span>A</span>
              </div>
              <span className="ml-2 text-gray-700 hidden sm:block">Admin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 