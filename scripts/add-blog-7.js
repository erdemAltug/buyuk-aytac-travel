// Yemek ve Gastronomi kategorisinde ilk blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "Türk Mutfağının En Lezzetli 10 Sokak Yemeği",
      summary: "Türkiye'nin farklı şehirlerinden sokak lezzetleri, tarihleri ve en iyi tadılabileceği yerler hakkında bilgiler.",
      content: `# Türk Mutfağının En Lezzetli 10 Sokak Yemeği

Türk mutfağı, zengin tarihi ve kültürel mirasıyla dünyanın en önemli mutfaklarından biridir. Bu zengin mutfak kültürünün önemli bir parçasını da sokak lezzetleri oluşturur. İstanbul'dan Gaziantep'e, Karadeniz'den Akdeniz'e, her bölgenin kendine has sokak lezzetleri vardır. Bu yazımızda, Türkiye'nin dört bir yanından en lezzetli 10 sokak yemeğini tanıtacağız.

## 1. Kokoreç

Türk sokak lezzetlerinin belki de en popüler ve tartışmalı olanı kokoreçtir. Kuzu bağırsağının şişe geçirilip kızartılmasıyla hazırlanan kokoreç, tuz, kekik, kimyon, kırmızı biber ve bazen de domates ve yeşil biber ile servis edilir. Özellikle İstanbul, İzmir ve Ankara gibi büyük şehirlerde yaygındır.

İzmir usulü kokoreç genellikle daha ince kıyılmış ve baharatlı olurken, İstanbul usulü kokoreç daha iri kıyılmıştır. Kokoreç, hem yarım ekmek arasında hem de porsiyon olarak servis edilir. Gecenin geç saatlerinde, özellikle eğlence mekanlarının çıkışında tercih edilen bir sokak lezzetidir.

## 2. Midye Dolma

Deniz kenarındaki şehirlerde, özellikle İstanbul'da çok popüler olan midye dolma, midyenin içine baharatlı pilav doldurulmasıyla hazırlanır. Seyyar tezgahlarda midye dolmacılar, midyeleri tek tek açıp içine limon sıkarak müşterilerine sunar.

Midye dolma, genellikle pirinç, baharat, çam fıstığı, kuş üzümü ve bazen de tarçın ile hazırlanır. Bol limon sıkılarak yenir ve bir kerede çok sayıda tüketilebilir. İstanbul'un Beyoğlu, Beşiktaş ve Kadıköy gibi semtlerinde, gecenin her saatinde taze midye dolma bulmak mümkündür.

## 3. Kumpir

Özellikle İstanbul'un Ortaköy semtinde popüler olan kumpir, büyük bir patatesin içinin tereyağı ve kaşar peyniri ile karıştırılıp, üzerine çeşitli malzemeler eklenmesiyle hazırlanır. Mısır, turşu, zeytin, mısır, sosis, mayonez, ketçap, rus salatası gibi çeşitli malzemelerle zenginleştirilen kumpir, her damak tadına hitap eder.

Ortaköy Meydanı'ndaki kumpirciler sırasında, yerli ve yabancı turistlerin uzun kuyruklar oluşturduğu görülebilir. Her ne kadar Ortaköy ile özdeşleşmiş olsa da, artık Türkiye'nin birçok şehrinde kumpir bulmak mümkündür.

## 4. Tantuni

Mersin'in meşhur sokak lezzeti tantuni, ince kıyılmış etin yağda pişirilip, baharatlar ve yeşilliklerle lavaşa veya ince pideye sarılmasıyla yapılır. Geleneksel olarak sadece et, soğan ve yeşillik içeren tantuni, günümüzde domates ve biber gibi malzemelerle de zenginleştirilmiştir.

Tantuni, genellikle oldukça yağlı ve acılı olur ve ayran ile tüketilir. Mersin dışında İstanbul, Ankara ve İzmir gibi büyük şehirlerde de tantuni restoranları bulmak mümkündür.

## 5. Çiğ Köfte

Urfa ve Adıyaman'dan tüm Türkiye'ye yayılan çiğ köfte, aslında çiğ et ile yapılan bir yemekti. Ancak günümüzde hijyen şartları nedeniyle sokakta satılan çiğ köfteler etsiz olarak hazırlanır. Bulgur, isot (kuru kırmızı biber), domates ve biber salçası, soğan, sarımsak ve çeşitli baharatların yoğrulmasıyla hazırlanan çiğ köfte, marul yaprağı içinde veya dürüm şeklinde servis edilir.

Çiğ köfte dükkanları, son yıllarda Türkiye'nin her yerinde hızla çoğalmıştır. Acı seviyesi genellikle müşterinin isteğine göre ayarlanabilir. Çiğ köfte ile birlikte ayran veya şalgam suyu içilmesi gelenekseldir.

## 6. Islak Hamburger

İstanbul Taksim'le özdeşleşen ıslak hamburger, küçük köftelerin küçük burger ekmeği arasına konulup, sarımsaklı ve baharatlı bir sosla ıslatılmasıyla hazırlanır. Adından da anlaşılacağı gibi, ekmeklerin sos ile ıslatılması bu hamburgerin en belirgin özelliğidir.

Taksim Meydanı'ndan İstiklal Caddesi'ne giden yolda bulunan "Kızılkayalar" ve çevresindeki diğer dükkanlar, özellikle gece geç saatlerde ıslak hamburger yemek için tercih edilir. Tek başına atıştırmalık olarak yenebileceği gibi, porsiyon olarak da sipariş edilebilir.

## 7. Balık Ekmek

İstanbul Eminönü ve Karaköy'de, özellikle de Galata Köprüsü'nün altında teknelerde pişirilen ve satılan balık ekmek, turistlerin de çok rağbet ettiği bir sokak lezzetidir. Genellikle uskumru veya hamsi gibi balıkların ızgarada pişirilip, ekmek arasına soğan, yeşillik ve bazen de limon eklenmesiyle hazırlanır.

İstanbul Boğazı'nın eşsiz manzarası eşliğinde yenebilen balık ekmek, özellikle sonbahar ve kış aylarında daha lezzetli olur. Teknelerin yanında satılan turşu suyu ile birlikte tüketilmesi, tam bir İstanbul geleneğidir.

## 8. Adana Kebap Dürüm

Adana'nın dünyaca ünlü lezzeti Adana kebap, sokak versiyonu olan dürüm haliyle de çok popülerdir. Zırh adı verilen özel bir bıçakla kıyılan kuzu etinin baharatlarla karıştırılıp şişe geçirilerek mangalda pişirilmesi ve ardından ince lavaşa sarılmasıyla hazırlanır.

Adana kebap dürüm, genellikle közlenmiş biber ve domates, soğan ve yeşilliklerle birlikte servis edilir. Acı sevenler için yanında özel kırmızı biber sos veya acı ezme de bulunur. Özellikle Adana, Mersin ve Gaziantep gibi güney şehirlerinde, her köşe başında lezzetli Adana kebap dürüm bulmak mümkündür.

## 9. Simit

Türkiye'nin belki de en yaygın sokak lezzeti olan simit, halka şeklinde, üzeri susam kaplı bir ekmek çeşididir. Geleneksel olarak seyyar satıcıların taşıdığı tablalarda veya tekerlekli simit arabalarında satılır.

İstanbul simidi ince ve çıtır olurken, Ankara simidi daha kalın ve yumuşaktır. Simit, genellikle kahvaltılık olarak düşünülse de, gün içinde herhangi bir saatte atıştırmalık olarak tüketilir. Çay ile birlikte yendiğinde, tam bir Türk klasiğine dönüşür.

## 10. Nohut Dürüm

Özellikle Ankara'da popüler olan nohut dürüm, haşlanmış nohutun lavaşa sarılmasıyla yapılır. Nohutlar genellikle baharatlı bir su içinde pişirilir ve servis edilirken üzerine kimyon, kırmızı biber, tuz ve bazen de sumak eklenir.

Çok basit bir tarifi olmasına rağmen, nohut dürüm özellikle çalışanlar ve öğrenciler arasında hızlı ve ekonomik bir öğün olarak tercih edilir. Ankara'nın Kızılay ve Ulus gibi merkezi semtlerinde, birçok nohut dürümcü bulunur.

## En İyi Sokak Yemekleri Nerede Yenir?

- **İstanbul:** Eminönü'nde balık ekmek, Ortaköy'de kumpir, Taksim'de ıslak hamburger, Beyoğlu ve Kadıköy'de midye dolma ve kokoreç
- **Ankara:** Sakarya Caddesi'nde nohut dürüm, Kızılay'da çiğ köfte
- **İzmir:** Kordon'da boyoz ve İzmir kumrusu, Çeşme'de kumru
- **Adana/Gaziantep:** Kent merkezinde Adana kebap dürüm ve çiğ köfte
- **Mersin:** Tantuni için Mersin merkez ve özellikle Tarsus

Türk sokak lezzetleri, sadece karın doyurmak için değil, aynı zamanda Türkiye'nin zengin yemek kültürünü deneyimlemek için de mükemmel bir fırsattır. Her biri kendine has hikâyesi, yapılış tekniği ve tadıyla, Türkiye'yi ziyaret edenlerin mutlaka denemesi gereken lezzetlerdir.`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
      categories: ["food"],
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