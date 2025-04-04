// Tüm blog görsellerini güncellemek için script
import axios from 'axios';

const blogUpdates = [
  {
    slug: "kapadokyada-unutulmaz-bir-tatil-deneyimi",
    imageUrl: "https://images.unsplash.com/photo-1533230050368-fbf55584f7d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
  },
  {
    slug: "istanbulun-gizli-cenneti-sefirler-tepesi",
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
  }
];

async function updateBlogImage(slug, imageUrl) {
  try {
    console.log(`"${slug}" için görsel güncelleniyor...`);
    
    // PUT isteği ile güncelleme
    const response = await axios.put(`http://localhost:3000/api/blogs/${slug}`, {
      image: imageUrl
    });
    
    if (response.data && response.data.success) {
      console.log(`✅ "${slug}" için görsel başarıyla güncellendi`);
      return true;
    } else {
      console.error(`❌ "${slug}" için görsel güncellenemedi:`, response.data);
      return false;
    }
  } catch (error) {
    console.error(`❌ "${slug}" için görsel güncellenirken hata:`, error.message);
    return false;
  }
}

async function updateAllBlogImages() {
  console.log(`🔄 Toplam ${blogUpdates.length} blog görseli güncellenecek`);
  
  let successCount = 0;
  
  for (const blog of blogUpdates) {
    const success = await updateBlogImage(blog.slug, blog.imageUrl);
    if (success) successCount++;
    
    // Ardışık istekler arasında küçük bir gecikme
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`✅ İşlem tamamlandı: ${successCount}/${blogUpdates.length} blog görseli güncellendi`);
}

// Çalıştır
updateAllBlogImages(); 