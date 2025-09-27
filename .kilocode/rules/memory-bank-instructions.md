# Büyük Aytaç Travel - Memory Bank Talimatları

## 🎯 Proje Özeti
Büyük Aytaç Travel, Çerkezköy merkezli profesyonel bir tur ve seyahat acentesidir. Next.js 15, TypeScript ve MongoDB kullanılarak geliştirilmiş modern bir web uygulamasıdır.

## 📋 Ana Özellikler

### Mevcut Özellikler
- **Tur Yönetimi**: Günübirlik, konaklamalı, yurtdışı ve son dakika turları
- **Destinasyon Yönetimi**: Popüler destinasyonlar ve detaylı bilgiler
- **Blog Sistemi**: SEO optimizeli blog yazıları
- **Admin Paneli**: İçerik yönetimi için kapsamlı admin arayüzü
- **Rezervasyon Sistemi**: Tur rezervasyonları ve iletişim formları
- **AWS S3 Entegrasyonu**: Görsel yükleme ve yönetimi
- **Email Sistemi**: Nodemailer ile otomatik email gönderimi
- **SEO Optimizasyonu**: Server-side rendering, sitemap, schema.org
- **Responsive Tasarım**: Mobil uyumlu modern arayüz

### Geliştirilmekte Olan Özellikler
- Online ödeme sistemi entegrasyonu
- Müşteri değerlendirme ve yorum sistemi
- Gelişmiş tur arama ve filtreleme
- Canlı destek sistemi

## 🔧 Teknik Detaylar

### Teknoloji Stack
- **Frontend**: Next.js 15.2.4, React 19, TypeScript 5
- **Styling**: TailwindCSS 4, Heroicons
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose 8.13.1)
- **Storage**: AWS S3
- **Email**: Nodemailer
- **Deployment**: Vercel

### Proje Yapısı
```
src/
├── app/              # Next.js App Router
│   ├── api/          # API endpoints
│   ├── admin/        # Admin panel sayfaları
│   ├── blog/         # Blog sayfaları
│   ├── tours/        # Tur sayfaları
│   └── destinasyonlar/ # Destinasyon sayfaları
├── components/       # React componentleri
├── models/          # Mongoose modelleri
├── services/        # Business logic servisleri
└── lib/             # Utility fonksiyonlar
```

## 🗄️ Veritabanı Modelleri

### Tour Model
- `title`: Tur başlığı
- `slug`: SEO-friendly URL
- `description`: Detaylı açıklama
- `price`: Fiyat bilgisi
- `duration`: Süre (gün/saat)
- `startDate`: Başlangıç tarihi
- `endDate`: Bitiş tarihi
- `category`: Tur kategorisi
- `images`: Görsel listesi
- `included`: Dahil olan hizmetler
- `excluded`: Dahil olmayan hizmetler
- `program`: Günlük program
- `isActive`: Aktiflik durumu
- `viewCount`: Görüntülenme sayısı

### Blog Model
- `title`: Başlık
- `slug`: URL slug
- `content`: İçerik (HTML)
- `excerpt`: Özet
- `author`: Yazar
- `category`: Kategori
- `tags`: Etiketler
- `featuredImage`: Öne çıkan görsel
- `publishedAt`: Yayın tarihi
- `isPublished`: Yayın durumu

### Destination Model
- `name`: Destinasyon adı
- `slug`: URL slug
- `description`: Açıklama
- `image`: Görsel
- `country`: Ülke
- `city`: Şehir
- `highlights`: Öne çıkanlar
- `bestTimeToVisit`: En iyi ziyaret zamanı

## 🔐 Güvenlik ve Yetkilendirme

### Admin Panel
- Kullanıcı adı/şifre ile giriş
- Session-based authentication
- Environment variable'lardan credential kontrolü

### API Güvenliği
- CORS ayarları
- Rate limiting (planlanıyor)
- Input validation
- MongoDB injection koruması

## 🚀 Deployment Notları

### Environment Variables
```env
MONGODB_URI          # MongoDB bağlantı string'i
AWS_ACCESS_KEY_ID    # AWS erişim anahtarı
AWS_SECRET_ACCESS_KEY # AWS gizli anahtar
AWS_REGION          # AWS bölgesi
S3_BUCKET_NAME      # S3 bucket adı
SMTP_HOST           # Email sunucu host
SMTP_PORT           # Email sunucu port
SMTP_USER           # Email kullanıcı
SMTP_PASS           # Email şifre
EMAIL_FROM          # Gönderen email
EMAIL_TO            # Alıcı email
ADMIN_USERNAME      # Admin kullanıcı adı
ADMIN_PASSWORD      # Admin şifresi
```

### Vercel Deployment
- Automatic deployments from GitHub
- Environment variables Vercel dashboard'dan yönetilir
- Cron job'lar için vercel.json konfigürasyonu

### Performance Optimizasyonları
- Image optimization (Next/Image)
- Static generation where possible
- Dynamic imports for code splitting
- MongoDB connection pooling

## 📝 Geliştirme Standartları

### Kod Standartları
- TypeScript strict mode
- ESLint ve Prettier konfigürasyonu
- Component-based architecture
- Server Components öncelikli

### Naming Conventions
- Components: PascalCase
- Files: kebab-case
- Variables/Functions: camelCase
- Constants: UPPER_SNAKE_CASE

### Git Workflow
- Feature branch'ler
- Descriptive commit messages
- Pull request reviews
- Semantic versioning

## 🎨 UI/UX Prensipleri

### Design System
- Consistent color palette
- Responsive breakpoints
- Accessibility standards (WCAG)
- Mobile-first approach

### Kullanıcı Deneyimi
- Fast page loads
- Intuitive navigation
- Clear CTAs
- Error handling

## 📊 SEO ve Pazarlama

### SEO Stratejisi
- Çerkezköy yerel SEO
- Schema.org markup
- Dynamic sitemap
- Meta tags optimization
- Open Graph tags

### İçerik Stratejisi
- Regular blog posts
- Destination guides
- Tour descriptions
- Customer testimonials

## 🔄 Sürekli Geliştirme

### Monitoring
- Error tracking (planlanıyor)
- Performance monitoring
- User analytics
- SEO rankings

### Backup ve Recovery
- MongoDB Atlas automated backups
- S3 versioning
- Code repository backups

## 📞 İletişim ve Destek

### Müşteri Desteği
- Contact form
- WhatsApp integration (planlanıyor)
- Email notifications
- FAQ section

### Geliştirici Desteği
- Comprehensive documentation
- Code comments
- API documentation
- Development guidelines

## 🚦 Durum ve Öncelikler

### Tamamlanan Özellikler
✅ Core website functionality
✅ Admin panel
✅ Tour management
✅ Blog system
✅ Contact forms
✅ SEO optimization

### Devam Eden Çalışmalar
🔄 Payment integration
🔄 Review system
🔄 Advanced filtering
🔄 Live chat

### Gelecek Planlar
📅 Mobile app
📅 Loyalty program
📅 Multi-language support
📅 Advanced analytics

---

**Son Güncelleme**: 27 Ocak 2025
**Versiyon**: 1.0.0