'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BulkToursPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Excel dosyası kontrolü
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/csv' // .csv
      ];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Lütfen Excel (.xlsx, .xls) veya CSV dosyası seçin');
        setFile(null);
      }
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await fetch('/api/admin/tours/template');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tur-sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Template indirme hatası:', err);
      setError('Şablon indirilemedi');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Lütfen bir dosya seçin');
      return;
    }

    setUploading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/tours/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Upload başarısız');
      }
    } catch (err) {
      console.error('Upload hatası:', err);
      setError('Dosya yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Toplu Tur Ekleme</h1>
              <p className="text-gray-600 mt-2">Excel dosyası yükleyerek birden fazla tur ekleyin</p>
            </div>
            <Link
              href="/admin/tours"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Geri Dön
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Excel Dosyası Yükle</h2>
            
            {/* Template Download */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">1. Şablon İndir</h3>
              <p className="text-blue-700 text-sm mb-3">
                Önce şablon dosyasını indirin ve tur bilgilerini doldurduktan sonra yükleyin.
              </p>
              <button
                onClick={downloadTemplate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                📄 Şablon İndir (.xlsx)
              </button>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Doldurulmuş Dosyayı Yükle</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Dosya seçmek için tıklayın
                      </span>
                      <span> veya sürükleyip bırakın</span>
                    </div>
                    <p className="text-xs text-gray-500">Excel (.xlsx, .xls) veya CSV dosyaları</p>
                  </div>
                </label>
              </div>
              
              {file && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-700">
                    ✅ Seçilen dosya: <strong>{file.name}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                !file || uploading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Yükleniyor...
                </div>
              ) : (
                '🚀 Turları Toplu Ekle'
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">❌ {error}</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Kullanım Talimatları</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">Adım 1: Şablon İndir</h3>
                <p className="text-sm text-gray-600">Yukarıdaki "Şablon İndir" butonuna tıklayarak Excel şablonunu indirin.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900">Adım 2: Bilgileri Doldurun</h3>
                <p className="text-sm text-gray-600">İndirdiğiniz Excel dosyasındaki sütunları tur bilgileriyle doldurun.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-900">Adım 3: Dosyayı Yükleyin</h3>
                <p className="text-sm text-gray-600">Doldurduğunuz dosyayı yukarıdan seçip "Turları Toplu Ekle" butonuna tıklayın.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">⚠️ Önemli Notlar</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Şablondaki sütun başlıklarını değiştirmeyin</li>
                <li>• Zorunlu alanları boş bırakmayın</li>
                <li>• Fiyatları sadece sayı olarak girin</li>
                <li>• Tarih formatı: GG/AA/YYYY</li>
                <li>• Görsel URL'leri geçerli linkler olmalı</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Yükleme Sonuçları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{result.success}</div>
                <div className="text-sm text-green-700">Başarılı</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{result.failed}</div>
                <div className="text-sm text-red-700">Başarısız</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{result.total}</div>
                <div className="text-sm text-blue-700">Toplam</div>
              </div>
            </div>

            {result.errors && result.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">❌ Hatalar:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {result.errors.map((error: string, index: number) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.success > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-700">
                  🎉 {result.success} tur başarıyla eklendi! 
                  <Link href="/admin/tours" className="ml-2 font-medium underline">
                    Turları görüntüle →
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 