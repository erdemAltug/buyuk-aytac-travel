import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour, { TourType, AccommodationType } from '@/models/Tour';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const bursatura = {
      name: 'Bursa Şehir Turu',
      description: `Belirlenen buluşma noktalarından siz değerli misafirlerimizi alarak Bursa'nın UNESCO Dünya Mirası Listesi'nde yer alan, tarihi dokusunu koruyan en güzel köylerinden biri olan Cumalıkızık'a ulaşıyoruz. Taş döşeli dar sokakları, cumbalı Osmanlı evleri zamanda yolculuk hissi yaşayacağınız bu köyde keyifli bir sabah bizi bekliyor. Geleneksel köy evlerinden birinde, organik ürünlerle hazırlanan serpme köy kahvaltımızı yapıyoruz (kahvaltı programa dâhildir). Ardından köy meydanında kısa bir serbest zaman sunuluyor. Bu sürede köyün el yapımı ürünlerinden alışveriş yapabilir, yöresel lezzetleri tadabilirsiniz.

Bursa'nın tarihi kimliğine ışık tutan en etkileyici yapılardan biri olan Panorama 1326 Bursa Fetih Müzesi'ni ziyaret ediyoruz. Osmanlı Devleti'nin kuruluş dönemine ve Bursa'nın fethine dair görsel bir şölen sunan müze gezimiz sırasında hem Osmanlı'nın ilk başkentinin tarihine tanıklık ediyor hem de etkileyici atmosferde serbest zaman geçiriyoruz.

Bursa'nın en önemli manevi duraklarından biri olan Emir Sultan Camii'ni ziyaret ediyoruz. Ziyaretçilerine huzur veren bu camii, sadece mimarisiyle değil, çevresini saran huzurlu bahçesi ve manevi atmosferiyle de dikkat çeker. Türbesiyle birlikte bir bütün oluşturan bu kutsal mekân, özellikle duaların edildiği, sakinliğiyle gönüllere dokunan özel bir duraktır.
Osmanlı erken dönem mimarisinin en zarif örneklerinden olan Yeşil Türbe ve hemen yanı başındaki Yeşil Camii, Bursa'nın simge yapıları arasında yer alır. Çini süslemeleri, taş işçiliği ve mimari detaylarıyla göz kamaştıran bu tarihi yapılar, ziyaretçilere adeta sanat ve tarih dersi verir. Rehber eşliğinde yapılacak gezimizde, yapıların tarihi, mimarisi ve içerdikleri sembollere dair detaylı bilgiler ediniyoruz. 
Bursa'nın en yüksek noktalarından biri olan Tophane, hem tarihi yapılarıyla hem de panoramik şehir manzarasıyla ziyaretçilerine unutulmaz anlar sunar. Burada, Osmanlı Devleti'nin kurucusu Osman Gazi ve onun oğlu Orhan Gazi'nin türbelerini ziyaret ediyoruz. Türbelerin ardından Bursa Saat Kulesi çevresinde vereceğimiz kısa molada; isteyen misafirlerimiz tarihi atmosfer eşliğinde kahvelerini yudumlarken, isteyenler muhteşem Bursa manzarasında bol bol fotoğraf çekebilir.
Bursa'nın kalbinde yer alan, Osmanlı'nın en büyük camilerinden biri olan Ulu Camii'ni rehber eşliğinde ziyaret ediyoruz. 20 kubbesi, etkileyici hat sanatı örnekleri ve tarihi atmosferiyle Ulu Camii, hem mimari hem de dini açıdan önemli bir eserdir. Cami ziyaretimizin ardından Kapalı Çarşı ve Koza Han çevresinde serbest zaman veriyoruz. Bu bölgede yöresel ürünlerden el işi tekstillere, ipek ürünlerinden hediyelik eşyalara kadar birçok seçenek arasında alışveriş yapabilir; tarihi hanların gölgesinde keyifli bir kahve molası verebilirsiniz.

Programımızı tamamladıktan sonra Çerkezköy'e doğru yola çıkıyoruz. Siz değerli misafirlerimiz aldığımız duraklara bırakarak başka bir Büyük Aytaç Travel organizasyonunda görüşmek üzere vedalaşıyoruz.`,
      image: '/images/bursa-22-26.jpeg',
      duration: '1 Gün (Günübirlik)',
      price: 1800,
      destination: 'Bursa',
      departureCity: 'Çerkezköy',
      tourType: TourType.DOMESTIC,
      accommodationType: AccommodationType.DAILY,
      isActive: true,
      isLastMinute: false,
      startDate: new Date('2026-03-22'),
      endDate: new Date('2026-03-22'),
      includedServices: [
        'Otobüs ile ulaşım',
        'Profesyonel rehberlik hizmeti',
        'Kahvaltı (köy kahvaltısı programa dahil)',
        'Tüm müze giriş ücretleri',
        'Panorama 1326 Bursa Fetih Müzesi girişi',
        'Acentemiz sigortası'
      ],
      excludedServices: [
        'Öğle yemeği',
        'Kişisel harcamalar',
        'Alışveriş harcamaları'
      ],
      program: [
        {
          day: '1. Gün',
          title: 'Bursa Şehir Turu',
          description: 'Çerkezköy\'den hareket. Cumalıkızık Köyü ziyareti ve köy kahvaltısı. Panorama 1326 Bursa Fetih Müzesi. Emir Sultan Camii ziyareti. Yeşil Türbe ve Yeşil Camii. Tophane ve Osman Gazi-Orhan Gazi türbeleri. Bursa Saat Kulesi. Ulu Camii ziyareti. Kapalı Çarşı ve Koza Han serbest zaman. Çerkezköy\'e dönüş.'
        }
      ],
      viewCount: 0
    };

    // Slug oluştur
    const slug = 'bursa-sehir-turu';
    
    // Aynı slug ile tur var mı kontrol et
    let tour = await Tour.findOne({ slug });
    
    if (tour) {
      // Güncelle
      tour = await Tour.findByIdAndUpdate(
        tour._id,
        bursatura,
        { new: true }
      );
      return NextResponse.json({ success: true, message: 'Tur başarıyla güncellendi', tour }, { status: 200 });
    } else {
      // Yeni oluştur
      tour = new Tour({
        ...bursatura,
        slug
      });
      await tour.save();
      return NextResponse.json({ success: true, message: 'Tur başarıyla eklendi', tour }, { status: 201 });
    }
  } catch (error) {
    console.error('Bursa Turu Ekleme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug: 'bursa-sehir-turu' }).lean();
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour, { status: 200 });
  } catch (error) {
    console.error('Bursa Turu Getirme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
