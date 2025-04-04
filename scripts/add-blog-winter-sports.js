// Kış sporları konusunda yeni blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Türkiye'nin En İyi Kayak Merkezleri ve Kış Sporları",
      slug: "turkiyenin-en-iyi-kayak-merkezleri-ve-kis-sporlari",
      summary: "Türkiye'nin dört bir yanındaki muhteşem kayak merkezleri, konaklama ve pist olanakları, fiyatlar ve kış sporları hakkında kapsamlı bilgiler.",
      content: `# Türkiye'nin En İyi Kayak Merkezleri ve Kış Sporları

Soğuk kış ayları, kayak ve snowboard tutkunları için heyecan verici bir dönemin başlangıcıdır. Türkiye, Doğu Anadolu'dan Batı Karadeniz'e kadar uzanan dağlarıyla, kış sporları için mükemmel imkanlar sunan bir ülkedir. Bu yazımızda, Türkiye'nin en iyi kayak merkezlerini, özellikleri, konaklama imkanları ve fiyatlarıyla sizler için derledik.

## 1. Uludağ Kayak Merkezi, Bursa

Türkiye'nin en ünlü ve köklü kayak merkezi olan Uludağ, İstanbul'a yakınlığı ve gelişmiş turizm altyapısıyla her yıl binlerce ziyaretçiyi ağırlar.

**Özellikler**:
- **Rakım**: 1750-2543 metre
- **Pist Uzunluğu**: Toplam 28 km
- **Pist Sayısı**: 20 farklı pist (Başlangıç, orta ve ileri seviye)
- **Sezon**: Aralık ortası - Mart sonu

**Olanaklar**:
- Çeşitli konaklama seçenekleri (5 yıldızlı otellerden pansiyonlara)
- Kayak ve snowboard ekipmanı kiralama
- Kayak okulları ve özel dersler
- Teleferik ve telesiyej sistemleri
- Eğlence ve alışveriş imkanları
- After-ski aktiviteleri ve restoranlar

**En İyi Zaman**: Ocak ve Şubat ayları kar kalitesi açısından en ideal zamandır.

**Ulaşım**: Bursa'dan Uludağ'a teleferik veya araçla ulaşım mümkündür. İstanbul'dan karayoluyla yaklaşık 3,5 saat sürer.

## 2. Palandöken Kayak Merkezi, Erzurum

Doğu Anadolu'nun görkemli dağlarında yer alan Palandöken, Türkiye'nin en uzun pistlerine ve en kaliteli kar özelliklerine sahip kayak merkezlerindendir.

**Özellikler**:
- **Rakım**: 2200-3176 metre
- **Pist Uzunluğu**: Toplam 40 km
- **Pist Sayısı**: 22 pist (FIS onaylı pistler dahil)
- **Sezon**: Kasım sonu - Nisan ortası

**Olanaklar**:
- Uluslararası standartlarda konaklama tesisleri
- Kayak ve snowboard okulu
- Gece kayağı imkanı
- Modern teleferik sistemi
- Heliski ve off-pist kayak imkanları
- Kar parkı ve halfpipe alanları

**En İyi Zaman**: Aralık ortasından Mart başına kadar.

**Ulaşım**: Erzurum Havalimanı'ndan kayak merkezine 15 dakikalık bir yolculukla ulaşılabilir.

## 3. Kartalkaya Kayak Merkezi, Bolu

Batı Karadeniz'in yemyeşil ormanlarla kaplı dağlarında yer alan Kartalkaya, İstanbul ve Ankara'ya yakınlığıyla hafta sonu kaçamakları için ideal bir destinasyondur.

**Özellikler**:
- **Rakım**: 1850-2200 metre
- **Pist Uzunluğu**: Toplam 20 km
- **Pist Sayısı**: 18 pist (başlangıç, orta ve ileri seviye)
- **Sezon**: Aralık başı - Mart sonu

**Olanaklar**:
- Modern konaklama tesisleri
- Ekipman kiralama ve kayak dersleri
- Doğa yürüyüşleri ve kızak imkanları
- Snowboard parkı
- Çocuklar için kar bahçesi
- Isıtmalı havuzlar ve SPA merkezleri

**En İyi Zaman**: Ocak ve Şubat ayları.

**Ulaşım**: İstanbul'dan yaklaşık 3 saat, Ankara'dan ise 2 saat mesafededir.

## 4. Erciyes Kayak Merkezi, Kayseri

Orta Anadolu'nun etkileyici volkanik dağı Erciyes, son yıllarda yapılan yatırımlarla Türkiye'nin en modern kayak merkezlerinden biri haline gelmiştir.

**Özellikler**:
- **Rakım**: 2200-3400 metre
- **Pist Uzunluğu**: Toplam 55 km
- **Pist Sayısı**: 34 pist (her seviye için)
- **Sezon**: Aralık başı - Nisan ortası

**Olanaklar**:
- Çeşitli konaklama seçenekleri
- Snowpark ve freestyle alanları
- Kızak pistleri
- Modern lift sistemi
- Restoran ve kafeler
- Kayak ve snowboard ekipmanı kiralama

**En İyi Zaman**: Ocak ve Şubat ayları.

**Ulaşım**: Kayseri Havalimanı'ndan 25 dakikalık bir yolculukla ulaşılabilir.

## 5. Sarıkamış Kayak Merkezi, Kars

Doğu Anadolu'nun kristal kar kalitesiyle ünlü Sarıkamış, çam ormanları arasında kayak yapma imkanı sunar. Türkiye'nin en kaliteli "toz kar"ına sahiptir.

**Özellikler**:
- **Rakım**: 2100-2634 metre
- **Pist Uzunluğu**: Toplam 25 km
- **Pist Sayısı**: 9 pist
- **Sezon**: Aralık başı - Mart sonu

**Olanaklar**:
- Çeşitli konaklama seçenekleri
- Kayak ve snowboard dersleri
- Ekipman kiralama
- Çam ormanları arasında kayak deneyimi
- Kars'ın tarihi ve kültürel zenginliklerini keşfetme fırsatı

**En İyi Zaman**: Ocak ve Şubat ayları.

**Ulaşım**: Kars Havalimanı'ndan 50 dakikalık bir yolculukla ulaşılabilir.

## 6. Davraz Kayak Merkezi, Isparta

Göller bölgesinde yer alan Davraz, manzarası ve çeşitli pistleriyle dikkat çeker.

**Özellikler**:
- **Rakım**: 1650-2400 metre
- **Pist Uzunluğu**: Toplam 12 km
- **Pist Sayısı**: 8 pist
- **Sezon**: Aralık ortası - Mart ortası

**Olanaklar**:
- Konaklama tesisleri
- Kayak ve snowboard dersleri
- Ekipman kiralama
- Eğlence Dünya'sı
- Isparta Gül ürünleri satın alma imkanı

**En İyi Zaman**: Ocak ayı.

**Ulaşım**: Isparta merkezinden 26 km uzaklıktadır.

## 7. Ilgaz Kayak Merkezi, Kastamonu/Çankırı

Ilgaz Dağı Milli Parkı içerisinde yer alan bu kayak merkezi, doğal güzellikleri ve temiz havasıyla öne çıkar.

**Özellikler**:
- **Rakım**: 1800-2500 metre
- **Pist Uzunluğu**: Toplam 8 km
- **Pist Sayısı**: 7 pist
- **Sezon**: Aralık ortası - Mart ortası

**Olanaklar**:
- Konaklama tesisleri
- Kayak dersleri
- Ekipman kiralama
- Doğa yürüyüşleri ve fotoğrafçılık imkanları

**En İyi Zaman**: Ocak ayı.

**Ulaşım**: Ankara'dan yaklaşık 2 saat 30 dakika mesafededir.

## Kış Sporları İçin Başlangıç Önerileri

### Kayak ve Snowboard İçin Temel Ekipmanlar

1. **Kayak/Snowboard Takımı**: Başlangıçta kiralama yapabilir, ilerledikçe satın almayı düşünebilirsiniz.
2. **Kayak Ayakkabısı**: Ayağınıza tam oturan, konforlu bir model seçin.
3. **Kayak Kıyafeti**: Su geçirmez, rüzgar geçirmez ve nefes alabilir özellikte mont ve pantolon.
4. **Termal İç Giyim**: Vücut ısınızı koruyan, terletmeyen iç giysileri.
5. **Eldiven**: Su geçirmez, kalın kayak eldivenleri.
6. **Kask**: Güvenliğiniz için mutlaka kullanın.
7. **Kayak Gözlüğü**: Kar parlamasından ve rüzgardan gözlerinizi korur.
8. **Boyunluk**: Soğuk havaya karşı boyun ve yüz koruması sağlar.

### Kayak Öğrenmek İçin İpuçları

1. **Ders Alın**: Mutlaka profesyonel bir kayak eğitmeniyle başlayın.
2. **Kademeli İlerleyin**: Başlangıç pistlerinde pratik yaparak özgüveninizi kazanın.
3. **Düşmekten Korkmayın**: Düşmek öğrenme sürecinin bir parçasıdır.
4. **Dizlerinizi Hafif Bükün**: Denge için önemlidir.
5. **Ağırlığınızı Doğru Dağıtın**: Kayaklarınızın üzerinde eşit ağırlık dağılımı yapın.
6. **Bakışlarınızı İleri Doğru Yönlendirin**: Nereye bakarınıza, vücudunuz oraya yönelir.
7. **Sabırlı Olun**: Kayak öğrenmek zaman alır, kendinize baskı yapmayın.

## Kış Sporları İçin Sağlık Önerileri

1. **Isınma Hareketleri**: Kayağa başlamadan önce mutlaka ısınma hareketleri yapın.
2. **Güneş Kremi Kullanın**: Yüksek rakımlarda UV ışınları daha yoğundur.
3. **Bol Su İçin**: Yüksek rakımda dehidrasyon riski artar.
4. **Yükseklik Hastalığına Dikkat**: Çok yüksek merkezlerde ilk gün fazla zorlamayın.
5. **Alkol Tüketimini Sınırlayın**: Alkol, soğukta vücut ısısının düşmesine neden olabilir.

## Ailenizle Kış Tatili Planlaması

1. **Çocuklar İçin Uygun Merkez Seçin**: Çocuk parkı ve eğitmenleri olan merkezleri tercih edin.
2. **Konaklama Seçiminde Dikkatli Olun**: Pist erişimi kolay tesisleri tercih edin.
3. **Alternatif Aktiviteleri Araştırın**: Hava şartları kayak için uygun olmadığında yapılabilecek aktiviteleri önceden belirleyin.
4. **Sigorta Yaptırın**: Kaza ve yaralanmalara karşı sigorta önemlidir.

Türkiye'nin muhteşem kayak merkezleri, hem profesyonel kayakçılara hem de kayağa yeni başlayanlara unutulmaz bir kış tatili deneyimi sunuyor. Kar kalitesi, modern tesisler ve uygun fiyatlarla, yerli ve yabancı turistlerin ilgisini çeken bu merkezlerde, beyaz örtüyle kaplanan dağların zirvesinde kaymanın keyfini doyasıya yaşayabilirsiniz.

Keyifli kayaklar ve güvenli bir sezon diliyoruz!`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1000",
      categories: ["winter-sports", "destinations", "travel-tips"],
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