import axios from 'axios';

export interface UploadResponse {
  success: boolean;
  message: string;
  filePath?: string;
  url?: string;
  error?: string;
}

/**
 * Dosya yükleme servisi
 * @param file - Yüklenecek dosya
 * @param folder - Dosyanın yükleneceği klasör (destinations, tours)
 * @returns UploadResponse
 */
export const uploadFile = async (file: File, folder: string = 'uploads'): Promise<UploadResponse> => {
  try {
    // FormData oluştur
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    // API'ye dosya yükle
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as UploadResponse;
    }
    
    return {
      success: false,
      message: 'Dosya yüklenirken beklenmeyen bir hata oluştu',
      error: (error as Error).message
    };
  }
};

/**
 * Görsel URL'sini kontrol etme
 * Eğer URL `/` ile başlıyorsa yerel bir dosya, aksi takdirde tam URL
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('/')) {
    return imagePath; // Zaten yerel bir yol
  } else if (imagePath.startsWith('http')) {
    return imagePath; // Zaten tam URL
  } else {
    return `/${imagePath}`; // Başına / ekle
  }
};

export default {
  uploadFile,
  getImageUrl
}; 