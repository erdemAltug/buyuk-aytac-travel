import axios from 'axios';

export interface IContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const API_URL = '/api/contact';

// İletişim formunu gönder
export const submitContactForm = async (data: IContactForm): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('İletişim formu gönderme hatası:', error);
    throw error;
  }
}; 