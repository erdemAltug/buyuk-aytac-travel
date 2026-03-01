import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Blog template'leri ve SEO optimized content
const blogTemplates = {
  destination: {
    titleTemplate: "{destination} Gezilecek Yerler: Kapsamlı Rehber 2024",
    metaTemplate: "{destination} gezilecek yerler, {destination} tur rehberi, {destination} gezi önerileri",
    contentStructure: [
      "## {destination} Hakkında Genel Bilgiler",
      "## En İyi Gezilecek Yerler",
      "## Yerel Lezzetler ve Restoranlar", 
      "## Konaklama Önerileri",
      "## Ulaşım Bilgileri",
      "## En İyi Ziyaret Zamanı",
      "## Fotoğraf Çekimi İçin En İyi Noktalar",
      "## Bütçe Planlama İpuçları",
      "## Çerkezköy'den {destination} Tur Seçenekleri"
    ]
  },
  seasonal: {
    titleTemplate: "{season} {destination} Turu: {year} Rehberi",
    metaTemplate: "{season} {destination} turu, {season} tatil önerileri, {destination} {season} gezisi",
    contentStructure: [
      "## {season} Mevsiminde {destination}",
      "## Hava Durumu ve Giyim Önerileri",
      "## Mevsimsel Aktiviteler",
      "## Festival ve Etkinlikler",
      "## Fiyat Avantajları",
      "## Rezervasyon İpuçları"
    ]
  },
  budget: {
    titleTemplate: "Uygun Bütçeyle {destination}: Ekonomik Gezi Rehberi",
    metaTemplate: "ucuz {destination} turu, ekonomik {destination} gezisi, bütçe dostu {destination}",
    contentStructure: [
      "## Bütçe Planlama Temelleri",
      "## Ekonomik Konaklama Seçenekleri", 
      "## Ücretsiz Aktiviteler",
      "## Yerel Ulaşım İpuçları",
      "## Yemek Masraflarını Azaltma",
      "## Son Dakika Fırsatları"
    ]
  }
};

// SEO keywords database
const seoKeywords = {
  cerkezkoy: ["çerkezköy tur", "çerkezköy'den tur", "çerkezköy tur şirketi", "çerkezköy günübirlik tur"],
  tekirdag: ["tekirdağ tur", "tekirdağ gezilecek yerler", "tekirdağ tur şirketi"],
  destinations: {
    istanbul: ["istanbul tur", "istanbul gezilecek yerler", "istanbul tarihi yerler"],
    kapadokya: ["kapadokya tur", "kapadokya balon turu", "kapadokya konaklamalı tur"],
    pamukkale: ["pamukkale tur", "pamukkale hierapolis", "pamukkale konaklamalı tur"],
    antalya: ["antalya tur", "antalya gezilecek yerler", "antalya tatil"],
    bursa: ["bursa tur", "bursa uludağ", "bursa günübirlik tur"]
  }
};

// Blog content generator
class BlogGenerator {
  constructor() {
    this.apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://www.buyukaytactravel.com/api/blogs'
      : 'http://localhost:3000/api/blogs';
  }

  // Generate SEO optimized blog content
  generateBlogContent(template, data) {
    const { destination, season, year = new Date().getFullYear() } = data;
    
    let content = `# ${template.titleTemplate
      .replace('{destination}', destination)
      .replace('{season}', season || '')
      .replace('{year}', year)}

Bu kapsamlı rehberde, ${destination} geziniz için bilmeniz gereken her şeyi bulacaksınız. Çerkezköy'den ${destination} turları hakkında detaylı bilgiler ve pratik öneriler.

`;

    template.contentStructure.forEach(section => {
      content += section
        .replace('{destination}', destination)
        .replace('{season}', season || '') + '\n\n';
      
      // Her section için placeholder content ekle
      content += `${destination} ile ilgili bu bölümde detaylı bilgiler yer alacak. İçerik SEO optimized şekilde hazırlanacak.\n\n`;
    });

    // Internal linking section
    content += `## İlgili Turlarımız

Büyük Aytaç Travel olarak ${destination} için özel tur paketlerimizi inceleyebilirsiniz:

- [${destination} Günübirlik Tur](/tours/${destination.toLowerCase()}-gunubirlik)
- [${destination} Konaklamalı Tur](/tours/${destination.toLowerCase()}-konaklamali)
- [Çerkezköy'den ${destination} Grup Turu](/tours/grup-${destination.toLowerCase()})

## Sıkça Sorulan Sorular

### ${destination} turu kaç gün sürer?
${destination} turlarımız günübirlik ve konaklamalı seçenekler olarak düzenlenmiştir.

### Çerkezköy'den ${destination} nasıl gidilir?
Konforlu otobüslerimizle Çerkezköy'den ${destination} turlarımıza katılabilirsiniz.

### ${destination} tur fiyatları nedir?
Güncel ${destination} tur fiyatlarımız için [iletişim sayfamızdan](/contact) bize ulaşabilirsiniz.
`;

    return content;
  }

  // Generate blog data
  generateBlogData(templateType, data) {
    const template = blogTemplates[templateType];
    const { destination, season, year = new Date().getFullYear() } = data;
    
    const title = template.titleTemplate
      .replace('{destination}', destination)
      .replace('{season}', season || '')
      .replace('{year}', year);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const keywords = template.metaTemplate
      .replace('{destination}', destination.toLowerCase())
      .replace('{season}', season?.toLowerCase() || '');

    return {
      title,
      slug,
      summary: `${destination} için kapsamlı gezi rehberi. ${season ? season + ' mevsiminde' : ''} ${destination} gezilecek yerler, tur önerileri ve pratik bilgiler.`,
      content: this.generateBlogContent(template, data),
      author: "Büyük Aytaç Travel",
      image: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200&h=630`,
      categories: [destination.toLowerCase(), templateType, "gezi-rehberi"],
      keywords: keywords.split(', '),
      isPublished: true,
      publishDate: new Date()
    };
  }

  // Create blog via API
  async createBlog(blogData) {
    try {
      const response = await axios.post(this.apiUrl, blogData);
      console.log(`✅ Blog oluşturuldu: ${blogData.title}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Blog oluşturma hatası: ${blogData.title}`, error.message);
      throw error;
    }
  }

  // Bulk blog generation
  async generateBulkBlogs(destinations, templateTypes) {
    const results = [];
    
    for (const destination of destinations) {
      for (const templateType of templateTypes) {
        try {
          const blogData = this.generateBlogData(templateType, { destination });
          const result = await this.createBlog(blogData);
          results.push(result);
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Hata: ${destination} - ${templateType}`, error.message);
        }
      }
    }
    
    return results;
  }
}

// Usage example
async function generateSEOBlogs() {
  const generator = new BlogGenerator();
  
  const destinations = [
    'Kapadokya', 'Pamukkale', 'Antalya', 'İstanbul', 
    'Bursa', 'Çanakkale', 'Edirne', 'Şile-Ağva'
  ];
  
  const templateTypes = ['destination', 'budget'];
  
  console.log('🚀 SEO optimized blog generation başlıyor...');
  
  try {
    const results = await generator.generateBulkBlogs(destinations, templateTypes);
    console.log(`✅ Toplam ${results.length} blog oluşturuldu`);
    
    // Results'ı dosyaya kaydet
    fs.writeFileSync(
      path.join(process.cwd(), 'scripts', 'generated-blogs.json'),
      JSON.stringify(results, null, 2)
    );
    
  } catch (error) {
    console.error('❌ Bulk blog generation hatası:', error);
  }
}

// Export for use
export { BlogGenerator, generateSEOBlogs };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSEOBlogs();
}
