import axios from 'axios';
import { IDestination } from '@/models/Destination';

const API_URL = '/api/destinations';

// Tüm destinasyonları getir
export const getDestinations = async (isActive?: boolean): Promise<IDestination[]> => {
  try {
    let url = API_URL;
    if (isActive !== undefined) {
      url += `?isActive=${isActive}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Destinasyonları getirme hatası:', error);
    throw error;
  }
};

// Destinasyon detayını getir
export const getDestinationBySlug = async (slug: string): Promise<IDestination> => {
  try {
    const response = await axios.get(`${API_URL}/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`${slug} slug'ına sahip destinasyonu getirme hatası:`, error);
    throw error;
  }
};

// Yeni destinasyon ekle
export const createDestination = async (data: Partial<IDestination>): Promise<IDestination> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Destinasyon ekleme hatası:', error);
    throw error;
  }
};

// Destinasyonu güncelle
export const updateDestination = async (slug: string, data: Partial<IDestination>): Promise<IDestination> => {
  try {
    const response = await axios.put(`${API_URL}/${slug}`, data);
    return response.data;
  } catch (error) {
    console.error('Destinasyon güncelleme hatası:', error);
    throw error;
  }
};

// Destinasyonu sil
export const deleteDestination = async (slug: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${slug}`);
  } catch (error) {
    console.error('Destinasyon silme hatası:', error);
    throw error;
  }
}; 