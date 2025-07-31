'use client';

import { useState, useEffect } from 'react';
import { LogoCard } from './LogoCard';

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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export function LogoGrid() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  useEffect(() => {
    fetchLogos(currentPage);
  }, [currentPage]);

  const fetchLogos = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/logos?page=${page}&limit=9`);
      const data = await response.json();
      
      if (response.ok) {
        setLogos(data.logos);
        setPagination(data.pagination);
      } else {
        setError(data.error || 'Logolar yüklenirken hata oluştu');
      }
    } catch {
      setError('Logolar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (!pagination || pagination.pages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // İlk sayfa
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        );
      }
    }

    // Sayfa numaraları
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium ${
            i === currentPage
              ? 'text-blue-600 bg-blue-50 border border-blue-300'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Son sayfa
    if (endPage < pagination.pages) {
      if (endPage < pagination.pages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={pagination.pages}
          onClick={() => handlePageChange(pagination.pages)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
        >
          {pagination.pages}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center space-x-1 mt-8">
        {/* Önceki sayfa */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === 1
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          ← Önceki
        </button>

        {/* Sayfa numaraları */}
        <div className="flex">{pages}</div>

        {/* Sonraki sayfa */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.pages}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === pagination.pages
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Sonraki →
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
        {renderPagination()}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (logos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Henüz logo yüklenmemiş.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos.map((logo) => (
          <LogoCard key={logo._id} logo={logo} />
        ))}
      </div>
      
      {/* Sayfalama bilgisi */}
      {pagination && (
        <div className="text-center mt-6 text-sm text-gray-600">
          Toplam {pagination.total} logo • Sayfa {currentPage} / {pagination.pages}
        </div>
      )}
      
      {/* Sayfalama kontrolleri */}
      {renderPagination()}
    </div>
  );
} 