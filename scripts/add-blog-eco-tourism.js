// Eko-turizm konusunda yeni blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Sürdürülebilir Seyahat: Eko-Turizm Rehberi",
      slug: "surdurulebilir-seyahat-eko-turizm-rehberi",
      summary: "Çevre dostu seyahat deneyimleri, karbon ayak izini azaltma yöntemleri ve dünyanın en iyi eko-turizm destinasyonları hakkında kapsamlı bir rehber.",
      content: `# Sürdürülebilir Seyahat: Eko-Turizm Rehberi

Dünyamız hızla değişiyor ve seyahat alışkanlıklarımızın çevre üzerindeki etkisi giderek daha fazla önem kazanıyor. Eko-turizm, çevreye saygılı, yerel toplulukları destekleyen ve doğal kaynakların korunmasına katkıda bulunan bir seyahat anlayışıdır. Bu yazımızda, sürdürülebilir seyahat prensiplerini, karbon ayak izinizi azaltma yöntemlerini ve dünyanın dört bir yanından eko-turizm destinasyonlarını inceleyeceğiz.

## Eko-Turizm Nedir?

Eko-turizm, doğal alanlara yapılan, yerel halkın refahını destekleyen, doğayı ve kültürel mirası koruyan sorumlu seyahat şeklidir. Bu seyahat biçimi, çevresel sürdürülebilirliği ön planda tutar ve turistlerin doğal alanları ziyaret ederken minimum etki bırakmasını hedefler.

Eko-turizmin temel prensipleri şunlardır:

1. **Çevresel Koruma**: Doğal alanların korunmasına katkıda bulunmak
2. **Yerel Toplulukları Desteklemek**: Yerel ekonomiyi güçlendirmek ve kültürel mirası korumak
3. **Eğitim ve Farkındalık**: Ziyaretçilerin çevre konusunda bilinçlenmesini sağlamak
4. **Sorumlu İşletmecilik**: Sürdürülebilir iş uygulamalarını benimsemek

## Karbon Ayak İzinizi Azaltma Yöntemleri

Seyahat ederken karbon ayak izinizi minimuma indirmek için uygulayabileceğiniz yöntemler:

### Ulaşım Seçimleri

- **Toplu Taşıma**: Mümkün olduğunca uçak yerine tren gibi daha az karbon emisyonu yaratan ulaşım araçlarını tercih edin.
- **Direkt Uçuşlar**: Eğer uçmak zorundaysanız, aktarmasız uçuşları tercih edin. Kalkış ve iniş sırasında en çok yakıt tüketilir.
- **Karbon Denkleştirme**: Uçuşlarınızın karbon emisyonunu hesaplayın ve bunu denkleştiren projelere bağış yapın.
- **Yerel Ulaşım**: Gittiğiniz yerde bisiklet, toplu taşıma veya yürüyüş gibi çevre dostu ulaşım yöntemlerini kullanın.

### Konaklama Seçimleri

- **Sertifikalı Tesisler**: Çevre dostu sertifikalara sahip otelleri veya eko-lojları tercih edin.
- **Yerel İşletmeler**: Büyük zincir oteller yerine yerel işletmelerin yönettiği küçük otelleri destekleyin.
- **Enerji ve Su Tasarrufu**: Konaklamanız sırasında enerji ve su tasarrufuna dikkat edin, havlularınızı yeniden kullanın.

### Günlük Alışkanlıklar

- **Tek Kullanımlık Plastikten Kaçının**: Yanınızda yeniden kullanılabilir su şişesi, alışveriş çantası ve çatal-bıçak takımı bulundurun.
- **Yerel Ürünleri Tercih Edin**: Yerel ve mevsimsel yiyecekleri tercih ederek "gıda kilometresi"ni azaltın.
- **Su Tasarrufu**: Duşları kısa tutun, özellikle su kıtlığı yaşanan bölgelerde.
- **Doğaya Saygılı Olun**: Ziyaret ettiğiniz doğal alanlarda izleri takip edin, çöplerinizi toplayın ve yaban hayatını rahatsız etmeyin.

## Dünyanın En İyi Eko-Turizm Destinasyonları

### 1. Kosta Rika

Kosta Rika, eko-turizmin öncülerinden biridir. Ülke topraklarının %25'i koruma altındadır ve zengin biyoçeşitliliğe sahiptir. Yağmur ormanları, volkanlar ve muhteşem plajları ile doğa severlerin cennetidir.

**Yapılacaklar**:
- Monteverde Bulut Ormanı'nda yürüyüş
- Manuel Antonio Milli Parkı'nda yaban hayatı gözlemi
- Sürdürülebilir kahve çiftliklerini ziyaret
- Deniz kaplumbağalarının yuvalama sahillerini keşfetmek

### 2. Yeni Zelanda

Yeni Zelanda, doğal güzellikleri ve sürdürülebilir turizm girişimleriyle ünlüdür. Ülkenin "Saf Yeni Zelanda" kampanyası, sürdürülebilir turizmi teşvik etmektedir.

**Yapılacaklar**:
- Fiordland Milli Parkı'nda yürüyüş
- Rotorua'da Maori kültürünü keşfetmek
- Abel Tasman Milli Parkı'nda kano turu
- Stewart Adası'nda kivi kuşu gözlemi

### 3. Slovenya

Avrupa'nın en yeşil ülkelerinden biri olan Slovenya, sürdürülebilir turizm uygulamalarıyla örnek teşkil etmektedir. Ülke, "Yeşil Slovenya" programı ile eko-turizmi teşvik etmektedir.

**Yapılacaklar**:
- Triglav Milli Parkı'nda doğa yürüyüşü
- Ljubljana'nın sürdürülebilir şehir uygulamalarını keşfetmek
- Bled Gölü çevresinde bisiklete binmek
- Organik çiftliklerde yerel lezzetleri tatmak

### 4. Galapagos Adaları, Ekvador

Benzersiz ekosistemi ve endemik türleriyle ünlü Galapagos Adaları, kontrollü turizm uygulamalarıyla doğal hayatı korumaya çalışmaktadır.

**Yapılacaklar**:
- Sertifikalı rehberler eşliğinde adaları keşfetmek
- Dev kaplumbağaları gözlemlemek
- Snorkel yaparak deniz yaşamını keşfetmek
- Charles Darwin Araştırma İstasyonu'nu ziyaret etmek

### 5. Bhutan

Bhutan, "Gayri Safi Milli Mutluluk" kavramıyla bilinen ve sürdürülebilir turizm politikaları uygulayan bir ülkedir. Günlük ziyaretçi ücreti alarak kitle turizmini sınırlar ve doğal kaynaklarını korur.

**Yapılacaklar**:
- Paro Taktsang (Kaplan Yuvası Manastırı) yürüyüşü
- Yerel kültürü ve Budist geleneklerini keşfetmek
- Punakha Vadisi'nde doğa yürüyüşleri
- Yerel el sanatlarını öğrenmek

## Eko-Turistler İçin İpuçları

1. **Önceden Araştırma Yapın**: Gideceğiniz bölgedeki çevresel sorunlar ve kültürel hassasiyetler hakkında bilgi edinin.

2. **Sertifikaları Kontrol Edin**: Konaklama ve tur operatörleri seçerken sürdürülebilirlik sertifikalarına (örn. LEED, Green Globe, Rainforest Alliance) sahip olanları tercih edin.

3. **Yerel Rehberlerle Çalışın**: Yerel rehberler hem ekonomiyi destekler hem de daha otantik bir deneyim sunar.

4. **Saygılı Olun**: Yerel kültüre, geleneklere ve doğaya saygı gösterin. Fotoğraf çekmeden önce izin isteyin.

5. **Az ve Öz Seyahat Edin**: Daha kısa ama daha derin deneyimler yaşamayı hedefleyin. Bir destinasyonda daha uzun süre kalarak ulaşımdan kaynaklanan emisyonları azaltın.

6. **İz Bırakmayın**: Ziyaret ettiğiniz yerleri bulduğunuzdan daha temiz bırakın. Çöplerinizi toplayın ve mümkün olduğunca geri dönüşüm yapın.

7. **Yerel Topluma Katkıda Bulunun**: Yerel işletmeleri destekleyin, yerel ürünler satın alın ve yerel projelere bağış yapın.

## Sonuç

Eko-turizm, sadece çevreyi korumakla kalmaz, aynı zamanda daha anlamlı ve zengin seyahat deneyimleri yaşamanıza olanak tanır. Yerel topluluklar ve kültürlerle daha derin bağlar kurar, doğa ile yeniden bağlantı kurma fırsatı bulursunuz.

Sürdürülebilir seyahat etmeyi seçerek, gelecek nesillerin de aynı güzellikleri deneyimleyebilmesi için önemli bir adım atmış olursunuz. Unutmayın, seyahat bir ayrıcalıktır ve bu ayrıcalığı sorumlulukla kullanmak hepimizin görevidir.

Bir sonraki seyahatinizi planlarken, bu rehberdeki önerileri dikkate alarak hem kendiniz hem de gezegenimiz için daha iyi bir seçim yapabilirsiniz. Keyifli ve sürdürülebilir yolculuklar!`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
      categories: ["eco-tourism", "travel-tips", "sustainability"],
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