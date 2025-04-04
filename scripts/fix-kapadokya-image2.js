// Kapadokya blog görselini güncellemek için gelişmiş script
import axios from 'axios';

async function fixKapadokyaImage() {
  try {
    const slug = "kapadokyada-unutulmaz-bir-tatil-deneyimi";
    
    // Önce blog'u kontrol et
    console.log(`${slug} blog'unu kontrol ediyorum...`);
    const checkResponse = await axios.get(`http://localhost:3000/api/blogs/${slug}`);
    
    console.log('Mevcut blog bilgileri:', {
      id: checkResponse.data._id,
      title: checkResponse.data.title,
      slug: checkResponse.data.slug,
      currentImage: checkResponse.data.image,
    });
    
    // Yeni yüksek kaliteli resim URL'i
    const imageUrl = "https://images.unsplash.com/photo-1596941248238-0d49dcaa4263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80";
    
    console.log(`Görsel güncelleniyor:\n${imageUrl}`);
    
    const blogData = { 
      image: imageUrl,
      isPublished: true  // Yayın durumunu da garantiye alalım
    };
    
    // API'ye güncelleme isteği at
    const updateResponse = await axios.put(`http://localhost:3000/api/blogs/${slug}`, blogData);
    
    if (updateResponse.data.success) {
      console.log('✅ Blog görseli başarıyla güncellendi!');
      console.log('Güncellenmiş blog:', {
        id: updateResponse.data.data._id,
        title: updateResponse.data.data.title,
        slug: updateResponse.data.data.slug,
        newImage: updateResponse.data.data.image,
      });
    } else {
      console.error('❌ Blog görseli güncellenemedi:', updateResponse.data);
    }
  } catch (error) {
    console.error('❌ Hata oluştu:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Script'i çalıştır
console.log('Kapadokya blog görseli güncelleme işlemi başlatılıyor...');
fixKapadokyaImage()
  .then(() => console.log('İşlem tamamlandı.'))
  .catch(err => console.error('İşlem başarısız:', err.message)); 