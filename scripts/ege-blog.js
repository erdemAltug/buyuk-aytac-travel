// Yeni blog yazısı eklemek için script - Ege Kıyıları
import axios from 'axios';

async function createBlog() {
  try {
    const blogData = {
      title: "Ege'nin Mavi Cennetleri: En Güzel Koylar ve Plajlar",
      slug: "egenin-mavi-cennetleri-en-guzel-koylar-ve-plajlar",
      summary: "Ege kıyılarının eşsiz koyları, turkuaz suları ve beyaz kumsallarıyla ziyaretçilerine unutulmaz bir tatil deneyimi sunan en etkileyici destinasyonları.",
      content: `# Ege'nin Mavi Cennetleri: En Güzel Koylar ve Plajlar

Türkiye'nin batı kıyıları boyunca uzanan Ege Bölgesi, birbirinden güzel koyları, masmavi berrak suları ve muhteşem doğasıyla yerli ve yabancı turistlerin gözde tatil rotalarından biridir. Bu yazımızda, Ege'nin en etkileyici koylarını ve plajlarını sizler için derledik.

## Fethiye'nin İncisi: Ölüdeniz

Turkuaz renkli denizi, bembeyaz kumsalı ve eşsiz doğal güzellikleriyle dünyaca ünlü Ölüdeniz, Fethiye'nin en ünlü plajlarından biridir. Denizden bir set ile ayrılan lagünü, sakin ve berrak sularıyla yüzmeyi sevenler için ideal bir ortam sunar. Paraşütle atlayış yapabileceğiniz Babadağ'dan havalananlar, bu muhteşem manzarayı havadan izleme şansına sahip olur.

### Nasıl Gidilir?
Dalaman Havalimanı'na inen ziyaretçiler, yaklaşık 1 saatlik bir yolculukla Ölüdeniz'e ulaşabilir. Fethiye merkezden de düzenli olarak minibüs seferleri bulunmaktadır.

## Saklı Cennet: Kabak Koyu

Fethiye'nin güneyinde, Faralya köyü yakınlarında bulunan Kabak Koyu, doğal yapısını koruyan saklı bir cennet niteliğindedir. Derin vadilerle çevrili bu koy, alternatif tatil arayanların ve doğa severlerin uğrak noktasıdır. Bungalov ve çadır kampı imkanlarıyla, doğayla iç içe bir tatil deneyimi sunar.

### Nasıl Gidilir?
Fethiye'den Faralya'ya giden dolmuşlarla ulaşabilir, ardından yaklaşık 30 dakikalık bir yürüyüşle koya inebilirsiniz. Patika yol dik ve zorlu olabilir, bu nedenle uygun ayakkabılar giymenizi öneririz.

## Datça'nın Gizli Hazinesi: Palamutbükü

Datça Yarımadası'nın güneyinde yer alan Palamutbükü, 1.5 km uzunluğundaki kumsalı ve kristal berraklığındaki deniziyle ziyaretçilerini büyüleyen bir koydur. Nispeten sakin ve bakir kalan bu bölge, kalabalıktan uzaklaşmak isteyenler için mükemmel bir seçenektir.

### Nasıl Gidilir?
Datça merkezden düzenli olarak kalkan minibüslerle Palamutbükü'ne ulaşabilirsiniz. Bodrum veya Marmaris'ten Datça'ya feribot seferleri de bulunmaktadır.

## Çeşme'nin Gözbebeği: Alaçatı

Rüzgar sörfü tutkunlarının vazgeçilmez mekanı olan Alaçatı, sadece plajlarıyla değil, taş evleri, otantik sokakları ve lezzet durakları ile de tam bir Ege cenneti. Sörf yapmak istemeyenler için ise masmavi koyları ve berrak denizi, yüzmek için ideal ortamlar sunmaktadır.

### Nasıl Gidilir?
İzmir Adnan Menderes Havalimanı'ndan yaklaşık 45 dakikalık bir yolculukla Alaçatı'ya ulaşabilirsiniz. İzmir merkezden de düzenli otobüs seferleri bulunmaktadır.

## Bodrum'un İncisi: Gümüşlük

Bodrum Yarımadası'nın batı ucunda yer alan Gümüşlük, antik Myndos kentinin kalıntıları üzerinde kurulmuştur. Sığ ve berrak deniziyle çocuklu aileler için ideal olan bu koy, aynı zamanda gün batımı manzarası ve taze deniz ürünleriyle ünlü restoranlarıyla da bilinir.

### Nasıl Gidilir?
Bodrum merkezden kalkan minibüslerle Gümüşlük'e kolayca ulaşabilirsiniz. Milas-Bodrum Havalimanı'ndan da yaklaşık 45 dakikalık bir yolculukla bölgeye varabilirsiniz.

## Kuşadası'nın Saklı Cenneti: Dilek Yarımadası

Milli park statüsünde korunan Dilek Yarımadası, el değmemiş doğası, kristal berraklığındaki koyları ve zengin biyoçeşitliliğiyle öne çıkan bir doğa harikasıdır. İçmeler, Kalamaki ve Karasu gibi koylarında unutulmaz bir deniz deneyimi yaşayabilirsiniz.

### Nasıl Gidilir?
Kuşadası merkezden Güzelçamlı'ya giden minibüslerle ulaşım sağlayabilirsiniz. Milli parka giriş için ücret alınmaktadır.

## Foça'nın Mavi Bayraklı Plajları

İzmir'in kuzeyinde yer alan Foça, tarihi taş evleri, Akdeniz fokları ve mavi bayraklı plajlarıyla öne çıkan bir tatil beldesidir. Özellikle Sazlıca ve Mersinaki koyları, temiz denizi ve sakin ortamıyla dinlendirici bir tatil vadeder.

### Nasıl Gidilir?
İzmir merkezden düzenli olarak kalkan otobüslerle yaklaşık 1 saatte Foça'ya ulaşabilirsiniz.

## Dikili'nin Huzur Köşesi: Bademli Koyu

İzmir'in kuzeyinde, Dikili ilçesine bağlı Bademli köyü yakınlarında bulunan bu koy, henüz kitlesel turizmin etkisinden uzak kalmayı başarmış saklı bir cennet. Berrak denizi ve ıssız plajlarıyla huzur arayanlar için ideal bir destinasyon.

### Nasıl Gidilir?
İzmir'den Dikili'ye otobüsle gidebilir, ardından Bademli köyüne minibüsle ulaşabilirsiniz. Köyden koya inen bir yol bulunmaktadır.

## Gökçeada'nın Sakız Kokulu Koyları

Türkiye'nin en büyük adası olan Gökçeada, bakir koyları, doğal plajları ve zengin sualtı yaşamıyla keşfedilmeyi bekleyen bir cennet. Özellikle Yıldız Koyu ve Laz Koyu, turkuaz suları ve ıssız plajlarıyla unutulmaz bir deneyim sunar.

### Nasıl Gidilir?
Çanakkale'den düzenli feribot seferleriyle Gökçeada'ya ulaşabilirsiniz. Adada araç kiralamak, koyları keşfetmek için ideal bir seçenektir.

## Tatil Planlaması İçin Öneriler

### En İyi Ziyaret Zamanı
Ege kıyılarını ziyaret etmek için en ideal dönem Mayıs-Ekim arası olsa da, özellikle Temmuz ve Ağustos aylarında bölge oldukça kalabalık olabilir. Haziran başı veya Eylül sonu gibi dönemlerde daha sakin bir tatil deneyimi yaşayabilirsiniz.

### Konaklama
Belirtilen destinasyonların çoğunda butik oteller, pansiyonlar ve tatil köyleri bulunmaktadır. Yüksek sezonda önceden rezervasyon yaptırmanız tavsiye edilir.

### Ulaşım
Bölgedeki havalimanları (İzmir, Dalaman, Bodrum-Milas) üzerinden ulaşım sağlayabilirsiniz. Koylar arasında ulaşım için araç kiralamak en pratik seçenek olacaktır.

## Sonuç

Ege'nin bu eşsiz koyları ve plajları, sadece Türkiye'nin değil, dünyanın da en güzel deniz destinasyonları arasında yer almaktadır. Masmavi denizleri, bembeyaz kumsalları ve muhteşem doğasıyla bu cennet köşeler, unutulmaz bir tatil deneyimi sunmaktadır. Ege kıyılarında geçireceğiniz her an, size benzersiz anılar ve tazelenmiş bir ruh hali kazandıracaktır.`,
      author: "Büyük Aytaç Travel",
      image: "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?auto=format&fit=crop&q=80&w=1000",
      categories: ["Ege", "plaj", "Türkiye", "gezi"],
      isPublished: true,
      publishDate: new Date()
    };

    // API'ye istek at
    const response = await axios.post('http://localhost:3000/api/blogs', blogData);
    
    if (response.status === 201) {
      console.log('Blog yazısı başarıyla oluşturuldu:', response.data);
    } else {
      console.error('Blog oluşturma başarısız:', response.data);
    }
  } catch (error) {
    console.error('Blog oluşturma hatası:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Fonksiyonu çalıştır
createBlog(); 