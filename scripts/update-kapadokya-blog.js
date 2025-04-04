// Kapadokya blog yazısını güncellemek için script
import axios from 'axios';

async function updateBlog() {
  try {
    const blogData = {
      image: "https://images.unsplash.com/photo-1599097748297-a2b77c5172a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
    };

    // Blog slug'ı
    const slug = "kapadokyada-unutulmaz-bir-tatil-deneyimi";

    // API'ye güncelleme isteği at
    const response = await axios.put(`http://localhost:3000/api/blogs/${slug}`, blogData);
    
    if (response.data.success) {
      console.log('Blog yazısı başarıyla güncellendi:', response.data);
    } else {
      console.error('Blog güncelleme başarısız:', response.data);
    }
  } catch (error) {
    console.error('Blog güncelleme hatası:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
  }
}

// Fonksiyonu çalıştır
updateBlog(); 