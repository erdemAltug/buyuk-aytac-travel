/* global use, db */
// MongoDB Playground - Örnek veri oluşturma
// Bu playground dosyası buyuk-aytac-travel projesine örnek veriler ekler

// Kullanılacak veritabanı
use('buyuk-aytac-travel');

// Mevcut koleksiyonları temizleyelim (varsa)
db.destinations.drop();
db.tours.drop();

// Destinasyonlar ekleyelim
db.destinations.insertMany([
  { 
    name: 'İstanbul', 
    slug: 'istanbul',
    description: 'Doğu ve Batının buluştuğu büyülü şehir. Ayasofya, Sultanahmet Camii ve canlı Kapalıçarşıyı keşfedin.',
    image: '/destinations/istanbul.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    name: 'Kapadokya', 
    slug: 'kapadokya',
    description: 'Dünyada eşi benzeri olmayan peri bacalarını, vadileri ve ünlü sıcak hava balonu deneyimlerini keşfedin.',
    image: '/destinations/kapadokya.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    name: 'Antalya', 
    slug: 'antalya',
    description: 'Muhteşem plajlarda dinlenin, antik kalıntıları keşfedin ve tarihin deniz tatiliyle mükemmel uyumunu yaşayın.',
    image: '/destinations/antalya.jpg',
    isActive: true, 
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    name: 'Pamukkale', 
    slug: 'pamukkale',
    description: 'Göz alıcı beyaz travertenleri ve antik Hierapolis kalıntılarıyla "Pamuk Kalesini" ziyaret edin.',
    image: '/destinations/pamukkale.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Eklenen destinasyonların ID'lerini alalım
const istanbul = db.destinations.findOne({ slug: 'istanbul' });
const kapadokya = db.destinations.findOne({ slug: 'kapadokya' });
const antalya = db.destinations.findOne({ slug: 'antalya' });
const pamukkale = db.destinations.findOne({ slug: 'pamukkale' });

console.log('Destinasyonlar eklendi:', istanbul._id, kapadokya._id, antalya._id, pamukkale._id);

// Turlar ekleyelim
db.tours.insertMany([
  { 
    name: 'İstanbul Klasik Turu',
    slug: 'istanbul-klasik-turu',
    description: 'İstanbul\'un en önemli tarihi yerlerini keşfedin. Ayasofya, Topkapı Sarayı ve Kapalıçarşı dahil.',
    image: '/tours/istanbul-klasik.jpg',
    duration: 2,
    price: 2500,
    destinationId: istanbul._id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Kapadokya Balon Turu', 
    slug: 'kapadokya-balon-turu',
    description: 'Nefes kesici manzaralar için sıcak hava balonu dahil tam Kapadokya deneyimi.',
    image: '/tours/kapadokya-balon.jpg',
    duration: 3,
    price: 4200,
    destinationId: kapadokya._id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ege Sahilleri Turu', 
    slug: 'ege-sahilleri-turu',
    description: 'Türkiye\'nin muhteşem Ege kıyısı boyunca antik kentler ve masmavi koylarda unutulmaz bir tatil.',
    image: '/tours/ege-sahilleri.jpg',
    duration: 5,
    price: 5800,
    destinationId: antalya._id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Güneydoğu Lezzetleri', 
    slug: 'guneydogu-lezzetleri',
    description: 'Gaziantep, Şanlıurfa ve Mardin\'de Türkiye\'nin en zengin mutfak kültürünü ve tarihi dokusunu keşfedin.',
    image: '/tours/guneydogu-lezzetleri.jpg',
    duration: 4,
    price: 3900,
    destinationId: istanbul._id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Pamukkale & Hierapolis Turu', 
    slug: 'pamukkale-hierapolis-turu',
    description: 'Beyaz cennet Pamukkale travertenlerini keşfedin ve antik Hierapolis kentinin kalıntılarını ziyaret edin.',
    image: '/tours/pamukkale-hierapolis.jpg',
    duration: 2,
    price: 1800,
    destinationId: pamukkale._id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

console.log(`${db.tours.count()} tur başarıyla eklendi.`);

// Eklenen verileri kontrol edelim
const destinationCount = db.destinations.count();
const tourCount = db.tours.count();

console.log(`Toplam ${destinationCount} destinasyon ve ${tourCount} tur veritabanına eklendi.`); 