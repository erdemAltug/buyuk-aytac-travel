import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kullanım Şartları | Büyük Aytaç Travel",
  description: "Büyük Aytaç Travel web sitesi kullanım şartları ve koşulları. Rezervasyon, ödeme ve iptal politikalarımızla ilgili bilgiler.",
  keywords: "kullanım şartları, kullanım koşulları, rezervasyon, iptal politikası, Büyük Aytaç Travel",
  openGraph: {
    title: "Kullanım Şartları | Büyük Aytaç Travel",
    description: "Büyük Aytaç Travel web sitesi kullanım şartları ve koşulları. Rezervasyon, ödeme ve iptal politikalarımızla ilgili bilgiler.",
    url: 'https://www.buyukaytactravel.com/terms',
    siteName: 'Büyük Aytaç Travel',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Kullanım Şartları</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Son güncelleme tarihi: {new Date().toLocaleDateString('tr-TR')}
              </p>
              
              <p className="text-gray-700 mb-6">
                Büyük Aytaç Travel web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Bu sayfayı düzenli olarak ziyaret ederek güncellenmiş şartları takip etmenizi öneririz.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">BÜYÜK AYTAÇ TRAVEL TUR SATIŞ BİLGİLENDİRME VE İPTAL İADE KOŞULLARI</h2>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li>Ön ödeme tutarı kayıt tarihinde rezervasyon bedelinin minimum %50&apos;sidir. Günübirlik turlarda turun hareket tarihinden 7 gün önce, konaklamalı turlarda 15 gün önce kalan tur bedelinin tamamlanması gerekir.</li>
                  <li>İptaller GÜNÜBİRLİK TURLARDA son 7 gün öncesine kadar yapılmaktadır.</li>
                  <li>İptaller KONAKLAMALI TURLARDA son 15 gün öncesine kadar yapılmaktadır.</li>
                  <li>Hava muhalefeti nedeni ile olabilecek değişikliklerden, acentemiz sorumlu değildir ve Acente programda değişiklik hakkına sahiptir.</li>
                  <li>Hava muhalefeti nedeni ile olabilecek değişikliklerden, acentemiz sorumlu değildir ve Acente programda değişiklik hakkına sahiptir.</li>
                  <li>Rezervasyon esnasında kesinlikle koltuk numarası sözü ve garantisi verilemez. Araçlarda bulunan 3 ve 4 numaralı koltuk rehber ve yardımcısına aittir.</li>
                  <li>Rehberimiz gezilecek bölgenin yoğunluğu, hava muhalefeti nedeniyle tur programında değişiklik yapabilir. Bu durumda tur programında yazılan ama gezilemeyen yerlerden BÜYÜK AYTAÇ TRAVEL sorumlu değildir. Rehberimizin tur sırasında verdiği saatlere misafirlerimizin uymaması sonucunda, tur programında yazdığı halde gezilemeyen yerlerden BÜYÜK AYTAÇ TRAVEL sorumlu değildir.</li>
                  <li>Tur öncesi ve tur esnasında hava muhalefeti nedeniyle ve mücbir sebepler ile yapılamayan turlarda BÜYÜK AYTAÇ TRAVEL&apos;in sorumluluğu yoktur.</li>
                  <li>Tur esnasında program yoğunluğundan dolayı bankamatik, döviz bürosu vs. bulmak her zaman mümkün olmadığından dolayı hazırlıklı gelinmelidir.</li>
                  <li>Mola yerlerimiz; yoğunluk, tadilat vb. gibi mücbir sebeplerden ötürü mevki ve hizmet standartları açısından benzer yerlerle değiştirilebilir.</li>
                  <li>Kullanılmayan ulaşım, konaklama, çevre gezileri vb. haklar iade edilmez başka bir tur programında kullanılmak üzere ödeme hakkı saklı tutulur.</li>
                  <li>Kişilerin tura katılımlarındaki sağlık sorunları, hamilelik durumu, sürekli kullanımda bulundukları ilaçlar ile ilgili raporları yanlarında bulundurmaları gerekmektedir. Bu gibi sebeplerle ayrıcalık talep etmeleri halinde rapor bildirmeleri gerekmektedir.</li>
                  <li>BÜYÜK AYTAÇ TRAVEL konaklamalı turlarda otel değişikliği hakkını saklı tutar.</li>
                </ol>
                <p className="text-gray-700 mt-4 font-bold">
                  SATIN ALMIŞ OLDUĞUNUZ TUR SONRASI YUKARIDAKİ KOŞULLARI KABUL ETMİŞ SAYILIRSINIZ. BİLGİLERİNİZE SUNARIZ.
                </p>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Web Sitesi Kullanımı</h2>
              <p className="text-gray-700 mb-4">
                Büyük Aytaç Travel web sitesini kullanırken Türkiye Cumhuriyeti yasalarına ve uluslararası internet kullanım kurallarına uymayı kabul edersiniz. Site içeriğini kopyalamak, çoğaltmak, değiştirmek ya da dağıtmak için önceden yazılı izin almanız gerekmektedir.
              </p>
              <p className="text-gray-700 mb-4">
                Web sitemizde bulunan tüm içerikler (metin, görsel, logo, tasarım vb.) telif hakkı ile korunmaktadır ve Büyük Aytaç Travel&apos;ın mülkiyetindedir.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Rezervasyon ve Ödeme Koşulları</h2>
              <p className="text-gray-700 mb-4">
                Tur rezervasyonları için ön ödeme veya tam ödeme gereklidir. Ödeme koşulları tur tipine göre değişiklik gösterebilir ve rezervasyon sırasında belirtilir.
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li className="mb-2">Yurtiçi turlar için genellikle %30 ön ödeme, kalan ödeme tur başlangıcından 7 gün önce</li>
                <li className="mb-2">Yurtdışı turlar için genellikle %50 ön ödeme, kalan ödeme tur başlangıcından 15 gün önce</li>
                <li className="mb-2">Özel dönem ve bayram turları için belirtilen özel ödeme koşulları geçerlidir</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Ödeme yapmadan önce tur detaylarını, fiyata dahil olan ve olmayan hizmetleri, konaklama bilgilerini dikkatle incelemenizi öneririz.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. İptal ve İade Politikası</h2>
              <p className="text-gray-700 mb-4">
                İptal koşulları her tur için farklılık gösterebilir. Genel iptal politikamız aşağıdaki gibidir:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li className="mb-2">Tur başlangıcından 30 gün öncesine kadar yapılan iptallerde ödemenin tamamı iade edilir.</li>
                <li className="mb-2">Tur başlangıcından 15-29 gün öncesine kadar yapılan iptallerde ödemenin %70&apos;i iade edilir.</li>
                <li className="mb-2">Tur başlangıcından 8-14 gün öncesine kadar yapılan iptallerde ödemenin %50&apos;si iade edilir.</li>
                <li className="mb-2">Tur başlangıcından 7 gün veya daha az süre kala yapılan iptallerde iade yapılmaz.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Tur iptali Büyük Aytaç Travel tarafından yapılırsa, ödemenin tamamı iade edilir veya alternatif tur imkanı sunulur.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Sorumluluk Sınırları</h2>
              <p className="text-gray-700 mb-4">
                Büyük Aytaç Travel, mücbir sebeplerden (doğal afet, siyasi kriz, hava koşulları, vb.) kaynaklanan program değişiklikleri veya iptallerden sorumlu tutulamaz. Bu durumlarda alternatif çözümler üretmek için elimizden geleni yapacağız.
              </p>
              <p className="text-gray-700 mb-4">
                Tur süresince şahsi eşyalarınızın güvenliğinden kendiniz sorumlusunuz. Değerli eşyalarınızı her zaman yanınızda bulundurmanızı öneririz.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Sağlık ve Güvenlik</h2>
              <p className="text-gray-700 mb-4">
                Turlara katılmadan önce sağlık durumunuzun tura uygun olduğundan emin olmanız gerekmektedir. Özel sağlık durumları olan misafirlerimizin rezervasyon sırasında bizi bilgilendirmesini rica ederiz.
              </p>
              <p className="text-gray-700 mb-4">
                Tüm turlarımız TÜRSAB lisanslı, profesyonel ve güvenilir personel ile gerçekleştirilmektedir. Tur sırasında rehberimizin güvenlik konusundaki yönlendirmelerine uymanız önemlidir.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Kişisel Verilerin Korunması</h2>
              <p className="text-gray-700 mb-4">
                Büyük Aytaç Travel, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizi korumak için gerekli tüm teknik ve idari tedbirleri almaktadır. Kişisel verilerinizin nasıl işlendiği hakkında detaylı bilgi için <a href="/privacy" className="text-blue-600 hover:underline">Gizlilik Politikamızı</a> inceleyebilirsiniz.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. İletişim</h2>
              <p className="text-gray-700 mb-4">
                Kullanım Şartları ile ilgili sorularınız veya geri bildirimleriniz için aşağıdaki kanallardan bize ulaşabilirsiniz:
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Telefon:</strong> 0530 060 95 59 / 0539 345 95 59
              </p>
              <p className="text-gray-700 mb-2">
                <strong>E-posta:</strong> info@buyukaytactravel.com
              </p>
              <p className="text-gray-700">
                <strong>Adres:</strong> Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 