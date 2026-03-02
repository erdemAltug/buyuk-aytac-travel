import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const kapadokyaTour = {
      name: 'Kapadokya Turu - 3 Gün',
      description: `Siz değerli misafirlerimizi firmamızın belirlediği noktalardan alarak yola çıkıyoruz. Cumartesi sabah erken saatlerde alacağımız kahvaltının ardından (ekstra) Kapadokya'nın mistik atmosferine adım atmak üzere Göreme Açık Hava Müzesi'ne gidiyoruz. Burada binlerce yıllık tarihi ve benzersiz kaya kiliselerini keşfederek bölgenin büyüleyici geçmişine tanıklık edeceksiniz.

Daha sonra adrenalini yüksek bir macera için dileyen misafirlerimizle ATV'lere binip, Kapadokya'nın eşsiz doğasında unutulmaz bir gezintiye çıkabilir veya Kapadokya'nın ismini aldığı güzel atlarıyla huzurlu bir vadi gezisi yapabilirsiniz. (ekstra)

Sonrasında Kızılırmak üzerine kurulmuş sallanan köprüden yürüyüş yaparak Avanos'ta çömlek atölyelerinde ustaların elinden çıkan geleneksel çömlekleri inceleyerek bölgenin zanaatkarlık geleneğini yakından görüyoruz. Bölgenin eşsiz Onyx taşlarını inceleyip alışveriş yapma fırsatı bulacağımız Onyx atölyesi olacak.

Sonrasında büyüleyici kaya oluşumlarının yer aldığı Hayal Vadisi'nde keyifli bir yürüyüş yapıyoruz ve eşsiz doğanın büyüsüne kapılıyoruz. Hayal vadisinden sonra Ürgüp'e doğru yol alırken, panoramik olarak bölgenin sembolü Üç Güzelleri görüyor ve bölgenin ünlü şarap mahzenlerini ziyaret etme fırsatı yakalıyoruz. Burada Kapadokya'ya özgü üzümlerden yapılan şaraplar hakkında bilgi alma, şarap alışverişi yapma şansı yakalıyoruz.

Ardından, Kapadokya'nın doğasıyla bütünleşmiş Güvercinlik Vadisinde eşsiz fotoğraflar çekme fırsatı yakalıyoruz. Günün sonunda, Ortahisar kalesinin görkemli manzarasını süsleyen eşsiz eski Kapadokya evleri eşliğinde kahve molası vererek, otelimize doğru harekete geçiyoruz. Akşam yemeği ve konaklama otelimizde. (Dileyen misafirlerimiz ekstra olarak düzenlenecek Türk Gecesine katılabilir.)

Pazar günü otelde alınan kahvaltının ardından bölgenin hava şartlarına göre balon kalkışını seyretmek için gün doğumunda vadiye iniyoruz. Daha sonra otelde alınacak kahvaltı sonrası Uçhisar'da bulunan eski yerleşim alanını ziyaret ederek, Derinkuyu Yeraltı Şehri'ni keşfetmek için derinlere iniyoruz, tarihin gizemli koridorlarında zaman yolculuğu yapıyoruz.

Burada vereceğimiz vaktin ardından volkanik bir oluşum olan Narlıgöl'ün etkileyici manzarası eşliğinde mola veriyoruz. Ardından Ihlara Vadisi'nde bulunan Cam Teras'tan muhteşem bir manzara eşliğinde dinlenme molası veriyoruz. Sonrasında 13.yy'da tek bir kayadan oyularak yapılmış olan döneminin en büyük eğitim merkezi olan Selime Katedrali'ni ziyaret ediyoruz, bu benzersiz kaya kilisesinin içindeki tarihi freskleri ve mimari detayları keşfetme fırsatı buluyoruz. Programımızın bitişiyle birlikte geri dönüş yolumuza devam ediyor, bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda görüşmek dileğiyle vedalaşıyoruz.

***Ören yerleri girişi için Müzekart gerekmektedir. Play Store-App Store üzerinden müzekart uygulamasını indirerek satın alım yapabilir, girişlerde kullanabilirsiniz.***`,
      image: '/images/kapadokya-20-26.jpeg',
      duration: '2 Gün 1 Gece',
      price: 4900,
      destination: 'Kapadokya',
      departureCity: 'Çerkezköy',
      tourType: 'domestic',
      accommodationType: 'with_accommodation',
      isActive: true,
      isLastMinute: false,
      startDate: new Date('2026-03-20'),
      endDate: new Date('2026-03-22'),
      includedServices: [
        '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
        'Araç içi ikramlar',
        'Program dahilinde Şehir Turları ve Çevre Gezileri',
        'Turizm Bakanlığı\'ndan Kokartlı Profesyonel Rehberler',
        '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
        'Cumartesi akşam yemeği',
        'Pazar sabah kahvaltısı',
        '1 Gece otel konaklaması'
      ],
      excludedServices: [
        'Cumartesi sabah kahvaltısı (ekstra)',
        'Öğle Yemekleri',
        'Pazar Akşam yemeği',
        'Ekstra Belirtilen Tüm Organizasyonlar (ATV, Balon, Türk Gecesi vb.)',
        'Müze ve Ören Yeri Girişleri (Müzekart gerekli)'
      ],
      program: [
        {
          day: '1. Gün - Cuma',
          title: 'Kapadokya Yolculuğu',
          description: 'Çerkezköy\'den gece hareket. Kapadokya\'ya varış ve otele yerleşme.'
        },
        {
          day: '2. Gün - Cumartesi',
          title: 'Kapadokya Keşfi',
          description: 'Sabah kahvaltı (ekstra). Göreme Açık Hava Müzesi ziyareti. ATV turu veya at safari (ekstra). Avanos\'ta çömlek atölyesi ziyareti. Onyx atölyesi. Hayal Vadisi yürüyüşü. Üç Güzeller panoramik manzara. Şarap mahzeni ziyareti. Güvercinlik Vadisi. Ortahisar kalesi. Akşam yemeği ve konaklama. Türk Gecesi (ekstra).'
        },
        {
          day: '3. Gün - Pazar',
          title: 'Kapadokya ve Dönüş',
          description: 'Balon kalkışını seyretme (ekstra). Kahvaltı. Uçhisar ziyareti. Derinkuyu Yeraltı Şehri. Narlıgöl mola. Ihlara Vadisi - Cam Teras. Selime Katedrali. Çerkezköy\'e dönüş.'
        }
      ],
      viewCount: 0
    };

    // Slug oluştur
    const slug = 'kapadokya-turu-3-gun-20-22-mart';
    const existingSlug = 'kapadokya-turu-3-gun';
    
    // Önce eski slug ile tur var mı kontrol et
    let tour = await Tour.findOne({ slug: existingSlug });
    
    if (tour) {
      // Güncelle
      tour = await Tour.findByIdAndUpdate(
        tour._id,
        kapadokyaTour,
        { new: true }
      );
      return NextResponse.json({ success: true, message: 'Tur başarıyla güncellendi', tour }, { status: 200 });
    } else {
      // Yeni oluştur
      tour = new Tour({
        ...kapadokyaTour,
        slug: slug
      });
      await tour.save();
      return NextResponse.json({ success: true, message: 'Tur başarıyla eklendi', tour }, { status: 201 });
    }
  } catch (error) {
    console.error('Kapadokya Turu Ekleme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug: 'kapadokya-turu-3-gun-20-22-mart' }).lean();
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour, { status: 200 });
  } catch (error) {
    console.error('Kapadokya Turu Getirme Hatası:', error);
    return NextResponse.json(
      { error: 'Tur getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
