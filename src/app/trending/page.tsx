'use client';

import { useState, useEffect } from 'react';
import { LogoCard } from '@/components/LogoCard';

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
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {logos.map((logo) => (
            <LogoCard key={logo._id} logo={logo} />
          ))}
        </div>
      )}
    </div>
  );
} 