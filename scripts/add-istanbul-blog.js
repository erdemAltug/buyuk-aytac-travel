// İstanbul hakkında blog yazısı eklemek için script
import axios from 'axios';

async function createIstanbulBlog() {
  try {
    const blogData = {
      title: "İstanbulda Gezilecek 7 Harika Yer",
      slug: "istanbulda-gezilecek-7-harika-yer",
      summary: "İstanbulun en güzel yerlerini keşfedin: Tarihi yarımada, Boğaz, adalar ve daha fazlası...",
      content: `# İstanbulda Gezilecek 7 Harika Yer

İstanbul, Asya ve Avrupa kıtalarını birbirine bağlayan eşsiz konumu, zengin tarihi ve kültürel mirası ile dünyanın en etkileyici şehirlerinden biridir. Bu yazıda, İstanbulu ziyaret edecekler için mutlaka görülmesi gereken 7 harika yeri sizin için derledik.

## 1. Sultanahmet Meydanı ve Ayasofya

İstanbulun tarihi yarımadasının kalbinde yer alan Sultanahmet Meydanı, şehrin en önemli turistik merkezlerinden biridir. Burada, 1500 yılı aşkın bir geçmişe sahip Ayasofya bulunmaktadır. Önce kilise, sonra cami ve müze olarak kullanılan, şimdi ise tekrar cami statüsünde olan Ayasofya, mimari harikasıdır.

## 2. Topkapı Sarayı

Osmanlı İmparatorluğunun 400 yıldan fazla idare merkezi olan Topkapı Sarayı, muhteşem deniz manzarası, hazineleri, harem dairesi ve görkemli bahçeleriyle ziyaretçilerini büyülemektedir.

## 3. Kapalıçarşı

Dünyanın en eski ve en büyük kapalı çarşılarından biri olan Kapalıçarşı, 4000den fazla dükkânı ile alışveriş tutkunları için bir cennettir. Burası sadece bir alışveriş merkezi değil, aynı zamanda İstanbulun kalbi ve ruhu olan tarihi bir mekândır.

## 4. Boğaz Turu

İstanbulu keşfetmenin en keyifli yollarından biri, Boğaz turudur. Avrupa ve Asya kıyıları arasında yapacağınız yolculukta, yalıları, sarayları, kaleleri ve köprüleri görme fırsatı bulacaksınız.

## 5. Galata Kulesi

Galatanın tepesinde yer alan 14. yüzyıldan kalma bu kule, İstanbulun panoramik manzarasını sunar. Kule, şehrin her iki yakasını da görebileceğiniz muhteşem bir gözlem noktasıdır.

## 6. Prens Adaları

Marmaranın sakin suları üzerinde yer alan Prens Adaları, İstanbulun gürültüsünden uzaklaşmak isteyenler için ideal bir kaçış noktasıdır. Motorlu araçların olmadığı bu adalarda, fayton turu yapabilir, bisiklete binebilir veya plajlarda dinlenebilirsiniz.

## 7. İstiklal Caddesi

Taksim Meydanından Tünel Meydanına kadar uzanan İstiklal Caddesi, İstanbulun en canlı ve kozmopolit bölgelerinden biridir. Cadde boyunca tarihi binalar, kiliseler, pasajlar, kafe ve restoranlar bulunmaktadır.

İstanbul, keşfedilmeyi bekleyen daha pek çok hazine barındırmaktadır. Bu yedi yer, bu büyülü şehre yapacağınız ziyaret için mükemmel bir başlangıç olacaktır.`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
      categories: ["destinations", "culture"],
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
createIstanbulBlog(); 