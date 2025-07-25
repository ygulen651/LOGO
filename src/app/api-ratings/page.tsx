'use client';

import { useState, useEffect } from 'react';

interface ApiRating {
  _id: string;
  apiName: string;
  endpoint: string;
  method: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  rating: number;
  lastRequestTime: string;
  successRate: number;
}

export default function ApiRatingsPage() {
  const [ratings, setRatings] = useState<ApiRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiRatings();
  }, []);

  const fetchApiRatings = async () => {
    try {
      const response = await fetch('/api/ratings');
      const data = await response.json();
      
      if (response.ok) {
        setRatings(data);
      } else {
        setError(data.error || 'API puanları yüklenirken hata oluştu');
      }
    } catch {
      setError('API puanları yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingEmoji = (rating: number) => {
    if (rating >= 4.5) return '⭐';
    if (rating >= 3.5) return '⭐';
    if (rating >= 2.5) return '⭐';
    return '⭐';
  };

  const formatResponseTime = (time: number) => {
    if (time < 1000) return `${time.toFixed(0)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Puanları</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Puanları</h1>
        <p className="text-xl text-gray-600">Tüm API&apos;lerin performans puanları</p>
      </div>

      {ratings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Henüz API puanı bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {ratings.map((rating) => (
            <div key={rating._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{rating.apiName}</h3>
                  <p className="text-gray-600">{rating.method} {rating.endpoint}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getRatingColor(rating.rating)}`}>
                    {getRatingEmoji(rating.rating)} {rating.rating.toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-500">Puan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Toplam İstek</p>
                  <p className="text-2xl font-bold text-blue-900">{rating.totalRequests}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Başarı Oranı</p>
                  <p className="text-2xl font-bold text-green-900">
                    {((rating.successfulRequests / rating.totalRequests) * 100).toFixed(1)}%
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-600 font-medium">Ortalama Süre</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {formatResponseTime(rating.averageResponseTime)}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Son İstek</p>
                  <p className="text-sm font-bold text-purple-900">
                    {new Date(rating.lastRequestTime).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Başarılı: {rating.successfulRequests}</span>
                  <span>Başarısız: {rating.failedRequests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 