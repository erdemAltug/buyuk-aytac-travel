'use client';

import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function TestSentryPage() {
  const [result, setResult] = useState<string>('');

  const testClientError = () => {
    try {
      // Client-side hata oluştur
      throw new Error('🧪 Client Test Hatası - Sentry test ediliyor!');
    } catch (error) {
      Sentry.captureException(error);
      setResult('Client hatası gönderildi!');
    }
  };

  const testServerError = async () => {
    try {
      const response = await fetch('/api/test-sentry');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + String(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Sentry Test Sayfası</h1>
        
        <div className="space-y-4">
          <button
            onClick={testClientError}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Client Hata Testi
          </button>
          
          <button
            onClick={testServerError}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Server Hata Testi
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Sonuç:</h3>
            <pre className="text-sm overflow-auto">{result}</pre>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p>Test ettikten sonra Sentry dashboard'unu kontrol et.</p>
          <a 
            href="https://sentry.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Sentry Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}
