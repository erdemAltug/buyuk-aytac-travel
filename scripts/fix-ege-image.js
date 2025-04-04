// Ege blog görselini güncellemek için script
import axios from 'axios';

async function updateEgeBlogImage() {
  try {
    console.log("Önce tüm blogları getirip mevcut slug'ı kontrol edelim...");
    
    // Tüm blogları getir
    const response = await axios.get('http://localhost:3000/api/blogs');
    
    // Ege ile ilgili blog'u bul
    const egeBlogs = response.data.filter(blog => 
      (blog.title && blog.title.includes('Ege')) || 
      (blog.slug && blog.slug.includes('ege'))
    );
    
    if (egeBlogs.length === 0) {
      console.error('Ege ile ilgili blog bulunamadı');
      return;
    }
    
    console.log('Bulunan Ege blogları:', egeBlogs.map(blog => ({ 
      id: blog._id, 
      title: blog.title, 
      slug: blog.slug 
    })));
    
    // İlk bulunan Ege blog'unu al
    const egeBlog = egeBlogs[0];
    const slug = egeBlog.slug;
    
    console.log(`${slug} için görsel güncelleniyor...`);
    
    const imageUrl = "https://images.unsplash.com/photo-1524760329736-61ffa98c0184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80";
    const blogData = { image: imageUrl };
    
    // API'ye güncelleme isteği at
    const updateResponse = await axios.put(`http://localhost:3000/api/blogs/${slug}`, blogData);
    
    if (updateResponse.data.success) {
      console.log(`✅ ${slug} için görsel başarıyla güncellendi:`, updateResponse.data);
    } else {
      console.error(`❌ ${slug} için görsel güncellenemedi:`, updateResponse.data);
    }
  } catch (error) {
    console.error('Hata:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Fonksiyonu çalıştır
updateEgeBlogImage(); 