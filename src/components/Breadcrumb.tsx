'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  customItems?: { name: string; href: string }[];
  homeName?: string;
  className?: string;
  /** "dark": koyu zemin üzerinde (ör. tur detay başlık bandı) */
  tone?: 'light' | 'dark';
}

export default function Breadcrumb({ customItems, homeName = 'Ana Sayfa', className = '', tone = 'light' }: BreadcrumbProps) {
  const dark = tone === 'dark';
  const pathname = usePathname();
  
  // Özel ekmek kırıntısı öğeleri belirtilmediyse, yol adından otomatik oluştur
  const items = customItems || generateBreadcrumbs(pathname, homeName);
  
  // Breadcrumb için yapılandırılmış şema verisi (schema.org)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.buyukaytactravel.com${item.href}`
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Breadcrumb UI */}
      <nav aria-label="Ekmek Kırıntısı" className={`flex flex-wrap items-center gap-y-1 text-sm ${className}`}>
        {items.map((item, index) => (
          <div key={item.href} className={`flex items-center ${dark && index === items.length - 1 ? 'max-sm:hidden' : ''}`}>
            {index > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" className={`mx-2 h-4 w-4 ${dark ? 'text-white/50' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className={`font-medium ${dark ? 'line-clamp-1 text-white' : 'text-gray-700'}`} aria-current="page">{item.name}</span>
            ) : (
              <Link 
                href={item.href} 
                className={dark ? 'text-white/80 hover:text-white hover:underline' : 'text-blue-600 hover:text-blue-800 hover:underline'}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

// Patika yolundan ekmek kırıntıları oluşturma işlevi
function generateBreadcrumbs(pathname: string, homeName: string) {
  // Ana sayfa her zaman ilk öğedir
  const breadcrumbs = [{ name: homeName, href: '/' }];
  
  // Patika yolu parçalara ayır
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Türkçe etiketleme için yaygın URL bölümlerinin eşleşmesi
  const pathLabels: Record<string, string> = {
    'tours': 'Turlar',
    'blog': 'Blog',
    'contact': 'İletişim',
    'about': 'Hakkımızda',
    'faq': 'SSS',
    'terms': 'Koşullar',
    'privacy': 'Gizlilik',
    'tour-calendar': 'Tur Takvimi',
    'group-tour': 'Özel Grup Turu',
    'annual-program': 'Yıllık Program',
    'destinations': 'Destinasyonlar',
    'last-minute': 'Son Dakika Fırsatları',
    'domestic': 'Yurtiçi Turları',
    'international': 'Yurtdışı Turları',
    'daily': 'Günübirlik Turlar',
    'overnight': 'Konaklamalı Turlar'
  };
  
  // İlk sayfa dışındaki her bölüm için kümülatif yollar oluştur
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Etiket olarak özel eşleşme veya kesme işaretlerini kaldır
    const label = pathLabels[segment] || segment
      .replace(/-/g, ' ')
      .replace(/^./, match => match.toUpperCase());
    
    breadcrumbs.push({
      name: label,
      href: currentPath
    });
  });
  
  return breadcrumbs;
} 