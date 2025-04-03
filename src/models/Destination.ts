import mongoose, { Document, Schema } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  description: string;
  image: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema: Schema = new Schema(
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
DestinationSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = this as any;
    doc.slug = createSlug(doc.name);
  }
  next();
});

// Model zaten varsa onu kullan, yoksa oluştur
let Destination: mongoose.Model<IDestination>;

// Mongoose modeli tanımlanmışsa
if (mongoose.models && mongoose.models.Destination) {
  Destination = mongoose.models.Destination as mongoose.Model<IDestination>;
} else {
  // Model henüz tanımlanmamışsa oluştur
  Destination = mongoose.model<IDestination>('Destination', DestinationSchema);
}

export default Destination; 