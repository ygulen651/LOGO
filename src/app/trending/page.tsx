'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Logo {
  _id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  totalVotes: number;
  averageRating: number;
  createdAt: string;
}

export default function TrendingPage() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrendingLogos();
  }, []);

  const fetchTrendingLogos = async () => {
    try {
      const response = await fetch('/api/logos/trending?limit=12');
      const data = await response.json();
      
      if (response.ok) {
        setLogos(data);
      } else {
        setError(data.error || 'Trend logolar yüklenirken hata oluştu');
      }
    } catch {
      setError('Trend logolar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (logoId: string) => {
    if (!confirm('Bu logoyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    const password = prompt('Admin şifresini girin:');
    if (!password) {
      return;
    }

    try {
      const response = await fetch(`/api/logos/${logoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setLogos(logos.filter(logo => logo._id !== logoId));
        alert('Logo başarıyla silindi!');
      } else {
        alert(data.error || 'Logo silinirken hata oluştu');
      }
    } catch {
      alert('Logo silinirken hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TREND LOGOLAR</h1>
          <p className="text-xl text-gray-600">EN POPÜLER LOGOLARI KEŞFEDİN</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Trend Logolar</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">TREND LOGOLAR</h1>
        <p className="text-xl text-gray-600">EN POPÜLER LOGOLARI KEŞFEDİN</p>
      </div>

      {logos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Henüz trend logo bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logos.map((logo) => (
            <div key={logo._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
              <button
                onClick={() => handleDelete(logo._id)}
                className="absolute top-2 right-2 z-10 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
                title="Logoyu Sil"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="relative h-40 bg-gray-100">
                <Image
                  src={logo.imageUrl}
                  alt={logo.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {logo.title}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(logo.averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 fill-current'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {logo.totalVotes} oy
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(logo.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 