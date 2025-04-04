// Yeni blog yazısı eklemek için örnek script
import axios from 'axios';

async function createBlog() {
  try {
    const blogData = {
      title: "Türkiye'nin En Güzel 5 Plajı",
      slug: "turkiyenin-en-guzel-5-plaji",
      summary: "Türkiye'nin mavi bayraklı, kristal suları ve eşsiz doğasıyla öne çıkan en güzel 5 plajını keşfedin.",
      content: `# Türkiye'nin En Güzel 5 Plajı

Türkiye, Akdeniz ve Ege'nin masmavi sularında uzanan binlerce kilometrelik sahil şeridiyle dünyanın en güzel plajlarına ev sahipliği yapmaktadır. Bu yazıda, Türkiye'nin görülmeye değer en etkileyici 5 plajını sizler için derledik.

## 1. Ölüdeniz - Muğla

Ölüdeniz, turkuaz renkli suları ve bembeyaz kumsalıyla sadece Türkiye'nin değil, dünyanın en iyi plajları arasında gösterilmektedir. Belcekız Koyu'nun devamında yer alan ve doğal bir set ile denizden ayrılan lagün, eşsiz manzarası ile ziyaretçilerini büyülemektedir. Yamaç paraşütü tutkunları için de ideal bir nokta olan Babadağ'dan havalananlar, bu eşsiz manzarayı havadan görme şansına sahip olurlar.

## 2. Kaputaş Plajı - Antalya

Antalya'nın Kaş ilçesi ile Kalkan arasında, derin bir vadinin denizle buluştuğu noktada yer alan Kaputaş Plajı, Türkiye'nin kartpostal plajlarındandır. Yüksek kayalıklar arasından 187 basamakla inilen bu gizli cennet, turkuaz suları ve ince kumlu sahiliyle ünlüdür. Etrafını çevreleyen kayalıklar sayesinde dalgasız ve sakin bir denize sahiptir.

## 3. İztuzu Plajı - Muğla

Dalyan deltasının ucunda yer alan İztuzu Plajı, 4.5 km uzunluğundaki altın sarısı kumsalı ile ünlüdür. Caretta caretta kaplumbağalarının yumurtlama alanı olması nedeniyle koruma altında olan plajda, gün batımından gün doğumuna kadar giriş yasaktır. Tatlı su ve tuzlu suyun birleştiği bu eşsiz ekosistem, doğa severlerin vazgeçilmez rotasıdır.

## 4. Patara Plajı - Antalya

Antalya'nın Kaş ilçesinde bulunan Patara Plajı, 18 km'lik uzunluğu ile Türkiye'nin en uzun plajlarından biridir. Antik Patara kentinin yanı başında uzanan bu plaj, ince kumlu sahili ve sıcak sığ suları ile aileler için ideal bir tatil noktasıdır. Aynı zamanda caretta caretta kaplumbağalarının da yumurtlama alanı olan Patara, doğal güzelliğini koruması için koruma altındadır.

## 5. Kleopatra Plajı - Antalya

Alanya'nın batısında yer alan Kleopatra Plajı, adını Mısır Kraliçesi Kleopatra'dan almaktadır. Efsaneye göre, Kleopatra ve Antonius burada yüzmüşlerdir. İnce taneli altın sarısı kumu ve berrak denizi ile her yıl binlerce turisti ağırlayan plaj, şehir merkezine yakınlığı sayesinde ulaşımı kolay bir tatil noktasıdır.

Türkiye'nin bu eşsiz plajları, yalnızca doğal güzellikleriyle değil, aynı zamanda çevrelerindeki tarihi ve kültürel zenginliklerle de ziyaretçilerine unutulmaz deneyimler sunmaktadır. Yaz tatilinizi planlarken, bu muhteşem plajlardan en az birini rotanıza eklemeyi unutmayın.`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000",
      categories: ["beaches", "summer", "destinations"],
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