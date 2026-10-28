/**
 * Tur ekleme / güncelleme (tek script)
 *
 * Tur verileri scripts/tours/ klasöründe durur; her dosya bir tur dizisi export eder.
 * Aynı slug varsa tur güncellenir, yoksa eklenir.
 *
 * Kullanım:
 *   npm run add:tours -- iznik-tour              → sadece scripts/tours/iznik-tour.ts
 *   npm run add:tours -- iznik-tour assos-tour   → birden fazla dosya
 *   npm run add:tours -- --all                   → klasördeki tüm dosyalar
 *
 * Yeni tur eklemek için: scripts/tours/ içindeki bir dosyayı kopyalayıp düzenleyin.
 */

import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import mongoose from 'mongoose';
import Tour from '../src/models/Tour';

dotenv.config({ path: '.env.local' });

const TOURS_DIR = path.join(process.cwd(), 'scripts', 'tours');

type TourData = { slug: string; name: string } & Record<string, unknown>;

async function loadFile(name: string): Promise<TourData[]> {
  const file = path.join(TOURS_DIR, name.endsWith('.ts') ? name : `${name}.ts`);
  if (!fs.existsSync(file)) {
    throw new Error(`Bulunamadı: ${path.relative(process.cwd(), file)}`);
  }
  const mod = await import(pathToFileURL(file).href);
  const data = mod.default;
  return Array.isArray(data) ? data : [data];
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Kullanım: npm run add:tours -- <dosya-adı> [...] | --all');
    console.log('\nMevcut dosyalar:');
    fs.readdirSync(TOURS_DIR)
      .filter((f) => f.endsWith('.ts'))
      .forEach((f) => console.log('  -', f.replace(/\.ts$/, '')));
    process.exit(0);
  }

  const files = args.includes('--all')
    ? fs.readdirSync(TOURS_DIR).filter((f) => f.endsWith('.ts'))
    : args;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI bulunamadı (.env.local)');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB bağlantısı başarılı\n');

  let added = 0;
  let updated = 0;

  try {
    for (const file of files) {
      const tours = await loadFile(file);
      for (const tourData of tours) {
        const existing = await Tour.findOne({ slug: tourData.slug });
        if (existing) {
          Object.assign(existing, tourData);
          await existing.save();
          updated++;
          console.log(`🔄 Güncellendi: ${tourData.name} → /tours/${tourData.slug}`);
        } else {
          await new Tour(tourData).save();
          added++;
          console.log(`➕ Eklendi:     ${tourData.name} → /tours/${tourData.slug}`);
        }
      }
    }
    console.log(`\nToplam: ${added} eklendi, ${updated} güncellendi`);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
