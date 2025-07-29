'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RecentLogo {
  title: string;
  imageUrl: string;
  createdAt: string;
  votes: number;
}

interface RecentVote {
  userName: string;
  logoTitle: string;
  createdAt: string;
}

interface AdminStats {
  totalLogos: number;
  totalVotes: number;
  totalUsers: number;
  recentLogos: RecentLogo[];
  recentVotes: RecentVote[];
}

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats>({
    totalLogos: 0,
    totalVotes: 0,
    totalUsers: 0,
    recentLogos: [],
    recentVotes: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Admin istatistiklerini yükle
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      // API'den admin verilerini çek
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      // Veriyi güvenli hale getir
      const safeData = {
        totalLogos: data?.totalLogos || 0,
        totalVotes: data?.totalVotes || 0,
        totalUsers: data?.totalUsers || 0,
        recentLogos: data?.recentLogos || [],
        recentVotes: data?.recentVotes || []
      };
      
      setStats(safeData);
    } catch (error) {
      console.error('Admin verileri yüklenirken hata:', error);
      // Hata durumunda varsayılan değerleri kullan
      setStats({
        totalLogos: 0,
        totalVotes: 0,
        totalUsers: 0,
        recentLogos: [],
        recentVotes: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Admin paneli yükleniyor...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
              <p className="text-gray-600">Karaman Logo Yarışması Yönetimi</p>
            </div>
            <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam Logo</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.totalLogos || 0}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam Oy</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.totalVotes || 0}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam Kullanıcı</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats?.totalUsers || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Logos */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Son Yüklenen Logolar</h3>
            </div>
            <div className="p-6">
              {stats?.recentLogos?.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentLogos.map((logo, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img src={logo.imageUrl} alt={logo.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{logo.title}</p>
                        <p className="text-sm text-gray-500">{new Date(logo.createdAt).toLocaleDateString('tr-TR')}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {logo.votes} oy
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Henüz logo yüklenmemiş</p>
              )}
            </div>
          </div>

          {/* Recent Votes */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Son Oy Verenler</h3>
            </div>
            <div className="p-6">
              {stats?.recentVotes?.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentVotes.map((vote, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{vote.userName}</p>
                        <p className="text-sm text-gray-500">{vote.logoTitle} logosuna oy verdi</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(vote.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Henüz oy verilmemiş</p>
              )}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Admin İşlemleri</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/logos?key=kartap2025" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                Logo Yönetimi
              </Link>
              <Link href="/admin/comments?key=kartap2025" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center">
                Yorum Yönetimi
              </Link>
              <Link href="/admin/users?key=kartap2025" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-center">
                Kullanıcı Yönetimi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 