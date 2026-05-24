# Büyük Aytaç Travel

Çerkezköy merkezli tur ve seyahat hizmetleri sunan Büyük Aytaç Travel'ın kurumsal websitesi. Next.js 15, TypeScript ve MongoDB kullanılarak geliştirilmiştir.

## Teknoloji

- **Next.js** 15 (App Router)
- **React** 19 · **TypeScript** 5
- **MongoDB** (Mongoose)
- **TailwindCSS** 4
- **AWS S3** (görsel yüklemeleri)

## Kurulum

```bash
npm install
cp .env.example .env.local   # MONGODB_URI ve diğer değişkenleri doldurun
npm run dev
```

## İçerik yönetimi

| Ne eklemek istiyorsunuz? | Rehber |
|--------------------------|--------|
| Yeni tur | [docs/TUR_EKLEME.md](docs/TUR_EKLEME.md) |
| Yeni blog yazısı | [docs/BLOG_EKLEME.md](docs/BLOG_EKLEME.md) |

### Hızlı komutlar

```bash
# Tur ekle/güncelle (örnek)
npx tsx scripts/add-assos-tour.ts

# Öne çıkan turları senkronize et (geçmiş turları kaldır)
npx tsx scripts/sync-featured-tours.ts

# SEO bloglarını yükle/güncelle
npx tsx scripts/seed-cerkezkoy-seo-blogs.ts
npx tsx scripts/seed-tour-seo-blogs.ts
```

Admin panel: `/admin/login`

## Proje yapısı

```
src/
  app/           # Sayfalar ve API route'ları
  components/    # React bileşenleri
  lib/           # Yardımcı fonksiyonlar (mongodb, homeData, tourUpcoming)
  models/        # Mongoose modelleri (Tour, Blog, ...)
  types/         # TypeScript tipleri
scripts/         # Tur ve blog seed scriptleri
public/images/   # Tur ve blog görselleri
docs/            # İçerik ekleme rehberleri
```

## İletişim

Büyük Aytaç Travel · [www.buyukaytactravel.com](https://www.buyukaytactravel.com) · info@buyukaytactravel.com
