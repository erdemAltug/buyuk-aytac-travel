# Buyuk Aytac Travel - Tour Agency 


Çerkezköy merkezli tur ve seyahat hizmetleri sunan Büyük Aytaç Travel'ın kurumsal websitesi. Next.js 15, TypeScript ve MongoDB kullanılarak geliştirilmiştir.

## 🚀 Teknoloji Stack

- **Next.js** 15.2.4 (App Router)
- **React** 19.0.0
- **TypeScript** 5.x
- **MongoDB** (Mongoose 8.13.1)
- **TailwindCSS** 4.x
- **AWS S3** (Görsel yüklemeleri için)
- **Node.js** 20.x

## 📋 Özellikler

- ✅ Responsive modern tasarım
- ✅ SEO optimizasyonu (Server Components, Metadata API)
- ✅ Admin paneli ile içerik yönetimi
- ✅ Dinamik tur ve destinasyon yönetimi
- ✅ Blog sistemi
- ✅ MongoDB veritabanı entegrasyonu
- ✅ AWS S3 görsel yükleme
- ✅ Sitemap ve schema.org desteği
- ✅ Çerkezköy yerel SEO optimizasyonu

## 🛠️ Kurulum

1. **Repo'yu klonlayın**
```bash
git clone [repo-url]
cd buyuk-aytac-travel
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**
`.env.local` dosyası oluşturun:
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

# AWS S3 Configuration for Image Uploads
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=eu-central-1
S3_BUCKET_NAME=your-s3-bucket-name

# SMTP Configuration for Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@buyukaytactravel.com
EMAIL_TO=info@buyukaytactravel.com

# Admin credentials for initial setup
ADMIN_USERNAME=admin
ADMIN_PASSWORD=securepassword
```

4. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

## 📦 Build ve Deployment

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. GitHub repo'nuzu import edin
3. Environment variable'ları Vercel dashboard'dan ekleyin
4. Deploy butonuna tıklayın

### Post-Deployment Checklist
- [ ] Environment variable'ların doğru ayarlandığını kontrol edin
- [ ] MongoDB connection'ın çalıştığını doğrulayın
- [ ] AWS S3 bucket policy'lerini kontrol edin
- [ ] SMTP ayarlarını test edin
- [ ] Admin paneline erişimi doğrulayın
- [ ] Sitemap'i Google Search Console'a gönderin

## 🔄 Otomatik İşlemler

### Süresi Geçmiş Turları Kontrol Etme
Site, belirlenen bitiş tarihi geçmiş turları otomatik olarak pasif hale getiren bir özelliğe sahiptir:

```bash
# Yerel test
curl http://localhost:3000/api/cron/expired-tours

# Production
curl https://your-domain.com/api/cron/expired-tours
```

Vercel'de cron job ayarlamak için `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/expired-tours",
    "schedule": "0 0 * * *"
  }]
}
```

## 📁 Proje Yapısı

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── admin/        # Admin panel
│   │   ├── blog/         # Blog sayfaları
│   │   ├── tours/        # Tur sayfaları
│   │   └── destinasyonlar/ # Destinasyon sayfaları
│   ├── components/       # React componentleri
│   ├── models/          # Mongoose modelleri
│   ├── services/        # API servisleri
│   └── lib/             # Yardımcı fonksiyonlar
├── public/              # Statik dosyalar
└── scripts/             # Yardımcı scriptler
```

## 🔍 SEO ve Performans

- Server-side rendering ile hızlı yükleme
- Automatic static optimization
- Image optimization (Next/Image)
- Sitemap.xml otomatik oluşturma
- Schema.org yapılandırılmış veri
- Çerkezköy odaklı yerel SEO

## 📞 İletişim

Büyük Aytaç Travel
- Web: [www.buyukaytactravel.com](https://www.buyukaytactravel.com)
- Email: info@buyukaytactravel.com

---
Developed with ❤️ by Büyük Aytaç Travel Team
