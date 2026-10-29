# UX Yol Haritası

Arayüz yenilemesinin (v2) devamında yapılabilecek özellikler. Her madde için **neden**, **ne kadar iş** ve **nasıl ölçülür** yazılı. Mevcut durum için bkz. `TASARIM_SISTEMI.md`.

Efor: S = birkaç saat · M = 1–2 gün · L = 3+ gün

---

## ✅ v2'de yapılanlar

| Özellik | Amaç |
|---|---|
| Sıradaki kalkış + canlı geri sayım (hero) | İlk ekranda somut tur, aciliyet hissi |
| "Hafta sonu ne yapsam?" asistanını hero'dan açma | Var olan yapay zekâ özelliği görünür oldu (eskiden sağ altta küçük bir ikondu) |
| Tur vitrini: sekmeler + "hangi ay?" şeridi | Kullanıcı tarih/kategoriye göre 2 dokunuşta tur bulur |
| Popüler rotalarda canlı "N yaklaşan tur" | Rotaya tıklama nedeni |
| Kalkış noktaları zaman çizelgesi | Trakya'daki kullanıcının ilk sorusu: "Nereden biniyorum?" |
| Son baktıkların | Geri dönen ziyaretçi kaldığı yerden devam eder |
| Mobil rezervasyon çubuğu + masaüstü yapışkan kart | Dönüşüm |
| Tek iletişim butonu (ContactDock) | Mobilde örtüşme sorunu bitti |
| Gerçek benzer turlar, çalışan arama, SSS şeması | Hata düzeltme + SEO |

---

## 🔜 Sıradaki adımlar (önerilen sıra)

### 1. Kalkış durağı seçimi — **M**
Rezervasyon formuna "Hangi duraktan bineceksiniz?" (Çerkezköy / Çorlu / Saray / Silivri) alanı. Tur modeline `pickupPoints: [{ name, time }]` eklenir, tur sayfasında saatleriyle listelenir.
**Neden:** Tur açıklamalarında saatler serbest metin olarak yazılıyor; operasyonda telefonla tekrar soruluyor.
**Ölçüm:** Rezervasyon başına telefon görüşmesi sayısı.

### 2. Yer durumu göstergesi ("Son 6 koltuk") — **M**
Tur modeline `capacity` ve onaylı rezervasyon sayısından `seatsLeft`. Kartta ve detayda rozet.
**Neden:** En güçlü dönüşüm tetikleyicilerinden biri; gerçek veriyle yapılmalı (sahte aciliyet güveni bozar).
**Ölçüm:** Kart → detay → rezervasyon oranı.

### 3. Yeni tur bildirimi (WhatsApp/e-posta aboneliği) — **M**
"Kapadokya turu açılınca haber ver" butonu → rota + iletişim bilgisi kaydı → admin yeni tur eklediğinde liste dışa aktarılır (ilk sürümde otomatik gönderim şart değil).
**Neden:** Geçmiş tarihli turlara gelen ziyaretçi kaybolmasın; adminler turları seyrek güncellediği için talep toplamak değerli.

### 4. Tur karşılaştırma — **M**
Kartlarda "Karşılaştır" seçimi, alta çıkan çubuk, 2–3 turu fiyat/süre/dahil olanlar üzerinden yan yana gösteren sayfa.

### 5. Takvim görünümü yenilemesi (`/tour-calendar`) — **M**
Ay ızgarası, her günde tur noktası, tıklanınca kart. Ana sayfadaki ay şeridiyle aynı veri.

### 6. Gerçek fotoğraf galerisi — **S (kod) + içerik**
Tur modeline `gallery: string[]`. Admin paneline çoklu görsel yükleme (R2 hazır). Detayda kaydırmalı galeri; kartlarda afiş yerine ilk fotoğraf.
**Neden:** Afişler küçük ekranda okunmuyor; manzara fotoğrafı tıklamayı ciddi artırır. **En büyük görsel kazanç budur.**

### 7. Online ön ödeme / kapora — **L**
iyzico veya PayTR ile kapora. Ödeme sağlayıcının test modu + sözleşme metinleri gerekir.

### 8. Admin: tek tıkla "aynı turu yeni tarihe kopyala" — **S**
Adminler turları seyrek güncelliyor. Geçmiş bir turu yeni tarihle kopyalamak tur eklemeyi 10 dakikadan 30 saniyeye indirir; site boş görünme sorununu kökten çözer.

### 9. Karanlık tema — **M**
Tokenlar hazır; `dark:` varyantları ve görsellerin karartılması gerekir.

---

## 📏 Ölçüm planı

PostHog zaten kurulu. Aşağıdaki olaylar eklenirse her değişikliğin etkisi görülebilir:

| Olay | Nerede |
|---|---|
| `hero_search` (terim) | HeroSearch |
| `explorer_tab`, `explorer_month` | TourExplorer |
| `next_departure_click` | NextDepartureCard |
| `reservation_open` (kaynak: kart / detay / mobil çubuk) | Rezervasyon butonları |
| `whatsapp_click` (kaynak) | Tüm WhatsApp linkleri |
| `assistant_open` (kaynak: hero / dock) | Asistan |

Hedef metrikler: ana sayfa → tur detay geçiş oranı, tur detay → rezervasyon formu açılma oranı, WhatsApp tıklama sayısı.

Ayrıca: `NEXT_PUBLIC_GA_ID` tanımlanmalı (GA bugüne kadar hiç veri toplamadı).
