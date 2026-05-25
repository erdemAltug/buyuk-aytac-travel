/**
 * Aktif oylamadaki seçeneklere Unsplash görsellerini yazar.
 * Kullanım: npx tsx scripts/update-poll-images.ts
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TourPoll from '../src/models/TourPoll';
import { POLL_OPTION_IMAGES } from '../src/lib/pollDefaults';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI tanımlı değil');
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGODB_URI!);

  const poll = await TourPoll.findOne({ isActive: true }).sort({ createdAt: -1 });
  if (!poll) {
    console.log('Aktif oylama bulunamadı.');
    await mongoose.disconnect();
    return;
  }

  let updated = 0;
  for (const opt of poll.options) {
    const image = POLL_OPTION_IMAGES[opt.optionId];
    if (image && opt.image !== image) {
      opt.image = image;
      updated++;
    }
  }

  if (updated > 0) {
    await poll.save();
    console.log(`${updated} seçeneğe görsel eklendi/güncellendi.`);
  } else {
    console.log('Görseller zaten güncel.');
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
