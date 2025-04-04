import axios from 'axios';
import { ITour } from '@/models/Tour';

const API_URL = '/api/tours';

// Tüm turları getir
export const getTours = async (params?: { 
  isActive?: boolean;
  destination?: string;
  tourType?: string;
  accommodationType?: string;
  isLastMinute?: boolean;
}): Promise<ITour[]> => {
  try {
    let url = API_URL;
    
    if (params) {
      const queryParams = new URLSearchParams();
      
      if (params.isActive !== undefined) {
        queryParams.append('isActive', params.isActive.toString());
      }
      
      if (params.destination) {
        queryParams.append('destination', params.destination);
      }
      
      if (params.tourType) {
        queryParams.append('tourType', params.tourType);
      }
      
      if (params.accommodationType) {
        queryParams.append('accommodationType', params.accommodationType);
      }
      
      if (params.isLastMinute !== undefined) {
        queryParams.append('isLastMinute', params.isLastMinute.toString());
      }
      
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Turları getirme hatası:', error);
    throw error;
  }
};

// Tur detayını getir
export const getTourBySlug = async (slug: string): Promise<ITour> => {
  try {
    const response = await axios.get(`${API_URL}/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`${slug} slug'ına sahip turu getirme hatası:`, error);
    throw error;
  }
};

// Yeni tur ekle
export const createTour = async (data: Partial<ITour>): Promise<ITour> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Tur ekleme hatası:', error);
    throw error;
  }
};

// Tur güncelle
export const updateTour = async (slug: string, data: Partial<ITour>): Promise<ITour> => {
  try {
    const response = await axios.put(`${API_URL}/${slug}`, data);
    return response.data;
  } catch (error) {
    console.error('Tur güncelleme hatası:', error);
    throw error;
  }
};

// Tur sil
export const deleteTour = async (slug: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${slug}`);
  } catch (error) {
    console.error('Tur silme hatası:', error);
    throw error;
  }
}; 