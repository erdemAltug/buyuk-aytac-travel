import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Büyük Aytaç Travel",
  description: "Büyük Aytaç Travel tur rezervasyonları, ödemeler, iptaller ve hizmetlerimiz hakkında sık sorulan sorular ve yanıtları.",
  keywords: "sık sorulan sorular, faq, tur rezervasyonu, tur iptali, tur koşulları, seyahat acentesi, Büyük Aytaç Travel",
  openGraph: {
    title: "Sık Sorulan Sorular | Büyük Aytaç Travel",
    description: "Büyük Aytaç Travel tur rezervasyonları, ödemeler, iptaller ve hizmetlerimiz hakkında sık sorulan sorular ve yanıtları.",
    url: 'https://www.buyukaytactravel.com/faq',
    siteName: 'Büyük Aytaç Travel',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Tur rezervasyonu nasıl yapabilirim?",
      answer: "Tur rezervasyonlarınızı web sitemiz üzerinden online olarak, ofisimize gelerek veya 0530 060 95 59 / 0539 345 95 59 numaralı telefonlardan yapabilirsiniz. Web sitemizden yapılan tur talepleri için en kısa sürede sizinle iletişime geçilecektir."
    },
    {
      question: "Tur ödemelerini nasıl yapabilirim?",
      answer: "Ödemenizi nakit, havale/EFT ya da kredi kartı ile yapabilirsiniz. Ödemeler genellikle ön ödeme ve bakiye şeklinde iki aşamada gerçekleştirilir. Rezervasyon sırasında minimum %50 ön ödeme alınmaktadır. Günübirlik turlarda hareket tarihinden 7 gün önce, konaklamalı turlarda ise 15 gün önce kalan tur bedelinin tamamlanması gerekir."
    },
    {
      question: "Tur fiyatlarına neler dahildir?",
      answer: "Tur fiyatlarına genellikle ulaşım, rehberlik, konaklama (konaklamalı turlarda), bahsedilen yemekler ve programda belirtilen müze/ören yeri giriş ücretleri dahildir. Her tur için dahil olan ve olmayan hizmetler detaylı olarak tur sayfasında belirtilmektedir."
    },
    {
      question: "Çocuklar için indirim var mı?",
      answer: "Evet, çoğu turumuzda 0-6 yaş ve 7-12 yaş çocuklar için indirimler bulunmaktadır. İndirim oranları tura göre değişiklik gösterebilir ve tur detay sayfasında belirtilir."
    },
    {
      question: "Tur iptal koşulları nelerdir?",
      answer: "Günübirlik turlarda, tur başlangıcından 7 gün öncesine kadar; konaklamalı turlarda ise 15 gün öncesine kadar iptal yapılabilmektedir. Bu sürelerden sonra yapılan iptallerde ücret iadesi yapılamamaktadır. Ayrıntılı bilgi için 'Kullanım Şartları' sayfamızdaki TUR SATIŞ BİLGİLENDİRME VE İPTAL İADE KOŞULLARI bölümünü inceleyebilirsiniz."
    },
    {
      question: "Koltuk numarası seçebilir miyim?",
      answer: "Rezervasyon esnasında kesinlikle koltuk numarası sözü ve garantisi verilmemektedir. Araçlarda bulunan 3 ve 4 numaralı koltuklar rehber ve yardımcısına aittir."
    },
    {
      question: "Yurtdışı turlarda vize hizmeti sağlıyor musunuz?",
      answer: "Evet, yurtdışı turlarımız için vize başvuru süreçlerinde yardımcı olmaktayız. Vize için gerekli belgeler ve prosedürler hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz. Ancak vize başvurusunun olumlu sonuçlanacağını garanti edemeyiz."
    },
    {
      question: "Turlarınız minimum kaç kişi ile gerçekleşiyor?",
      answer: "Turlarımız genellikle minimum 15-20 kişi ile gerçekleşmektedir. Yeterli sayıya ulaşılmadığı durumlarda, tur iptal edilebilir veya tarihi değiştirilebilir. Bu durumda size önceden bilgi verilir ve ödemenizin iadesi veya farklı bir tura transfer seçeneği sunulur."
    },
    {
      question: "Tur programında değişiklik olabilir mi?",
      answer: "Evet, rehberimiz gezilecek bölgenin yoğunluğu veya hava muhalefeti nedeniyle tur programında değişiklik yapabilir. Bu durumda programda yazılan ancak gezilemeyen yerlerden Büyük Aytaç Travel sorumlu değildir. Ayrıca rehberimizin tur sırasında verdiği saatlere uyulmaması durumunda gezilemeyen yerlerden de firmamız sorumlu tutulamaz."
    },
    {
      question: "Tur sırasında rehberlik hizmeti var mı?",
      answer: "Evet, tüm turlarımızda profesyonel, Kültür ve Turizm Bakanlığı lisanslı rehberler eşlik etmektedir. Rehberlerimiz, ziyaret edilen bölgelerde en iyi deneyimi yaşamanız için size gerekli tüm bilgi ve desteği sağlar."
    },
    {
      question: "Özel turlar veya grup organizasyonları düzenliyor musunuz?",
      answer: "Evet, şirketlere, okullara, derneklere veya özel gruplara özel tur paketleri hazırlayabiliyoruz. İsteklerinize göre özelleştirilmiş program ve fiyat teklifi almak için bizimle iletişime geçebilirsiniz."
    },
    {
      question: "Turlarda kullanılan araçlar nasıl?",
      answer: "Turlarımızda yeni model, bakımlı, klimalı ve konforlu araçlar kullanılmaktadır. Araç tipi (otobüs, midibüs, minibüs) tura katılan kişi sayısına göre belirlenir. Tüm araçlarımız düzenli bakımdan geçirilmekte ve deneyimli şoförler tarafından kullanılmaktadır."
    },
    {
      question: "Tur sırasında kullanılmayan haklarım için iade alabilir miyim?",
      answer: "Kullanılmayan ulaşım, konaklama, çevre gezileri vb. haklar iade edilmez, ancak başka bir tur programında kullanılmak üzere ödeme hakkı saklı tutulabilir. Detaylı bilgi için müşteri hizmetlerimizle iletişime geçebilirsiniz."
    },
    {
      question: "Sağlık sorunları olan kişiler için özel düzenlemeler yapıyor musunuz?",
      answer: "Kişilerin tura katılımlarındaki sağlık sorunları, hamilelik durumu, sürekli kullanımda bulundukları ilaçlar ile ilgili raporları yanlarında bulundurmaları gerekmektedir. Bu gibi sebeplerle ayrıcalık talep etmeleri halinde rapor bildirmeleri gerekir. Özel durumlarınızı lütfen rezervasyon sırasında belirtin."
    },
    {
      question: "Erken rezervasyon avantajları nelerdir?",
      answer: "Erken rezervasyon yaptırdığınızda tur fiyatlarında %5-15 arasında indirim sağlayabilirsiniz. Ayrıca, erken rezervasyon sayesinde oda tipi ve oturma düzeni konusunda öncelik elde edersiniz. Sezon içinde dolabilecek popüler turlarımız için erken rezervasyon yapmanızı öneririz."
    },
    {
      question: "Son dakika rezervasyonu yapabilir miyim?",
      answer: "Kontenjan müsait olduğu sürece son dakika rezervasyonu yapabilirsiniz. Ancak, özellikle tatil dönemlerinde ve popüler turlarımızda kontenjanlar hızla dolmaktadır. Otel, ulaşım ve diğer hizmet garantileri için mümkün olduğunca erken rezervasyon yapmanızı öneririz."
    },
    {
      question: "Tek kişi olarak katılabilir miyim? Tek kişi farkı nedir?",
      answer: "Evet, tek kişi olarak turlarımıza katılabilirsiniz. Konaklamalı turlarda odaları genellikle çift kişilik olarak düzenlediğimiz için tek kişi konaklama durumunda &apos;tek kişi farkı&apos; ödemeniz gerekir. Bu fark, tur fiyatının yaklaşık %25-30&apos;u kadardır ve tur detay sayfasında belirtilir."
    },
    {
      question: "Engelli misafirler için uygun turlarınız var mı?",
      answer: "Bazı turlarımız engelli misafirlerimizin katılımına uygundur. Lütfen rezervasyon öncesi engel durumunuz hakkında bizi bilgilendirin, böylece size en uygun turu önerebilir ve gerekli düzenlemeleri yapabiliriz. Tekerlekli sandalye erişimi, özel transfer, vb. ihtiyaçlarınızı önceden bildirmeniz önemlidir."
    },
    {
      question: "Vejetaryen veya özel diyet gereksinimleri olan misafirler için düzenleme yapılıyor mu?",
      answer: "Evet, vejetaryen, vegan, gluten hassasiyeti veya diğer özel diyet gereksinimlerinizi rezervasyon sırasında belirtmeniz halinde, konaklama ve yemek dahil olan tüm turlarımızda gerekli düzenlemeleri yapmaya çalışırız."
    },
  ];

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h1>
            
            <p className="text-gray-700 mb-8">
              Büyük Aytaç Travel hizmetleri hakkında sık sorulan sorular ve cevapları aşağıda bulabilirsiniz. 
              Burada cevabını bulamadığınız sorularınız için <a href="/contact" className="text-blue-600 hover:underline">iletişim sayfamızdan</a> bize ulaşabilirsiniz.
            </p>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Başka Sorunuz Var mı?</h3>
              <p className="text-gray-700 mb-4">
                Burada yanıtını bulamadığınız sorularınız için bizimle iletişime geçmekten çekinmeyin. Size en kısa sürede yardımcı olmaktan memnuniyet duyarız.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Bize Ulaşın
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 