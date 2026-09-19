# Büyük Aytaç Travel — Kullanıcı + Admin Platform Planı

**Durum:** Hazırlık / analiz (uygulama henüz başlamadı)  
**Tarih:** 19 Eylül 2026  
**Hedef:** Hardcoded admin’i kaldırmak; DB seviyesinde kullanıcı sistemi + modern admin paneli

---

## 1. Bugünkü durum (gerçek kod)

| Alan | Gerçeklik |
|------|-----------|
| User / Admin modeli | **Yok** |
| Giriş | `admin` / `admin123` sabit kod (`src/app/admin/login/page.tsx`) |
| Oturum | Sadece `localStorage.adminLoggedIn` — sunucu koruması **yok**, `middleware` **yok** |
| Rezervasyon | E-posta gönderimi (`/api/reservation`) — **DB’ye yazılmıyor** |
| Admin rezervasyon sayfası | Placeholder (“Yakında”) |
| Görsel upload | `public/` diske yazıyor → production’da **EROFS** |
| S3 paketleri | `aws-sdk` / `multer-s3` var, **kullanılmıyor** |
| Tur görüntüleme | `Tour.viewCount` + `POST /api/tours/[slug]/view` mevcut |
| Yorum / puan | DB modeli **yok** (Google yorumları sabit UI) |
| Navbar hesap menüsü | **Yok** |

**Sonuç:** “Admin paneli” ve “üyelik” sıfırdan doğru mimariyle kurulmalı; mevcut admin UI’yi yama ile kurtarmak yerine aşamalı yenileme.

---

## 2. Ürün vizyonu (iki dünya)

### A) Ziyaretçi / üye (public)

1. Kayıt ol / giriş yap  
2. Sağ üstte **ad soyad** → dropdown: Profil, Seyahatlerim, İstek listem, Çıkış  
3. Kullanıcı sayfası (`/hesabim` veya `/account`):
   - Katıldığı / rezervasyon yaptığı turlar  
   - İstek listesi (favori turlar)  
   - Tur bazlı **yorum yaz** (onay sonrası sitede görünebilir)  
4. Rezervasyon artık sadece mail değil: **DB kaydı + kullanıcıya bağlanır** (girişliyse)

### B) Admin (role = `admin`)

1. Aynı auth sistemi; admin rolü olanlar `/admin` görebilir  
2. Mobil-first, kullanılabilir tur/blog yönetimi  
3. Görseller **S3 / Blob** (proje diskine yazma yok)  
4. Monitoring: tur görüntüleme, rezervasyon hunisi, popüler turlar  
5. Hardcoded `admin123` **tamamen kalkar**

---

## 3. Veritabanı tasarımı (öneri)

### 3.1 `User`

```
_id
email              unique, lowercase
passwordHash       bcrypt
firstName
lastName
phone?             optional
role               'user' | 'admin'   (ileride 'staff' eklenebilir)
emailVerified      boolean, default false
wishlist           [ObjectId → Tour]
createdAt / updatedAt
```

**Notlar**
- İlk admin: seed script veya env ile tek seferlik `role: admin` user  
- Normal kayıtlar her zaman `role: user`  
- Admin paneli erişimi **sadece** `role === 'admin'`

### 3.2 `Session` / oturum stratejisi

**Öneri:** Cookie tabanlı session (httpOnly, secure, sameSite).

Seçenekler (karar noktası):

| Seçenek | Artı | Eksi |
|---------|------|------|
| **Auth.js (NextAuth) Credentials + JWT/session** | Hazır, Next 15 uyumlu | Ek paket / config |
| **Özel session koleksiyonu + iron-session / jose** | Tam kontrol | Daha fazla kod |

**Öneri:** Auth.js (Credentials provider) + MongoDB `User` adapter/koleksiyon. Hardcoded login silinir.

### 3.3 `Reservation` (yeni — kritik)

```
_id
userId?            ObjectId → User (misafir rezervasyonda null)
tourId             ObjectId → Tour
tourSlug / tourName snapshot (tur silinse bile kayıt okunur)
firstName, lastName, phone, email?
adultCount, childCount?
status             'new' | 'contacted' | 'confirmed' | 'cancelled' | 'completed'
notes?             admin notu
source             'web' | 'whatsapp' | 'phone' | 'admin'
createdAt / updatedAt
```

Rezervasyon akışı:
1. Form → DB insert (`status: new`)  
2. Mevcut e-posta bildirimi **korunur**  
3. Girişli kullanıcıda `userId` otomatik dolar → “Seyahatlerim”de görünür  
4. Admin panelde liste + durum güncelleme

### 3.4 `Review` (yeni)

```
_id
userId             ObjectId → User
tourId             ObjectId → Tour
rating             1–5
comment            string
status             'pending' | 'approved' | 'rejected'
createdAt
```

- Kullanıcı sadece **kendi tamamlanmış / confirmed** turuna yorum yazabilir (kural tartışılır: confirmed veya completed).  
- Admin onayından sonra tur detay + SEO’da gösterilir.

### 3.5 `Tour` — küçük ekler (opsiyonel sprint)

Mevcut: `viewCount`, `isFeatured`, `isActive` …  
İleride: `capacity`, `bookedCount`, `coverImageKey` (S3 key).  
Monitoring için şimdilik `viewCount` + Reservation aggregations yeterli.

### 3.6 `AnalyticsEvent` (opsiyonel, P1)

PostHog zaten var. Admin “monitoring” için:

- Kısa vadede: Mongo aggregate (`viewCount`, rezervasyon sayıları)  
- Orta vadede: PostHog dashboard veya günlük `AnalyticsDaily` snapshot

İlk sürümde ayrı event koleksiyonu **zorunlu değil**.

---

## 4. Auth & güvenlik

### Kaldırılacaklar
- `username === 'admin' && password === 'admin123'`  
- `localStorage.adminLoggedIn` kontrolleri  
- Admin API’lerin açık kalması

### Eklenecekler
1. `POST /api/auth/register` — email + şifre + ad soyad  
2. `POST /api/auth/login`  
3. `POST /api/auth/logout`  
4. `GET /api/auth/me` — navbar için  
5. **middleware.ts**:  
   - `/admin/*` → sadece `role: admin`  
   - `/hesabim/*` → giriş zorunlu  
6. Rate limit (login/register) — brute force  
7. Şifre: min 8 karakter, bcrypt cost ≥ 12  
8. Env: `AUTH_SECRET` (zorunlu); opsiyonel `ADMIN_BOOTSTRAP_EMAIL`

### Rol mantığı
```
user  → site + /hesabim
admin → user yetkileri + /admin
```

Admin paneli “ayrı login” olabilir ama **aynı User tablosu**; `/admin/login` sadece admin role kabul eder.

---

## 5. Kullanıcı UI (public)

### Navbar (sağ üst)
- **Çıkışlı:** `Giriş Yap` | `Kayıt Ol`  
- **Girişli:** Avatar / initials + **Ad Soyad** → menü:
  - Profil (`/hesabim`)  
  - Seyahatlerim (`/hesabim/seyahatler`)  
  - İstek listem (`/hesabim/favoriler`)  
  - Admin paneli (sadece admin)  
  - Çıkış

### Sayfalar
| Route | İçerik |
|-------|--------|
| `/giris` | Login |
| `/kayit` | Register |
| `/hesabim` | Özet + profil düzenle |
| `/hesabim/seyahatlerim` | Rezervasyon listesi + durum |
| `/hesabim/favorilerim` | Wishlist |
| `/hesabim/yorumlarim` | Yazdığı / bekleyen yorumlar |

### Tur detay entegrasyonu
- “Favoriye ekle”  
- “Rezervasyon” → giriş teşviki (zorunlu değil; misafir de reserve edebilir)  
- “Yorum yaz” → sadece uygun rezervasyonu olanlara

---

## 6. Admin panel “devrim” kapsamı

### 6.1 UX ilkeleri
- Mobil-first (ofisten telefonla tur açılabilmeli)  
- Tek ekranda tur oluştur: temel bilgi → tarih/fiyat → program → görsel → yayınla  
- Liste: arama, filtre (aktif / featured / tarih), toplu işlem  
- Dark/light değil; net, hızlı, az tıklama (mevcut site diline uyumlu)

### 6.2 Modüller (öncelik sırası)

| # | Modül | Açıklama |
|---|--------|---------|
| 1 | Auth gate | Gerçek session + role |
| 2 | Dashboard | Bugün/hafta: yeni rezervasyon, top turlar (viewCount), aktif tur sayısı |
| 3 | Turlar CRUD | Yeni form + mobil uyumlu edit; slug güvenli |
| 4 | Medya | S3/Blob upload; preview; eski local path’ler migrate planı |
| 5 | Rezervasyonlar | Liste, durum, kullanıcıya bağlama, telefon link |
| 6 | Blog | Mevcut admin blog’u aynı shell’e taşı |
| 7 | Yorum moderasyonu | pending → approve/reject |
| 8 | Kullanıcılar | Liste, role değiştir (dikkatli), ban/disable |
| 9 | Monitoring | Tur views sıralaması, rezervasyon funnel, basit grafikler |

### 6.3 Medya stratejisi (zorunlu)
- Production: **AWS S3** veya **Vercel Blob** / Cloudflare R2  
- Upload API sadece authenticated **admin**  
- Dönen URL CDN/public URL; Mongo’da `image` alanı URL olarak kalır  
- `public/uploads` yazma **kaldırılır**

### 6.4 Monitoring (MVP)
Dashboard kartları:
- Toplam / aktif tur  
- Son 7 gün rezervasyon (`new` sayısı)  
- En çok görüntülenen 10 tur (`viewCount`)  
- En çok rezervasyon alan 10 tur  

İleri: tarih aralığı filtre, PostHog embed (opsiyonel).

---

## 7. Teknik mimari özeti

```
[Navbar AuthMenu]
      │
      ▼
[Auth cookie / session] ──► middleware
      │                         │
      ├─ role=user ──► /hesabim
      └─ role=admin ─► /admin + /hesabim

MongoDB
  User | Reservation | Review | Tour | Blog | Destination
         │
         └─ Reservation.userId? + tourId
```

**Stack (mevcut):** Next 15.2 · React 19 · Mongoose 8 · Tailwind 4  

**Yeni bağımlılıklar (öneri):**
- `bcryptjs` (veya `argon2`)  
- Auth.js **veya** `jose` + httpOnly cookie  
- `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` (eski `aws-sdk` v2 yerine tercihen v3)

---

## 8. Faz planı (uygulama sırası)

### Faz 0 — Temizlik & güvenlik (1–2 gün)
- [ ] Auth.js Credentials + session  
- [ ] User model + register/login/logout/me  
- [ ] middleware admin + `/hesabim` koruması  
- [ ] İlk admin seed script  
- [ ] Eski `localStorage` / hardcoded auth sil  
- [ ] S3 upload iskeleti (env yoksa net hata mesajı)

### Faz 1 — Kullanıcı yüzeyi (3–5 gün)
- [ ] Navbar hesap menüsü  
- [ ] `/giris`, `/kayit`, `/hesabim*`  
- [ ] Wishlist  
- [ ] Rezervasyon → DB + userId bağlama  
- [ ] Eski mail bildirimi koru

### Faz 2 — Admin shell + rezervasyon (3–5 gün)
- [ ] Yeni admin layout (mobil sidebar)  
- [ ] Dashboard (basit stats)  
- [ ] Rezervasyon listesi / durum  
- [ ] Eski admin sayfalarını yeni shell’e taşı veya yeniden yaz

### Faz 3 — Tur yönetimi + S3 (4–6 gün)
- [ ] Mobil tur formu (adım adım)  
- [ ] S3 upload  
- [ ] Liste filtre/arama  
- [ ] Production upload’ın çalıştığını doğrula

### Faz 4 — Yorum + monitoring (2–4 gün)
- [ ] Review model + kullanıcı formu  
- [ ] Admin moderasyon  
- [ ] Dashboard charts / top views  

### Faz 5 — Cila
- [ ] E-posta doğrulama (opsiyonel)  
- [ ] Şifre sıfırlama  
- [ ] Audit log (admin aksiyonları)  
- [ ] Rate limit + güvenlik review

---

## 9. Kararlar (onaylandı — 19 Eylül 2026)

| Soru | Karar |
|------|--------|
| Auth | **Auth.js** (Credentials + session cookie) |
| Medya | **S3 yapısı kodda kurulur**; bucket/credential’ları sen env’ye koyarsın |
| Rezervasyon | **Misafire açık** (aşağıda tanım) |
| Route dili | **Türkçe:** `/hesabim`, `/hesahatlerim`, `/favorilerim`, `/giris`, `/kayit` |

### “Rezervasyon misafire açık kalsın mı?” ne demek?

İki seçenek vardı:

1. **Misafire açık (seçilen):** Siteye **giriş yapmadan** da rezervasyon formu doldurulabilir. Telefon + ad soyad yeterli. Giriş yapmışsa rezervasyon hesabına bağlanır (`userId`); yapmamışsa `userId` boş kalır, yine DB + e-posta gider. Ofis WhatsApp/telefon alışkanlığı bozulmaz; dönüşüm düşmez.

2. **Sadece üyelere:** Rezervasyon için önce kayıt/giriş zorunlu. “Seyahatlerim” her zaman dolu olur ama form önünde engel olur; birçok kişi vazgeçebilir.

**Bizim seçim:** Misafire açık + girişliyse hesaba bağla.

### Path haritası (TR)

| Route | Sayfa |
|-------|--------|
| `/giris` | Giriş |
| `/kayit` | Kayıt |
| `/hesabim` | Profil özeti / düzenle |
| `/hesabim/seyahatlerim` | Rezervasyonlarım |
| `/hesabim/favorilerim` | İstek listesi |
| `/hesabim/yorumlarim` | Yorumlarım |
| `/admin` | Admin (sadece `role: admin`) |

### S3 / R2 (sen ayarlıyorsun — Cloudflare R2 seçildi)

Bucket: `buyukaytac` (R2)

Kod tarafında beklenen env:

```
S3_BUCKET_NAME=buyukaytac
S3_ACCESS_KEY_ID=          # R2 API token Access Key ID
S3_SECRET_ACCESS_KEY=      # R2 API token Secret Access Key
S3_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
S3_REGION=auto
S3_PUBLIC_URL=https://pub-xxxx.r2.dev   # veya custom domain (public access açılınca)
```

AWS isimleri yerine R2 endpoint + credentials kullanılır; SDK aynı S3 client.
---

## 10. Riskler

| Risk | Azaltma |
|------|---------|
| Production’da hâlâ açık admin API | middleware + her admin route’ta session check |
| S3 gecikirse upload yine kırılır | Blob alternatifini erken seç |
| Eski localStorage bookmark’ları | Login sayfasında “oturum yenilendi” mesajı |
| Rezervasyon e-posta + DB çift yazım hatası | Önce DB, sonra mail; mail fail → log, rezervasyon kalsın |
| Scope şişmesi | Faz 0–1 olmadan “güzel admin UI”ye girmemek |

---

## 11. Başarı kriterleri

- Hardcoded `admin123` kodda **yok**  
- Kayıt/giriş çalışan, navbar’da ad soyad menüsü  
- Kullanıcı “Seyahatlerim”de kendi rezervasyonlarını görüyor  
- Admin sadece `role=admin` ile giriyor  
- Telefondan tur ekleme + görsel yükleme production’da çalışıyor  
- Dashboard’da en az view + rezervasyon özeti var  

---

## 12. Sonraki adım

Bu doküman onaylandıktan ve **Bölüm 9 kararları** netleştikten sonra:

**İlk kod sprinti = Faz 0 + Faz 1 iskeleti**  
(User model → auth → navbar menü → reservation DB)

Hazır olduğunda “Faz 0’a başla” demen yeterli. Kararlar kilitlendi (Auth.js, TR path, misafir rezervasyon, S3 yapısı).
