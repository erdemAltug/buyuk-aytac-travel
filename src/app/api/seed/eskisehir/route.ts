import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour, { TourType, AccommodationType } from '@/models/Tour';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const eskisehirTour = {
      name: 'Eskişehir Turu - Odunpazarı, Kurşunlu Külliyesi ve Sazova Parkı',
      description: `Çerkezköy, İstanbul, Adapazarı ve Bozüyük üzerinden UNESCO tarafından 2013 yılında Türk Dünyasının Kültür Başkenti unvanı almış olan Eskişehir'e ulaşıyoruz. Frigyalılar döneminde çok önemli bir yeri olan ve Anadolu'da ilklerin kenti olarak adlandırılan Eskişehir'de unutulmaz bir tur deneyimi sizi bekliyor.

Gezi Rotamız:
• Odunpazarı - 19. YY Osmanlı ahşap mimarisinin en güzel örnekleri
• Atlıhan Kapalı Çarşısı - Lületaşı ustalarının elinden nasıl şekillendiğini görme şansı
• Kurşunlu Külliyesi - 1525 yılında yaptırılan cami, medrese, kervansaray
• Porsuk Çayı - Şehrin içinden geçen güzel çay
• Yılmaz Büyükerşen Balmumu Heykeller Müzesi
• Devrim Arabaları Müzesi - İlk Türk yapımı otomobil
• Sazova Bilim Sanat ve Kültür Parkı`,
      image: '/images/eskisehir-21-26.jpeg',
      duration: '1 Gün (Günübirlik)',
      price: 1500,
      destination: 'Eskişehir',
      departureCity: 'Çerkezköy',
      tourType: TourType.DOMESTIC,
      accommodationType: AccommodationType.DAILY,
      isActive: true,
      isLastMinute: false,
      startDate: new Date('2026-03-21'),
      endDate: new Date('2026-03-21'),
      isFeatured: true,
      includedServices: [
        'Otobüs ile ulaşım',
        'Profesyonel rehberlik hizmeti',
        'Öğle yemeği (Yöresel Eskişehir lezzetleri)',
        'Tüm müze giriş ücretleri',
        'Acentemiz sigortası'
      ],
      excludedServices: [
        'Kişisel harcamalar',
        'Ek içecekler'
      ],
      program: [
        {
          day: '1. Gün',
          title: 'Eskişehir Turu',
          description: 'Çerkezköy\'den hareket. İstanbul, Adapazarı, Bozüyük üzerinden Eskişehir\'e varış. Odunpazarı ve Atlıhan Çarşısı ziyareti. Öğle yemeği. Kurşunlu Külliyesi, Balmumu Heykeller Müzesi, Devrim Arabaları Müzesi, Sazova Parkı ziyaretleri. Dönüş.'
        }
      ],
      viewCount: 0
    };

    // Slug oluştur
    const slug = eskisehirTour.name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    // Aynı slug ile tur var mı kontrol et
    const existingTour = await Tour.findOne({ slug });
    
    if (existingTour) {
      // Güncelle
      Object.assign(existingTour, eskisehirTour, { slug });
      await existingTour.save();
      
      return NextResponse.json({
        success: true,
        message: 'Tur başarıyla güncellendi',
        tour: existingTour
      }, { status: 200 });
    } else {
      // Yeni oluştur
      const newTour = new Tour({
        ...eskisehirTour,
        slug
      });
      await newTour.save();
      
      return NextResponse.json({
        success: true,
        message: 'Eskişehir turu başarıyla eklendi',
        tour: newTour,
        url: `/tours/${slug}`
      }, { status: 201 });
    }

  } catch (error) {
    console.error('Eskişehir Tour Seed Error:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu', details: error },
      { status: 500 }
    );
  }
}
