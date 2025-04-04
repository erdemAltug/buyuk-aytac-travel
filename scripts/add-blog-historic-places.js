import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Türkiye'nin Görülmesi Gereken 8 Tarihi Hazinesi",
      slug: "turkiyenin-gorulmesi-gereken-8-tarihi-hazinesi",
      summary: "Binlerce yıllık tarihi ve kültürel mirası barındıran Türkiye'nin mutlaka ziyaret edilmesi gereken tarihi ve arkeolojik alanları.",
      content: `# Türkiye'nin Görülmesi Gereken 8 Tarihi Hazinesi

Anadolu toprakları, binlerce yıllık tarih boyunca onlarca medeniyete ev sahipliği yapmış, her köşesinde farklı uygarlıkların izlerini taşıyan eşsiz bir coğrafyadır. Hitit'ten Roma'ya, Bizans'tan Selçuklu ve Osmanlı'ya kadar uzanan zengin bir kültürel mirasa sahip olan Türkiye, dünyanın en önemli açık hava müzelerinden biri olarak kabul edilir. Bu yazımızda, Türkiye'de mutlaka görülmesi gereken 8 tarihi hazineyi sizler için derledik.

## 1. Efes Antik Kenti, İzmir

İzmir'in Selçuk ilçesinde yer alan Efes, dünyanın en iyi korunmuş antik kentlerinden biridir. M.Ö. 6000 yıllarına kadar uzanan tarihi ve UNESCO Dünya Mirası Listesi'nde yer alan bu etkileyici kent, Roma döneminin ihtişamını günümüze taşır.

**Görülmesi Gerekenler**:
- **Celsus Kütüphanesi**: Roma döneminin en önemli kütüphanelerinden biri olan yapı, muhteşem mimarisiyle ziyaretçileri büyüler.
- **Büyük Tiyatro**: 25.000 kişilik kapasitesiyle antik dünyanın en büyük açık hava tiyatrolarından biridir.
- **Mermer Cadde**: Efes'in ana caddesi olan Mermer Cadde, dönemin zenginliğini ve ihtişamını yansıtır.
- **Yamaç Evleri**: Varlıklı Efeslilerin yaşadığı, duvar resimleri ve mozaiklerle süslü lüks konutlar.
- **Artemis Tapınağı**: Antik dünyanın yedi harikasından biri olan tapınağın kalıntıları.

**Ziyaret İçin İdeal Zaman**: İlkbahar ve sonbahar ayları, özellikle Nisan-Mayıs ve Eylül-Ekim dönemleri.

## 2. Göbeklitepe, Şanlıurfa

Arkeoloji dünyasında devrim yaratan ve insanlık tarihini yeniden yazdıran Göbeklitepe, bilinen en eski tapınak kompleksidir. Yaklaşık 12.000 yıllık geçmişiyle (M.Ö. 10.000) Neolitik Dönem'e ait bu alan, UNESCO Dünya Mirası Listesi'nde yer alır.

**Görülmesi Gerekenler**:
- **T Şeklindeki Dikilitaşlar**: Üzerlerinde hayvan figürleri ve semboller bulunan, 5,5 metreye ulaşan devasa taşlar.
- **Mimari Yapılar**: Dairesel formda inşa edilmiş tapınak yapıları.
- **Göbeklitepe Müzesi**: Alandaki buluntular ve bilgilendirici sergiler.

**Ziyaret İçin İdeal Zaman**: Mart-Mayıs ve Eylül-Kasım ayları.

## 3. Kapadokya, Nevşehir

Doğa ve tarihin iç içe geçtiği bir açık hava müzesi olan Kapadokya, volkanik tüflerin erozyonuyla oluşan peri bacaları, yeraltı şehirleri ve kayaya oyulmuş kiliseleriyle büyüleyici bir destinasyondur.

**Görülmesi Gerekenler**:
- **Göreme Açık Hava Müzesi**: Bizans dönemine ait fresklerle süslü kayaya oyulmuş kiliseler.
- **Derinkuyu ve Kaymaklı Yeraltı Şehirleri**: Erken Hıristiyan toplulukların sığınak olarak kullandığı, çok katlı yeraltı yerleşimleri.
- **Zelve ve Paşabağ Vadileri**: En etkileyici peri bacası oluşumlarının bulunduğu vadiler.
- **Uçhisar Kalesi**: Bölgenin en yüksek noktası olan doğal kale, panoramik manzaralar sunar.
- **Ihlara Vadisi**: 14 km uzunluğundaki kanyonda kayaya oyulmuş kiliseler ve manastırlar.

**Ziyaret İçin İdeal Zaman**: Nisan-Haziran ve Eylül-Ekim ayları.

## 4. Troya Antik Kenti, Çanakkale

Homeros'un İlyada destanına konu olan ve UNESCO Dünya Mirası Listesi'nde yer alan Troya, 3500 yıllık tarihiyle dokuz farklı medeniyete ev sahipliği yapmıştır.

**Görülmesi Gerekenler**:
- **Troya Müzesi**: 2018'de açılan modern müze, Troya'nın tarihini ve kazı buluntularını sergiler.
- **Trojan Atı Replikası**: Efsanevi Truva Atı'nın temsili modeli.
- **Antik Kent Kalıntıları**: Dokuz katmanlı yerleşimin surları, sarayları ve tapınakları.

**Ziyaret İçin İdeal Zaman**: Mayıs-Ekim arası.

## 5. Nemrut Dağı, Adıyaman

Adıyaman'ın Kahta ilçesinde, 2150 metre yükseklikte yer alan Nemrut Dağı, Kommagene Kralı I. Antiochos'un (M.Ö. 69-36) tanrılar ve atalarıyla birlikte gömüldüğü anıt mezar ve kutsal alandır.

**Görülmesi Gerekenler**:
- **Doğu ve Batı Terasları**: Devasa heykel başları ve rölyefler.
- **Tümülüs (Mezar Odası)**: Kral Antiochos'un mezarının bulunduğu yapay tepe.
- **Gün Doğumu veya Batımı Manzarası**: Heykellerin silüetleri eşliğinde eşsiz güzellikte gün doğumu veya batımı izleme fırsatı.

**Ziyaret İçin İdeal Zaman**: Mayıs-Ekim arası, özellikle gün doğumu veya batımı saatleri.

## 6. Afrodisias, Aydın

Aydın'ın Karacasu ilçesinde yer alan ve Aphrodite'ye adanmış antik kent Afrodisias, heykeltıraşlık sanatının merkezi olarak ünlenmiş ve mükemmel korunmuş yapılarıyla öne çıkar.

**Görülmesi Gerekenler**:
- **Afrodisias Müzesi**: Antik kentten çıkarılan muhteşem heykeller ve rölyefler.
- **Aphrodite Tapınağı**: Kentin ana tapınağı.
- **Stadyum**: 30.000 kişilik kapasitesiyle antik dünyanın en iyi korunmuş stadyumlarından biri.
- **Tetrapylon**: Kentin anıtsal giriş kapısı.
- **Sebasteion**: Roma İmparatorlarına adanmış rölyeflerle süslü kompleks.

**Ziyaret İçin İdeal Zaman**: Nisan-Ekim arası.

## 7. Ani Harabeleri, Kars

Kars'ın Ocaklı köyünde, Türkiye-Ermenistan sınırında yer alan ve "Bin Bir Kilise Şehri" olarak da bilinen Ani, Orta Çağ'ın en görkemli şehirlerinden biriydi.

**Görülmesi Gerekenler**:
- **Ani Katedrali**: 11. yüzyılda inşa edilen ve Ermeni mimarisinin başyapıtlarından biri olan katedral.
- **Tigran Honents Kilisesi**: İçindeki fresklerle öne çıkan 13. yüzyıl kilisesi.
- **Selçuklu Sarayı**: Bölgedeki Türk mimarisinin önemli örneklerinden.
- **Menüçehr Camii**: Anadolu'daki ilk Türk camilerinden biri.
- **Surlar**: Kenti çevreleyen etkileyici savunma duvarları.

**Ziyaret İçin İdeal Zaman**: Mayıs-Eylül arası.

## 8. Hattuşa, Çorum

Hitit İmparatorluğu'nun başkenti olan Hattuşa, M.Ö. 17. yüzyıldan M.Ö. 13. yüzyıla kadar yaklaşık 450 yıl boyunca bölgenin en güçlü medeniyetine ev sahipliği yapmıştır.

**Görülmesi Gerekenler**:
- **Büyük Kale (Büyükkale)**: Kraliyet ailesinin yaşadığı ve yönetim merkezinin bulunduğu alan.
- **Aslanlı Kapı**: Şehrin güney girişinde yer alan, aslan figürleriyle süslü anıtsal kapı.
- **Sfenksli Kapı**: Şehrin güneybatı girişinde yer alan, sfenks heykelleriyle korunan kapı.
- **Yazılıkaya Açık Hava Tapınağı**: Kaya yüzeyine işlenmiş tanrı ve tanrıça kabartmalarıyla süslü Hitit kutsal alanı.

**Ziyaret İçin İdeal Zaman**: Nisan-Ekim arası.

## Tarihi Alanları Ziyaret Ederken Dikkat Edilmesi Gerekenler

1. **Rehber Eşliğinde Ziyaret**: Tarihi alanları daha iyi anlamak ve önemli detayları kaçırmamak için profesyonel rehberlerle gezmenizi öneririz.

2. **Koruma Bilinci**: Bu alanlar insanlığın ortak mirası olduğundan, ziyaret sırasında kalıntılara dokunmamaya, çöp bırakmamaya ve yapılara zarar vermemeye özen gösterin.

3. **Uygun Giyim ve Ayakkabı**: Arkeolojik alanlarda genellikle engebeli arazilerde yürümek gerektiğinden, rahat ayakkabılar ve mevsime uygun giyim tercih edin.

4. **Su ve Şapka**: Özellikle yaz aylarında güneşten korunmak için şapka, güneş gözlüğü bulundurun ve yanınızda yeterince su taşıyın.

5. **Fotoğraf Çekim İzinleri**: Bazı müze ve ören yerlerinde fotoğraf çekimi için ek ücret veya izin gerekebilir, önceden bilgi alın.

6. **Ziyaret Saatleri**: Ören yerlerinin ziyaret saatlerini önceden kontrol edin, genellikle akşam saatlerinde kapanırlar.

Türkiye'nin bu eşsiz tarihi hazineleri, binlerce yıllık medeniyetlerin izlerini taşıyan birer açık hava müzesi niteliğindedir. Her biri, insanlık tarihinin farklı dönemlerine ışık tutan bu alanları ziyaret etmek, geçmişin derinliklerine yolculuk yapmanızı sağlayacaktır.

Anadolu'nun büyülü atmosferinde, taşlara işlenmiş tarihin sesini dinlemek ve farklı uygarlıkların izlerini keşfetmek için bu görkemli miras alanlarını mutlaka ziyaret listenize ekleyin!`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1532726635173-9c1cbe26770c?auto=format&fit=crop&q=80&w=1000",
      categories: ["culture", "history", "destinations"],
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