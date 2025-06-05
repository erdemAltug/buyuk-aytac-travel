import mongoose, { Document, Schema } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  shortDescription: string;
  location: {
    city: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  highlights: string[];
  nearbyPlaces?: {
    name: string;
    distance: string;
    description: string;
  }[];
  transportation?: {
    type: string;
    description: string;
  }[];
  seoKeywords: string[];
  isActive: boolean;
  featured: boolean;
  tourCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    shortDescription: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      region: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    highlights: [{ type: String }],
    nearbyPlaces: [{
      name: { type: String },
      distance: { type: String },
      description: { type: String }
    }],
    transportation: [{
      type: { type: String },
      description: { type: String }
    }],
    seoKeywords: [{ type: String }],
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    tourCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Slug oluşturma
function createSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Kaydetmeden önce slug oluştur
DestinationSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    const doc = this as any;
    doc.slug = createSlug(doc.name);
  }
  next();
});

// Model
let Destination: mongoose.Model<IDestination>;

if (mongoose.models && mongoose.models.Destination) {
  Destination = mongoose.models.Destination as mongoose.Model<IDestination>;
} else {
  Destination = mongoose.model<IDestination>('Destination', DestinationSchema);
}

export default Destination; 