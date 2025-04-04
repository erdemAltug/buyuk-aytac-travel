// Festivaller kategorisinde yeni blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Türkiye'nin En Renkli 5 Festivali",
      slug: "turkiyenin-en-renkli-5-festivali",
      summary: "Türkiye'nin dört bir yanında düzenlenen, hem yerel hem de uluslararası katılımcıları kendine çeken en etkileyici 5 festival hakkında bilgiler ve festivallere katılım tavsiyeleri.",
      content: `# Türkiye'nin En Renkli 5 Festivali

Türkiye, zengin kültürel geçmişi ve çeşitliliği ile yıl boyunca birbirinden ilginç ve renkli festivallere ev sahipliği yapmaktadır. Müzikten sanata, gastronomiden tarihi kutlamalara kadar uzanan bu festivaller, hem yerel halkın hem de turistlerin ilgi odağı oluyor. Bu yazımızda, Türkiye'nin en etkileyici 5 festivalini sizler için derledik.

## 1. İstanbul Caz Festivali

**Tarih:** Genellikle Haziran - Temmuz ayları  
**Yer:** İstanbul'un çeşitli mekânları  

İstanbul Kültür Sanat Vakfı (İKSV) tarafından düzenlenen İstanbul Caz Festivali, her yıl yerli ve yabancı pek çok ünlü caz sanatçısını ağırlıyor. Festival, sadece geleneksel caz performanslarıyla değil, aynı zamanda caz ile farklı müzik türlerini birleştiren deneysel projelerle de dikkat çekiyor.

Festival, tarihi mekânlarda, açık hava sahnelerinde, parklarda ve şehrin farklı noktalarında gerçekleşen konserlerle İstanbul'u bir müzik şölenine dönüştürüyor. Özellikle Harbiye Açık Hava Tiyatrosu ve Esma Sultan Yalısı gibi mekânlarda düzenlenen konserler, unutulmaz bir deneyim sunuyor.

## 2. Aspendos Opera ve Bale Festivali

**Tarih:** Haziran - Eylül arası  
**Yer:** Aspendos Antik Tiyatrosu, Antalya  

2000 yıllık tarihi Aspendos Antik Tiyatrosu'nda düzenlenen Aspendos Opera ve Bale Festivali, dünyanın en etkileyici kültürel etkinliklerinden biridir. Muhteşem akustiği ile ünlü bu antik mekân, Türkiye ve dünyanın dört bir yanından gelen opera ve bale topluluklarına ev sahipliği yapıyor.

Antik taşların arasında yankılanan opera aryaları ve görsel şölen sunan bale gösterileri, izleyicilere zaman tünelinde seyahat ediyormuş hissi veriyor. Festival sırasında, günümüzün modern performansları ile antik dönemin atmosferi arasında büyüleyici bir kontrast yaşanıyor.

## 3. Mesir Macunu Festivali

**Tarih:** Her yıl Mart sonu - Nisan başı  
**Yer:** Manisa  

UNESCO'nun Somut Olmayan Kültürel Miras Listesi'nde yer alan Mesir Macunu Festivali, 450 yılı aşkın bir geçmişe sahip. Sultan Süleyman'ın annesi Hafsa Sultan'ın hastalığını iyileştirdiğine inanılan mesir macunu, festival sırasında Sultan Camii'nin kubbe ve minarelerinden halka saçılıyor.

41 çeşit baharat ve bitkiden yapılan mesir macununun şifa dağıttığına inanılır. Festival süresince Manisa'da geleneksel sema gösterileri, konserler, halk oyunları ve çeşitli etkinlikler düzenlenir. Bu festival, Türk kültürünün özgün bir yansıması olarak her yıl binlerce kişiyi Manisa'ya çekiyor.

## 4. Uluslararası Antalya Film Festivali

**Tarih:** Ekim ayı  
**Yer:** Antalya  

Türkiye'nin en prestijli film festivali olan Uluslararası Antalya Film Festivali, her yıl yerli ve yabancı film yapımcılarını, oyuncuları ve sinema severleri buluşturuyor. 1960'lı yıllardan bu yana düzenlenen festival, Türk sinemasının dünyaya açılan kapısı niteliğindedir.

Festival programı, uluslararası yarışma filmleri, özel gösterimler, belgeseller ve kısa filmlerden oluşur. Altın Portakal ödüllerinin verildiği kapanış töreni ise, Türk sinema dünyasının en önemli gecelerinden biridir. Festival ayrıca, sinema endüstrisinin profesyonelleri için network kurma fırsatı sunan atölye çalışmaları ve panel tartışmalarına da ev sahipliği yapar.

## 5. Kapadokya Balon Festivali

**Tarih:** Temmuz ayı  
**Yer:** Kapadokya, Nevşehir  

Peri bacaları ile ünlü Kapadokya'nın eşsiz manzarasında düzenlenen Balon Festivali, dünyanın dört bir yanından balon pilotlarını ve fotoğraf tutkunlarını bir araya getiriyor. Onlarca renkli sıcak hava balonunun gökyüzünde süzülmesi, izleyenlere görsel bir şölen sunuyor.

Festival süresince gün doğumunda yapılan balon turları, katılımcılara Kapadokya'nın büyüleyici manzarasını kuşbakışı görme fırsatı veriyor. Gece düzenlenen "night glow" etkinlikleri sırasında balonlar ışıklandırılıyor ve müzik eşliğinde adeta bir ışık şovuna dönüşüyor. Festival ayrıca, konserler, yerel yemek etkinlikleri ve el sanatları sergileri ile de zenginleştiriliyor.

## Festivallere Katılım İçin İpuçları

1. **Erken Planlama Yapın:** Özellikle popüler festivaller için biletler ve konaklama hızla tükenebilir, bu nedenle seyahatinizi aylar öncesinden planlamakta fayda var.

2. **Konaklama İçin Alternatifler Düşünün:** Festival dönemlerinde fiyatlar yükselebilir. Otel yerine pansiyon, ev kiralama veya kamp gibi alternatifler değerlendirebilirsiniz.

3. **Festival Programını İnceleyin:** Etkinlik takvimini önceden inceleyin ve görmek istediğiniz performansları kaçırmamak için programınızı buna göre yapın.

4. **Yerel Ulaşım Seçeneklerini Öğrenin:** Festival alanına nasıl ulaşacağınızı, şehir içi ulaşım imkânlarını önceden araştırın.

5. **Hava Durumuna Göre Hazırlanın:** Açık hava etkinliklerinde hava değişikliklerine karşı hazırlıklı olun, uygun kıyafetleri yanınızda bulundurun.

Türkiye'nin bu renkli festivalleri, sadece eğlenceli bir deneyim sunmakla kalmıyor, aynı zamanda Türk kültürünü ve geleneklerini daha yakından tanıma fırsatı da veriyor. Siz de bu festivalleri seyahat listenize ekleyerek, unutulmaz anılar biriktirmeye başlayabilirsiniz.`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000",
      categories: ["festivals", "culture"],
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
