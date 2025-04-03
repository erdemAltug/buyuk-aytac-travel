import mongoose, { Document, Schema } from 'mongoose';

export enum TourType {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international'
}

export enum AccommodationType {
  WITH_ACCOMMODATION = 'with_accommodation',
  DAILY = 'daily'
}

export interface ITour extends Document {
  name: string;
  description: string;
  image: string;
  slug: string;
  duration: string;
  price: number;
  destination: string;
  tourType: TourType;
  accommodationType: AccommodationType;
  startDate?: Date;  // Tur başlangıç tarihi
  endDate?: Date;    // Tur bitiş tarihi
  isActive: boolean;
  program?: Array<{
    day: string;
    title: string;
    description: string;
  }>;
  includedServices?: string[];
  excludedServices?: string[];
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

// Slug oluşturma fonksiyonu
function createSlug(name: string): string {
  return name
    .toString()
    .toLowerCase()
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