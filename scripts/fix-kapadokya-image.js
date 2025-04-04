// Kapadokya blog görselini güncellemek için script
import axios from 'axios';

async function updateKapadokyaBlogImage() {
  try {
    const slug = "kapadokyada-unutulmaz-bir-tatil-deneyimi";
    const imageUrl = "https://images.unsplash.com/photo-1599097748297-a2b77c5172a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80";
    
    console.log(`${slug} için görsel güncelleniyor...`);
    
    const blogData = { image: imageUrl };
    
    // API'ye güncelleme isteği at
    const response = await axios.put(`http://localhost:3000/api/blogs/${slug}`, blogData);
    
    if (response.data.success) {
      console.log(`✅ ${slug} için görsel başarıyla güncellendi:`, response.data);
    } else {
      console.error(`❌ ${slug} için görsel güncellenemedi:`, response.data);
    }
  } catch (error) {
    console.error('Hata:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Fonksiyonu çalıştır
updateKapadokyaBlogImage(); 