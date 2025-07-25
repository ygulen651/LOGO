'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function LogoDetailPage() {
  const params = useParams();
  const logoId = params.id as string;
  
  const [logo, setLogo] = useState<Logo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    fetchLogo();
  }, [logoId]);

  const fetchLogo = async () => {
    try {
      const response = await fetch(`/api/logos/${logoId}`);
      const data = await response.json();
      
      if (response.ok) {
        setLogo(data);
      } else {
        setError(data.error || 'Logo bulunamadı');
      }
    } catch (err) {
      setError('Logo yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (rating: number) => {
    setVoting(true);
    try {
      const response = await fetch(`/api/logos/${logoId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUserRating(rating);
        if (logo) {
          setLogo({
            ...logo,
            averageRating: data.averageRating,
            totalVotes: data.totalVotes,
          });
        }
      } else {
        alert(data.error || 'Oy verirken hata oluştu');
      }
    } catch (err) {
      alert('Oy verirken hata oluştu');
    } finally {
      setVoting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        onClick={() => interactive && onStarClick && onStarClick(i + 1)}
        disabled={!interactive || voting}
        className={`w-8 h-8 ${
          interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''
        } ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 fill-current'
        }`}
      >
        <svg viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !logo) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hata</h1>
        <p className="text-gray-600">{error || 'Logo bulunamadı'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Logo Image */}
        <div className="relative h-96 bg-gray-100">
          <Image
            src={logo.imageUrl}
            alt={logo.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Logo Info */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{logo.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-500">
                  {new Date(logo.createdAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Boyutlar</p>
                  <p className="font-semibold">{logo.width} × {logo.height}px</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Toplam Oy</p>
                  <p className="font-semibold">{logo.totalVotes}</p>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="lg:w-80">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ortalama Puan</h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  {renderStars(logo.averageRating)}
                  <span className="text-lg font-semibold text-gray-900">
                    {logo.averageRating.toFixed(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  {logo.totalVotes} kişi oy verdi
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sizin Oyunuz</h4>
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(userRating || 0, true, handleVote)}
                  </div>
                  {userRating && (
                    <p className="text-sm text-green-600">
                      {userRating} yıldız verdiniz
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 