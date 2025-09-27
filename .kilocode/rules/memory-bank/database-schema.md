# Büyük Aytaç Travel - Veritabanı Şema Dokümantasyonu

## 📊 Veritabanı Genel Bilgiler

- **Database Type**: MongoDB (NoSQL)
- **ODM**: Mongoose 8.13.1
- **Connection**: MongoDB Atlas (Cloud)
- **Database Name**: buyuk-aytac-travel

## 📁 Collections

### 1. Tours Collection

**Collection Name**: `tours`

**Schema**:
```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 5000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'TRY',
    enum: ['TRY', 'USD', 'EUR']
  },
  duration: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    index: true
  },
  endDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['daily', 'overnight', 'international', 'last-minute'],
    index: true
  },
  images: [{
    url: String,
    alt: String,
    order: Number
  }],
  included: [String],
  excluded: [String],
  program: [{
    day: Number,
    title: String,
    description: String,
    meals: {
      breakfast: Boolean,
      lunch: Boolean,
      dinner: Boolean
    }
  }],
  departureLocation: {
    city: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  maxParticipants: {
    type: Number,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  minParticipants: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: 'admin'
  }
}
```

**Indexes**:
- `{ slug: 1 }` - Unique index
- `{ category: 1, isActive: 1 }` - Compound index
- `{ startDate: 1 }` - Single index
- `{ createdAt: -1 }` - Single index
- `{ isActive: 1, isFeatured: 1 }` - Compound index

### 2. Blogs Collection

**Collection Name**: `blogs`

**Schema**:
```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 500
  },
  author: {
    name: String,
    avatar: String,
    bio: String
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  publishedAt: {
    type: Date,
    index: true
  },
  isPublished: {
    type: Boolean,
    default: false,
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 5
  },
  likes: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  relatedPosts: [{
    type: ObjectId,
    ref: 'Blog'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ slug: 1 }` - Unique index
- `{ isPublished: 1, publishedAt: -1 }` - Compound index
- `{ category: 1 }` - Single index
- `{ tags: 1 }` - Multi-key index
- `{ isPublished: 1, isFeatured: 1 }` - Compound index

### 3. Destinations Collection

**Collection Name**: `destinations`

**Schema**:
```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxLength: 300
  },
  image: {
    url: String,
    alt: String
  },
  gallery: [{
    url: String,
    alt: String,
    caption: String
  }],
  country: {
    type: String,
    required: true,
    index: true
  },
  city: {
    type: String,
    index: true
  },
  region: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  highlights: [String],
  attractions: [{
    name: String,
    description: String,
    image: String
  }],
  bestTimeToVisit: String,
  climate: {
    summer: String,
    winter: String,
    spring: String,
    autumn: String
  },
  transportation: {
    byAir: String,
    byRoad: String,
    byRail: String,
    local: String
  },
  accommodation: [{
    type: String,
    priceRange: String,
    description: String
  }],
  cuisine: [String],
  shopping: [String],
  tips: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  relatedTours: [{
    type: ObjectId,
    ref: 'Tour'
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ slug: 1 }` - Unique index
- `{ country: 1, city: 1 }` - Compound index
- `{ isActive: 1, isFeatured: 1 }` - Compound index

### 4. Reservations Collection

**Collection Name**: `reservations`

**Schema**:
```javascript
{
  _id: ObjectId,
  reservationNumber: {
    type: String,
    required: true,
    unique: true
  },
  tour: {
    type: ObjectId,
    ref: 'Tour',
    required: true
  },
  customer: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    tcNo: String,
    birthDate: Date,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  participants: [{
    firstName: String,
    lastName: String,
    tcNo: String,
    birthDate: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    }
  }],
  numberOfAdults: {
    type: Number,
    required: true,
    min: 1
  },
  numberOfChildren: {
    type: Number,
    default: 0,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed', 'refunded'],
    default: 'pending',
    index: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'bank_transfer', 'online']
  },
  paymentDetails: {
    transactionId: String,
    paymentDate: Date,
    bankName: String,
    installments: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
    index: true
  },
  notes: String,
  specialRequests: String,
  pickupLocation: String,
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: Date,
  cancelledAt: Date,
  cancellationReason: String
}
```

**Indexes**:
- `{ reservationNumber: 1 }` - Unique index
- `{ tour: 1, status: 1 }` - Compound index
- `{ customer.email: 1 }` - Single index
- `{ paymentStatus: 1 }` - Single index
- `{ status: 1 }` - Single index
- `{ createdAt: -1 }` - Single index

### 5. Contacts Collection

**Collection Name**: `contacts`

**Schema**:
```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: String,
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  tourSlug: String,
  type: {
    type: String,
    enum: ['general', 'reservation', 'complaint', 'suggestion'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new',
    index: true
  },
  repliedAt: Date,
  replyMessage: String,
  ipAddress: String,
  userAgent: String,
  source: {
    type: String,
    enum: ['website', 'mobile', 'email'],
    default: 'website'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}
```

**Indexes**:
- `{ status: 1, createdAt: -1 }` - Compound index
- `{ email: 1 }` - Single index

### 6. Newsletter Subscribers Collection (Planned)

**Collection Name**: `subscribers`

**Schema**:
```javascript
{
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: String,
  preferences: {
    tours: Boolean,
    blogs: Boolean,
    promotions: Boolean
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: Date,
  unsubscribeToken: String,
  source: String,
  ipAddress: String
}
```

## 🔗 Relationships

### Tour ↔ Destination
- Destinations can have multiple related tours
- Tours belong to specific destinations

### Tour ↔ Reservation
- One tour can have multiple reservations
- Each reservation belongs to one tour

### Blog ↔ Blog (Related Posts)
- Blogs can reference other related blog posts

### Tour ↔ Blog
- Blog posts can reference related tours
- Tours can be mentioned in blog posts

## 📈 Performance Optimizations

### Query Optimization Tips
1. **Use Projections**: Only fetch required fields
2. **Pagination**: Implement cursor-based pagination for large datasets
3. **Aggregation Pipeline**: Use for complex queries
4. **Lean Queries**: Use `.lean()` for read-only operations
5. **Population**: Limit populated fields

### Example Optimized Queries

```javascript
// Efficient tour listing with pagination
Tour.find({ isActive: true, category: 'daily' })
  .select('title slug price startDate images.0')
  .sort({ startDate: 1 })
  .limit(20)
  .skip(page * 20)
  .lean();

// Aggregation for tour statistics
Tour.aggregate([
  { $match: { isActive: true } },
  { $group: {
    _id: '$category',
    count: { $sum: 1 },
    avgPrice: { $avg: '$price' }
  }}
]);
```

## 🔒 Data Validation Rules

### Email Validation
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Phone Validation (Turkey)
```javascript
/^(\+90|0)?[0-9]{10}$/
```

### TC Kimlik No Validation
```javascript
/^[1-9]{1}[0-9]{10}$/
```

### Slug Generation
```javascript
title.toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .trim();
```

## 🔄 Migration Strategy

### Schema Versioning
- Track schema versions in a separate collection
- Implement migration scripts for schema changes
- Use backward-compatible changes when possible

### Backup Strategy
- Daily automated backups via MongoDB Atlas
- Point-in-time recovery enabled
- Cross-region backup replication

## 📊 Database Statistics

### Expected Data Volume
- Tours: ~100-500 documents
- Blogs: ~50-200 documents
- Destinations: ~50-100 documents
- Reservations: ~1000-5000 documents/year
- Contacts: ~500-2000 documents/year

### Storage Estimates
- Initial: ~100MB
- 1 Year: ~500MB
- 3 Years: ~2GB

---

**Dokümantasyon Versiyonu**: 1.0.0  
**Son Güncelleme**: 27 Ocak 2025  
**Database Admin**: db@buyukaytactravel.com