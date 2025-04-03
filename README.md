# buyuk-aytac-travel - My Tourism Company

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Özellikler

- Responsive modern tasarım
- Admin paneli ile içerik yönetimi
- Tour ve Destination modellerini kullanarak tur ve destinasyon yönetimi
- MongoDB veritabanı entegrasyonu
- Yıllık program ve kategori sayfaları

## Süresi Geçmiş Turları Otomatik Kontrol Etme

Site, belirlenen bitiş tarihi geçmiş turları otomatik olarak pasif hale getiren bir özelliğe sahiptir. Bu özellik şu şekilde çalışır:

1. Tur eklerken veya düzenlerken, bitiş tarihi (End Date) belirlenebilir.
2. `/api/cron/expired-tours` API endpoint'i çağrıldığında, bitiş tarihi geçmiş ve hala aktif olan tüm turlar tespit edilir ve otomatik olarak pasif duruma getirilir.
3. Bu API'nin düzenli olarak çalıştırılması için Vercel deployment'ı sonrasında bir harici cron job servisi kullanılmalıdır.

### Cron Job Kurulumu

1. Web sitenizi Vercel'e deploy edin.
2. [cron-job.org](https://cron-job.org) gibi bir serviste hesap oluşturun.
3. Yeni bir cron job ekleyin ve URL'i `https://your-domain.com/api/cron/expired-tours` olarak ayarlayın.
4. Çalışma zamanını "her gün gece yarısı" (00:00) olarak ayarlayın.

### Yerel Test

Yerel geliştirme ortamında bu özelliği test etmek için:

```bash
curl http://localhost:3000/api/cron/expired-tours
```

## Kurulum

1. Repo'yu klonlayın
2. Bağımlılıkları yükleyin:
```bash
npm install
```
3. `.env.local` dosyasını oluşturup MongoDB bağlantı bilgilerinizi ekleyin:
```
MONGODB_URI=mongodb+srv://your-connection-string
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```
4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Admin Paneline Erişim

- URL: `/admin/login`
- Kullanıcı adı: `admin`
- Şifre: `admin123`

## Teknolojiler

- Next.js 14
- MongoDB ve Mongoose
- TypeScript
- Tailwind CSS
- Next Auth
