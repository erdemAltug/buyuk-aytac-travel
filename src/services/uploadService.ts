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
 * Görsel URL'sini normalize et
 * R2 (http) veya yerel /public yolu
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  return `/${imagePath}`;
};

export default {
  uploadFile,
  getImageUrl
}; 