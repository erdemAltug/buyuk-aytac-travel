'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTour } from '@/services/tourService';
import { uploadFile } from '@/services/uploadService';
import { TourType, AccommodationType } from '@/models/Tour';
import { ChevronDownIcon, PlusIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AddNewTour() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    destination: '',
    duration: '',
    price: '',
    image: null as File | null,
    imagePreview: '',
    status: 'active',
    tourType: TourType.DOMESTIC,
    accommodationType: AccommodationType.WITH_ACCOMMODATION,
    startDate: '',
    endDate: '',
    departureCity: 'Çerkezköy',
    isLastMinute: false,
    discountRate: '',
    program: [{ day: '', title: '', description: '' }],
    includedServices: [''],
    excludedServices: [''],
    additionalServices: [{ name: '', price: '', description: '' }],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    if (!formData.name || !formData.description || !formData.destination || !formData.duration || !formData.price) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      setSubmitting(false);
      return;
    }
    
    if (!formData.image) {
      setError('Lütfen bir resim yükleyin');
      setSubmitting(false);
      return;
    }
    
    try {
      const uploadResponse = await uploadFile(formData.image, 'tours');
      
      if (!uploadResponse.success || !uploadResponse.url) {
        throw new Error(uploadResponse.message || 'Resim yükleme hatası');
      }
      
      const tourData = {
        name: formData.name,
        description: formData.description,
        destination: formData.destination,
        duration: formData.duration,
        price: parseFloat(formData.price.replace(/[^\d.]/g, '')),
        image: uploadResponse.url,
        isActive: formData.status === 'active',
        tourType: formData.tourType,
        accommodationType: formData.accommodationType,
        departureCity: formData.departureCity,
        isLastMinute: formData.isLastMinute,
        discountRate: formData.discountRate ? parseFloat(formData.discountRate) : undefined,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        program: formData.program.filter(item => item.day || item.title || item.description),
        includedServices: formData.includedServices.filter(item => item.trim() !== ''),
        excludedServices: formData.excludedServices.filter(item => item.trim() !== ''),
        additionalServices: formData.additionalServices
          .filter(service => service.name && service.price)
          .map(service => ({
            name: service.name,
            price: parseFloat(service.price.replace(/[^\d.]/g, '')),
            description: service.description || ''
          }))
      };
      
      await createTour(tourData);
      router.push('/admin/tours');
      
    } catch (err) {
      console.error('Tur ekleme hatası:', err);
      setError('Tur eklenirken bir hata oluştu: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
      setSubmitting(false);
    }
  };
  
  const handleProgramChange = (index: number, field: string, value: string) => {
    const updated = [...formData.program];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, program: updated }));
  };

  const handleIncludedServiceChange = (index: number, value: string) => {
    const updated = [...formData.includedServices];
    updated[index] = value;
    setFormData(prev => ({ ...prev, includedServices: updated }));
  };

  const handleExcludedServiceChange = (index: number, value: string) => {
    const updated = [...formData.excludedServices];
    updated[index] = value;
    setFormData(prev => ({ ...prev, excludedServices: updated }));
  };

  const handleAdditionalServiceChange = (index: number, field: string, value: string) => {
    const updated = [...formData.additionalServices];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalServices: updated }));
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Yeni Tur Ekle</h1>
              <p className="text-sm text-gray-500 mt-1">Yeni bir tur oluşturmak için formu doldurun</p>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Temel Bilgiler */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">Temel Bilgiler</h2>
                
                {/* Tur Adı */}
                <div>
                  <label htmlFor="name" className={labelClass}>Tur Adı *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Örn: Kapadokya Turu"
                    required
                  />
                </div>
                
                {/* Destinasyon & Süre - 2 kolonlu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="destination" className={labelClass}>Destinasyon *</label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Örn: Kapadokya"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className={labelClass}>Süre *</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Örn: 3 Gün 2 Gece"
                      required
                    />
                  </div>
                </div>
                
                {/* Tur Tipi & Konaklama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tourType" className={labelClass}>Tur Tipi</label>
                    <select
                      id="tourType"
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value={TourType.DOMESTIC}>Yurt İçi</option>
                      <option value={TourType.INTERNATIONAL}>Yurt Dışı</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="accommodationType" className={labelClass}>Konaklama</label>
                    <select
                      id="accommodationType"
                      name="accommodationType"
                      value={formData.accommodationType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value={AccommodationType.WITH_ACCOMMODATION}>Konaklamalı</option>
                      <option value={AccommodationType.DAILY}>Günübirlik</option>
                    </select>
                  </div>
                </div>
                
                {/* Fiyat & Durum */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className={labelClass}>Fiyat (₺) *</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="1500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className={labelClass}>Durum</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                </div>
                
                {/* Açıklama */}
                <div>
                  <label htmlFor="description" className={labelClass}>Açıklama *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={inputClass}
                    placeholder="Tur hakkında kısa açıklama..."
                    required
                  />
                </div>
                
                {/* Görsel */}
                <div>
                  <label className={labelClass}>Tur Görseli *</label>
                  <div className="mt-1">
                    {formData.imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="h-32 w-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <PlusIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Görsel yükle</p>
                        </div>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Gelişmiş Seçenekler */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Gelişmiş Seçenekler</h2>
                
                {/* Tarihler */}
                <CollapsibleSection title="Tarih Bilgileri">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className={labelClass}>Başlangıç Tarihi</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className={labelClass}>Bitiş Tarihi</label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className={inputClass}
                      />
                      <p className="mt-1 text-xs text-gray-500">Bu tarih geçtiğinde tur otomatik pasif olur</p>
                    </div>
                  </div>
                </CollapsibleSection>
                
                {/* Tur Programı */}
                <CollapsibleSection title="Tur Programı">
                  <div className="space-y-4">
                    {formData.program.map((day, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Gün {index + 1}</span>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                program: prev.program.filter((_, i) => i !== index)
                              }))}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={day.day}
                          onChange={(e) => handleProgramChange(index, 'day', e.target.value)}
                          placeholder="Örn: 11 Nisan 2025, Cuma"
                          className={inputClass}
                        />
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => handleProgramChange(index, 'title', e.target.value)}
                          placeholder="Başlık (Örn: Hareket Günü)"
                          className={inputClass}
                        />
                        <textarea
                          value={day.description}
                          onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                          placeholder="Program açıklaması..."
                          rows={2}
                          className={inputClass}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        program: [...prev.program, { day: '', title: '', description: '' }]
                      }))}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Gün Ekle
                    </button>
                  </div>
                </CollapsibleSection>
                
                {/* Dahil Olan Hizmetler */}
                <CollapsibleSection title="Dahil Olan Hizmetler">
                  <div className="space-y-2">
                    {formData.includedServices.map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleIncludedServiceChange(index, e.target.value)}
                          placeholder="Örn: Ulaşım, Konaklama, Rehberlik"
                          className={`${inputClass} flex-1`}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              includedServices: prev.includedServices.filter((_, i) => i !== index)
                            }))}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        includedServices: [...prev.includedServices, '']
                      }))}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Hizmet Ekle
                    </button>
                  </div>
                </CollapsibleSection>
                
                {/* Dahil Olmayan Hizmetler */}
                <CollapsibleSection title="Dahil Olmayan Hizmetler">
                  <div className="space-y-2">
                    {formData.excludedServices.map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleExcludedServiceChange(index, e.target.value)}
                          placeholder="Örn: Kişisel harcamalar, Ekstra turlar"
                          className={`${inputClass} flex-1`}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              excludedServices: prev.excludedServices.filter((_, i) => i !== index)
                            }))}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        excludedServices: [...prev.excludedServices, '']
                      }))}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Hizmet Ekle
                    </button>
                  </div>
                </CollapsibleSection>
                
                {/* Ek Hizmetler */}
                <CollapsibleSection title="Ek Hizmetler (Opsiyonel Satın Alınabilir)">
                  <div className="space-y-4">
                    {formData.additionalServices.map((service, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Hizmet {index + 1}</span>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                additionalServices: prev.additionalServices.filter((_, i) => i !== index)
                              }))}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => handleAdditionalServiceChange(index, 'name', e.target.value)}
                            placeholder="Hizmet adı"
                            className={inputClass}
                          />
                          <input
                            type="text"
                            value={service.price}
                            onChange={(e) => handleAdditionalServiceChange(index, 'price', e.target.value)}
                            placeholder="Fiyat (₺)"
                            className={inputClass}
                          />
                        </div>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleAdditionalServiceChange(index, 'description', e.target.value)}
                          placeholder="Açıklama (opsiyonel)"
                          rows={2}
                          className={inputClass}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        additionalServices: [...prev.additionalServices, { name: '', price: '', description: '' }]
                      }))}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Ek Hizmet Ekle
                    </button>
                  </div>
                </CollapsibleSection>
              </div>
              
              {/* Butonlar */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Kaydediliyor...' : 'Turu Kaydet'}
                </button>
              </div>
            </form>
    </div>
  );
}
