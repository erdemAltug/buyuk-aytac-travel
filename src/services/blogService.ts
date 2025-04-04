import { IBlog } from '@/models/Blog';
import axios from 'axios';
import Blog from '@/models/Blog';
import dbConnect from '@/lib/dbConnect';

// Tüm blogları getir
export const getBlogs = async (published?: boolean, adminMode: boolean = false) => {
  try {
    let url = '/api/blogs';
    
    // Query parametreleri oluşturma
    const params = new URLSearchParams();
    
    // Yayın durumu filtresi
    if (published !== undefined) {
      params.append('published', published.toString());
    }
    
    // Admin modu için sıralama değişikliği (en yeni en üstte)
    if (adminMode) {
      params.append('sort', 'createdAt');
      params.append('order', 'desc');
    }
    
    // URL'ye parametreleri ekle
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Blog verisi alma hatası:', error);
    return [];
  }
};

// Slug'a göre blog getir
export const getBlogBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`/api/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Blog getirme hatası (${slug}):`, error);
    return null;
  }
};

// Kategori'ye göre blogları getir
export const getBlogsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`/api/blogs?category=${category}`);
    return response.data;
  } catch (error) {
    console.error(`Kategori blogları getirme hatası (${category}):`, error);
    return [];
  }
};

// ID'ye göre blog yazısı getir
export async function getBlogById(id: string): Promise<IBlog | null> {
  await dbConnect();
  return Blog.findById(id);
}

// Son N blog yazısını getir
export const getRecentBlogs = async (limit: number = 3) => {
  try {
    const response = await axios.get(`/api/blogs?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Son blogları getirme hatası:', error);
    return [];
  }
};

// getLatestBlogs - Son N blog yazısını getir (alternatif isim)
export const getLatestBlogs = getRecentBlogs;

// Server tarafı blog oluşturma 
export async function createBlogServerSide(blogData: Partial<IBlog>): Promise<IBlog> {
  await dbConnect();
  
  // Slug oluştur (eğer verilmediyse)
  if (!blogData.slug && blogData.title) {
    blogData.slug = createSlugFromTitle(blogData.title);
  }
  
  return Blog.create(blogData);
}

// Blogu güncelle
export const updateBlog = async (slug: string, blogData: Partial<IBlog>) => {
  try {
    const response = await axios.put(`/api/blogs/${slug}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Blog güncelleme hatası (${slug}):`, error);
    throw error;
  }
};

// Blogu sil
export const deleteBlog = async (slug: string) => {
  try {
    const response = await axios.delete(`/api/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Blog silme hatası (${slug}):`, error);
    throw error;
  }
};

// Slug oluşturma yardımcı fonksiyonu
function createSlugFromTitle(title: string): string {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Boşlukları tire ile değiştir
    .replace(/[^\w\-]+/g, '')    // Alfanümerik olmayan karakterleri kaldır
    .replace(/\-\-+/g, '-')      // Birden fazla tireyi tek tireye dönüştür
    .replace(/^-+/, '')          // Baştaki tireleri kaldır
    .replace(/-+$/, '');         // Sondaki tireleri kaldır
} 