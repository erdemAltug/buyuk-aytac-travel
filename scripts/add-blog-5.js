// Kültür ve Tarih kategorisinde ilk blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Türkiye'nin En Etkileyici Antik Kentleri",
      summary: "Anadolu topraklarında binlerce yıllık tarih yolculuğuna çıkın. Efes'ten Göbeklitepe'ye, Türkiye'nin mutlaka görülmesi gereken antik kentleri.",
      content: `# Türkiye'nin En Etkileyici Antik Kentleri

Anadolu, binlerce yıl boyunca farklı medeniyetlere ev sahipliği yapmış, tarih boyunca Hititler'den Lidyalılara, Yunanlılardan Romalılara, Bizanslılardan Selçuklulara ve Osmanlılara kadar pek çok kültürün izlerini taşıyan eşsiz bir coğrafyadır. Bu yazımızda, Türkiye'nin en etkileyici antik kentlerini ve onların tarihteki önemini keşfedeceğiz.

## 1. Efes Antik Kenti (İzmir)

Türkiye'nin en çok ziyaret edilen antik kenti olan Efes, İzmir'in Selçuk ilçesinde yer alır. MÖ 6000 yıllarına kadar uzanan tarihi ile Efes, Antik Çağ'ın en önemli ticaret ve kültür merkezlerinden biriydi. Roma İmparatorluğu döneminde Asya eyaletinin başkenti olan Efes, döneminin en gelişmiş şehirlerinden biriydi.

Efes'te görülmesi gereken yapılar arasında muazzam Celsus Kütüphanesi, 24.000 kişilik Büyük Tiyatro, Artemis Tapınağı (Dünyanın Yedi Harikası'ndan biri), Hadrian Tapınağı ve Yamaç Evleri bulunur. Özellikle mermer döşeli Curetes Caddesi'nde yürürken, sanki zaman makinesiyle 2000 yıl öncesine yolculuk yapıyor hissi yaşanır.

## 2. Göbeklitepe (Şanlıurfa)

2018 yılında UNESCO Dünya Mirası Listesi'ne giren Göbeklitepe, MÖ 9600 civarına tarihlenen dünyanın bilinen en eski tapınak kompleksidir. Bu tarih, Göbeklitepe'yi Mısır piramitlerinden ve Stonehenge'den yaklaşık 7000 yıl daha eski yapar!

Şanlıurfa'nın yaklaşık 18 km kuzeydoğusunda yer alan Göbeklitepe, tarih öncesi döneme ait "T" şeklindeki taş sütunlar ve üzerlerindeki hayvan kabartmalarıyla dikkat çeker. Bu megalitik yapının keşfi, insanlık tarihinin yeniden yazılmasına neden olmuş, avcı-toplayıcı toplulukların sanılandan çok daha karmaşık dini inanç sistemlerine sahip olduğunu göstermiştir.

## 3. Troya Antik Kenti (Çanakkale)

Homeros'un İlyada destanında anlatılan Truva Savaşı'na sahne olan efsanevi kent, Çanakkale'nin Tevfikiye Köyü yakınlarında yer alır. 1998 yılında UNESCO Dünya Mirası Listesi'ne alınan Troya, MÖ 3000 yılından MS 400 yılına kadar kesintisiz olarak yerleşim yeri olarak kullanılmıştır.

Kazılarda 9 farklı yerleşim katmanı tespit edilen Troya'da, Truva Atı'nın bir replikası, savunma duvarları, tapınak kalıntıları ve konut alanları görülebilir. Ayrıca yakındaki Troya Müzesi, bölgeden çıkarılan arkeolojik buluntuları sergilemektedir.

## 4. Afrodisias (Aydın)

Aydın'ın Karacasu ilçesinde yer alan Afrodisias, adını aşk ve güzellik tanrıçası Afrodit'ten almıştır. Kent, özellikle Roma döneminde heykeltıraşlık okulu ile ünlenmiş ve dönemin en önemli mermer işleme merkezlerinden biri olmuştur.

Afrodisias'ta, muhteşem Afrodit Tapınağı, 30.000 kişilik Stadyum, Tetrapylon (Dört Kapı) ve Sebastian (İmparatorluk Kült Tapınağı) görülmeye değer yapılardır. Ayrıca, Afrodisias Müzesi'nde sergilenen heykeller ve kabartmalar, Roma dönemi heykeltıraşlık sanatının en güzel örneklerini sunar.

## 5. Hattuşa (Çorum)

Hitit İmparatorluğu'nun başkenti olan Hattuşa, Çorum'un Boğazkale ilçesinde yer alır. MÖ 2. binyılda büyük bir güç olan Hititlerin merkezi olan bu antik kent, 1986 yılında UNESCO Dünya Mirası Listesi'ne alınmıştır.

Hattuşa'da, 6 km uzunluğundaki surlar, Büyük Tapınak (Yazılıkaya), Aslanlı Kapı, Sfenksli Kapı ve Kral Kapısı görülmeye değer yapılardır. Yazılıkaya Açık Hava Tapınağı'ndaki kayalara işlenmiş Hitit tanrı ve tanrıçalarının kabartmaları, dönemin dini inançlarını yansıtması açısından büyük önem taşır.

## 6. Hierapolis Antik Kenti (Denizli)

Pamukkale'nin travertenlerinin hemen yanında yer alan Hierapolis, özellikle şifalı sularıyla ünlü bir antik spa kentiydi. MÖ 2. yüzyılda Bergama Kralı II. Eumenes tarafından kurulan kent, Roma ve Bizans dönemlerinde de önemini korumuştur.

Hierapolis'te, muhteşem bir nekropol (mezarlık), 12.000 kişilik tiyatro, Apollon Tapınağı ve Plutonium (ölüler diyarına açılan kapı olduğuna inanılan bir mağara) görülebilir. Antik havuz (Kleopatra Havuzu) ise, içinde Roma döneminden kalma sütun ve mermer parçalarıyla halen yüzülebilen şifalı bir termal havuzdur.

## 7. Aspendos (Antalya)

Antalya'nın Serik ilçesinde yer alan Aspendos, muhteşem tiyatrosuyla ünlüdür. MS 2. yüzyılda inşa edilen ve 15.000 kişi kapasiteli tiyatro, antik dünyanın en iyi korunmuş tiyatrolarından biridir. Akustiği o kadar mükemmeldir ki, sahnenin ortasında konuşulan bir söz, en üst sıralarda bile net bir şekilde duyulabilir.

Aspendos Tiyatrosu günümüzde de konser ve gösteri mekanı olarak kullanılmaktadır. Kentte ayrıca, su kemerleri, bazilika, agora ve nymphaeum (anıtsal çeşme) kalıntıları görülebilir.

## Ziyaret İpuçları

- **En İyi Dönem:** Antik kentleri gezmek için en uygun dönemler ilkbahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) aylarıdır. Yaz aylarında, özellikle öğle saatlerinde sıcaklık çok yüksek olabilir.
- **Rehberli Turlar:** Antik kentlerin tarihi ve kültürel zenginliğini daha iyi anlamak için rehberli turlar tercih edilebilir.
- **Uygun Ayakkabı:** Antik kentlerde çok fazla yürüyeceğinizi ve arazinin engebeli olabileceğini düşünerek rahat ayakkabılar giymenizde fayda var.
- **Su ve Güneş Koruması:** Yanınızda mutlaka su, şapka ve güneş kremi bulundurun.

Türkiye'nin her köşesinde tarih fışkırır. Bu antik kentler, sadece taş yığınları değil, binlerce yıllık hikayeleri, kültürleri ve uygarlıkları günümüze taşıyan zaman kapsülleridir. Bu olağanüstü tarihi mirası keşfetmek, geçmişle bir bağ kurmanın en etkileyici yollarından biridir.`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80&w=1000",
      categories: ["culture"],
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