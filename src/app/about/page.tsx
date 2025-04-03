import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hakkımızda | Büyük Aytaç Travel - Çerkezköy'ün Güvenilir Seyahat Acentesi",
  description: "Büyük Aytaç Travel, Çerkezköy merkezli TÜRSAB üyesi bir seyahat acentesidir. Yurtiçi ve yurtdışı turlarımızla güvenilir ve konforlu seyahat hizmeti sunuyoruz.",
  keywords: "Büyük Aytaç Travel, Çerkezköy seyahat acentesi, TÜRSAB üyesi, güvenilir tur şirketi, Çerkezköy tur şirketi, Tekirdağ tur operatörü",
  openGraph: {
    title: "Hakkımızda | Büyük Aytaç Travel - Çerkezköy'ün Güvenilir Seyahat Acentesi",
    description: "Büyük Aytaç Travel, Çerkezköy merkezli TÜRSAB üyesi bir seyahat acentesidir. Yurtiçi ve yurtdışı turlarımızla güvenilir ve konforlu seyahat hizmeti sunuyoruz.",
    url: 'https://www.buyukaytactravel.com/about',
    siteName: 'Büyük Aytaç Travel',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Hakkımızda</h1>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                <strong>Büyük Aytaç Travel</strong>, Çerkezköy&apos;de hizmet veren, TÜRSAB belgesine sahip profesyonel bir seyahat acentesidir. Müşteri memnuniyetini ön planda tutarak, kaliteli ve güvenilir tur hizmetleri sunuyoruz.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Vizyonumuz</h2>
              <p className="text-gray-700 mb-6">
                Müşterilerimize unutulmaz seyahat deneyimleri yaşatmak ve sektörde güvenilirliğin simgesi olmak.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Misyonumuz</h2>
              <p className="text-gray-700 mb-6">
                Yurtiçi ve yurtdışında en kaliteli ve güvenilir tur hizmetini, en uygun fiyatlarla sunarak müşterilerimizin beklentilerini aşmak.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Değerlerimiz</h2>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                <li className="mb-2">Müşteri memnuniyeti odaklı hizmet anlayışı</li>
                <li className="mb-2">Güvenilirlik ve şeffaflık</li>
                <li className="mb-2">Profesyonellik ve tecrübe</li>
                <li className="mb-2">Yenilikçilik ve sürekli gelişim</li>
                <li className="mb-2">Sosyal sorumluluk ve çevre bilinci</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Büyük Aytaç Travel</strong> olarak, sizlere sunduğumuz avantajlar:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                <li className="mb-2">TÜRSAB güvencesi ile profesyonel hizmet</li>
                <li className="mb-2">Deneyimli ve uzman rehberler</li>
                <li className="mb-2">Konforlu ve güvenli ulaşım araçları</li>
                <li className="mb-2">Özenle seçilmiş konaklama tesisleri</li>
                <li className="mb-2">Uygun fiyat garantisi</li>
                <li className="mb-2">7/24 müşteri desteği</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">İletişim</h2>
              <p className="text-gray-700">
                Bizimle iletişime geçmek veya sorularınız için aşağıdaki bilgilerden bize ulaşabilirsiniz:
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Adres:</strong> Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Telefon:</strong> 0530 060 95 59 / 0539 345 95 59
              </p>
              <p className="text-gray-700">
                <strong>E-posta:</strong> info@buyukaytac.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 