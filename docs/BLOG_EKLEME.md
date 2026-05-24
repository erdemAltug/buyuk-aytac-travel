# Blog Nasıl Eklenir?

Bu projede blog yazısı eklemenin iki yolu vardır: **admin paneli** ve **seed script** (SEO içerikleri için).

Blog detay sayfası: `/blog/[slug]`

---

## Ön koşullar

- `.env.local` dosyasında `MONGODB_URI` tanımlı olmalı
- Kapak görseli `public/images/` veya `public/images/blogs/` altına konur
- İçerik HTML formatında yazılır (`<h2>`, `<p>`, `<ul>`, `<a href="...">` vb.)

---

## Yöntem 1: Admin paneli

1. `/admin/login` adresinden giriş yapın
2. **Blog → Yeni Yazı** (`/admin/blogs/new`)
3. Formu doldurun:
   - **Başlık** — kayıt sırasında otomatik slug üretilir
   - **Özet** — liste ve meta için kısa açıklama
   - **İçerik** — HTML editör alanı
   - **Yazar** — varsayılan: Altuğ Erdem
   - **Kategoriler**
   - **Yayın tarihi** ve **yayında mı** durumu
4. Kapak görselini yükleyin
5. Kaydedin

Düzenleme: `/admin/blogs/edit/[slug]`

---

## Yöntem 2: Seed script (SEO blogları)

Toplu SEO içeriği için script kullanılır. İki ana dosya:

| Script | İçerik |
|--------|--------|
| `scripts/seed-cerkezkoy-seo-blogs.ts` | Çerkezköy odaklı SEO yazıları |
| `scripts/seed-tour-seo-blogs.ts` | Tur odaklı SEO rehberleri |

### Yeni blog ekleme

1. İlgili script dosyasını açın
2. `blogs` / `tourBlogs` dizisine yeni nesne ekleyin:

```typescript
{
  title: 'Blog Başlığı | Anahtar Kelime 2026',
  slug: 'blog-url-slug',              // benzersiz, küçük harf, tire
  summary: 'Arama sonuçlarında görünen kısa özet (1-2 cümle).',
  focusKeyword: 'ana anahtar kelime',
  metaDescription: '160 karaktere kadar meta açıklama.',
  keywords: ['kelime1', 'kelime2', 'çerkezköy tur'],
  image: '/images/kapak-gorseli.jpeg',
  featuredPost: true,                 // ana sayfa blog önizlemesi
  readingTime: 8,                       // dakika
  content: `
<h2>Bölüm Başlığı</h2>
<p>Paragraf metni. <strong>Önemli kelime</strong> vurgusu.</p>
<ul>
  <li><a href="/tours/tur-slug">Tur linki</a></li>
  <li><a href="/cerkezkoy-tur">Çerkezköy turları</a></li>
</ul>
<p><a href="/contact">Rezervasyon</a></p>
`,
},
```

3. Scripti çalıştırın:

```bash
# Çerkezköy SEO blogları
npx tsx scripts/seed-cerkezkoy-seo-blogs.ts

# Tur odaklı SEO blogları
npx tsx scripts/seed-tour-seo-blogs.ts
```

Script **slug ile upsert** yapar: yazı varsa günceller, yoksa ekler.

---

## SEO alanları

| Alan | Açıklama |
|------|----------|
| `title` | Sayfa `<title>` ve H1 |
| `slug` | URL: `/blog/[slug]` |
| `summary` | Blog listesinde görünen özet |
| `metaDescription` | Arama motoru snippet (max ~160 karakter) |
| `focusKeyword` | Odak anahtar kelime |
| `keywords` | İlgili kelime dizisi |
| `featuredPost` | Ana sayfada öne çıkan blog |
| `readingTime` | Tahmini okuma süresi (dakika) |

Model: `src/models/Blog.ts` · Tip: `src/types/blog.ts`

---

## İç linkleme (önemli)

SEO bloglarında site içi linkler kullanın:

| Hedef | Örnek link |
|-------|------------|
| Tur detay | `/tours/kapadokya-turu-19-21-haziran-2026` |
| Günübirlik turlar | `/tours?accommodationType=daily` |
| Konaklamalı turlar | `/tours?accommodationType=with_accommodation` |
| Yıllık program | `/annual-program` |
| Çerkezköy sayfası | `/cerkezkoy-tur` |
| İletişim | `/contact` |

---

## Görsel kullanımı

- Yerel görseller: `/images/dosya.jpeg` → dosya `public/images/` altında
- Blog görselleri: `public/images/blogs/` altına da konulabilir
- Admin panelden yükleme: AWS S3 URL döner

---

## Kontrol listesi

- [ ] `slug` benzersiz ve URL dostu
- [ ] `metaDescription` 160 karakteri aşmıyor
- [ ] Kapak görseli mevcut ve yolu doğru
- [ ] İçerikte en az 2-3 site içi link var
- [ ] `isPublished: true` (scriptlerde varsayılan)
- [ ] `/blog/[slug]` sayfası tarayıcıda kontrol edildi
- [ ] Sitemap'e otomatik dahil olur (`src/app/sitemap.ts`)
