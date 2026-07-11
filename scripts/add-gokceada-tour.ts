/**
 * Gökçeada Turu Seed Script
 * Kullanım: npx tsx scripts/add-gokceada-tour.ts
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Tour, { TourType, AccommodationType } from '../src/models/Tour';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI bulunamadı (.env.local)');
  process.exit(1);
}

const gokceadaTour = {
  name: 'Gökçeada Turu - 12 Temmuz 2026',
  description: `TURUMUZ YÜZME MOLASI AĞIRLIKLI DENİZ TURUDUR.

Çerkezköy Köşem Kahveler durağından hareketle başlar. Tekirdağ, Ahi evren takiben Gelibolu'yu geçip, Kabatepe limanından sabah feribotuna binerek Türkiye'nin en batı ucu ve en büyük adası Gökçeada'ya (Yunanca: IMVROS) geçiyoruz. (Kahvaltıyı yanınıza alıp yolda yapılacak araç içi ikramlarla birlikte yapabilir veya yol üzerindeki dinlenme tesislerinde alabilirsiniz.)

Kirlenmemiş denizi bakir topraklarıyla maviyle yeşilin tüm tonlarını barındıran, yüzyılların içinden geçerek günümüze Rum Köylerini, manastırlarını, kiliselerini taşımış, toplumların kaynaşarak dostluk içinde nasıl yaşayacağını göstermiş şirin bir adamızdır.

İlk önce feribottan indiğimizde Kaleköy'e geçiyoruz. Burada küçük köy gezintimizi rehber eşliğinde yapıyoruz. Kaleköy'de şarap tadabilir, satın alabilir ve köyde keyifli dakikalar geçirebilirsiniz. Alışveriş molası için köy girişinde bulunan renkli tezgahlarda vakit geçiriyoruz. Daha sonra adanın en popüler köylerinden biri olan Zeytinli Köyü'ne geçiyoruz. Madamın meşhur dibek kahvesinden, sakızlı muhallebisinden tadıp köyü keşfettikten sonra Ada merkezine gidiyoruz. Gökçeada Kent Müzesi ve kiliseyi ziyaret ediyoruz.

Burada öğle yemeğimiz için serbest zaman veriyoruz. Serbest zamanda hem alışveriş molası veriyoruz, merkezde tamamen organik yapılan keçi peyniri, bal, zeytinyağı ve leziz kurabiyeler alabilirler.

Öğle yemeği sonrasında sessizliğini sadece denizin uslanmaz dalgalarının bozduğu koylarında ve sahillerinde berrak suları ile yorgunluğunuzu atabilmeniz için Aydıncık sahilinde bulunan plajlarda rehberimiz deniz molası veriyor. (Ortalama 3 saat) (Denize gelmeyecek misafirlerimiz şehir merkezinde kalabilir, 3-4 saat sonra tekrar buluşulacaktır.)

Orada bulunan tesislerde şezlong ve şemsiye kiralayıp, denizin tadını çıkartabilirsiniz. (Kiralama için sorumluluk misafirlerimize aittir.)

Rehberimizin belirttiği saatte toplanıp adadan, akşam feribotuyla Gökçeada limanından ayrılıyoruz, Kabatepe'ye geçiyoruz. Siz sayın misafirlerimizi, aldığımız noktalara bırakırken bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda görüşmek üzere vedalaşıyoruz.

NOT: Kabatepe-Gökçeada feribot seferleri değişiklik gösterebilir. Feribot ve gemi seferleri esnasında yaşanan gecikmelerde şirketimiz sorumlu tutulamaz.`,
  image: '/images/gokceada-12.07.jpeg',
  slug: 'gokceada-turu-12-temmuz-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1800,
  destination: 'Kabatepe Limanı, Kaleköy, Zeytinli Köy, Gökçeada, Aydıncık Plajı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-07-12'),
  endDate: new Date('2026-07-12'),
  includedServices: [
    'Lüks araçlar ile konforlu ulaşım ve araç içi ikramlar',
    'Kabatepe-Gökçeada feribot geçişi',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
  ],
  excludedServices: [
    'Kahvaltı ve öğle yemeği',
    'Şezlong ve şemsiye kiralama',
    'Müze ve ören yeri girişleri',
    'Ekstra belirtilen tüm organizasyonlar',
    'Feribot sefer değişikliklerinden kaynaklanan gecikmeler',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Gökçeada – Kaleköy – Zeytinli Köy – Aydıncık Plajı',
      description:
        "Çerkezköy'den hareket. Kabatepe limanından feribotla Gökçeada'ya geçiş. Kaleköy gezisi. Zeytinli Köy ziyareti. Ada merkezi, Kent Müzesi ve kilise. Öğle yemeği (serbest). Aydıncık plajında yaklaşık 3 saat deniz molası. Akşam feribotu ile dönüş.",
    },
  ],
  viewCount: 0,
};

async function addGokceadaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: gokceadaTour.slug });
    await Tour.deleteOne({ slug: 'gokceada-turu' });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, gokceadaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(gokceadaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 12 Temmuz 2026 Pazar');
    console.log('- Fiyat:', gokceadaTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + gokceadaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addGokceadaTour();
