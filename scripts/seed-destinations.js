import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.local' });

// Destination model tanımı
const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  shortDescription: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    region: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  highlights: [{ type: String }],
  nearbyPlaces: [{
    name: { type: String },
    distance: { type: String },
    description: { type: String }
  }],
  transportation: [{
    type: { type: String },
    description: { type: String }
  }],
  seoKeywords: [{ type: String }],
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tourCount: { type: Number, default: 0 }
}, { timestamps: true });

const Destination = mongoose.model('Destination', DestinationSchema);

// Örnek destinasyonlar
const destinations = [
  {
    name: 'Çerkezköy',
    slug: 'cerkezkoy',
    description: 'Tekirdağ\'ın en büyük ilçesi olan Çerkezköy, Trakya Bölgesi\'nin önemli sanayi ve ticaret merkezlerinden biridir. İstanbul\'a 100 km, Tekirdağ\'a 56 km uzaklıkta bulunan ilçe, stratejik konumu sayesinde hızla gelişmektedir. Modern bir şehir olan Çerkezköy, aynı zamanda çevresindeki doğal güzellikler ve tarihi mekanlarla da ziyaretçilerine farklı deneyimler sunmaktadır.',
    image: '/images/destinations/cerkezkoy.jpg',
    shortDescription: 'Trakya\'nın kalbi Çerkezköy ve çevresindeki görülmeye değer yerler',
    location: {
      city: 'Çerkezköy',
      region: 'Tekirdağ',
      coordinates: {
        lat: 41.2856,
        lng: 27.9994
      }
    },
    highlights: [
      'Çerkezköy Kent Ormanı',
      'Gazi Mustafa Kemal Atatürk Parkı',
      'Çerkezköy Belediye Kültür Merkezi',
      'Yerel pazarlar ve alışveriş merkezleri'
    ],
    nearbyPlaces: [
      {
        name: 'Kıyıköy',
        distance: '45 km',
        description: 'Karadeniz\'in sakin köyü, plajları ve deniz ürünleri restoranları ile ünlü.'
      },
      {
        name: 'Vize',
        distance: '35 km',
        description: 'Tarihi kalesi, Küçük Ayasofya\'sı ve doğal güzellikleri ile görülmeye değer.'
      },
      {
        name: 'Saray',
        distance: '25 km',
        description: 'Doğal güzellikleri ve sakin atmosferi ile huzurlu bir ilçe.'
      },
      {
        name: 'Karaevli Barajı',
        distance: '20 km',
        description: 'Piknik alanları ve manzarası ile popüler bir dinlenme noktası.'
      }
    ],
    transportation: [
      {
        type: 'car',
        description: 'İstanbul\'dan TEM Otoyolu üzerinden yaklaşık 1.5 saat, Tekirdağ\'dan D110 karayolu üzerinden 45 dakika sürmektedir.'
      },
      {
        type: 'bus',
        description: 'İstanbul ve Tekirdağ\'dan düzenli otobüs seferleri bulunmaktadır. Çerkezköy Otogarı şehir merkezine yakın konumdadır.'
      },
      {
        type: 'train',
        description: 'Halkalı-Kapıkule tren hattı üzerinde bulunan Çerkezköy Tren İstasyonu\'na İstanbul\'dan düzenli tren seferleri yapılmaktadır.'
      }
    ],
    seoKeywords: ['çerkezköy', 'çerkezköy gezi rehberi', 'çerkezköy gezilecek yerler', 'çerkezköy turları'],
    isActive: true,
    featured: true
  },
  {
    name: 'İstanbul',
    slug: 'istanbul',
    description: 'Asya ve Avrupa kıtalarını birleştiren eşsiz konumuyla dünyada tek olan İstanbul, binlerce yıllık tarihi ve kültürel zenginlikleriyle ziyaretçilerini büyülüyor. Bizans ve Osmanlı İmparatorluklarına başkentlik yapmış bu muhteşem şehir, tarihi yarımadası, boğazı, sarayları, camileri ve modern yaşamıyla her zevke hitap ediyor.',
    image: '/images/destinations/istanbul.jpg',
    shortDescription: 'Tarihi ve kültürel zenginlikleriyle dünyanın en güzel şehri',
    location: {
      city: 'İstanbul',
      region: 'Marmara',
      coordinates: {
        lat: 41.0082,
        lng: 28.9784
      }
    },
    highlights: [
      'Sultanahmet Camii',
      'Ayasofya',
      'Topkapı Sarayı',
      'Galata Kulesi',
      'Kapalıçarşı',
      'Dolmabahçe Sarayı',
      'Boğaz Turu'
    ],
    transportation: [
      {
        type: 'car',
        description: 'Çerkezköy\'den TEM Otoyolu üzerinden yaklaşık 1.5 saat mesafededir.'
      },
      {
        type: 'bus',
        description: 'Çerkezköy\'den İstanbul\'a düzenli otobüs seferleri bulunmaktadır.'
      }
    ],
    seoKeywords: ['istanbul turları', 'istanbul gezi rehberi', 'istanbul gezilecek yerler'],
    isActive: true,
    featured: false
  },
  {
    name: 'Kapadokya',
    slug: 'kapadokya',
    description: 'Milyonlarca yıl önce volkanik patlamalar ve doğal erozyonlarla şekillenen Kapadokya, peri bacaları, yeraltı şehirleri, kaya kiliseleri ve benzersiz doğasıyla dünyanın en özel destinasyonlarından biridir. Balon turları, at safarileri ve tarihi mekanlarıyla unutulmaz bir deneyim sunar.',
    image: '/images/destinations/kapadokya.jpg',
    shortDescription: 'Peri bacaları ve balon turlarıyla ünlü masalsı diyar',
    location: {
      city: 'Nevşehir',
      region: 'İç Anadolu',
      coordinates: {
        lat: 38.6431,
        lng: 34.8289
      }
    },
    highlights: [
      'Göreme Açık Hava Müzesi',
      'Peri Bacaları',
      'Yeraltı Şehirleri',
      'Balon Turu',
      'Uçhisar Kalesi',
      'Paşabağı Vadisi'
    ],
    transportation: [
      {
        type: 'plane',
        description: 'İstanbul\'dan Nevşehir veya Kayseri havalimanlarına direkt uçuşlar bulunmaktadır.'
      },
      {
        type: 'bus',
        description: 'İstanbul ve diğer büyük şehirlerden düzenli otobüs seferleri vardır.'
      }
    ],
    seoKeywords: ['kapadokya turları', 'kapadokya balon turu', 'kapadokya gezi rehberi'],
    isActive: true,
    featured: false
  }
];

async function seedDestinations() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB\'ye bağlandı');
    
    // Mevcut destinasyonları temizle
    await Destination.deleteMany({});
    console.log('Mevcut destinasyonlar temizlendi');
    
    // Yeni destinasyonları ekle
    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`${insertedDestinations.length} destinasyon eklendi`);
    
    console.log('Destinasyon seed işlemi başarıyla tamamlandı!');
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedDestinations(); 