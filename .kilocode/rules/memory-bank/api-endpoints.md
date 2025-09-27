# Büyük Aytaç Travel - API Endpoint Dokümantasyonu

## 🌐 API Genel Bilgiler

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://www.buyukaytactravel.com/api`

### Response Format
Tüm API yanıtları aşağıdaki formatta döner:
```typescript
{
  success: boolean,
  data?: any,
  error?: {
    code: string,
    message: string,
    details?: any
  },
  meta?: {
    page?: number,
    limit?: number,
    total?: number
  }
}
```

### HTTP Status Codes
- `200 OK` - İstek başarılı
- `201 Created` - Kaynak oluşturuldu
- `400 Bad Request` - Geçersiz istek
- `401 Unauthorized` - Yetkilendirme hatası
- `404 Not Found` - Kaynak bulunamadı
- `500 Internal Server Error` - Sunucu hatası

## 📍 Tour Endpoints

### GET /api/tours
**Açıklama**: Tüm aktif turları listeler  
**Query Parameters**:
- `category` (optional): Tur kategorisi (daily, overnight, international, last-minute)
- `limit` (optional): Sayfa başına kayıt sayısı (default: 20)
- `page` (optional): Sayfa numarası (default: 1)
- `sort` (optional): Sıralama (price, startDate, -price, -startDate)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Kapadokya Turu",
      "slug": "kapadokya-turu",
      "price": 2500,
      "startDate": "2025-02-15",
      "category": "overnight",
      "images": ["..."],
      "duration": "3 gün 2 gece"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

### GET /api/tours/:slug
**Açıklama**: Belirli bir turun detaylarını getirir  
**Parameters**:
- `slug`: Tur slug'ı

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Kapadokya Turu",
    "slug": "kapadokya-turu",
    "description": "...",
    "price": 2500,
    "duration": "3 gün 2 gece",
    "startDate": "2025-02-15",
    "endDate": "2025-02-17",
    "category": "overnight",
    "images": ["..."],
    "included": ["..."],
    "excluded": ["..."],
    "program": ["..."],
    "viewCount": 150,
    "isActive": true
  }
}
```

### POST /api/tours
**Açıklama**: Yeni tur oluşturur (Admin yetkisi gerekir)  
**Headers**:
- `Authorization`: Admin token

**Request Body**:
```json
{
  "title": "Yeni Tur",
  "description": "Tur açıklaması",
  "price": 1500,
  "duration": "1 gün",
  "startDate": "2025-03-01",
  "category": "daily",
  "images": ["..."],
  "included": ["..."],
  "excluded": ["..."]
}
```

### PUT /api/tours/:slug
**Açıklama**: Mevcut turu günceller (Admin yetkisi gerekir)  
**Headers**:
- `Authorization`: Admin token

**Parameters**:
- `slug`: Tur slug'ı

**Request Body**: POST ile aynı

### DELETE /api/tours/:slug
**Açıklama**: Turu siler (Admin yetkisi gerekir)  
**Headers**:
- `Authorization`: Admin token

**Parameters**:
- `slug`: Tur slug'ı

### POST /api/tours/:slug/view
**Açıklama**: Tur görüntülenme sayısını artırır  
**Parameters**:
- `slug`: Tur slug'ı

## 📝 Blog Endpoints

### GET /api/blogs
**Açıklama**: Yayınlanmış blog yazılarını listeler  
**Query Parameters**:
- `category` (optional): Blog kategorisi
- `tag` (optional): Blog etiketi
- `limit` (optional): Sayfa başına kayıt sayısı
- `page` (optional): Sayfa numarası

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Çerkezköy'den Günübirlik Turlar",
      "slug": "cerkezkoyden-gunubirlik-turlar",
      "excerpt": "...",
      "author": "Admin",
      "category": "Seyahat İpuçları",
      "tags": ["günübirlik", "çerkezköy"],
      "featuredImage": "...",
      "publishedAt": "2025-01-15",
      "readTime": "5 dk"
    }
  ]
}
```

### GET /api/blogs/:slug
**Açıklama**: Belirli bir blog yazısının detaylarını getirir  
**Parameters**:
- `slug`: Blog slug'ı

### POST /api/blogs
**Açıklama**: Yeni blog yazısı oluşturur (Admin yetkisi gerekir)  
**Headers**:
- `Authorization`: Admin token

**Request Body**:
```json
{
  "title": "Yeni Blog Yazısı",
  "content": "İçerik HTML formatında",
  "excerpt": "Özet",
  "category": "Kategori",
  "tags": ["etiket1", "etiket2"],
  "featuredImage": "görsel-url",
  "isPublished": true
}
```

### PUT /api/blogs/:slug
**Açıklama**: Blog yazısını günceller (Admin yetkisi gerekir)

### DELETE /api/blogs/:slug
**Açıklama**: Blog yazısını siler (Admin yetkisi gerekir)

### POST /api/blogs/update-image
**Açıklama**: Blog görselini günceller (Admin yetkisi gerekir)

## 🌍 Destination Endpoints

### GET /api/destinations
**Açıklama**: Tüm destinasyonları listeler  
**Query Parameters**:
- `country` (optional): Ülke filtresi
- `city` (optional): Şehir filtresi

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Kapadokya",
      "slug": "kapadokya",
      "description": "...",
      "image": "...",
      "country": "Türkiye",
      "city": "Nevşehir",
      "highlights": ["..."],
      "bestTimeToVisit": "Nisan-Ekim"
    }
  ]
}
```

### GET /api/destinations/:slug
**Açıklama**: Belirli bir destinasyonun detaylarını getirir

### POST /api/destinations
**Açıklama**: Yeni destinasyon ekler (Admin yetkisi gerekir)

### PUT /api/destinations/:slug
**Açıklama**: Destinasyon günceller (Admin yetkisi gerekir)

### DELETE /api/destinations/:slug
**Açıklama**: Destinasyon siler (Admin yetkisi gerekir)

## 📧 Contact & Reservation Endpoints

### POST /api/contact
**Açıklama**: İletişim formu gönderimi  
**Request Body**:
```json
{
  "name": "Ad Soyad",
  "email": "email@example.com",
  "phone": "0555 555 5555",
  "subject": "Konu",
  "message": "Mesaj",
  "tourSlug": "tur-slug (optional)"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi"
}
```

## 👤 Admin Endpoints

### POST /api/admin/login
**Açıklama**: Admin girişi  
**Request Body**:
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "username": "admin",
      "role": "admin"
    }
  }
}
```

### POST /api/admin/logout
**Açıklama**: Admin çıkışı  
**Headers**:
- `Authorization`: Admin token

### GET /api/admin/dashboard
**Açıklama**: Dashboard istatistikleri (Admin yetkisi gerekir)  
**Response**:
```json
{
  "success": true,
  "data": {
    "totalTours": 45,
    "activeTours": 38,
    "totalBlogs": 23,
    "totalReservations": 156,
    "recentReservations": [...],
    "popularTours": [...]
  }
}
```

## 📤 Upload Endpoints

### POST /api/upload
**Açıklama**: Dosya yükleme (Admin yetkisi gerekir)  
**Headers**:
- `Authorization`: Admin token
- `Content-Type`: multipart/form-data

**Request Body**:
- `file`: Yüklenecek dosya
- `folder`: S3 klasör yolu (optional)

**Response**:
```json
{
  "success": true,
  "data": {
    "url": "https://s3.amazonaws.com/bucket/file.jpg",
    "key": "folder/file.jpg",
    "size": 245632
  }
}
```

## 🔄 Cron Job Endpoints

### GET /api/cron/expired-tours
**Açıklama**: Süresi geçmiş turları pasif hale getirir  
**Headers**:
- `x-cron-secret`: Cron secret key (Vercel)

**Response**:
```json
{
  "success": true,
  "message": "5 tur pasif hale getirildi"
}
```

## 📊 Bulk Operations

### POST /api/admin/tours/bulk-upload
**Açıklama**: Excel dosyasından toplu tur yükleme (Admin yetkisi gerekir)  
**Headers**:
- `Authorization`: Admin token
- `Content-Type`: multipart/form-data

**Request Body**:
- `file`: Excel dosyası (.xlsx)

**Response**:
```json
{
  "success": true,
  "data": {
    "imported": 15,
    "failed": 2,
    "errors": [...]
  }
}
```

### GET /api/admin/tours/template
**Açıklama**: Tur yükleme için Excel şablonu indirir  
**Headers**:
- `Authorization`: Admin token

**Response**: Excel dosyası (binary)

## 🔍 Search Endpoints

### GET /api/search
**Açıklama**: Site genelinde arama (Planlanıyor)  
**Query Parameters**:
- `q`: Arama terimi
- `type`: Arama tipi (tour, blog, destination, all)

## 🛡️ Rate Limiting

API istekleri için rate limiting uygulanacaktır:
- **Public endpoints**: 100 istek/dakika
- **Admin endpoints**: 500 istek/dakika
- **Upload endpoints**: 10 istek/dakika

## 🔐 Authentication

Admin endpoints için JWT token kullanılır:
```javascript
// Header format
Authorization: Bearer <token>
```

Token süresi: 24 saat

## 📝 Error Codes

| Code | Description |
|------|-------------|
| `INVALID_INPUT` | Geçersiz giriş parametreleri |
| `NOT_FOUND` | Kaynak bulunamadı |
| `UNAUTHORIZED` | Yetkilendirme hatası |
| `FORBIDDEN` | Erişim reddedildi |
| `DUPLICATE_ENTRY` | Mükerrer kayıt |
| `FILE_TOO_LARGE` | Dosya boyutu çok büyük |
| `INVALID_FILE_TYPE` | Geçersiz dosya tipi |
| `DATABASE_ERROR` | Veritabanı hatası |
| `EMAIL_SEND_ERROR` | Email gönderim hatası |
| `RATE_LIMIT_EXCEEDED` | İstek limiti aşıldı |

---

**API Versiyon**: 1.0.0  
**Son Güncelleme**: 27 Ocak 2025  
**API Desteği**: api@buyukaytactravel.com