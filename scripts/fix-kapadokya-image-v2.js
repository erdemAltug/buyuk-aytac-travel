// Kapadokya blog görselini bir defa daha güncellemek için script
import axios from 'axios';

async function getBlogs() {
  try {
    const response = await axios.get('http://localhost:3000/api/blogs');
    return response.data;
  } catch (error) {
    console.error('Blogları getirirken hata:', error.message);
    throw error;
  }
}

async function updateBlogImage(id, imageUrl) {
  try {
    console.log(`Blog ID: ${id} için görsel güncelleniyor...`);
    
    const blogData = { image: imageUrl };
    
    // API'ye doğrudan ID ile güncelleme isteği at
    const response = await axios.post(`http://localhost:3000/api/blogs/update-image`, {
      id,
      imageUrl
    });
    
    if (response.data.success) {
      console.log(`✅ Blog ID: ${id} için görsel başarıyla güncellendi`);
      return true;
    } else {
      console.error(`❌ Blog ID: ${id} için görsel güncellenemedi:`, response.data);
      return false;
    }
  } catch (error) {
    console.error(`❌ Blog ID: ${id} için görsel güncellenirken hata:`, error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
    return false;
  }
}

async function fixKapadokyaImage() {
  try {
    // Tüm blogları getir
    const blogs = await getBlogs();
    
    // Kapadokya blogunu bul
    const kapadokyaBlog = blogs.find(blog => 
      (blog.title && blog.title.includes('Kapadokya')) || 
      (blog.slug && blog.slug.includes('kapadokya'))
    );
    
    if (!kapadokyaBlog) {
      console.error('❌ Kapadokya ile ilgili blog bulunamadı');
      return;
    }
    
    console.log('📋 Kapadokya blogu bulundu:', {
      id: kapadokyaBlog._id,
      title: kapadokyaBlog.title,
      slug: kapadokyaBlog.slug,
      image: kapadokyaBlog.image
    });
    
    // Daha büyük ve daha kaliteli bir görsel
    const imageUrl = "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80";
    
    // Önce slug ile deneyelim
    try {
      console.log(`📝 Slug ile güncelleme deneniyor: ${kapadokyaBlog.slug}`);
      const slugResponse = await axios.put(`http://localhost:3000/api/blogs/${kapadokyaBlog.slug}`, { image: imageUrl });
      
      if (slugResponse.data.success) {
        console.log(`✅ Slug ile güncelleme başarılı`);
        return;
      }
    } catch (error) {
      console.log(`⚠️ Slug ile güncelleme başarısız, ID ile deneniyor...`);
    }
    
    // ID ile güncelleme
    try {
      console.log(`📝 Doğrudan API çağrısı ile deneniyor...`);
      const response = await fetch('/api/blogs/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: kapadokyaBlog._id,
          image: imageUrl
        }),
      });
      
      const result = await response.json();
      console.log(`🔄 API yanıtı:`, result);
    } catch (error) {
      console.error(`❌ Son deneme hatası:`, error.message);
    }
    
    // Yeni güncelleme endpointi oluşturulana kadar
    console.log('⚠️ Blog ID:', kapadokyaBlog._id);
    console.log('⚠️ Blog Slug:', kapadokyaBlog.slug);
    console.log('⚠️ Yeni görsel URL:', imageUrl);
    console.log('⚠️ Lütfen admin arayüzünden manuel olarak güncelleme yapın');
  } catch (error) {
    console.error('❌ Genel hata:', error.message);
  }
}

// Fonksiyonu çalıştır
fixKapadokyaImage(); 