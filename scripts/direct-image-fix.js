// Kapadokya blog görselini doğrudan güncellemek için basit script
import axios from 'axios';

async function findAndFixKapadokyaImage() {
  try {
    console.log('Tüm blogları getiriyorum...');
    // Tüm blogları getir
    const response = await axios.get('http://localhost:3000/api/blogs');
    const blogs = response.data;
    
    console.log(`Toplam ${blogs.length} blog bulundu.`);
    
    // Kapadokya blogunu bul
    const kapadokyaBlog = blogs.find(blog => 
      blog.slug === 'kapadokyada-unutulmaz-bir-tatil-deneyimi'
    );
    
    if (!kapadokyaBlog) {
      console.error('❌ Kapadokya blogu bulunamadı!');
      return;
    }
    
    console.log('✅ Kapadokya blogu bulundu:', {
      id: kapadokyaBlog._id,
      title: kapadokyaBlog.title,
      slug: kapadokyaBlog.slug,
      mevcut_image: kapadokyaBlog.image
    });
    
    // Yeni görsel URL'i
    const imageUrl = "https://images.unsplash.com/photo-1533230050368-fbf55584f7d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80";
    
    console.log(`📝 "${kapadokyaBlog.slug}" için görsel güncelleniyor...`);
    
    // API'ye PUT isteği
    const updateResponse = await axios.put(
      `http://localhost:3000/api/blogs/${kapadokyaBlog.slug}`, 
      { image: imageUrl }
    );
    
    if (updateResponse.data.success) {
      console.log('✅ Görsel başarıyla güncellendi!');
      console.log('🔗 Yeni görsel:', imageUrl);
    } else {
      console.error('❌ Görsel güncellenemedi:', updateResponse.data);
    }
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Çalıştır
findAndFixKapadokyaImage(); 