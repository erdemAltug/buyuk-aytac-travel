/**
 * Admin kullanıcı seed — oluşturur veya günceller
 * Kullanım: npx tsx scripts/seed-admin-user.ts
 *
 * Ortam değişkenleri (.env.local):
 *   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FIRST_NAME, ADMIN_LAST_NAME
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI bulunamadı (.env.local)');
  process.exit(1);
}

const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ?? 'info@buyukaytactravel.com'
)
  .trim()
  .toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'ChangeMeAdmin2026!';
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME ?? 'Admin';
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME ?? 'Büyük Aytaç';

async function seedAdminUser() {
  await mongoose.connect(MONGODB_URI!);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const user = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    {
      $set: {
        email: ADMIN_EMAIL,
        passwordHash,
        firstName: ADMIN_FIRST_NAME,
        lastName: ADMIN_LAST_NAME,
        role: 'admin',
        emailVerified: true,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(
    `Admin kullanıcı hazır: ${user.email} (role=${user.role}, id=${user._id.toString()})`
  );
}

seedAdminUser()
  .catch((error) => {
    console.error('Admin seed hatası:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
