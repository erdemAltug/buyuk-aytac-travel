'use client';

import { useState } from 'react';
import { submitContactForm } from '@/services/contactService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      // API'ye isteği gönder
      const response = await submitContactForm(formData);
      
      if (!response.success) {
        throw new Error(response.message || 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
      }
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Bilinmeyen bir hata oluştu.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soru, görüş ve önerileriniz için bizimle iletişime geçin
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bize Yazın</h2>
            
            {submitted ? (
              <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-700 mb-6">
                <p className="font-medium">Mesajınız başarıyla gönderildi!</p>
                <p className="mt-1">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 mb-6">
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {submitting ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </form>
            )}
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Adres</h3>
                <p className="text-gray-600">
                  Maslak Mh. Büyükdere Cd. No:255<br />
                  Sarıyer / İstanbul<br />
                  Türkiye
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Telefon</h3>
                <p className="text-gray-600">+90 (212) 555 66 77</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">E-posta</h3>
                <p className="text-gray-600">info@buyukaytactravel.com</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Çalışma Saatleri</h3>
                <p className="text-gray-600">
                  Pazartesi - Cuma: 09:00 - 18:00<br />
                  Cumartesi: 10:00 - 14:00<br />
                  Pazar: Kapalı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 