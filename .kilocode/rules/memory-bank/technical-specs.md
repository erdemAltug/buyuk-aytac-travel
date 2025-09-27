# Büyük Aytaç Travel - Teknik Spesifikasyonlar

## 🏗️ Sistem Mimarisi

### Frontend Mimarisi
```
Next.js 15 App Router
├── Server Components (Default)
├── Client Components (Interactive)
├── API Routes (Backend)
├── Static Generation (SSG)
├── Server-Side Rendering (SSR)
└── Incremental Static Regeneration (ISR)
```

### Backend Mimarisi
- **API Layer**: Next.js API Routes
- **Business Logic**: Service Layer Pattern
- **Data Access**: Mongoose ODM
- **Authentication**: Session-based
- **File Storage**: AWS S3
- **Email Service**: Nodemailer SMTP

## 💻 Teknoloji Stack Detayları

### Core Technologies
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| Next.js | 15.2.4 | Full-stack React framework |
| React | 19.0.0 | UI library |
| TypeScript | 5.x | Type safety |
| Node.js | 20.x | Runtime environment |
| MongoDB | 7.x | NoSQL database |
| Mongoose | 8.13.1 | MongoDB ODM |

### Frontend Libraries
| Library | Versiyon | Kullanım |
|---------|----------|----------|
| TailwindCSS | 4.x | Utility-first CSS |
| Heroicons | 2.2.0 | Icon library |
| React DOM | 19.0.0 | DOM rendering |

### Backend Libraries
| Library | Versiyon | Kullanım |
|---------|----------|----------|
| AWS SDK | 2.1692.0 | S3 integration |
| Multer | 1.4.5 | File upload handling |
| Multer-S3 | 3.0.1 | S3 upload middleware |
| Nodemailer | 6.10.0 | Email service |
| Axios | 1.8.4 | HTTP client |
| XLSX | 0.18.5 | Excel file processing |

## 🔧 Sistem Gereksinimleri

### Minimum Gereksinimler
- **Node.js**: 20.0.0 veya üzeri
- **NPM**: 10.0.0 veya üzeri
- **RAM**: 4GB
- **Disk**: 10GB boş alan
- **İşlemci**: 2 Core

### Önerilen Gereksinimler
- **Node.js**: 20.x LTS
- **NPM**: 10.x
- **RAM**: 8GB
- **Disk**: 20GB SSD
- **İşlemci**: 4 Core

## 🌐 API Mimarisi

### RESTful API Standartları
```
GET    /api/tours          # Tüm turları listele
GET    /api/tours/:slug    # Tek tur detayı
POST   /api/tours          # Yeni tur ekle
PUT    /api/tours/:slug    # Tur güncelle
DELETE /api/tours/:slug    # Tur sil
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

## 🗄️ Veritabanı Tasarımı

### Collections
1. **tours** - Tur bilgileri
2. **blogs** - Blog yazıları
3. **destinations** - Destinasyon bilgileri
4. **reservations** - Rezervasyon kayıtları
5. **contacts** - İletişim formları

### Indexler
```javascript
// Tours Collection
{ slug: 1 } - Unique
{ category: 1, isActive: 1 }
{ startDate: 1 }
{ createdAt: -1 }

// Blogs Collection
{ slug: 1 } - Unique
{ isPublished: 1, publishedAt: -1 }
{ category: 1 }
{ tags: 1 }

// Destinations Collection
{ slug: 1 } - Unique
{ country: 1, city: 1 }
```

## 🔒 Güvenlik Önlemleri

### Input Validation
- Tüm kullanıcı girdileri validate edilir
- XSS koruması için HTML sanitization
- SQL/NoSQL injection koruması
- File upload type ve size kontrolü

### Authentication & Authorization
```typescript
// Admin authentication flow
1. Username/password POST to /api/admin/login
2. Server validates credentials
3. Session created with httpOnly cookie
4. Subsequent requests check session
5. Session expires after inactivity
```

### Security Headers
```javascript
// next.config.js security headers
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'"
}
```

## ⚡ Performance Optimizasyonları

### Frontend Optimizasyonları
1. **Image Optimization**
   - Next/Image component kullanımı
   - WebP format desteği
   - Lazy loading
   - Responsive images

2. **Code Splitting**
   - Dynamic imports
   - Route-based splitting
   - Component lazy loading

3. **Caching Strategy**
   ```javascript
   // Static pages: 1 hour cache
   'Cache-Control': 's-maxage=3600, stale-while-revalidate'
   
   // API responses: 5 minutes cache
   'Cache-Control': 's-maxage=300, stale-while-revalidate'
   ```

### Backend Optimizasyonları
1. **Database**
   - Connection pooling
   - Query optimization
   - Proper indexing
   - Aggregation pipelines

2. **API Performance**
   - Response compression
   - Pagination
   - Field filtering
   - Caching headers

## 📊 Monitoring ve Logging

### Error Tracking
```typescript
// Error handling pattern
try {
  // Business logic
} catch (error) {
  console.error('Error context:', {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    request: {
      method: req.method,
      url: req.url,
      body: req.body
    }
  });
  // Send to monitoring service (future)
}
```

### Performance Metrics
- Page load time < 3s
- Time to First Byte (TTFB) < 200ms
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1

## 🔄 CI/CD Pipeline

### Development Workflow
```bash
1. Feature branch oluştur
2. Kod geliştir ve test et
3. Pull request aç
4. Code review
5. Merge to main
6. Auto-deploy to Vercel
```

### Deployment Process
1. **Vercel Integration**
   - GitHub repository bağlantısı
   - Automatic deployments on push
   - Preview deployments for PRs
   - Production deployment on main branch

2. **Environment Management**
   - Development: Local environment
   - Staging: Vercel preview deployments
   - Production: Vercel production

## 🧪 Test Stratejisi

### Test Türleri
1. **Unit Tests** (Planlanıyor)
   - Component testing
   - Utility function testing
   - Service layer testing

2. **Integration Tests** (Planlanıyor)
   - API endpoint testing
   - Database operations
   - External service mocking

3. **E2E Tests** (Planlanıyor)
   - User flow testing
   - Cross-browser testing
   - Mobile responsiveness

### Test Coverage Hedefleri
- Code coverage: >80%
- Critical path coverage: 100%
- API endpoint coverage: 100%

## 📱 Responsive Design Breakpoints

```css
/* TailwindCSS v4 Default Breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

## 🌍 Internationalization (i18n)

### Gelecek Plan
- Türkçe (TR) - Default
- İngilizce (EN) - Planned
- Almanca (DE) - Planned
- Rusça (RU) - Planned

### Implementation Strategy
```typescript
// Planned i18n structure
/locales
  /tr
    common.json
    tours.json
    blog.json
  /en
    common.json
    tours.json
    blog.json
```

## 🔌 Third-Party Integrations

### Mevcut Entegrasyonlar
1. **AWS S3**
   - Image storage
   - Document storage
   - Backup storage

2. **SMTP (Gmail/Custom)**
   - Transactional emails
   - Contact form notifications
   - Reservation confirmations

### Planlanan Entegrasyonlar
1. **Payment Gateway**
   - iyzico
   - PayTR
   - Stripe

2. **Analytics**
   - Google Analytics 4
   - Google Tag Manager
   - Hotjar

3. **Marketing**
   - Mailchimp
   - WhatsApp Business API
   - SMS Gateway

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless application design
- Database replication support
- CDN integration ready
- Load balancer compatible

### Vertical Scaling
- Efficient resource usage
- Memory optimization
- Database query optimization
- Caching strategies

---

**Dokümantasyon Versiyonu**: 1.0.0  
**Son Güncelleme**: 27 Ocak 2025  
**Teknik İletişim**: dev@buyukaytactravel.com