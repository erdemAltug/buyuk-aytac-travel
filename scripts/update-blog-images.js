// Blog görsellerini güncellemek için script
import axios from 'axios';

const blogsToUpdate = [
  {
    slug: "kapadokyada-unutulmaz-bir-tatil-deneyimi",
    image: "https://images.unsplash.com/photo-1599097748297-a2b77c5172a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "istanbulun-gizli-cenneti-sefirler-tepesi",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "egenin-mavi-cennetleri-en-gzel-koylar-ve-plajlar",
    image: "https://images.unsplash.com/photo-1524760329736-61ffa98c0184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
  }
];

async function updateBlogImage(slug, imageUrl) {
  try {
    console.log(`${slug} için görsel güncelleniyor...`);
    
    const blogData = { image: imageUrl };
    
    // API'ye güncelleme isteği at
    const response = await axios.put(`http://localhost:3000/api/blogs/${slug}`, blogData);
    
    if (response.data.success) {
      console.log(`✅ ${slug} için görsel başarıyla güncellendi`);
      return true;
    } else {
      console.error(`❌ ${slug} için görsel güncellenemedi:`, response.data);
      return false;
    }
  } catch (error) {
    console.error(`❌ ${slug} için görsel güncellenirken hata:`, error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
    }
    return false;
  }
}

async function updateAllBlogImages() {
  console.log(`Toplam ${blogsToUpdate.length} blog göseli güncellenecek...`);
  
  let successCount = 0;
  
  for (const blog of blogsToUpdate) {
    const success = await updateBlogImage(blog.slug, blog.image);
    if (success) successCount++;
    
    // Sunucuya aşırı yük bindirmemek için küçük bir gecikme ekle
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`Güncelleme tamamlandı. ${successCount}/${blogsToUpdate.length} blog başarıyla güncellendi.`);
}

// Fonksiyonu çalıştır
updateAllBlogImages().catch(error => {
  console.error('Script çalıştırma hatası:', error);
}); 