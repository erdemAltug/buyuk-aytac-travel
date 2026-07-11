/**
 * Geçmiş turları öne çıkandan kaldırır; yaklaşan aktif turları öne çıkarır.
 * Kullanım: npx tsx scripts/sync-featured-tours.ts
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Tour from '../src/models/Tour';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI bulunamadı');
  process.exit(1);
}

function isUpcoming(tour: { startDate?: Date; endDate?: Date }) {
  const now = new Date();
  if (tour.endDate && tour.endDate >= now) return true;
  if (tour.startDate && tour.startDate >= now) return true;
  return false;
}

async function sync() {
  await mongoose.connect(MONGODB_URI as string);
  const now = new Date();

  const allActive = await Tour.find({ isActive: true });
  let unfeatured = 0;
  let featured = 0;

  for (const tour of allActive) {
    const upcoming = isUpcoming(tour);
    if (!upcoming) {
      if (tour.isFeatured) {
        tour.isFeatured = false;
        await tour.save();
        unfeatured++;
        console.log('⬇️ Öne çıkandan kaldırıldı (tarihi geçmiş):', tour.name);
      }
    }
  }

  // 2026 Haziran-Temmuz yeni programlar — öne çıkan olarak işaretle
  const featuredSlugs = [
    'isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026',
    'omercili-sakli-gol-agva-deniz-feneri-goksu-nehri-tekne-turu-sile',
    'safranbolu-turu-13-14-haziran-2026',
    'bursa-misi-koyu-golyazi-mudanya-turu-13-haziran-2026',
    'sakli-istanbul-turu',
    'kapadokya-turu-19-21-haziran-2026',
    'assos-turu',
    'lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026',
    'gokceada-turu-12-temmuz-2026',
    'canakkale-kaz-daglari-turu-15-temmuz-2026',
    'ayvalik-cunda-turu-28-haziran-2026',
    'ayvalik-cunda-turu-11-temmuz-2026',
    'ayvalik-cunda-turu-19-temmuz-2026',
    'ayvalik-cunda-turu-25-temmuz-2026',
    'ayvalik-cunda-turu-1-agustos-2026',
    'ayvalik-cunda-turu-16-agustos-2026',
    'ayvalik-cunda-turu-30-agustos-2026',
    'bozcaada-turu-26-temmuz-2026',
  ];

  const uniqueSlugs = [...new Set(featuredSlugs)];

  for (const slug of uniqueSlugs) {
    const tour = await Tour.findOne({ slug });
    if (tour && isUpcoming(tour)) {
      if (!tour.isFeatured) {
        tour.isFeatured = true;
        await tour.save();
        featured++;
        console.log('⭐ Öne çıkan yapıldı:', tour.name);
      }
    }
  }

  const upcomingFeatured = await Tour.find({ isActive: true, isFeatured: true }).sort({ startDate: 1 });

  console.log('\n📊 Özet:');
  console.log('- Geçmişten kaldırılan:', unfeatured);
  console.log('- Yeni öne çıkan işaretlenen:', featured);
  console.log('\n✅ Güncel öne çıkan turlar (gelecek):');
  upcomingFeatured.filter(isUpcoming).forEach((t) => {
    const d = t.startDate ? t.startDate.toLocaleDateString('tr-TR') : '—';
    console.log(`  · ${t.name} (${d})`);
  });

  await mongoose.disconnect();
  process.exit(0);
}

sync().catch((e) => {
  console.error(e);
  process.exit(1);
});
