import mongoose, { Document, Schema, Types } from 'mongoose';
import type { ITour as ITourBase } from '@/types/tour';
import { TourType, AccommodationType } from '@/types/tour';

// Re-export for server-side code that imports from @/models/Tour
export { TourType, AccommodationType } from '@/types/tour';

export interface ITour extends ITourBase, Document {
  destinationRef?: Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    destination: { 
      type: String, 
      required: true 
    },
    destinationRef: {
      type: Schema.Types.ObjectId,
      ref: 'Destination'
    },
    departureCity: {
      type: String,
      default: 'Çerkezköy'
    },
    tourType: { 
      type: String, 
      enum: Object.values(TourType),
      default: TourType.DOMESTIC
    },
    accommodationType: { 
      type: String, 
      enum: Object.values(AccommodationType),
      default: AccommodationType.WITH_ACCOMMODATION
    },
    startDate: { type: Date },  // Tur başlangıç tarihi
    endDate: { type: Date },    // Tur bitiş tarihi
    isActive: { type: Boolean, default: true },
    isLastMinute: { type: Boolean, default: false }, // Son dakika fırsatı
    discountRate: { type: Number }, // İndirim oranı
    viewCount: { type: Number, default: 0 },     // Görüntülenme sayısı
    additionalServices: [{ 
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String }
    }],
    program: [{ 
      day: { type: String },
      title: { type: String },
      description: { type: String }
    }],
    includedServices: [{ type: String }],
    excludedServices: [{ type: String }],
  },
  { timestamps: true }
);

// Slug oluşturma fonksiyonu - Türkçe karakterleri de destekleyelim
function createSlug(name: string): string {
  return name
    .toString()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')        // Boşlukları tire ile değiştir
    .replace(/[^\w\-]+/g, '')    // Alfanümerik olmayan karakterleri kaldır
    .replace(/\-\-+/g, '-')      // Birden fazla tireyi tek tireye dönüştür
    .replace(/^-+/, '')          // Baştaki tireleri kaldır
    .replace(/-+$/, '');         // Sondaki tireleri kaldır
}

// Kaydetmeden önce slug oluştur
TourSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = this as any;
    doc.slug = createSlug(doc.name);
  }
  next();
});

// Model zaten varsa onu kullan, yoksa oluştur
let Tour: mongoose.Model<ITour>;

// Mongoose modeli tanımlanmışsa
if (mongoose.models && mongoose.models.Tour) {
  Tour = mongoose.models.Tour as mongoose.Model<ITour>;
} else {
  // Model henüz tanımlanmamışsa oluştur
  Tour = mongoose.model<ITour>('Tour', TourSchema);
}

export default Tour; 