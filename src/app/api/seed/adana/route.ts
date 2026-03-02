import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const adanaTour = {
      name: 'Adana Portakal Çiçeği Festivali Turu',
      description: `ADANA PORTAKAL ÇİÇEĞİ FESTİVALİ TUR PROGRAMI
3 – 5 NİSAN 2026 
2 GÜN 1 GECE KONAKLAMA (MERSİN)

1.GÜN : 3 Nisan 2026 – Cuma 
Akşam saatlerinde firmamızın belirlediği noktalardan sizleri alarak Adana'ya hareket ediyoruz. 

2.GÜN: 4 Nisan 2026 – Cumartesi
Sabahın erken saatlerinde Adana'ya varıyoruz ve kahvaltımızı yapıyoruz. (ekstra) Kahvaltımızın ardından isteyen misafirlerimizle birlikte Seyhan Nehri'nde gondol gezintisi yapıyoruz. (ekstra) Gondol gezintimizin ardından şehir turumuza ilk durağımız olan Atatürk Evi ve Taş Köprü gezilerimizin sonrasında Türkiye'nin İlk Karnavalı olan Adana Portakal Çiçeği Festival Alanı'na ulaşıyoruz. Karnaval alanında öğle yemeğinizin ardından Kortej Yürüyüşünü izlemek üzere sizleri burada serbest bırakıyoruz. Rehberimizin belirttiği yerde ve saatte toplanarak otobüsümüze binerek otelimize yerleşmek üzere Mersin'e yola çıkıyoruz. Kebaplarıyla ünlü bölgemizin yöresel yemeklerini tadarak akşam yemeğimizi alıyoruz (EKSTRA) ve yerleşmek üzere otele geçiyoruz. Konaklama Mersin'de.

3.GÜN: 5 NİSAN 2026 Pazar
Sabah otelimizde alacağımız kahvaltımızın ardından 08.30'da Kız Kalesi'ne hareket ediyoruz. Kızkalesi, Cennet – Cehennem Mağarası, Narlıkuyu gezilerimizin ardından Tarsus'a hareket ediyoruz. Burada alacağımız öğle yemeğimizin (ekstra) sonrasında Nusret Mayın Gemisini görüyoruz. Sonrasında Eshab-ı Kehf'e gidiyoruz. Mağaranın hemen yanında mescidi gördükten sonra serbest zaman veriyoruz. Eshab – ı Kehf gezimizin ardından Kleopatra Kapısı, St. Paul Kuyusu ve Kilisesi göreceğimiz yerler arasında. Tarsus Şelalesinde vereceğimiz çay molamızın sonrasında Çerkezköy'e dönmek üzere yola çıkıyoruz. Bir sonraki Büyük Aytaç Travel organizasyonunda görüşmek üzere vedalaşıyoruz.`,
      image: '/images/adana-portakal-03-04-26.jpeg',
      duration: '2 Gün 1 Gece',
      price: 5859,
      destination: 'Adana',
      departureCity: 'Çerkezköy',
      tourType: 'domestic',
      accommodationType: 'with_accommodation',
      isActive: true,
      isLastMinute: false,
      startDate: new Date('2026-04-03'),
      endDate: new Date('2026-04-05'),
      includedServices: [
        '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
        'Araç içi ikramlar',
        'Program dahilinde Şehir Turları ve Çevre Gezileri',
        'Turizm Bakanlığı\'ndan Kokartlı Profesyonel Rehberler',
        '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
        'Oda - Kahvaltı konseptinde 1 Gece 5 yıldızlı otel konaklaması'
      ],
      excludedServices: [
        'Öğle Yemekleri',
        'Akşam yemeği',
        'Ekstra Belirtilen Tüm Organizasyonlar (Gondol, vb.)',
        'Müze ve Ören Yeri Girişleri'
      ],
      program: [
        {
          day: '1. Gün - Cuma',
          title: 'Çerkezköy - Adana',
          description: 'Akşam saatlerinde firmamızın belirlediği noktalardan alış. Adana\'ya hareket.'
        },
        {
          day: '2. Gün - Cumartesi',
          title: 'Adana Portakal Çiçeği Festivali',
          description: 'Adana\'ya varış. Kahvaltı (ekstra). Seyhan Nehri\'nde gondol gezintisi (ekstra). Atatürk Evi ve Taş Köprü ziyaretleri. Portakal Çiçeği Festivali alanı ve kortej yürüyüşü. Mersin\'e hareket. Akşam yemeği (ekstra). Otele yerleşme.'
        },
        {
          day: '3. Gün - Pazar',
          title: 'Mersin - Tarsus - Dönüş',
          description: 'Kahvaltı. Kız Kalesi ziyareti. Cennet - Cehennem Mağarası. Narlıkuyu. Tarsus ziyareti: Nusret Mayın Gemisi, Eshab-ı Kehf, Kleopatra Kapısı, St. Paul Kilisesi. Tarsus Şelalesi. Çerkezköy\'e dönüş.'
        }
      ],
      viewCount: 0
    };

    const slug = 'adana-portakal-cicegi-festivali-3-5-nisan';
    const existingSlug = 'adana-portakal-cicegi-festivali-turu';
    
    // Önce eski slug ile tur var mı kontrol et
    let tour = await Tour.findOne({ slug: existingSlug });
    
    if (tour) {
      tour = await Tour.findByIdAndUpdate(
        tour._id,
        adanaTour,
        { new: true }
      );
      return NextResponse.json({ success: true, message: 'Tur başarıyla güncellendi', tour }, { status: 200 });
    }
    
    tour = new Tour({
      ...adanaTour,
      slug
    });
    await tour.save();
    return NextResponse.json({ success: true, message: 'Tur başarıyla eklendi', tour }, { status: 201 });
  } catch (error) {
    console.error('Adana Turu Ekleme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const tour = await Tour.findOne({ slug: 'adana-portakal-cicegi-festivali-3-5-nisan' }).lean();
    if (!tour) {
      return NextResponse.json({ error: 'Tur bulunamadı' }, { status: 404 });
    }
    return NextResponse.json(tour, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Tur getirilirken hata' }, { status: 500 });
  }
}
