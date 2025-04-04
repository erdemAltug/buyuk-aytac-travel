// Kültür ve Tarih kategorisinde ikinci blog yazısı
import dbConnect from '../src/lib/dbConnect.ts';
import Blog from '../src/models/Blog.ts';

async function createBlog() {
  try {
    await dbConnect();

    const blog = {
      title: "İstanbul'un Gizli Kalmış Tarihi Hazineleri",
      summary: "Turistlerin genellikle gözden kaçırdığı İstanbul'un gizli kalmış tarihi mekanları ve kültürel zenginlikleri hakkında bir keşif rehberi.",
      content: `# İstanbul'un Gizli Kalmış Tarihi Hazineleri

İstanbul, dünya tarihinin en önemli şehirlerinden biridir. Binlerce yıllık geçmişiyle Doğu ile Batı'nın, Asya ile Avrupa'nın buluştuğu bu eşsiz kentte, Ayasofya, Topkapı Sarayı ve Sultanahmet Camii gibi popüler turistik yerler dışında, keşfedilmeyi bekleyen pek çok gizli hazine bulunur. Bu yazımızda, İstanbul'un görece az bilinen ancak tarih ve kültür açısından son derece zengin mekanlarını keşfedeceğiz.

## 1. Yerebatan Sarnıcı (Bazilika Sarnıcı)

Sultanahmet Meydanı'nın hemen altında yer alan Yerebatan Sarnıcı, Bizans İmparatoru I. Justinianus (527-565) tarafından inşa edilmiştir. 336 mermer sütundan oluşan ve yaklaşık 100.000 ton su depolayabilen bu devasa yeraltı su deposu, "Sarayın Batık Sarayı" olarak da bilinir.

Loş ışık altında ahşap iskeleler üzerinde gezilebilen sarnıçta, iki adet Medusa başı bulunur. Biri ters, diğeri yan duran bu Medusa başlarının neden bu şekilde yerleştirildiği tam olarak bilinmemektedir, ancak bunun kötü gözden korunmak için yapıldığı düşünülmektedir.

## 2. Kariye Müzesi (Chora Kilisesi/Camii)

Edirnekapı semtinde yer alan Kariye Müzesi, Bizans sanatının en güzel örneklerinden birini barındırır. 11. yüzyılda manastır kilisesi olarak inşa edilen, 14. yüzyılda ise Theodore Metochites tarafından restore edilerek mozaik ve fresklerle süslenen yapı, Bizans döneminin en muhteşem mozaik ve freskleriyle bezelidir.

Özellikle İsa'nın hayatı ve Meryem Ana'nın hayatını tasvir eden mozaikler, Bizans sanatının şaheserleri arasındadır. 1511 yılında Osmanlı döneminde camiye çevrilen yapı, 1948 yılından itibaren müze olarak hizmet vermektedir.

## 3. Süleymaniye Hamamı ve Mimar Sinan'ın Türbesi

Kanuni Sultan Süleyman adına Mimar Sinan tarafından inşa edilen Süleymaniye Camii, İstanbul'un en çok bilinen camilerinden biridir. Ancak caminin hemen yanındaki Süleymaniye Hamamı ve camiinin avlu duvarı dışında yer alan Mimar Sinan'ın mütevazı türbesi, çoğu ziyaretçinin gözünden kaçar.

Mimar Sinan, kendi deyimiyle "kalfalık eseri" olan Süleymaniye Camii'nin yanında, son derece sade bir türbede medfundur. Türbenin üzerindeki "Geçti bu demde cihandan pir-i mimaran Sinan" yazılı kitabe, büyük ustanın vefat tarihini gösterir.

## 4. Rum Ali Paşa Camii ve Şeyh Vefa Türbesi

Vefa semtinde yer alan Rum Ali Paşa Camii ve hemen yanındaki Şeyh Vefa Türbesi, çok az turistin bildiği tarihi mekanlardır. Vefa Bozacısı'nın hemen yanındaki bu yapılar, İstanbul'un manevi mirasının önemli unsurlarındandır.

Şeyh Vefa (Muslihuddin Mustafa), 15. yüzyılda yaşamış önemli bir mutasavvıftır ve İstanbul'un fethinden sonra kurduğu dergah, dönemin en önemli ilim ve kültür merkezlerinden biri olmuştur. Türbesinin bahçesinde yer alan ve İstanbul'un en eski ağaçlarından biri olduğu söylenen çınar ağacı da görülmeye değerdir.

## 5. Zeyrek Camii (Pantokrator Manastırı)

Fatih ilçesinde yer alan Zeyrek Camii, Bizans döneminde Pantokrator Manastırı olarak inşa edilmiş, Osmanlı döneminde ise camiye çevrilmiştir. Ayasofya'dan sonra İstanbul'daki en büyük Bizans yapısı olan bu kompleks, üç kilise ve aralarındaki yapılardan oluşur.

Zeyrek Camii, UNESCO Dünya Mirası Listesi'nde yer almasına rağmen hak ettiği ilgiyi görmemektedir. Bizans mimarisinin görkemli örneklerinden biri olan yapı, mozaik zemin döşemeleri ve mimari detaylarıyla büyüleyicidir.

## 6. Çukurbostan (Aspar Sarnıcı)

Fatih ilçesindeki Çukurbostan, Bizans döneminde inşa edilen açık hava sarnıcıdır. Günümüzde Karagümrük Stadyumu ve çevresi olarak kullanılan bu alan, aslında Bizans döneminde şehrin su ihtiyacını karşılamak için inşa edilmiş devasa bir su deposudur.

Aspar Sarnıcı olarak da bilinen bu yapı, İstanbul'un en büyük açık hava sarnıcıydı. Günümüzde çevresi yerleşime açılmış olsa da, bir zamanlar şehrin su sisteminin ne kadar gelişmiş olduğunu göstermesi açısından önemli bir tarihi yapıdır.

## 7. Tekfur Sarayı (Blakhernai Sarayı)

Edirnekapı'da Bizans surlarına bitişik olarak inşa edilen Tekfur Sarayı, İstanbul'da günümüze ulaşan tek Bizans sarayıdır. 13. yüzyılda inşa edildiği düşünülen saray, üç katlı bir yapıya sahiptir ve Bizans mimarisinin nadir örneklerindendir.

Uzun yıllar boyunca harap halde bırakılan saray, yakın zamanda restore edilmiş ve ziyarete açılmıştır. Tekfur Sarayı'nın cephesindeki tuğla ve taş işçiliği, Bizans mimarisinin inceliklerini yansıtır.

## 8. Fethiye Müzesi (Pammakaristos Kilisesi)

Fatih ilçesinde yer alan Fethiye Müzesi, Bizans döneminde Pammakaristos Manastır Kilisesi olarak inşa edilmiş, Osmanlı döneminde ise Fethiye Camii olarak kullanılmıştır. Ana kilise camiye çevrilirken, yan şapel müze olarak korunmuştur.

Şapelde yer alan Bizans mozaikleri, özellikle Deesis (Yakarış) sahnesi, Bizans sanatının en güzel örneklerindendir. Kariye Müzesi'ne göre daha az turist çeken Fethiye Müzesi, mozaiklerinin kalitesi ve tarihsel önemi açısından en az onun kadar değerlidir.

## Ziyaret İpuçları

- **Ziyaret Saatleri:** Müzelerin açık olduğu saatleri önceden kontrol etmekte fayda var. Bazı mekânlar haftanın belirli günleri kapalı olabilir.
- **Ulaşım:** İstanbul'un toplu taşıma sistemi oldukça gelişmiştir. İstanbul Kart alarak metro, otobüs, tramvay, vapur gibi toplu taşıma araçlarını ekonomik olarak kullanabilirsiniz.
- **Rehberli Turlar:** Bu gizli hazinelerin tarihini ve kültürel önemini daha iyi anlamak için rehberli turlar tercih edilebilir.
- **Giyim:** Özellikle camiye çevrilmiş tarihi yapıları ziyaret ederken, uygun kıyafetler giymeyi unutmayın.

İstanbul'un gizli hazineleri, kentin binlerce yıllık zengin tarihinin birer parçasıdır. Turistik rotaların dışına çıkarak, bu eşsiz tarihi ve kültürel zenginlikleri keşfetmek, İstanbul'u daha derinden anlamanın en güzel yollarından biridir. Bu gizli hazineleri keşfederken, şehrin katmanlarında saklı hikâyelere kulak verin ve İstanbul'un büyüsüne kapılın.`,
      author: "Altuğ Erdem",
      image: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=1000",
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