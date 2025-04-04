// Seyahat Tavsiyeleri kategorisinde ilk blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Valiz Hazırlamanın 10 Altın Kuralı",
      slug: "valiz-hazirlamanin-10-altin-kurali",
      summary: "Seyahat öncesi valiz hazırlamanın en etkili yöntemleri, dikkat edilmesi gereken noktalar ve uzmanların önerileri.",
      content: `# Valiz Hazırlamanın 10 Altın Kuralı

Tatil veya iş seyahati öncesi valiz hazırlamak, çoğumuz için stresli bir süreç olabilir. "Neyi almalıyım?", "Ne kadar kıyafet yeterli olur?", "Ya bir şeyi unutursam?" gibi sorular aklımızı kurcalar. Bu yazımızda, valiz hazırlamanın püf noktalarını ve 10 altın kuralını sizlerle paylaşıyoruz.

## 1. Liste Hazırlayın

Seyahatinizden birkaç gün önce yanınıza almanız gereken tüm eşyaların bir listesini hazırlayın. Bu liste, önemli bir eşyayı unutma riskinizi azaltır ve valiz hazırlama sürecini daha sistematik hale getirir.

## 2. Hava Durumunu Kontrol Edin

Gideceğiniz yerin hava durumunu mutlaka kontrol edin ve kıyafetlerinizi buna göre seçin. Ani hava değişikliklerine karşı ince bir yağmurluk veya hırka bulundurmak da faydalı olabilir.

## 3. Rulo Tekniğini Kullanın

Kıyafetlerinizi katlamak yerine rulo yaparak yerleştirmek hem daha az yer kaplar hem de kıyafetlerinizin daha az kırışmasını sağlar.

## 4. Önemli Belgelerinizi Ayırın

Pasaport, uçak bileti, otel rezervasyon bilgileri gibi önemli belgeleri valizinize koymak yerine, yanınızda taşıyacağınız bir çantada bulundurun.

## 5. Sıvılar İçin Önlem Alın

Uçak yolculuklarında sıvı kısıtlamaları olduğunu unutmayın. Ayrıca, şampuan, krem gibi ürünlerin akmasını önlemek için bunları küçük seyahat boylarına aktarın veya üzerlerini streç film ile kapatın.

## 6. Elektronik Cihazlarınızı Koruyun

Elektronik cihazlarınızı korumalı kılıflarda taşıyın ve şarj aletlerini, adaptörleri unutmayın.

## 7. İlaçlarınızı Yanınıza Alın

Düzenli kullandığınız ilaçlar varsa, yeterli miktarda yanınıza alın ve reçetelerini bulundurun. Ayrıca küçük bir ilk yardım çantası hazırlamak da faydalı olabilir.

## 8. Giysileri Kombinleyin

Az yer kaplayan ve birbirleriyle kolayca kombine edilebilecek kıyafetler seçin. Tek bir renk paletinde kalmak, kombinleri kolaylaştırır.

## 9. Ağırlık Limitlerine Dikkat Edin

Havayolu şirketlerinin bagaj ağırlık limitlerine dikkat edin. Fazla bagaj ücreti ödemek istemiyorsanız, valizinizi evde tartın.

## 10. Boş Alan Bırakın

Seyahatiniz sırasında alışveriş yapabileceğinizi düşünerek valizinizde biraz boş alan bırakmak akıllıca olacaktır.

Bu kurallara uyarak, seyahatleriniz için valiz hazırlama sürecini daha verimli ve stressiz hale getirebilirsiniz. Keyifli yolculuklar!`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
      categories: ["travel-tips"],
      isPublished: true,
      publishDate: new Date(),
    };

    const newBlog = await Blog.create(blog);
    console.log(`Blog yazısı oluşturuldu: ${newBlog.title}`);
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

createBlog(); 