# Büyük Aytaç Travel

Çerkezköy merkezli tur ve seyahat hizmetleri sunan Büyük Aytaç Travel'ın kurumsal websitesi. Next.js 15, TypeScript ve MongoDB kullanılarak geliştirilmiştir.

## Teknoloji

- **Next.js** 15 (App Router)
- **React** 19 · **TypeScript** 5
- **MongoDB** (Mongoose)
- **TailwindCSS** 4
- **Cloudflare R2** (görsel yüklemeleri, `@aws-sdk/client-s3` ile)
- **NextAuth v5** (kullanıcı ve admin girişi)
- **Sentry** (hata takibi) · **PostHog** (analitik)

## Kurulum

```bash
npm install
cp .env.example .env.local   # MONGODB_URI ve diğer değişkenleri doldurun
npm run dev
npm run typecheck   # push etmeden önce tip kontrolü (build de bu hatalarda durur)
```

## İçerik yönetimi

| Ne eklemek istiyorsunuz? | Rehber |
|--------------------------|--------|
| Yeni tur | [docs/TUR_EKLEME.md](docs/TUR_EKLEME.md) |
| Yeni blog yazısı | [docs/BLOG_EKLEME.md](docs/BLOG_EKLEME.md) |

### Hızlı komutlar

```bash
# Tur ekle/güncelle (veriler scripts/tours/ içinde)
npm run add:tours -- assos-tour
npm run add:tours -- --all

# Öne çıkan turları senkronize et (geçmiş turları kaldır)
npx tsx scripts/sync-featured-tours.ts

# SEO bloglarını yükle/güncelle
npx tsx scripts/seed-cerkezkoy-seo-blogs.ts
npx tsx scripts/seed-tour-seo-blogs.ts
```

Admin panel: `/admin/login`

## Ortam değişkenleri

`.env.example` dosyasına bakın. Ek olarak:

- `CRON_SECRET` — `/api/cron/expired-tours` yalnızca `Authorization: Bearer <CRON_SECRET>` başlığıyla çalışır (Vercel Cron bunu otomatik gönderir).

## Proje yapısı

```
src/
  app/           # Sayfalar ve API route'ları
  components/    # React bileşenleri
  lib/           # Yardımcı fonksiyonlar (mongodb, homeData, tourUpcoming)
  models/        # Mongoose modelleri (Tour, Blog, ...)
  types/         # TypeScript tipleri
scripts/         # Blog seed scriptleri ve add-tours.ts
scripts/tours/   # Tur verileri (her dosya bir tur dizisi)
public/images/   # Tur ve blog görselleri
docs/            # İçerik ekleme rehberleri
```

## İletişim

Büyük Aytaç Travel · [www.buyukaytactravel.com](https://www.buyukaytactravel.com) · info@buyukaytactravel.com
