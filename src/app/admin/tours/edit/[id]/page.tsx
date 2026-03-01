'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTourBySlug, updateTour } from '@/services/tourService';
import { ITour, TourType, AccommodationType } from '@/models/Tour';
import { ChevronDownIcon, PlusIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import TourImage from '@/components/admin/TourImage';

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

export default function EditTourPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tour, setTour] = useState<ITour | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = params;
  
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      if (!isLoggedIn) {
        router.push('/admin/login');
      } else {
        fetchTour();
      }
    };
    
    checkAuth();
  }, [router, id]);
  
  const fetchTour = async () => {
    try {
      const data = await getTourBySlug(id);
      setTour(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Tur bilgisi getirme hatası:', err);
      setError('Tur bilgilerini yüklerken bir hata oluştu');
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (!tour) return;
    
    if (name === 'isActive' || name === 'isLastMinute') {
      setTour({ ...tour, [name]: value === 'true' });
      return;
    }
    
    if (type === 'number') {
      setTour({ ...tour, [name]: value === '' ? null : Number(value) });
      return;
    }
    
    setTour({ ...tour, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    
    setSubmitting(true);
    setError('');
    
    try {
      await updateTour(id, tour);
      router.push('/admin/tours');
    } catch (err) {
      console.error('Tur güncelleme hatası:', err);
      setError('Tur güncellenirken bir hata oluştu');
      setSubmitting(false);
    }
  };

  const handleProgramChange = (index: number, field: string, value: string) => {
    if (!tour || !tour.program) return;
    const updated = [...tour.program];
    updated[index] = { ...updated[index], [field]: value };
    setTour({ ...tour, program: updated });
  };

  const handleIncludedServiceChange = (index: number, value: string) => {
    if (!tour || !tour.includedServices) return;
    const updated = [...tour.includedServices];
    updated[index] = value;
    setTour({ ...tour, includedServices: updated });
  };

  const handleExcludedServiceChange = (index: number, value: string) => {
    if (!tour || !tour.excludedServices) return;
    const updated = [...tour.excludedServices];
    updated[index] = value;
    setTour({ ...tour, excludedServices: updated });
  };

  const handleAdditionalServiceChange = (index: number, field: string, value: string | number) => {
    if (!tour || !tour.additionalServices) return;
    const updated = [...tour.additionalServices];
    updated[index] = { ...updated[index], [field]: value };
    setTour({ ...tour, additionalServices: updated });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !tour) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{error || 'Tur bulunamadı'}</p>
          <button 
            onClick={() => router.push('/admin/tours')} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Turlara Dön
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Tur Düzenle</h1>
              <p className="text-sm text-gray-500 mt-1">{tour.name}</p>
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
                
                {/* Mevcut Görsel */}
                {tour.image && (
                  <div>
                    <label className={labelClass}>Mevcut Görsel</label>
                    <TourImage
                      src={tour.image}
                      alt={tour.name}
                      className="w-48 h-32 rounded-lg overflow-hidden"
                    />
                  </div>
                )}
                
                {/* Tur Adı */}
                <div>
                  <label htmlFor="name" className={labelClass}>Tur Adı *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={tour.name || ''}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                
                {/* Destinasyon & Süre */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="destination" className={labelClass}>Destinasyon</label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={tour.destination || ''}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className={labelClass}>Süre *</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={tour.duration || ''}
                      onChange={handleChange}
                      className={inputClass}
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
                      value={tour.tourType || TourType.DOMESTIC}
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
                      value={tour.accommodationType || AccommodationType.WITH_ACCOMMODATION}
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
                      type="number"
                      id="price"
                      name="price"
                      value={tour.price || ''}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="isActive" className={labelClass}>Durum</label>
                    <select
                      id="isActive"
                      name="isActive"
                      value={tour.isActive ? "true" : "false"}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="true">Aktif</option>
                      <option value="false">Pasif</option>
                    </select>
                  </div>
                </div>
                
                {/* Son Dakika & İndirim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="isLastMinute" className={labelClass}>Son Dakika Fırsatı</label>
                    <select
                      id="isLastMinute"
                      name="isLastMinute"
                      value={tour.isLastMinute ? "true" : "false"}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="false">Hayır</option>
                      <option value="true">Evet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="discountRate" className={labelClass}>İndirim Oranı (%)</label>
                    <input
                      type="number"
                      id="discountRate"
                      name="discountRate"
                      value={tour.discountRate || ''}
                      onChange={handleChange}
                      className={inputClass}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                
                {/* Açıklama */}
                <div>
                  <label htmlFor="description" className={labelClass}>Açıklama *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={tour.description || ''}
                    onChange={handleChange}
                    rows={4}
                    className={inputClass}
                    required
                  />
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
                        value={tour.startDate ? new Date(tour.startDate).toISOString().split('T')[0] : ''}
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
                        value={tour.endDate ? new Date(tour.endDate).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </CollapsibleSection>
                
                {/* Tur Programı */}
                <CollapsibleSection title="Tur Programı">
                  <div className="space-y-4">
                    {(tour.program || []).map((day, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Gün {index + 1}</span>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => setTour({ ...tour, program: tour.program?.filter((_, i) => i !== index) })}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={day.day || ''}
                          onChange={(e) => handleProgramChange(index, 'day', e.target.value)}
                          placeholder="Örn: 11 Nisan 2025, Cuma"
                          className={inputClass}
                        />
                        <input
                          type="text"
                          value={day.title || ''}
                          onChange={(e) => handleProgramChange(index, 'title', e.target.value)}
                          placeholder="Başlık"
                          className={inputClass}
                        />
                        <textarea
                          value={day.description || ''}
                          onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                          placeholder="Program açıklaması..."
                          rows={2}
                          className={inputClass}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setTour({ ...tour, program: [...(tour.program || []), { day: '', title: '', description: '' }] })}
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
                    {(tour.includedServices || []).map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleIncludedServiceChange(index, e.target.value)}
                          placeholder="Dahil olan hizmet"
                          className={`${inputClass} flex-1`}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => setTour({ ...tour, includedServices: tour.includedServices?.filter((_, i) => i !== index) })}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setTour({ ...tour, includedServices: [...(tour.includedServices || []), ''] })}
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
                    {(tour.excludedServices || []).map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleExcludedServiceChange(index, e.target.value)}
                          placeholder="Dahil olmayan hizmet"
                          className={`${inputClass} flex-1`}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => setTour({ ...tour, excludedServices: tour.excludedServices?.filter((_, i) => i !== index) })}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setTour({ ...tour, excludedServices: [...(tour.excludedServices || []), ''] })}
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
                    {(tour.additionalServices || []).map((service, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Hizmet {index + 1}</span>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => setTour({ ...tour, additionalServices: tour.additionalServices?.filter((_, i) => i !== index) })}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={service.name || ''}
                            onChange={(e) => handleAdditionalServiceChange(index, 'name', e.target.value)}
                            placeholder="Hizmet adı"
                            className={inputClass}
                          />
                          <input
                            type="number"
                            value={service.price || ''}
                            onChange={(e) => handleAdditionalServiceChange(index, 'price', Number(e.target.value))}
                            placeholder="Fiyat (₺)"
                            className={inputClass}
                          />
                        </div>
                        <textarea
                          value={service.description || ''}
                          onChange={(e) => handleAdditionalServiceChange(index, 'description', e.target.value)}
                          placeholder="Açıklama (opsiyonel)"
                          rows={2}
                          className={inputClass}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setTour({ ...tour, additionalServices: [...(tour.additionalServices || []), { name: '', price: 0, description: '' }] })}
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
                  onClick={() => router.push('/admin/tours')}
                  className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </form>
    </div>
  );
}
