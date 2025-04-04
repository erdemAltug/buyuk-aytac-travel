// Yeni blog yazısı eklemek için script - Sefirler Tepesi
import axios from 'axios';

async function createBlog() {
  try {
    const blogData = {
      title: "İstanbul'un Gizli Cenneti: Sefirler Tepesi",
      slug: "istanbulun-gizli-cenneti-sefirler-tepesi",
      summary: "İstanbul'un muhteşem manzarasına sahip, az bilinen cenneti Sefirler Tepesi hakkında bilmeniz gereken her şey.",
      content: `# İstanbul'un Gizli Cenneti: Sefirler Tepesi

İstanbul, tarih boyunca birçok medeniyete ev sahipliği yapmış, eşsiz manzaraları ve kültürel zenginlikleriyle dünyanın en etkileyici şehirlerinden biridir. Bu büyüleyici şehrin az bilinen hazinelerinden biri olan Sefirler Tepesi, İstanbul'un muhteşem panoramik manzarasını sunan özel bir noktadır.

## Nerede Bulunur?

Sefirler Tepesi, İstanbul'un Sarıyer ilçesine bağlı Rumelifeneri Mahallesi'nde, Karadeniz kıyısına yakın bir konumda yer almaktadır. Boğaz'ın Karadeniz'e açıldığı noktayı ve İstanbul Boğazı'nın eşsiz manzarasını kuşbakışı izleyebileceğiniz bu tepe, şehir merkezinden yaklaşık 35 km uzaklıktadır.

## Tarihçesi

Adını, Osmanlı döneminde yabancı ülkelerin elçilerinin (sefirlerin) burada ağırlanmasından alan Sefirler Tepesi, stratejik konumu nedeniyle tarih boyunca önem taşımıştır. Karadeniz'e açılan boğaz girişini gören bu nokta, hem askeri hem de diplomatik açıdan değerli bir gözlem noktası olmuştur.

## Nasıl Gidilir?

Sefirler Tepesi'ne ulaşmak için öncelikle Sarıyer'e, oradan da Rumelifeneri'ne gitmeniz gerekmektedir. Özel araçla gidiyorsanız, Rumelifeneri Yolu'nu takip ederek tepeye ulaşabilirsiniz. Toplu taşıma ile gitmek isterseniz, Hacıosman metro istasyonundan 150 veya 151 numaralı otobüslerle Rumelifeneri'ne ulaşabilir, ardından kısa bir yürüyüşle tepeye varabilirsiniz.

## En İyi Ziyaret Zamanı

Sefirler Tepesi'ni ziyaret etmek için en ideal zaman, hava koşullarının açık olduğu ilkbahar ve yaz aylarıdır. Özellikle gün doğumu ve gün batımı saatleri, muhteşem manzarayı deneyimlemek için en etkileyici zamanlardır. Hafta içi günlerde ziyaret ederseniz daha sakin bir ortamda manzaranın tadını çıkarabilirsiniz.

## Ne Yapabilirsiniz?

1. **Fotoğraf Çekmek**: Sefirler Tepesi, İstanbul'un en iyi fotoğraf noktalarından biridir. Boğaz'ın Karadeniz'e açılışını, Anadolu ve Rumeli Fenerleri'ni ve Yavuz Sultan Selim Köprüsü'nü tek karede görebilirsiniz.

2. **Piknik Yapmak**: Tepenin çevresindeki yeşil alanlar, piknik yapmak için idealdir. Manzara eşliğinde yapacağınız bir piknik, unutulmaz bir deneyim olacaktır.

3. **Doğa Yürüyüşü**: Çevredeki patikalar, doğa yürüyüşü sevenler için harika rotalar sunmaktadır. Orman içinde yapacağınız kısa yürüyüşlerle farklı manzara noktalarını keşfedebilirsiniz.

4. **Günbatımı İzlemek**: Sefirler Tepesi'nden izlenen günbatımı, İstanbul'un en etkileyici manzaralarından biridir. Güneşin Karadeniz'in ufkunda batışını izlemek, unutulmaz bir deneyim sunmaktadır.

## Çevredeki Diğer Gezilecek Yerler

Sefirler Tepesi'ni ziyaret ettiğinizde, çevrede görebileceğiniz diğer önemli noktalar şunlardır:

- **Rumeli Feneri**: 1856 yılında Fransızlar tarafından inşa edilen tarihi deniz feneri.
- **Rumeli Kavağı**: Geleneksel balık restoranlarıyla ünlü sahil kasabası.
- **Garipçe Köyü**: Otantik atmosferiyle İstanbul'un az bilinen köylerinden biri.
- **Yavuz Sultan Selim Köprüsü**: İstanbul'un üçüncü boğaz köprüsünün muhteşem manzarası.

## Dikkat Edilmesi Gerekenler

- Bölge özellikle hafta sonları kalabalık olabilir, erken saatlerde ziyaret etmek daha keyifli olacaktır.
- Tepeye çıkarken yürüyüş için uygun ayakkabılar giymeyi unutmayın.
- Fotoğraf ekipmanınızı yanınızda bulundurmayı ihmal etmeyin.
- Piknik yapmayı düşünüyorsanız, çöplerinizi toplamayı ve doğaya saygılı olmayı unutmayın.

İstanbul'un kalabalığından ve gürültüsünden uzaklaşıp, şehrin muhteşem manzarasını kuşbakışı izlemek istiyorsanız, Sefirler Tepesi mutlaka rotanıza eklenmelidir. Karadeniz'in mavisi, Boğaz'ın turkuazı ve İstanbul'un eşsiz silueti, bu tepeden unutulmaz bir tablo gibi gözler önüne serilmektedir.`,
      author: "Büyük Aytaç Travel",
      image: "https://images.unsplash.com/photo-1596111481634-b99dd8afc21b?auto=format&fit=crop&q=80&w=1000",
      categories: ["İstanbul", "gezi", "manzara"],
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