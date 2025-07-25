'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoCard } from './LogoCard';

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

export function LogoGrid() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await fetch('/api/logos?limit=6');
      const data = await response.json();
      
      if (response.ok) {
        setLogos(data.logos);
      } else {
        setError(data.error || 'Logolar yüklenirken hata oluştu');
      }
    } catch (err) {
      setError('Logolar yüklenirken hata oluştu');
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
    } catch (err) {
      alert('Logo silinirken hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
          </div>
        ))}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {logos.map((logo) => (
        <LogoCard key={logo._id} logo={logo} onDelete={handleDelete} />
      ))}
    </div>
  );
} 