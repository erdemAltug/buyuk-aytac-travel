# Tur Nasıl Eklenir?

Bu projede tur eklemenin iki yolu vardır: **admin paneli** (hızlı, görsel yükleme) ve **seed script** (tekrarlanabilir, versiyon kontrolüne uygun).

---

## Ön koşullar

- `.env.local` dosyasında `MONGODB_URI` tanımlı olmalı
- Görsel dosyalar `public/images/` altına konur (ör. `public/images/assos-29-may.jpeg`)
- Tur detay sayfası: `/tours/[slug]`

---

## Yöntem 1: Admin paneli

1. `/admin/login` adresinden giriş yapın
2. **Turlar → Yeni Tur** (`/admin/tours/new`)
3. Formu doldurun:
   - **Tur adı**, **açıklama**, **destinasyon**, **süre**, **fiyat**
   - **Tur tipi:** `domestic` / `international`
   - **Konaklama:** `daily` (günübirlik) veya `with_accommodation` (konaklamalı)
   - **Başlangıç / bitiş tarihi** — ana sayfadaki öne çıkan turlar için kritik
   - **Program**, **dahil / hariç hizmetler**
4. Görseli yükleyin (AWS S3 üzerinden kaydedilir)
5. Kaydedin

> **Not:** Admin formunda `isFeatured` (öne çıkan) alanı yoksa, turu öne çıkarmak için aşağıdaki script yöntemini veya `sync-featured-tours.ts` scriptini kullanın.

---

## Yöntem 2: Seed script (önerilen)

Tur verileri `scripts/tours/` klasöründe durur; her dosya bir tur dizisi export eder. Tek bir script (`scripts/add-tours.ts`) bu dosyaları veritabanına yazar.

| Komut | Ne yapar |
|--------|-----|
| `npm run add:tours` | Mevcut tur dosyalarını listeler |
| `npm run add:tours -- iznik-tour` | Sadece `scripts/tours/iznik-tour.ts` |
| `npm run add:tours -- --all` | Klasördeki tüm turlar |

### Adımlar

1. `scripts/tours/` içindeki bir dosyayı kopyalayın (ör. `assos-tour.ts` → `yeni-tur.ts`)
2. Tur verisini güncelleyin:

```typescript
import { TourType, AccommodationType } from '../../src/models/Tour';

const yeniTur = {
  name: 'TUR ADI',
  description: `Tur açıklaması...`,
  image: '/images/tur-gorseli.jpeg',   // public/images/ altında
  slug: 'tur-slug-2026',             // benzersiz, URL'de kullanılır
  duration: '1 Gün (Günübirlik)',
  price: 1750,
  destination: 'Destinasyon',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,                  // ana sayfada öne çıkan
  isLastMinute: false,
  startDate: new Date('2026-06-15'),
  endDate: new Date('2026-06-15'),
  includedServices: ['Ulaşım', 'Rehber', 'Sigorta'],
  excludedServices: ['Yemekler', 'Müze girişleri'],
  program: [
    { day: '1. Gün', title: '...', description: '...' },
  ],
  viewCount: 0,
};

export default [yeniTur];
```

3. Görseli `public/images/` klasörüne ekleyin
4. Scripti çalıştırın:

```bash
npm run add:tours -- yeni-tur
```

Script **slug ile upsert** yapar: tur varsa günceller, yoksa ekler.

---

## Öne çıkan turlar

Ana sayfadaki **Öne Çıkan Turlarımız** bölümü:

- `isFeatured: true` olan
- `isActive: true` olan
- **Tarihi geçmemiş** (`startDate` veya `endDate >= bugün`) turları gösterir
- En yakın 4 tur listelenir

Tarihi geçen turları otomatik temizlemek için:

```bash
npx tsx scripts/sync-featured-tours.ts
```

Bu script geçmiş turların `isFeatured` bayrağını kaldırır ve güncel programdaki slug'ları öne çıkarır.

---

## Tur alanları referansı

| Alan | Zorunlu | Açıklama |
|------|---------|----------|
| `name` | Evet | Tur başlığı |
| `slug` | Evet | Benzersiz URL parçası |
| `description` | Evet | Detaylı program metni |
| `image` | Evet | `/images/...` yolu |
| `price` | Evet | Kişi başı TL |
| `duration` | Evet | Örn. `2 Gün 1 Gece` |
| `destination` | Evet | Gidilecek yer(ler) |
| `tourType` | Evet | `domestic` / `international` |
| `accommodationType` | Evet | `daily` / `with_accommodation` |
| `startDate` / `endDate` | Önerilir | Tarih filtreleri ve sıralama |
| `isFeatured` | Hayır | Ana sayfa öne çıkan |
| `isActive` | Hayır | Varsayılan `true` |
| `program` | Hayır | Günlük program dizisi |
| `includedServices` | Hayır | Dahil hizmetler listesi |
| `excludedServices` | Hayır | Hariç hizmetler listesi |

Model: `src/models/Tour.ts` · Tip: `src/types/tour.ts`

---

## Toplu tur yükleme

Excel/CSV ile toplu yükleme: `/admin/tours/bulk` — şablon indirip doldurabilirsiniz.

---

## Kontrol listesi

- [ ] Görsel `public/images/` altında ve yolu doğru
- [ ] `slug` benzersiz ve Türkçe karakter içermiyor
- [ ] `startDate` / `endDate` doğru yıl ve gün
- [ ] Günübirlik turlarda başlangıç = bitiş tarihi
- [ ] `isFeatured: true` ise tur gelecekte olmalı
- [ ] Script çalıştırıldı veya admin panelden kaydedildi
- [ ] `/tours/[slug]` sayfası kontrol edildi
