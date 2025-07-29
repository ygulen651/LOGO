'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Logo {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl: string;
  createdAt: string;
  totalLikes: number;
  totalVotes: number;
  status: 'pending' | 'approved' | 'rejected';
}

export default function LogoManagement() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all');

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await fetch('/api/admin/logos');
      const data = await response.json();
      setLogos(data);
    } catch (error) {
      console.error('Logolar yüklenirken hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLogo = async (logoId: string) => {
    if (!confirm('Bu logoyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/logos/${logoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Logo listesinden kaldır
        setLogos(prevLogos => prevLogos.filter(logo => logo._id !== logoId));
        alert('Logo başarıyla silindi');
      } else {
        alert('Logo silinirken hata oluştu');
      }
    } catch (error) {
      console.error('Logo silinirken hata:', error);
      alert('Logo silinirken hata oluştu');
    }
  };

  const filteredLogos = logos.filter(logo => {
    if (filter === 'all') return true;
    if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(logo.createdAt) > oneWeekAgo;
    }
    if (filter === 'popular') return logo.totalLikes > 5;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Logolar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Logo Yönetimi</h1>
              <p className="text-gray-600">Logo onaylama ve reddetme işlemleri</p>
            </div>
            <Link href="/admin?key=kartap2025" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Admin Paneline Dön
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tümü ({logos.length})
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'recent' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Son 7 Gün ({logos.filter(l => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return new Date(l.createdAt) > oneWeekAgo;
              }).length})
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'popular' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Popüler ({logos.filter(l => l.totalLikes > 5).length})
            </button>
          </div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLogos.map((logo) => (
            <div key={logo._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={logo.imageUrl} 
                  alt={logo.title}
                  className="w-full h-48 object-cover"
                />
                                 <div className="absolute top-2 right-2">
                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                     {logo.totalLikes} beğeni
                   </span>
                 </div>
              </div>
              
                             <div className="p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{logo.title}</h3>
                 <p className="text-gray-600 text-sm mb-2">Yükleyen: {logo.firstName} {logo.lastName}</p>
                 <p className="text-gray-500 text-xs mb-4">{logo.email} | {logo.phone}</p>
                 
                 <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                   <span>{new Date(logo.createdAt).toLocaleDateString('tr-TR')}</span>
                   <span>{logo.totalLikes} beğeni / {logo.totalVotes} oy</span>
                 </div>

                                 <div className="flex space-x-2">
                   <button
                     onClick={() => deleteLogo(logo._id)}
                     className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                   >
                     Logoyu Sil
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Logo Bulunamadı</h3>
            <p className="text-gray-500">Seçilen filtrelere uygun logo bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
} 