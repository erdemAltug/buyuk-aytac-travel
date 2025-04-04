// Seyahat Tavsiyeleri kategorisinde ikinci blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Seyahat Ederken Bütçenizi Nasıl Yönetirsiniz?",
      slug: "seyahat-ederken-butcenizi-nasil-yonetirsiniz",
      summary: "Bütçe dostu seyahat etmenin püf noktaları ve gizli maliyetlerden nasıl kaçınacağınıza dair faydalı ipuçları.",
      content: `# Seyahat Ederken Bütçenizi Nasıl Yönetirsiniz?

Seyahat etmek, yeni yerler keşfetmek ve farklı kültürlerle tanışmak muhteşem bir deneyimdir. Ancak iyi planlanmamış bir tatil, bütçenizde beklenmedik zorluklara yol açabilir. Bu yazımızda, seyahatinizde paranızı akıllıca yönetmenin yollarını ve gizli maliyetlerden nasıl kaçınacağınızı öğreneceksiniz.

## 1. Önceden Bütçe Planlaması Yapın

Seyahatinizden önce, konaklama, ulaşım, yemek, aktiviteler ve beklenmedik durumlar için ne kadar harcama yapabileceğinizi belirleyin. Günlük harcama limitinizi belirleyerek, seyahatiniz boyunca finansal durumunuzu kontrol altında tutabilirsiniz.

## 2. Düşük Sezon Avantajını Kullanın

Yüksek sezon yerine düşük sezonda seyahat etmek, konaklama ve uçuş fiyatlarında büyük tasarruf sağlar. Ayrıca, turistik yerlerin daha az kalabalık olması, daha rahat bir deneyim sunar.

## 3. Toplu Taşıma Kullanın

Taksiler ve araç kiralamaları yerine toplu taşıma araçlarını tercih ederek ciddi tasarruf sağlayabilirsiniz. Pek çok şehirde turist kartları veya çoklu bilet seçenekleri mevcuttur ve bunlar ulaşım maliyetlerinizi düşürür.

## 4. Yerel Gibi Yemek Yiyin

Turistik restoranlar yerine yerel halkın tercih ettiği yerleri keşfedin. Hem daha otantik lezzetler tadabilir hem de yemek bütçenizden tasarruf edebilirsiniz. Ayrıca, süpermarketlerden alışveriş yaparak basit kahvaltılar veya atıştırmalıklar hazırlayabilirsiniz.

## 5. Ücretsiz Aktiviteler Araştırın

Pek çok şehirde ücretsiz müzeler, parklar, yürüyüş turları veya festivaller bulunur. Ziyaret edeceğiniz yerin ücretsiz veya indirimli etkinliklerini önceden araştırın.

## 6. Döviz Kurlarına Dikkat Edin

Yurt dışı seyahatlerinde, döviz kurlarını takip edin ve en avantajlı şekilde para değişimi yapın. Banka veya kredi kartı kullanırken yurt dışı işlem ücretlerini ve döviz kuru farklarını öğrenin.

## 7. Erken Rezervasyon Avantajı

Uçak biletlerini ve konaklama yerlerini mümkün olduğunca erken rezerve edin. Last minute teklifleri beklemek bazen avantajlı olabilir, ancak risk içerir ve seçenekleriniz kısıtlanabilir.

## 8. Konaklama Alternatiflerini Değerlendirin

Otel dışında hostel, Airbnb veya ev değişimi gibi alternatif konaklama seçeneklerini değerlendirin. Mutfak erişimi olan bir yer kiralamak, yemek masraflarınızı da azaltabilir.

## 9. Seyahat Sigortası Yaptırın

Beklenmedik sağlık sorunları veya iptal durumları için seyahat sigortası yaptırmak, uzun vadede sizi büyük masraflardan koruyabilir.

## 10. Teknoloji Desteği Alın

Bütçe takip uygulamaları, döviz çevirici ve indirimli aktivite sunan uygulamaları kullanarak seyahat bütçenizi daha etkili yönetebilirsiniz.

Bu ipuçlarını uygulayarak, seyahatinizin hem keyfini çıkarabilir hem de finansal açıdan kontrol sahibi olabilirsiniz. Unutmayın, iyi bir planlama ile sınırlı bir bütçeyle bile unutulmaz deneyimler yaşayabilirsiniz. Ekonomik ve keyifli seyahatler dileriz!`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000",
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