// Tüm blog yazıları için uygun görselleri güncelleyen script
import axios from 'axios';

// Blog yazıları için uygun görseller
const blogImages = [
  {
    titlePattern: 'Kapadokya',
    slugPattern: 'kapadokya',
    imageUrl: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
    description: 'Gerçek Kapadokya görseli - Peri bacaları ve sıcak hava balonları'
  },
  {
    titlePattern: 'Ege',
    slugPattern: 'ege',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
    description: 'Ege sahili görseli - Berrak mavi deniz ve plaj'
  },
  {
    titlePattern: 'İstanbul',
    slugPattern: 'istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
    description: 'İstanbul manzarası görseli - Galata Kulesi'
  }
];

// Tüm blogları getir
async function getAllBlogs() {
  try {
    const response = await axios.get('http://localhost:3000/api/blogs');
    return response.data;
  } catch (error) {
    console.error('Blogları getirirken hata:', error.message);
    throw error;
  }
}

// Blog görselini güncelle
async function updateBlogImage(slug, imageUrl) {
  try {
    console.log(`"${slug}" için görsel güncelleniyor...`);
    
    const response = await axios.put(`http://localhost:3000/api/blogs/${slug}`, { 
      image: imageUrl 
    });
    
    if (response.data.success) {
      console.log(`✅ "${slug}" için görsel başarıyla güncellendi!`);
      return true;
    } else {
      console.error(`❌ "${slug}" için görsel güncellenemedi:`, response.data);
      return false;
    }
  } catch (error) {
    console.error(`❌ "${slug}" için görsel güncellenirken hata:`, error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
    return false;
  }
}

// Tüm blog görsellerini güncelle
async function updateAllBlogImages() {
  try {
    console.log('Tüm blog yazıları getiriliyor...');
    const blogs = await getAllBlogs();
    console.log(`Toplam ${blogs.length} blog yazısı bulundu.`);
    
    let updatedCount = 0;
    
    // Her bir blog için uygun görseli bul ve güncelle
    for (const blog of blogs) {
      // Blog bilgilerini yazdır
      console.log(`\n📄 Blog: "${blog.title}"`);
      console.log(`📎 Slug: ${blog.slug}`);
      console.log(`🖼️ Mevcut görsel: ${blog.image}`);
      
      // Uygun görseli bul
      const matchingImage = blogImages.find(img => 
        (blog.title && blog.title.includes(img.titlePattern)) || 
        (blog.slug && blog.slug.includes(img.slugPattern))
      );
      
      if (matchingImage) {
        console.log(`🔍 Eşleşen görsel bulundu: ${matchingImage.description}`);
        
        // Görsel zaten güncel mi kontrol et
        if (blog.image === matchingImage.imageUrl) {
          console.log('ℹ️ Görsel zaten güncel, atlıyorum.');
          continue;
        }
        
        // Görseli güncelle
        const success = await updateBlogImage(blog.slug, matchingImage.imageUrl);
        if (success) updatedCount++;
      } else {
        console.log('⚠️ Uygun görsel bulunamadı, atlıyorum.');
      }
    }
    
    console.log(`\n✅ İşlem tamamlandı. ${updatedCount}/${blogs.length} blog yazısı güncellendi.`);
  } catch (error) {
    console.error('❌ Genel hata:', error.message);
  }
}

// Scripti çalıştır
console.log('Blog görselleri güncelleme işlemi başlatılıyor...');
updateAllBlogImages(); 