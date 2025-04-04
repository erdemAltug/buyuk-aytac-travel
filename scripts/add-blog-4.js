// Destinasyonlar kategorisinde ikinci blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Avrupa'nın Gizli Cenneti: Porto Rehberi",
      summary: "Portekiz'in kuzeyindeki büyüleyici şehir Porto'yu keşfedin. Tarihi merkezleri, şarap mahzenleri ve lezzetli mutfağıyla tam bir keşif noktası.",
      content: `# Avrupa'nın Gizli Cenneti: Porto Rehberi

Porto, Portekiz'in ikinci büyük şehri olmasına rağmen, büyüleyici atmosferi ve daha az turistik yapısıyla Avrupa'nın gizli cennetlerinden biri olarak kabul edilir. Douro Nehri'nin Atlas Okyanusu'na döküldüğü yerde konumlanan Porto, renkli evleri, tarihi köprüleri, şarap mahzenleri ve sıcakkanlı insanlarıyla unutulmaz bir seyahat deneyimi sunar.

## Porto'da Görülmesi Gereken Yerler

### 1. Ribeira Bölgesi

UNESCO Dünya Mirası Listesi'nde yer alan Porto'nun tarihi merkezi Ribeira, dar sokakları ve renkli evleriyle büyüleyicidir. Douro Nehri kenarında yer alan bu bölge, kafelerle dolu meydanları ve canlı atmosferiyle gezilmeye değer. Özellikle gün batımında, nehir kenarında bir kadeh Port şarabı yudumlarken Ribeira'nın manzarası unutulmazdır.

### 2. Luís I Köprüsü

Porto'nun simgelerinden biri olan Luís I Köprüsü, Douro Nehri üzerinde iki katlı bir yapı olarak yükselir. 1886 yılında tamamlanan bu köprünün üst katından hem Porto'yu hem de karşı kıyıda yer alan Vila Nova de Gaia'yı panoramik olarak görebilirsiniz. Köprünün üst katı yayalara ve metro hattına açıktır, alt katı ise araç trafiği içindir.

### 3. São Bento Tren İstasyonu

Dünyanın en güzel tren istasyonlarından biri olarak kabul edilen São Bento, yalnızca bir ulaşım noktası değil, aynı zamanda bir sanat eseridir. İstasyonun giriş salonunu süsleyen 20.000'den fazla mavi-beyaz fayans (azulejo), Portekiz tarihinin önemli anlarını ve kırsal yaşamı tasvir eder. 1900'lerin başında tamamlanan bu etkileyici fayanslara göz atmak için mutlaka zaman ayırın.

### 4. Lello Kitabevi

Harry Potter kitaplarının yazarı J.K. Rowling'e ilham verdiği söylenen Lello Kitabevi, neo-gotik mimarisi ve gösterişli iç mekanıyla Porto'nun en çok ziyaret edilen yerlerinden biridir. 1906 yılında açılan bu kitabevi, kırmızı bir merdiven, vitray tavan ve ahşap oymalarla süslenmiş raflarıyla büyüleyicidir. Ziyaret etmek için giriş ücreti ödemek gerekiyor, ancak bu ücret kitap alışverişinizde düşülüyor.

### 5. Clerigos Kulesi

Porto'nun siluetine hakim olan Clerigos Kulesi, 75 metre yüksekliğiyle şehrin en yüksek noktalarından biridir. 18. yüzyılda barok tarzda inşa edilen kuleye çıkmak için 240 basamak tırmanmanız gerekiyor, ancak tepeden Porto'nun 360 derecelik manzarası bu yorgunluğa değer. Kuleye bitişik olan Clerigos Kilisesi de mimarisiyle görülmeye değer.

## Porto'da Ne Yenir, Ne İçilir?

### Port Şarabı

Porto'ya gelmişken elbette dünyaca ünlü Port şarabını tatmak gerekir. Douro Vadisi'nde yetiştirilen üzümlerden elde edilen ve güçlendirilmiş bir şarap olan Port, genellikle tatlı ve yüksek alkollüdür. Vila Nova de Gaia'daki şarap mahzenlerinde, Port şarabının yapım sürecini öğrenebilir ve çeşitli türlerini tadabilirsiniz. Sandeman, Taylor's ve Graham's gibi tanınmış üreticilerin tur ve tadım etkinliklerine katılmanızı öneririz.

### Francesinha

Porto'nun meşhur sandviçi Francesinha, açlığınızı bastırmak için mükemmel bir seçenektir. Ekmek arasına jambon, sosis, biftek gibi çeşitli etlerin konulduğu ve üzerine peynir ile özel bir sos dökülen bu sandviç, genellikle kızartılmış patates ile servis edilir. Cafe Santiago ve Lado B gibi yerler, en iyi Francesinha'yı deneyebileceğiniz mekanlardır.

### Bacalhau

Portekiz mutfağının vazgeçilmezi olan tuzlu morina balığı (bacalhau), Porto'da çeşitli şekillerde pişirilir. "Bacalhau à Gomes de Sá" (fırında patates ve soğanla) ve "Bacalhau com Natas" (kremayla) en popüler versiyonlardır.

## Pratik Bilgiler

### En İyi Ziyaret Zamanı

Porto'yu ziyaret etmek için en ideal zamanlar Mayıs-Haziran ve Eylül-Ekim aylarıdır. Bu dönemlerde hava sıcaklıkları ılıman, turist sayısı daha azdır. Temmuz ve Ağustos aylarında şehir daha kalabalık ve sıcak olabilir.

### Ulaşım

Porto'da toplu taşıma oldukça gelişmiştir. Metro, otobüs ve tramvay ile şehrin her yerine kolayca ulaşabilirsiniz. Andante adı verilen kartı alarak toplu taşıma araçlarını daha ekonomik kullanabilirsiniz. Ayrıca, Porto Card ile hem ulaşım hem de müze girişlerinde indirim sağlayabilirsiniz.

### Konaklama

Porto'da her bütçeye uygun konaklama seçenekleri mevcuttur. Ribeira bölgesi turistik açıdan merkezi bir konumdadır, ancak Aliados ve Bolhão çevresinde kalmak da şehri keşfetmek için iyi bir seçenektir.

Porto, geleneksel Portekiz kültürünü, tarihi dokuyu ve modern şehir yaşamını bir arada sunan eşsiz bir destinasyondur. Bu büyüleyici şehri keşfetmek için en az 3 gün ayırmanızı öneririz. Porto'nun dar sokaklarında kaybolun, nehir kenarında güneşin batışını izleyin ve Portekiz'in bu gizli cennetinin tadını çıkarın!`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=1000",
      categories: ["destinations"],
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