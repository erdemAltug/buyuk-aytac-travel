'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getBlogBySlug, updateBlog } from '@/services/blogService';
import { uploadFile } from '@/services/uploadService';

// Form input sınıflarını tanımla
const inputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2";
const labelClass = "block text-sm font-medium leading-6 text-gray-900 mb-1";
const buttonClass = "flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed";

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    image: null as File | null,
    imageUrl: '',
    categories: [''],
    isPublished: true,
    publishDate: new Date().toISOString().split('T')[0],
  });
  
  useEffect(() => {
    // Admin girişini kontrol et ve blog bilgilerini getir
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchBlog();
    }
  }, [router, params.slug]);
  
  const fetchBlog = async () => {
    try {
      const blog = await getBlogBySlug(params.slug);
      
      if (!blog) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      
      // Tarihi formatla
      const publishDate = blog.publishDate ? new Date(blog.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      setFormData({
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        author: blog.author,
        image: null,
        imageUrl: blog.image,
        categories: blog.categories && blog.categories.length > 0 ? blog.categories : [''],
        isPublished: blog.isPublished,
        publishDate,
      });
      
      setIsLoading(false);
    } catch (err) {
      console.error('Blog getirme hatası:', err);
      setError('Blog bilgileri yüklenirken bir hata oluştu');
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: file,
        imageUrl: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index] = value;
    
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };
  
  const handleAddCategory = () => {
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, '']
    }));
  };
  
  const handleRemoveCategory = (index: number) => {
    if (formData.categories.length <= 1) return;
    
    const updatedCategories = formData.categories.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    // Form validation
    if (!formData.title || !formData.summary || !formData.content || !formData.author) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      setSubmitting(false);
      return;
    }
    
    // Kategorileri temizle
    const filteredCategories = formData.categories.filter(cat => cat.trim() !== '');
    if (filteredCategories.length === 0) {
      setError('En az bir kategori ekleyin');
      setSubmitting(false);
      return;
    }
    
    try {
      let imageUrl = formData.imageUrl;
      
      // Eğer yeni resim yüklendiyse
      if (formData.image) {
        // Resmi yükle
        const uploadResponse = await uploadFile(formData.image, 'blogs');
        
        if (!uploadResponse.success || !uploadResponse.url) {
          throw new Error(uploadResponse.message || 'Resim yükleme hatası');
        }
        
        imageUrl = uploadResponse.url;
      }
      
      // Blog verilerini hazırla
      const blogData = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        author: formData.author,
        image: imageUrl,
        categories: filteredCategories,
        isPublished: formData.isPublished,
        publishDate: formData.publishDate ? new Date(formData.publishDate) : new Date(),
      };
      
      // Blogu güncelle
      await updateBlog(params.slug, blogData);
      
      // Başarı durumunda bloglar sayfasına yönlendir
      router.push('/admin/blogs');
      
    } catch (err) {
      console.error('Blog güncelleme hatası:', err);
      setError('Blog güncellenirken bir hata oluştu: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
      setSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (notFound) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Blog Bulunamadı</h1>
              <p className="text-gray-600 mb-6">Düzenlemek istediğiniz blog yazısı bulunamadı.</p>
              <button
                onClick={() => router.push('/admin/blogs')}
                className="rounded-md px-3 py-1.5 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50"
              >
                Blog Listesine Dön
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Blog Yazısını Düzenle</h1>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Blog Başlığı */}
              <div className="mb-4">
                <label htmlFor="title" className={labelClass}>Blog Başlığı</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              {/* Yazar */}
              <div className="mb-4">
                <label htmlFor="author" className={labelClass}>Yazar</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              {/* Özet */}
              <div className="mb-4">
                <label htmlFor="summary" className={labelClass}>Özet</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass}
                  required
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">Blog listesinde görünecek kısa bir açıklama girin (max. 200 karakter)</p>
              </div>
              
              {/* İçerik */}
              <div className="mb-4">
                <label htmlFor="content" className={labelClass}>İçerik</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  className={inputClass}
                  required
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">Markdown formatında yazabilirsiniz</p>
              </div>
              
              {/* Kategoriler */}
              <div className="mb-6">
                <label className={labelClass}>Kategoriler</label>
                <div className="space-y-2">
                  {formData.categories.map((category, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <select
                        value={category}
                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                        className={`${inputClass} flex-grow`}
                        required
                      >
                        <option value="">Kategori Seçin</option>
                        <option value="travel-tips">Seyahat Tavsiyeleri</option>
                        <option value="destinations">Destinasyonlar</option>
                        <option value="culture">Kültür ve Tarih</option>
                        <option value="food">Yemek ve Gastronomi</option>
                      </select>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Kategori Ekle
                  </button>
                </div>
              </div>
              
              {/* Yayın Tarihi */}
              <div className="mb-4">
                <label htmlFor="publishDate" className={labelClass}>Yayın Tarihi</label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              
              {/* Durum */}
              <div className="mb-4">
                <label htmlFor="isPublished" className={labelClass}>Durum</label>
                <select
                  id="isPublished"
                  name="isPublished"
                  value={formData.isPublished ? 'true' : 'false'}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      isPublished: e.target.value === 'true'
                    }));
                  }}
                  className={inputClass}
                >
                  <option value="true">Aktif</option>
                  <option value="false">Taslak</option>
                </select>
              </div>
              
              {/* Resim Yükleme */}
              <div className="mb-6">
                <label htmlFor="image" className={labelClass}>Blog Görseli</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
                
                {formData.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Mevcut görsel:</p>
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="h-40 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Aksiyon Butonları */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className={buttonClass}
                  disabled={submitting}
                >
                  {submitting ? 'Kaydediliyor...' : 'Güncelle'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 