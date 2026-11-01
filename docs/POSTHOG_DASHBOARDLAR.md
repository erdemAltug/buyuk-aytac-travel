# PostHog Dashboard Kurulumu

Bu belge, PostHog'da (EU projesi, `eu.posthog.com`) ziyaretçi davranışını gösteren dashboard'ların
adım adım nasıl kurulacağını anlatır. Olaylar koddan gönderiliyor; aşağıdaki grafikler bu olayları kullanır.

> Gizlilik: hiçbir olayda ad, soyad veya telefon yok. Sadece tur slug'ı, fiyat, kaynak gibi bilgiler var.

## 1. Gönderilen olaylar

| Olay | Ne zaman | Özellikler |
|---|---|---|
| `$pageview` | Her sayfa açılışı (otomatik) | `$current_url`, `$pathname`, `$referring_domain`, UTM'ler, cihaz |
| `tour_view` | Tur detay sayfası açılınca | `tour_slug`, `price`, `tour_type`, `accommodation` (daily/overnight), `discounted`, `days_until` |
| `hero_search` | Ana sayfa arama kutusu gönderilince | `term` (küçük harf, en fazla 60 karakter), `empty` |
| `hero_quick_link` | Hero altındaki hızlı linkler (Günübirlik, Kapadokya…) | `label`, `href` |
| `explorer_tab` | Ana sayfa tur gezgininde sekme seçimi | `tab` |
| `explorer_month` | Gezginde ay seçimi | `month` (`2026-12` veya `all`) |
| `next_departure_click` | "Sıradaki kalkış" kartına tıklama | `tour_slug`, `price` |
| `reservation_open` | Rezervasyon formu açılınca | `source` (`card` / `detail` / `mobile_bar` / `assistant`), `tour_slug`, `price` |
| `reservation_submit` | `/api/reservation` başarılı dönünce | `source`, `tour_slug`, `price` |
| `reservation_error` | Rezervasyon API'si hata dönünce | `source`, `tour_slug` |
| `whatsapp_click` | Sitedeki herhangi bir WhatsApp linki | `source` (`card` / `detail` / `mobile_bar` veya sayfa türü: `home`, `listing`, `tour_detail`, `blog`, `contact`, `other`), `page_type`, `tour_slug` (varsa) |
| `phone_click` | Herhangi bir `tel:` linki | `whatsapp_click` ile aynı |
| `assistant_open` | Hafta sonu asistanı açılınca | `source` (`hero` / `dock` / `trigger`) |

Kod: `src/lib/analytics.ts` (`track()`, WhatsApp/telefon linklerini tek yerden yakalayan dinleyici),
`src/components/TrackEvent.tsx` (sunucu sayfalarından olay). Yeni bir WhatsApp linkine kaynak vermek için
linkin kendisine ya da bir üst öğesine `data-track-source="..."` (ve gerekiyorsa `data-tour-slug`) ekleyin.

## 2. Otomatik kurulum (script)

Dashboard'lar `scripts/posthog-dashboards.mjs` ile API'den oluşturuldu (1 Kasım 2026):
Genel Bakış, Satış Hunisi, Ana Sayfa Etkileşimi, Sadakat. Tekrar kurmak için:

```bash
node --env-file=.env.local scripts/posthog-dashboards.mjs
```

`.env.local` içinde `POSTHOG_PERSONAL_API_KEY` (insight + dashboard yazma yetkili) ve `POSTHOG_PROJECT_ID` olmalı.
Aynı adlı dashboard varsa atlanır. "Kullanıcı yolları" (User Paths) grafiği script'te yok, elle eklenebilir.

## 2b. Elle oluşturma (genel)

1. PostHog → sol menü **Dashboards** → **New dashboard** → **Blank dashboard**.
2. Ad: aşağıdaki başlık. Kaydet.
3. Her grafik için: **Product analytics** → **New insight** → tür seç → ayarları yap →
   **Save & add to dashboard** → ilgili dashboard'u seç.
4. Tüm grafiklerde iç trafiği dışlamak için: **Settings → Project → Filter out internal and test users**
   açın ve `$host` = `localhost` olanları filtreye ekleyin. Grafiklerde "Filter out internal and test users" kutusunu işaretleyin.

---

## Dashboard A — "Genel Bakış" (her gün bakılacak)

| # | Grafik adı | Tür | Ayarlar | Ne cevaplar? |
|---|---|---|---|---|
| A1 | Günlük ziyaretçi | Trends | Seri: `$pageview`, ölçüm **Unique users**. Aralık: Son 30 gün, Gruplama: Günlük. İkinci seri: `$pageview` **Total count** | Siteye günde kaç kişi geliyor, kaç sayfa bakıyor? |
| A2 | Haftalık ziyaretçi (karşılaştırmalı) | Trends | `$pageview` Unique users, Haftalık, Son 12 hafta, **Compare to previous period** açık | Geçen döneme göre büyüyor muyuz? |
| A3 | En çok bakılan sayfalar | Trends → **Table** görünüm | `$pageview` Total count, Breakdown: `$pathname`, Son 30 gün | Hangi sayfalar ilgi görüyor? |
| A4 | En çok bakılan turlar | Trends → **Table** | `tour_view` Unique users, Breakdown: `tour_slug` | Hangi tur en çok ilgi çekiyor? |
| A5 | Trafik kaynakları | Trends → **Pie** | `$pageview` Unique users, Breakdown: `$referring_domain` (alternatif: `$initial_utm_source`) | Ziyaretçiler Google'dan mı, Instagram'dan mı, direkt mi geliyor? |
| A6 | Cihaz dağılımı | Trends → **Pie** | `$pageview` Unique users, Breakdown: `$device_type` | Mobil mi masaüstü mü? |
| A7 | Rezervasyon talepleri | Trends → **Number** (Bold number) | `reservation_submit` Total count, Son 7 gün, Compare to previous period | Bu hafta kaç rezervasyon talebi geldi? |
| A8 | WhatsApp tıklamaları | Trends → **Number** | `whatsapp_click` Total count, Son 7 gün, Compare to previous period | Bu hafta kaç kişi WhatsApp'tan yazmaya çalıştı? |

## Dashboard B — "Satış Hunisi"

| # | Grafik adı | Tür | Ayarlar | Ne cevaplar? |
|---|---|---|---|---|
| B1 | Ana sayfa → Tur → Rezervasyon | **Funnel** | Adım 1: `$pageview` filtre `$pathname` = `/`. Adım 2: `tour_view`. Adım 3: `reservation_open`. Adım 4: `reservation_submit`. Conversion window: 1 gün. Son 30 gün | Ziyaretçilerin yüzde kaçı her adımda kayboluyor? |
| B2 | Tur → İletişim (WhatsApp dahil) | **Funnel** | Adım 1: `tour_view`. Adım 2: `reservation_open` **veya** `whatsapp_click` (adımda "+ Add action/event" ile OR). Adım 3: `reservation_submit` | WhatsApp'ı da sayınca tur sayfası kaç kişiyi iletişime geçiriyor? |
| B3 | Huni – cihaza göre | **Funnel** | B1'in kopyası, Breakdown: `$device_type` | Mobilde huni masaüstünden kötü mü? |
| B4 | Rezervasyon nereden açılıyor? | Trends → **Bar** | `reservation_open` Total count, Breakdown: `source` | Kart mı, detay butonu mu, mobil alt çubuk mu daha çok kullanılıyor? |
| B5 | Form tamamlama oranı (kaynağa göre) | **Funnel** | Adım 1: `reservation_open`, Adım 2: `reservation_submit`, Breakdown: `source` | Formu açıp vazgeçen çok mu? |
| B6 | WhatsApp nereden tıklanıyor? | Trends → **Bar** | `whatsapp_click` Total count, Breakdown: `source` | Hangi WhatsApp butonu işe yarıyor? |
| B7 | Tur bazında rezervasyon | Trends → **Table** | Seri A: `tour_view` Unique users, Seri B: `reservation_submit` Total count, Seri C: `whatsapp_click` Total count; Breakdown: `tour_slug` | Hangi tur çok bakılıyor ama az satıyor? |
| B8 | Rezervasyon hataları | Trends | `reservation_error` Total count, Günlük | Form bozuldu mu? (0 olmalı) |

## Dashboard C — "Ana Sayfa Etkileşimi"

| # | Grafik adı | Tür | Ayarlar | Ne cevaplar? |
|---|---|---|---|---|
| C1 | Ne aranıyor? | Trends → **Table** | `hero_search` Total count, Breakdown: `term` | İnsanlar hangi yerleri arıyor? (yeni tur fikri) |
| C2 | Hızlı linkler | Trends → **Bar** | `hero_quick_link` Breakdown: `label` | Günübirlik mi Kapadokya mı daha çok tıklanıyor? |
| C3 | Gezgin sekmeleri | Trends → **Bar** | `explorer_tab` Breakdown: `tab` | Hangi tur kategorisi ilgi görüyor? |
| C4 | Ay seçimi | Trends → **Bar** | `explorer_month` Breakdown: `month` | İnsanlar hangi ay için tur arıyor? |
| C5 | Sıradaki kalkış kartı | Trends → Number | `next_departure_click` Total count, Son 30 gün | Geri sayım kartı tıklanıyor mu? |
| C6 | Asistan kullanımı | Trends → **Bar** | `assistant_open` Breakdown: `source` | "Hafta sonu ne yapsam?" asistanı kullanılıyor mu, nereden? |

## Dashboard D — "Sadakat"

| # | Grafik adı | Tür | Ayarlar | Ne cevaplar? |
|---|---|---|---|---|
| D1 | Geri dönen ziyaretçi | **Retention** | Başlangıç olayı: `$pageview`, dönüş olayı: `$pageview`, Haftalık, Son 8 hafta | Gelenler tekrar geliyor mu? |
| D2 | Tur bakanlar geri geliyor mu | **Retention** | Başlangıç: `tour_view`, Dönüş: `tour_view`, Haftalık | Tur inceleyen kişi sonraki haftalarda yine bakıyor mu? |
| D3 | Yeni vs geri dönen | **Lifecycle** | `$pageview`, Haftalık | Büyüme yeni ziyaretçiden mi, geri dönenden mi? |
| D4 | Kullanıcı yolları | **User Paths** | Başlangıç: `$pageview` `/`, Olay türü: Page views | Ana sayfadan sonra insanlar nereye gidiyor? |

## 3. "Kim ne yaptı?" — tek kişiye bakmak

- **People** → bir ziyaretçi seç → **Events** sekmesi: o kişinin tüm olayları zaman sırasıyla.
  `person_profiles: 'identified_only'` olduğu için anonim kişiler "anonymous" görünür; olaylar yine de listelenir.
- **Activity → Live events**: siteye şu an kim ne yapıyor, canlı izleme.
- Bir olaydan kişiye: herhangi bir grafikte nokta/sütuna tıkla → **View persons**.
- Oturum kaydı (Session Replay) açıksa, kişi sayfasında **Recordings** ile ekran kaydı izlenebilir.
  Açmak için: Settings → Session replay → aç; form alanlarının maskelendiğini (varsayılan) kontrol edin.

## 4. Kontrol listesi

- [ ] Branch `main`'e alınıp Vercel'e çıktıktan sonra **Activity → Live events**'te `tour_view`, `reservation_open`, `whatsapp_click` görünüyor mu?
- [ ] Localhost trafiği filtrelendi mi?
- [ ] 4 dashboard oluşturuldu, A en üste sabitlendi (dashboard menüsü → **Pin**).
