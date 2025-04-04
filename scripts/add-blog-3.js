// Destinasyon kategorisinde yeni bir blog yazısı
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// __dirname kullanabilmek için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env dosyasını yükle
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB bağlantısı
await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB bağlantısı başarılı');

// Blog şeması
const blogSchema = new mongoose.Schema(
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

// Model oluştur
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// Blog oluştur
try {
  const blog = {
    title: "Kapadokya'da Gezilecek En Güzel 5 Yer",
    slug: "kapadokyada-gezilecek-en-guzel-5-yer",
    summary: "Eşsiz doğal güzellikleri ve tarihi dokusuyla Kapadokya'da ziyaret edilmesi gereken en popüler 5 lokasyonu sizin için listeledik.",
    content: `# Kapadokya'da Gezilecek En Güzel 5 Yer

Türkiye'nin en önemli turizm merkezlerinden biri olan Kapadokya, peri bacaları, sıcak hava balonları ve eşsiz manzaralarıyla dünya çapında bir üne sahip. UNESCO Dünya Mirası Listesi'nde yer alan bu olağanüstü bölge, her yıl milyonlarca turisti ağırlıyor. Bu yazımızda, Kapadokya'da mutlaka görülmesi gereken 5 özel yeri sizler için derledik.

## 1. Göreme Açık Hava Müzesi

Kapadokya'nın kalbi sayılan Göreme Açık Hava Müzesi, bölgenin en çok ziyaret edilen yerlerinden biridir. Bu müzede, kayalara oyulmuş kiliseler ve manastırlar bulunmaktadır. 11. yüzyıldan kalma freskleriyle Karanlık Kilise, müzenin en önemli yapılarından biridir. Bu fresklerde İncil'den sahneler görebilirsiniz.

Müzeyi gezerken rahat ayakkabılar giymeyi ve yanınızda su bulundurmayı unutmayın. Özellikle yaz aylarında sıcaklık oldukça yüksek olabilir.

## 2. Üç Güzeller

Kapadokya'nın sembollerinden biri olan Üç Güzeller, bölgenin en fotojenik noktalarından biridir. Ürgüp ilçesinde bulunan bu üç peri bacası yan yana durarak muhteşem bir görüntü oluşturur. Gün batımında burayı ziyaret ederek unutulmaz fotoğraflar çekebilirsiniz.

## 3. Derinkuyu Yeraltı Şehri

Kapadokya'nın yeraltında sakladığı hazinelerden biri olan Derinkuyu Yeraltı Şehri, sekiz katlı yapısıyla dünyanın en büyük yeraltı şehirlerinden biridir. Hititler döneminde yapımına başlanan ve Bizans döneminde genişletilen bu yeraltı şehri, yaklaşık 20.000 kişiyi barındırabilecek kapasitededir. İçinde kiliseler, ahırlar, şarap mahzenleri ve havalandırma sistemleri bulunur.

Claustrofobiniz varsa, dar ve alçak tünellerde zorlanabileceğinizi unutmayın.

## 4. Devrent Vadisi (Hayal Vadisi)

Ürgüp ve Avanos arasında yer alan Devrent Vadisi, diğer adıyla Hayal Vadisi, ilginç kaya oluşumlarıyla ünlüdür. Bu vadide hayvan şekillerine benzeyen peri bacaları görebilirsiniz. En meşhuru, deve şeklindeki peri bacasıdır. Vadide yürüyüş yaparak bu doğal sanat eserlerini keşfedebilirsiniz.

## 5. Avanos

Kızılırmak'ın geçtiği Avanos, çömlek ve seramik atölyeleriyle ünlüdür. Burada bir seramik atölyesini ziyaret edebilir, çömlek yapımını öğrenebilir ve hatta kendiniz de deneyebilirsiniz. Ayrıca ilçe merkezindeki tarihi evleri gezmek ve yerel lezzetleri tatmak için mükemmel bir yerdir.

---

Kapadokya'yı en iyi şekilde deneyimlemek için en az 3 gün ayırmanızı öneririz. Ayrıca, bölgeyi sıcak hava balonuyla havadan görmek unutulmaz bir deneyim olacaktır. Balon turları genellikle sabah erken saatlerde düzenlenir ve önceden rezervasyon yaptırmanız gerekir.

Kapadokya'nın büyülü atmosferinde, zamanın nasıl geçtiğini anlamayacak ve bu eşsiz deneyimi uzun süre hatırlayacaksınız.`,
    author: "Altuğ Erdem",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1000",
    categories: ["destinations", "culture"],
    isPublished: true,
    publishDate: new Date(),
  };

  const newBlog = await Blog.create(blog);
  console.log(`Blog yazısı başarıyla oluşturuldu: "${newBlog.title}"`);
} catch (error) {
  console.error('Blog oluşturma hatası:', error);
} finally {
  // Bağlantıyı kapat
  await mongoose.connection.close();
  console.log('MongoDB bağlantısı kapatıldı');
} 