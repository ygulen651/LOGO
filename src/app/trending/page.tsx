'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Logo {
  _id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  totalVotes: number;
  totalLikes: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export default function TrendingPage() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingLogos = async () => {
      try {
        const response = await fetch('/api/logos/trending?limit=20');
        const data = await response.json();
        
        if (response.ok) {
          setLogos(data);
        } else {
          setError(data.error || 'Trending logolar yüklenirken hata oluştu');
        }
      } catch {
        setError('Trending logolar yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingLogos();
  }, []);

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
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hata</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Trend Logolar
        </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En çok beğenilen ve popüler logoları keşfedin. Karaman&apos;ın en iyi tasarımlarını görün.
          </p>
      </div>

      {logos.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Henüz logo yok</h2>
          <p className="text-gray-600 mb-8">
            İlk logoyu yükleyerek trend listesini başlatın!
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Logo Yükle
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {logos.map((logo) => (
            <Link key={logo._id} href={`/logo/${logo._id}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                    {logo.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Tasarımcı: <span className="font-medium text-blue-600">{logo.firstName} {logo.lastName}</span>
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="text-sm text-gray-600">{logo.totalLikes} beğeni</span>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 