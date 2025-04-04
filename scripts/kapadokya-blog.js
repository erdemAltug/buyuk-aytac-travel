// Yeni blog yazısı eklemek için script - Kapadokya
import axios from 'axios';

async function createBlog() {
  try {
    const blogData = {
      title: "Kapadokya'da Unutulmaz Bir Tatil Deneyimi",
      slug: "kapadokyada-unutulmaz-bir-tatil-deneyimi",
      summary: "Eşsiz doğası, peri bacaları ve sıcak hava balonlarıyla Kapadokya'da yaşayabileceğiniz en güzel deneyimler.",
      content: `# Kapadokya'da Unutulmaz Bir Tatil Deneyimi

Türkiye'nin en etkileyici ve masalsı destinasyonlarından biri olan Kapadokya, sadece ülkemizin değil, dünyanın da en sıra dışı coğrafi oluşumlarına ev sahipliği yapmaktadır. Milyonlarca yıl önce volkanik patlamalar ve doğal erozyonlar sonucu oluşan bu eşsiz peyzaj, turistlerin hayallerini süsleyen bir rotadır.

## Neden Kapadokya?

Kapadokya, UNESCO Dünya Mirası Listesi'nde yer alan, peri bacaları olarak bilinen ilginç kaya oluşumları, yeraltı şehirleri, freskli kiliseler ve renkli vadileriyle benzersiz bir açık hava müzesidir. Nevşehir, Ürgüp, Göreme, Avanos, Uçhisar ve Ortahisar gibi önemli yerleşim yerlerini kapsayan bu bölge, hem tarihi hem de doğal güzellikleriyle ziyaretçilerini büyülemektedir.

## En İyi Ziyaret Zamanı

Kapadokya'yı ziyaret etmek için en ideal dönemler ilkbahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) aylarıdır. Bu dönemlerde hava sıcaklıkları daha ılıman olurken, turist yoğunluğu da görece azdır. Yazın sıcaklık yüksek, kışın ise oldukça soğuk olabilir, ancak kış mevsiminde karla kaplı peri bacaları da bambaşka bir görsel şölen sunmaktadır.

## Yapılacaklar Listesi

### 1. Sıcak Hava Balonu Turu

Kapadokya denince akla ilk gelen aktivite şüphesiz sıcak hava balonu turudur. Gün doğumunda gökyüzüne yükselen yüzlerce renkli balon, vadilerin ve peri bacalarının üzerinde süzülürken muhteşem bir manzara sunmaktadır. Bu deneyim, fotoğrafçılar ve doğa severlerin vazgeçilmezidir.

**İpucu**: Balon turları için en az 2-3 ay önceden rezervasyon yaptırmak tavsiye edilir. Hava durumu nedeniyle uçuşlar iptal edilebilir, bu yüzden bölgede en az 2-3 gün konaklamak riskinizi azaltır.

### 2. Göreme Açık Hava Müzesi

Bizans döneminden kalma kaya kiliselerini, manastırlarını ve fresklerini görebileceğiniz bu müze, Kapadokya'nın tarihi ve kültürel zenginliğini keşfetmek için ideal bir yerdir. 11. yüzyılda yapılmış Karanlık Kilise ve Elmalı Kilise'deki freskler görülmeye değerdir.

### 3. Yeraltı Şehirleri

Derinkuyu ve Kaymaklı Yeraltı Şehirleri, erken Hıristiyanların sığınak olarak kullandığı, sekiz kata kadar inen kompleks yapılardır. Mutfakları, ahırları, odaları ve havalandırma sistemleriyle benzersiz bir mimari harikadır.

### 4. Vadi Yürüyüşleri

Güvercinlik Vadisi, Aşk Vadisi, Kızılçukur Vadisi ve Ihlara Vadisi, doğa yürüyüşü sevenler için mükemmel rotalar sunar. Özellikle gün batımında Kızılçukur Vadisi'nin kırmızıya bürünen kayaları unutulmaz bir manzara sunmaktadır.

### 5. Avanos'ta Çömlek Yapımı

Kızılırmak'ın kırmızı kilinden yapılan çömlekleriyle ünlü Avanos, el sanatları meraklıları için vazgeçilmez bir duraktır. Burada çömlek yapım atölyelerine katılabilir ve kendi eserinizi oluşturabilirsiniz.

### 6. Ürgüp ve Göreme'de Kaya Oteller

Kapadokya'da konaklama deneyiminin en ilginç yanlarından biri, antik mağaraların ve kaya oluşumlarının içine inşa edilmiş otellerde kalmaktır. Bu benzersiz konaklama seçenekleri, bölge deneyiminizi tamamlayacak unsurlardandır.

### 7. Yerel Gastronomi

Bölgeye özgü testi kebabı, gözleme, Nevşehir mantısı ve yerel şaraplar, Kapadokya'nın gastronomik zenginliğini yansıtmaktadır. Ürgüp'teki yerel restoranlarda bu lezzetleri tadabilirsiniz.

## Ulaşım Bilgileri

Kapadokya'ya ulaşım için en yaygın yollar şunlardır:

- **Havayolu**: Nevşehir Kapadokya Havalimanı ve Kayseri Erkilet Havalimanı, İstanbul ve Ankara'dan düzenli seferlerle bölgeye ulaşım sağlar.
- **Karayolu**: Ankara'dan yaklaşık 300 km, İstanbul'dan ise 730 km uzaklıktadır. Şehirler arası otobüs seferleri mevcuttur.
- **Bölge içi ulaşım**: Turlar, kiralık araçlar veya yerel minibüsler ile sağlanabilir.

## Konaklama Önerileri

Kapadokya'da butik kaya oteller, mağara odalar ve lüks tesisler gibi çeşitli konaklama seçenekleri bulunmaktadır. Göreme, Ürgüp ve Uçhisar en popüler konaklama bölgeleridir. Manzaralı terasa sahip bir oda seçmek, sabah gün doğumunda balonları izlemek için harika bir fırsat sunacaktır.

## Alışveriş Rehberi

Kapadokya'dan alabileceğiniz en güzel hediyelik eşyalar arasında el yapımı çömlekler, halılar, onyx taşı süs eşyaları, bölge şarapları ve nazar boncukları yer almaktadır. Göreme ve Ürgüp çarşıları alışveriş için ideal noktalardır.

## Son Söz

Kapadokya, hem doğal güzellikleri hem de tarihi zenginlikleri ile her yaştan gezginin beklentilerine cevap veren eşsiz bir destinasyondur. Sabahın ilk ışıklarında balonlarla dolan gökyüzü, gün batımında kızıla bürünen vadiler ve binlerce yıllık tarihi eserler, bu bölgeyi unutulmaz kılmaktadır. Türkiye'nin bu eşsiz harikasını keşfetmek için en az üç günlük bir program yapmanızı öneririz.

Kapadokya'da geçireceğiniz her an, size masalsı bir dünyanın kapılarını aralayacak ve bu sıra dışı deneyim hafızanızda silinmez izler bırakacaktır.`,
      author: "Büyük Aytaç Travel",
      image: "https://images.unsplash.com/photo-1604156788856-2ce5f2171e9b?auto=format&fit=crop&q=80&w=1000",
      categories: ["Kapadokya", "gezi", "Türkiye"],
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