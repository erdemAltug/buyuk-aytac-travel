import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  image: string;
  slug: string;
  summary: string;
  author: string;
  categories: string[];
  isPublished: boolean;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Slug oluşturma fonksiyonu
function createSlug(title: string): string {
  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Boşlukları tire ile değiştir
    .replace(/[^\w\-]+/g, '')    // Alfanümerik olmayan karakterleri kaldır
    .replace(/\-\-+/g, '-')      // Birden fazla tireyi tek tireye dönüştür
    .replace(/^-+/, '')          // Baştaki tireleri kaldır
    .replace(/-+$/, '');         // Sondaki tireleri kaldır
}

// Kaydetmeden önce slug oluştur
BlogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = this as any;
    doc.slug = createSlug(doc.title);
  }
  next();
});

// Model zaten varsa onu kullan, yoksa oluştur
let Blog: mongoose.Model<IBlog>;

// Mongoose modeli tanımlanmışsa
if (mongoose.models && mongoose.models.Blog) {
  Blog = mongoose.models.Blog as mongoose.Model<IBlog>;
} else {
  // Model henüz tanımlanmamışsa oluştur
  Blog = mongoose.model<IBlog>('Blog', BlogSchema);
}

export default Blog; 