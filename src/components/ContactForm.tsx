'use client';

import { useState } from 'react';
import { submitContactForm } from '@/services/contactService';

interface ContactFormProps {
  tourName?: string;
}

export default function ContactForm({ tourName }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    
    try {
      // Tur bilgisini mesaja ekle (eğer varsa)
      const tourMessage = tourName 
        ? `Tur Bilgisi: ${tourName}\n\n${formData.message}`
        : formData.message;
        
      const formDataWithTour = {
        ...formData,
        message: tourMessage
      };
      
      const response = await submitContactForm(formDataWithTour);
      
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
        setFormError(err.message);
      } else {
        setFormError('Bilinmeyen bir hata oluştu.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitted ? (
        <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-700 mb-6">
          <p className="font-medium">Mesajınız başarıyla gönderildi!</p>
          <p className="mt-1">En kısa sürede sizinle iletişime geçeceğiz.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {formError && (
            <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 mb-4">
              <p>{formError}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Ad Soyad"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Email"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Telefon"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mesaj
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Mesajınız..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Gönderiliyor...' : 'Bilgi İsteyin'}
          </button>
        </form>
      )}
    </>
  );
} 