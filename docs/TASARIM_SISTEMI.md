# Tasarım Sistemi ve Yeni Arayüz (v2)

Bu doküman, Ekim 2026'daki arayüz yenilemesinin **ne değiştirdiğini, neden değiştirdiğini ve nasıl kullanılacağını** anlatır. Yeni bir sayfa ya da bileşen yazarken buradaki tokenları ve kalıpları kullanın.

---

## 1. Hedefler

| Sorun (eski site) | Hedef | Çözüm |
|---|---|---|
| Ana sayfa 15.000 px (mobilde 38.000 px), aynı turlar 4 bölümde tekrar ediyordu | Kısa, taranabilir ana sayfa | Tek **Tur Vitrini** (sekme + ay şeridi + kaydırmalı şerit) |
| İlk ekranda hiç tur yoktu | İlk ekranda somut bir tur ve harekete geçirici | Hero'da **Sıradaki kalkış** kartı + canlı geri sayım |
| Mobil tur sayfasında "Rezervasyon" ~3.800 px aşağıdaydı | Rezervasyon her an bir dokunuş uzaklıkta | **Mobil rezervasyon çubuğu** (alta sabit) |
| Sağ altta 3 yüzen buton kartların üstüne biniyordu | Tek, düzenli iletişim noktası | **ContactDock** (tek buton, açılır menü) |
| Afiş görselleri kırpılınca yazılar kesiliyordu | Afiş bütün görünsün, kart düzgün dursun | Afiş `object-contain` + aynı görselin **bulanık zemini** |
| Başlıklar BÜYÜK HARF ve tarih ekli, okunmuyordu | Okunur başlık, tarih ayrı | `shortTourName()` + takvim rozeti |
| Arama hiçbir sonuç döndürmüyordu (bkz. §5) | Çalışan arama | Türkçe karakter duyarsız metin araması |

---

## 2. Tokenlar

Tanım yeri: `src/app/globals.css` → `@theme` bloğu (Tailwind v4). Bu tokenlar otomatik olarak Tailwind sınıfı olur (`bg-brand-600`, `text-sunset-500`, `font-display` …).

### Renkler

| Token | Değer | Kullanım |
|---|---|---|
| `brand-600` | `#1d56f0` | Birincil buton (Rezervasyon), linkler |
| `brand-700/800` | `#1642d0` / `#1838a8` | Hover, vurgulu metin |
| `brand-900/950` | `#0f1f4d` / `#0a1430` | Koyu bölümler (hero, Neden Biz), aktif sekme |
| `sunset-400` | `#ff9a4d` | **Yalnızca koyu zeminde** turuncu metin (hero başlığı) |
| `sunset-600` | `#c2410c` | Üzerinde beyaz yazı olan turuncu buton/rozet ("Tur Bul", ay seçimi, "X gün kaldı"); açık zeminde turuncu etiket metni |
| `sunset-700` | `#9a3412` | Turuncu hover |
| `sand-50/100` | `#fbf8f3` / `#f4eee3` | Bölüm zeminleri (vitrin, tur detay) |
| `emerald-500` | Tailwind | Yalnızca WhatsApp |
| `rose-500` | Tailwind | İndirim rozeti |

Kural: **Beyaz yazının altına `sunset-500` veya daha açık turuncu koymayın** (kontrast 3:1'in altına düşer, okunmaz). **Bir ekranda tek bir turuncu CTA olsun.** Turuncu dikkat çeker, her yerde kullanılırsa etkisini kaybeder.

### Tipografi

| Rol | Font | Nerede |
|---|---|---|
| Başlık (`h1-h3`, `.font-display`) | **Bricolage Grotesque** 500–800 | Otomatik: tüm `h1`, `h2`, `h3` |
| Gövde | **Geist** | Otomatik: `body` |

Her iki font da `latin-ext` alt kümesiyle yüklenir; ğ, ş, ı, İ fontun kendisinden gelir. (Eskiden `globals.css` gövde fontunu Arial'a zorluyordu, Geist hiç kullanılmıyordu.)

Ölçek: Hero `text-[2.6rem] → sm:text-6xl → lg:text-7xl`, bölüm başlığı `text-3xl sm:text-4xl`, kart başlığı `text-[17px]`.

### Biçim

- Kart köşesi `rounded-3xl`, buton `rounded-xl`, çip `rounded-full`
- Kenarlık yerine `ring-1 ring-slate-200/70`
- Hover'da kart `-translate-y-1` + yumuşak lacivert gölge
- Dokunma alanı **en az 44 px** (`h-11` / `h-12`)

### Hareket

`globals.css` içinde: `animate-kenburns` (hero fotoğrafı yavaş yakınlaşma), `animate-fade-up` (giriş). `prefers-reduced-motion` açıksa tüm animasyonlar kapanır.

---

## 3. Bileşenler

| Bileşen | Dosya | Not |
|---|---|---|
| **TourCard** | `components/tours/TourCard.tsx` | Tüm listelerde kullanılır. Takvim rozeti (ay/gün/haftanın günü), "X gün kaldı" (≤21 gün), indirim ve günübirlik/konaklamalı çipleri. Geçmiş tarihli turlar soluk gri rozetle gösterilir (turlar listeden kaldırılmaz). |
| **HeroNext** | `components/home/HeroNext.tsx` | Sunucu bileşeni. İçinde `HeroSearch` ve `NextDepartureCard` (istemci). |
| **HeroSearch** | `components/home/HeroSearch.tsx` | `/tours?search=…`'a gider. "Hafta sonu ne yapsam?" yapay zekâ asistanını açar. |
| **NextDepartureCard** | `components/home/NextDepartureCard.tsx` | En yakın tur + gün/saat/dk/sn geri sayımı. Sayaç yalnızca tarayıcıda başlar (hydration güvenli). |
| **TourExplorer** | `components/home/TourExplorer.tsx` | Sekmeler (Tümü/Günübirlik/Konaklamalı/Yurtiçi/Yurtdışı, sayılarıyla), ay şeridi (yalnızca yaklaşan turların ayları), snap-scroll şerit, "Tümünü gör" kartı. |
| **DestinationMosaic** | `components/home/DestinationMosaic.tsx` | Manzara fotoğraflı bento ızgara; her rotada **canlı "N yaklaşan tur"** sayısı. Rota eklemek için `DESTINATIONS` dizisine anahtar kelimeleriyle ekleyin. |
| **WhyUs** | `components/home/WhyUs.tsx` | Güven mesajları + TÜRSAB + **kalkış noktaları** zaman çizelgesi + özel grup CTA'sı. Durakları `STOPS` dizisinden düzenleyin. |
| **RecentlyViewed** | `components/RecentlyViewed.tsx` | "Son baktıkların" — `localStorage`'da tutulur, sunucuya gitmez. `TrackTourView` tur sayfasında kaydı yapar. |
| **ContactDock** | `components/ContactDock.tsx` | Tek yüzen buton → WhatsApp / Ara / "Bana tur öner". Mobil tur sayfasında gizlenir. |
| **MobileBookingBar** | `components/tours/MobileBookingBar.tsx` | Mobilde alta sabit fiyat + WhatsApp + Rezervasyon. |
| **ShareButtons** | `components/tours/ShareButtons.tsx` | Telefonda yerel paylaşım menüsü (`navigator.share`), masaüstünde bağlantı kopyalama. |
| **ContactCTA** | `components/ContactCTA.tsx` | Sayfa sonu turuncu blok: WhatsApp + telefon. |

Yardımcılar: `src/lib/tourUi.ts` → `finalPrice`, `formatTL`, `formatDateRange` ("9–11 Aralık"), `dateParts`, `monthKey`, `isUpcoming`, `sortForDisplay` (yaklaşan → tarihsiz → geçmiş), `daysUntil`, `shortTourName`, `tourWhatsappLink`. **Fiyat, tarih ve WhatsApp linkini bileşen içinde elle yazmayın, buradan alın.**

---

## 4. Sayfa akışları

### Ana sayfa
Hero (arama + asistan + sıradaki kalkış) → Son baktıkların → Tur vitrini → Popüler rotalar → Neden biz / kalkış noktaları → Google yorumları → Gelecek tur oylaması → Blog → Instagram → İletişim CTA

Kaldırılanlar: 4 ayrı tur bölümü (vitrine birleşti), elle yazılmış "2026 Yıllık Tur Programı" (Mart tarihleri vardı, güncellenmiyordu → `/annual-program` sayfası duruyor), güven çipleri + "En İyi Fiyat Garantisi" + TÜRSAB bölümü (WhyUs'ta birleşti), ayrı arama kutusu (hero'ya taşındı).

### Tur detay
Koyu başlık bandı (rozetler, başlık) → afiş (bulanık zeminli) → 4 bilgi kutusu (tarih, süre, kalkış, tip) → paylaş → yapışkan bölüm menüsü → Tur hakkında → **Program (zaman çizelgesi)** → Dahil/Dahil değil → Yorumlar → SSS (akordeon + `FAQPage` şeması) → **Gerçek benzer turlar**.
Masaüstü: sağda yapışkan rezervasyon kartı. Mobil: alta sabit rezervasyon çubuğu.

---

## 5. Bu çalışmada düzeltilen hatalar

1. **Arama hiç sonuç döndürmüyordu.** Ana sayfa formu `destination=Kapadokya` gönderiyor, tur listesi `destination` alanını **tam eşleşme** ile arıyordu; kayıtlardaki değer "Konya, Mevlana Müzesi, Sille…" gibi uzun olduğu için eşleşme hiç olmuyordu. `minPrice`/`maxPrice` da hiç uygulanmıyordu. → Türkçe karakter duyarsız, kelime bazlı arama (`/tours?search=…`).
2. **"Benzer Turlar" sahteydi.** Var olmayan sabit linkler (`/tours/kapadokya-turu`, `/tours/pamukkale-turu` …) ve hepsinde mevcut turun görseli. → Veritabanından aynı tipteki gerçek turlar (`getRelatedTours`).
3. **Karanlık modda yazılar görünmüyordu.** `globals.css` koyu temada yazı rengini açık griye çeviriyor ama zemini beyaz bırakıyordu.
4. **Google Analytics hiç çalışmıyordu.** `layout.tsx` içinde ölçüm kimliği yerine `GA_MEASUREMENT_ID` yer tutucusu vardı. → `NEXT_PUBLIC_GA_ID` ortam değişkeni tanımlanınca etkinleşir.
5. **Font hatası:** Geist yükleniyor ama `body { font-family: Arial }` ile eziliyordu; Türkçe alt küme (`latin-ext`) yüklenmiyordu.
6. **Yüzen butonlar** mobilde kart butonlarını ve paylaş ikonlarını örtüyordu.
7. **Tur listesi sayfası** Next 15'te `searchParams`'ı Promise olarak beklemiyordu.
8. **CSS/JS'e 1 yıllık `immutable` önbellek başlığı veriliyordu** (`next.config.mjs`). Geliştirmede yeni CSS hiç yüklenmiyordu; canlıda da `public/` altında aynı adla değiştirilen görseller bir yıl eski haliyle görünüyordu. → JS/CSS kuralı kaldırıldı (Next zaten doğru başlığı veriyor), görseller 1 hafta.
9. **Kategori görselleri yanlış yerlerdi:** `public/images/categories/*-manzara.jpg` dosyalarında "Kapadokya" diye Paris, "Ege" diye İtalya, "Balkan" diye Marakeş fotoğrafı vardı. Rota mozaiği artık o rotadaki gerçek turun görselini kullanıyor. Bu dosyalar başka bir yerde kullanılmıyorsa silinebilir.
10. **Breadcrumb koyu zeminde okunmuyordu** → `tone="dark"` seçeneği. Tur sayfasında BreadcrumbList şeması iki kez basılıyordu → tekilleştirildi.
11. **PostHog hydration hatası:** PostHog script'leri React sayfayı bağlamadan eklendiği için konsolda hata veriyordu → PostHog sayfa yüklendikten sonra başlatılıyor.

---

## 6. Kontrol listesi (yeni sayfa / bileşen)

- [ ] Renkler token'dan mı? (`blue-600` yerine `brand-600`)
- [ ] Fiyat/tarih `tourUi.ts` ile mi biçimlendi?
- [ ] 375 px genişlikte yatay kaydırma yok mu?
- [ ] Tüm butonlar ≥ 44 px mi?
- [ ] Görsellerde `alt` ve `sizes` var mı?
- [ ] Mobilde sağ alttaki iletişim butonu bir şeyi örtüyor mu?
