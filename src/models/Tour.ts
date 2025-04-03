import mongoose, { Document, Schema } from 'mongoose';
import { IDestination } from './Destination';

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
  destinationId: mongoose.Types.ObjectId | IDestination;
  tourType: TourType;
  accommodationType: AccommodationType;
  isActive: boolean;
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
    destinationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Destination', 
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
    isActive: { type: Boolean, default: true },
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

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema); 