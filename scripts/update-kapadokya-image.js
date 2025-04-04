// Kapadokya blog görselini yeni API endpointi ile güncellemek için script
import axios from 'axios';

async function updateKapadokyaImage() {
  try {
    const slug = "kapadokyada-unutulmaz-bir-tatil-deneyimi";
    const imageUrl = "https://images.unsplash.com/photo-1533230050368-fbf55584f7d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80";
    
    console.log(`"${slug}" için görsel güncelleniyor...`);
    
    // Yeni API endpointine istek at
    const response = await axios.post('http://localhost:3000/api/blogs/update-image', {
      slug,
      imageUrl
    });
    
    if (response.data.success) {
      console.log('✅ Görsel başarıyla güncellendi!');
      console.log('🔗 Yeni görsel:', imageUrl);
    } else {
      console.error('❌ Görsel güncellenemedi:', response.data);
    }
  } catch (error) {
    console.error('❌ Hata:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Çalıştır
updateKapadokyaImage(); 