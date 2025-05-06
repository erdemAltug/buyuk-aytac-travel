'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  customItems?: { name: string; href: string }[];
  homeName?: string;
  className?: string;
}

export default function Breadcrumb({ customItems, homeName = 'Ana Sayfa', className = '' }: BreadcrumbProps) {
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
      <nav aria-label="Ekmek Kırıntısı" className={`flex items-center space-x-2 text-sm ${className}`}>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-700 font-medium" aria-current="page">{item.name}</span>
            ) : (
              <Link 
                href={item.href} 
                className="text-blue-600 hover:text-blue-800 hover:underline"
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