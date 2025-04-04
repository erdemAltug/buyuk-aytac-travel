import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Büyük Aytaç Travel",
  description: "Büyük Aytaç Travel gizlilik politikası. Kişisel verilerinizin nasıl işlendiği, depolandığı ve korunduğu hakkında bilgi.",
  keywords: "gizlilik politikası, kişisel veri koruma, kvkk, Büyük Aytaç Travel",
  openGraph: {
    title: "Gizlilik Politikası | Büyük Aytaç Travel",
    description: "Büyük Aytaç Travel gizlilik politikası. Kişisel verilerinizin nasıl işlendiği, depolandığı ve korunduğu hakkında bilgi.",
    url: 'https://www.buyukaytactravel.com/privacy',
    siteName: 'Büyük Aytaç Travel',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Gizlilik Politikası</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Son güncelleme tarihi: {new Date().toLocaleDateString('tr-TR')}
              </p>
              
              <p className="text-gray-700 mb-6">
                Büyük Aytaç Travel olarak kişisel verilerinizin güvenliği bizim için büyük önem taşımaktadır. Bu gizlilik politikası, bizden hizmet alırken sağladığınız kişisel bilgilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Toplanan Bilgiler</h2>
              <p className="text-gray-700 mb-4">
                Büyük Aytaç Travel, aşağıdaki kişisel verileri toplayabilir:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li className="mb-2">İsim, soyadı, TC kimlik numarası, doğum tarihi gibi kimlik bilgileri</li>
                <li className="mb-2">E-posta adresi, telefon numarası, adres gibi iletişim bilgileri</li>
                <li className="mb-2">Tur rezervasyonları ile ilgili bilgiler (tercih edilen turlar, tarihler, konaklama tipi)</li>
                <li className="mb-2">Ödeme bilgileri (banka hesap bilgileri, fatura bilgileri)</li>
                <li className="mb-2">Web sitemiz üzerinden toplanan çerezler ve kullanım verileri</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Bilgilerin Kullanımı</h2>
              <p className="text-gray-700 mb-4">
                Topladığımız kişisel verileri aşağıdaki amaçlarla kullanmaktayız:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li className="mb-2">Tur ve seyahat hizmetlerimizi sunmak ve yönetmek</li>
                <li className="mb-2">Rezervasyon, ödeme ve iptalleri yönetmek</li>
                <li className="mb-2">Müşteri hizmetleri sağlamak ve sorularınıza cevap vermek</li>
                <li className="mb-2">Yasal yükümlülüklerimizi yerine getirmek</li>
                <li className="mb-2">Size özel teklifler ve yeni turlar hakkında bilgi vermek (izin vermeniz halinde)</li>
                <li className="mb-2">Hizmetlerimizi geliştirmek ve iyileştirmek</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Bilgilerin Paylaşımı</h2>
              <p className="text-gray-700 mb-4">
                Büyük Aytaç Travel, kişisel verilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmaz:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li className="mb-2">Hizmetlerimizin sunulması için gerekli olan tedarikçiler (oteller, taşıma firmaları, tur rehberleri vb.)</li>
                <li className="mb-2">Yasal bir zorunluluk olduğunda (mahkeme kararı, yasal soruşturma vb.)</li>
                <li className="mb-2">Sizin açık rızanız olduğunda</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Tüm üçüncü taraf hizmet sağlayıcılarımızla veri koruma anlaşmaları imzalamakta ve kişisel verilerinizin güvenliğini sağlamaktayız.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Veri Saklama ve Güvenlik</h2>
              <p className="text-gray-700 mb-4">
                Kişisel verilerinizi hizmetlerimizi sunmak için gerekli olan süre boyunca veya yasal yükümlülüklerimiz gerektirdiği sürece saklıyoruz. Verilerinizin güvenliğini sağlamak için şifreleme, güvenlik duvarları ve fiziksel güvenlik önlemleri dahil olmak üzere çeşitli teknik ve idari önlemler alıyoruz.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Çerezler ve Takip Teknolojileri</h2>
              <p className="text-gray-700 mb-4">
                Web sitemiz, deneyiminizi geliştirmek ve kullanım istatistiklerini toplamak için çerezleri kullanmaktadır. Tarayıcı ayarlarınızı değiştirerek çerezleri devre dışı bırakabilirsiniz, ancak bu durumda web sitemizin bazı özellikleri düzgün çalışmayabilir.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Haklarınız</h2>
              <p className="text-gray-700 mb-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li className="mb-2">Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li className="mb-2">Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li className="mb-2">Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li className="mb-2">Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li className="mb-2">Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li className="mb-2">Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li className="mb-2">İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li className="mb-2">Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Gizlilik Politikası Değişiklikleri</h2>
              <p className="text-gray-700 mb-4">
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Politikada yapılan değişiklikler web sitemizde yayınlanacaktır. Değişiklikler yayınlandıktan sonra web sitemizi kullanmaya devam etmeniz, bu değişiklikleri kabul ettiğiniz anlamına gelir.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. İletişim</h2>
              <p className="text-gray-700 mb-4">
                Gizlilik politikamız veya kişisel verilerinizle ilgili sorularınız için aşağıdaki kanallardan bize ulaşabilirsiniz:
              </p>
              <p className="text-gray-700 mb-2">
                <strong>E-posta:</strong> info@buyukaytactravel.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Telefon:</strong> 0530 060 95 59 / 0539 345 95 59
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