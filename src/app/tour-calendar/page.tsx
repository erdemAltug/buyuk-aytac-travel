import { Metadata } from 'next';
import TourCalendar from '@/components/TourCalendar';

export const metadata: Metadata = {
  title: "Tur Takvimi | Büyük Aytaç Travel",
  description: "Büyük Aytaç Travel'in aylık tur takvimi. Hangi tarihlerde hangi turların düzenlendiğini interaktif takvimde görebilirsiniz.",
  keywords: "tur takvimi, tur programı, tur tarihleri, Büyük Aytaç Travel, Çerkezköy tur takvimi",
};

export default function TourCalendarPage() {
  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tur Takvimimiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yaklaşan tüm turlarımızı görmek için takvimi kullanın. Tur detaylarını görmek için tur adına tıklayabilirsiniz.
          </p>
        </div>
        
        <TourCalendar />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tur Takvimi Hakkında</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Tur takvimimiz, planlanan tüm turlarımızı görmenizi sağlar. Hangi gün hangi turların olduğunu kolayca takip edebilir, tur detaylarına hızlıca erişebilirsiniz.
            </p>
            <p>
              Sezonluk turlarımız, özel etkinlikler ve kampanyalı dönemler takvim üzerinde gösterilir. Sık sık kontrol etmenizi öneririz, çünkü her ay yeni turlar eklemekteyiz.
            </p>
            <p>
              Rezervasyon yapmak veya tur hakkında detaylı bilgi almak için tur detay sayfasını ziyaret edin veya bizimle doğrudan iletişime geçin.
            </p>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Planlama İpuçları</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Popüler turlarımız hızla dolduğu için, erken rezervasyon yapmanızı öneririz.</li>
              <li>Bayram ve tatil dönemlerinde ek turlar düzenliyoruz, takvimi takip edin.</li>
              <li>Özel grup turları için özel tarihler belirlenebilir, lütfen iletişime geçin.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 