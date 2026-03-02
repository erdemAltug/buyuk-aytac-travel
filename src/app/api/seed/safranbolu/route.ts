import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const safranboluTour = {
      name: 'Safranbolu Turu - Amasra & Bartın',
      description: `1. Gün - ÇERKEZKÖY - SAFRANBOLU
Cuma gece yarısı 00:00'de Çerkezköy'den hareketle İstanbul üzeri Safranbolu'ya doğru yola çıkıyoruz. Sabah saatlerinde yol üzeri tesislerde serbest olarak alacağımız kahvaltının ardından (ekstra) UNESCO tarafından koruma listesine alınan eski bir Bektaşi Köyü olan Yörük Köyü'ne doğru yola çıkıyoruz. Kasım Sipahioğlu Konağını ziyaret ettikten ve alışveriş için vereceğimiz serbest zamanın ardından tarihi ve geleneksel Osmanlı Konaklarını panoramik olarak seyredip fotoğraflayacağımız Hıdırlık Tepesi'ne doğru hareket ediyoruz.

Safranbolu'da Kaymakamlar Gezievi'ni ziyaret ediyoruz. (Dileyen misafirlerimiz konakla bölgeye özgü çay ve kahve sunumunu unutabilir). Gezigüzergahında bulunan İzzet Paşa Cami, Demirciler Bakırcılar Çarşısı, Akçasu Kanyonu, Arasta Çarşısı, Köprülü Mehmet Paşa Külliyesi ve Güneş saatini geziyoruz. Kazdağlıoğlu Meydanı'nda tarihi kentin meşhur lokum imalatı hakkında bilgi alıyoruz ve kararlaştırdığımız yer saatte toplanacak şekilde öğle yemeği için serbest zaman veriyor, yada toplu yemek yiyeceğimiz lokantamıza geçiyoruz. (EKSTRA)

Öğle yemeğimiz sonrası Dünya'da iki örneği bulunan bir tanesi Arizona'daki Tokatlı Kanyonu'ndan sonra muhteşem manzaralı Cam Teras'a geçiyoruz. Cam Teras'ta vereceğimiz serbest zamanın ardından otelimize yerleşiyoruz. Akşam yemeği otelimizde.

ZALİFRE OTEL - SAFRANBOLU

2. Gün - AMASRA – BARTIN
Sabah otelimizde alacağımız Kahvaltının ardından Karadeniz'in eşsiz güzelliklerine sahip Fatih Sultan Mehmet tarafından "Çeşm-i Cihan bura mı ola" (Dünya'nın Gözü) diye adlandırılan Amasra'ya doğru yola çıkıyoruz. Küçük bir adayı bağlayan Kemere Köprüsü, Çekiciler Çarşısını görüp Öğlen Yemeğimizi alacağımız restoran'a geçiyoruz. (EKSTRA)

Öğle Yemeğimiz olmasının ardından Osmanlılar döneminde Bahriye-i Hümayun sonrasında Mızıka Okulu olarak da kullanılan Amasra Müzesi gezisinin ardından kentten ayrılıyor ve Çerkezköy'e doğru yola çıkıyoruz. Yolculuğumuzun ardından, siz değerli misafirlerimiz aldığımız noktalara bırakarak bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.`,
      image: '/images/safranbolu-10-04-26.jpeg',
      duration: '2 Gün 1 Gece',
      price: 4900,
      destination: 'Safranbolu',
      departureCity: 'Çerkezköy',
      tourType: 'domestic',
      accommodationType: 'with_accommodation',
      isActive: true,
      isLastMinute: false,
      startDate: new Date('2026-04-10'),
      endDate: new Date('2026-04-12'),
      includedServices: [
        '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
        'Araç içi ikramlar',
        'Program dahilinde Şehir Turları ve Çevre Gezileri',
        'Turizm Bakanlığı\'ndan Kokartlı Profesyonel Rehberler',
        '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
        'Yarım pansiyon konseptinde 1 Gece 4 yıldızlı otel konaklaması',
        'Akşam yemeği ve sabah kahvaltısı'
      ],
      excludedServices: [
        'Öğle Yemekleri',
        'Ekstra Belirtilen Tüm Organizasyonlar',
        'Müze ve Ören Yeri Girişleri'
      ],
      program: [
        {
          day: '1. Gün - Cuma',
          title: 'Çerkezköy - Safranbolu',
          description: 'Cuma gece 00:00\'de Çerkezköy\'den hareket. İstanbul üzeri Safranbolu\'ya varış. Yol üzeri kahvaltı (ekstra). Yörük Köyü ziyareti. Kasım Sipahioğlu Konağı. Hıdırlık Tepesi. Kaymakamlar Gezievi. İzzet Paşa Cami, Demirciler Çarşısı, Akçasu Kanyonu. Cam Teras. Otele yerleşme ve akşam yemeği.'
        },
        {
          day: '2. Gün - Cumartesi',
          title: 'Amasra - Bartın - Dönüş',
          description: 'Otelde kahvaltı. Amasra\'ya hareket. Kemere Köprüsü. Çekiciler Çarşısı. Öğle yemeği (ekstra). Amasra Müzesi. Çerkezköy\'e dönüş.'
        }
      ],
      viewCount: 0
    };

    // Slug oluştur
    const slug = 'safranbolu-turu-amasra-bartin-10-12-nisan';
    const existingSlug = 'safranbolu-turu-10-12-ekim-2025';
    
    // Önce eski slug ile tur var mı kontrol et
    let tour = await Tour.findOne({ slug: existingSlug });
    
    if (tour) {
      // Güncelle
      tour = await Tour.findByIdAndUpdate(
        tour._id,
        safranboluTour,
        { new: true }
      );
      return NextResponse.json({ success: true, message: 'Tur başarıyla güncellendi', tour }, { status: 200 });
    } else {
      // Yeni slug ile kontrol et
      tour = await Tour.findOne({ slug });
      if (tour) {
        tour = await Tour.findByIdAndUpdate(
          tour._id,
          safranboluTour,
          { new: true }
        );
        return NextResponse.json({ success: true, message: 'Tur başarıyla güncellendi', tour }, { status: 200 });
      }
      
      // Yeni oluştur
      tour = new Tour({
        ...safranboluTour,
        slug
      });
      await tour.save();
      return NextResponse.json({ success: true, message: 'Tur başarıyla eklendi', tour }, { status: 201 });
    }
  } catch (error) {
    console.error('Safranbolu Turu Ekleme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug: 'safranbolu-turu-amasra-bartin-10-12-nisan' }).lean();
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour, { status: 200 });
  } catch (error) {
    console.error('Safranbolu Turu Getirme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
