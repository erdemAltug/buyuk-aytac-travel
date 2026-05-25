import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.local' });
import TourPoll from '../src/models/TourPoll';
import { DEFAULT_POLL } from '../src/lib/pollDefaults';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI tanımlı değil');
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGODB_URI!);

  const existing = await TourPoll.findOne({ isActive: true });
  if (existing) {
    console.log('Aktif oylama zaten var:', existing.title);
    await mongoose.disconnect();
    return;
  }

  await TourPoll.create(DEFAULT_POLL);

  console.log('Gelecek turlar oylaması oluşturuldu.');
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
