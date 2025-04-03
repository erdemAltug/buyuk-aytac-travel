import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import Tour from '@/models/Tour';
import { TourType, AccommodationType } from '@/models/Tour';

// Bu API route'u sadece geliştirme aşamasında örnek veriler eklemek için kullanılacak
export async function GET() {
  try {
    await dbConnect();

    // İlk olarak mevcut tüm verileri temizleyelim
    await Destination.deleteMany({});
    await Tour.deleteMany({});

    // Örnek destinasyonlar ekleyelim
    const destinations = await Destination.insertMany([
      {
        name: 'Adana',
        slug: 'adana',
        description: 'Türkiye\'nin güneyinde bulunan Adana, zengin mutfağı, tarihi yapıları ve kültürel etkinlikleriyle öne çıkan bir şehirdir. Özellikle Portakal Çiçeği Festivali gibi önemli etkinliklere ev sahipliği yapmaktadır.',
        image: '/destinations/adana.jpg',
        isActive: true,
      },
    ]);

    const adana = destinations.find(d => d.slug === 'adana');

    const tours = await Tour.insertMany([
      {
        name: 'Adana Portakal Çiçeği Festivali Turu',
        slug: 'adana-portakal-cicegi-festivali-turu',
        description: `ADANA PORTAKAL ÇİÇEĞİ FESTİVALİ TURU 04-06 NİSAN 2025

1.GÜN : 04 Nisan 2025 – Cuma
Akşam saatlerinde firmamızın belirlediği noktalardan sizleri alarak Adana'ya hareket ediyoruz. 

2.GÜN: 05 Nisan 2025 - Cumartesi 
Sabahın erken saatlerinde Adana'ya varıyoruz ve kahvaltımızı yapıyoruz. (ekstra) Kahvaltımızın ardından isteyen misafirlerimizle birlikte Seyhan Nehri'nde gondol gezintisi yapıyoruz. (ekstra) Gondol gezintimizin ardından şehir turumuza ilk durağımız olan Atatük Evi ve Taş Köprü gezilerimizin sonrasında Türkiye'nin İlk Karnavalı olan Adana Portakal Çiçeği Festival Alanı'na ulaşıyoruz. Karnaval alanında öğle yemeğinizin ardından Kortej Yürüyüşünü izlemek üzere sizleri burada serbest bırakıyoruz. Rehberimizin belirttiği yerde ve saatte toplanarak otobüsümüze binerek otelimize yerleşmek üzere Mersin'e yola çıkıyoruz. Kebaplarıyla ünlü bölgemizin yöresel yemeklerini tadarak akşam yemeğimizi alıyoruz ve yerleşmek üzere otele geçiyoruz. Konaklama Mersin'de.

3.GÜN : 06 Nisan 2025 - Pazar 
Sabah otelimizde alacağımız kahvaltımızın ardından 08.30'da Kız Kalesi'ne hareket ediyoruz. Kızkalesi, Cennet – Cehennem Mağarası, Narlıkuyu gezilerimizin ardından Tarsus'a hareket ediyoruz. Burada alacağımız öğle yemeğimizin (ekstra) sonrasında Nusret Mayın Gemisini görüyoruz. Sonrasında Eshab-ı Kehf'e gidiyoruz. Mağaranın hemen yanında mescidi gördükten sonra serbest zaman veriyoruz. Eshab – ı Kehf gezimizin ardından Kleopatra Kapısı, St. Paul Kuyusu ve Kilisesi göreceğimiz yerler arasında. Tarsus Şelalesinde vereceğimiz çay molamızın sonrasında Çerkezköy'e dönmek üzere yola çıkıyoruz. Bir sonraki Büyük Aytaç Travel organizasyonunda görüşmek üzere vedalaşıyoruz.

Adres: Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ
Telefon: 0530 060 95 59 & 0539 345 95 59`,
        image: '/images/adana-cicek-festivali.jpeg',
        duration: '3 Gün 2 Gece',
        price: 5000,
        destinationId: adana?._id,
        tourType: TourType.DOMESTIC,
        accommodationType: AccommodationType.WITH_ACCOMMODATION,
        startDate: new Date('2025-04-04'),
        endDate: new Date('2025-04-06'),
        isActive: true,
      }
    ]);

    return NextResponse.json({
      message: 'Örnek veriler başarıyla eklendi',
      destinationsCount: destinations.length,
      toursCount: tours.length
    }, { status: 200 });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Örnek veriler eklenirken bir hata oluştu' }, { status: 500 });
  }
} 