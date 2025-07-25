'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LogoGrid } from '@/components/LogoGrid';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Logo Oylama Platformu
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Logolarınızı yükleyin, topluluktan oy alın ve en popüler tasarımları keşfedin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session ? (
            <>
              <Link
                href="/upload"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Logo Yükle
              </Link>
              <Link
                href="/trending"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Trend Logoları Gör
              </Link>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Başlamak İçin Giriş Yap
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Logo Yükle</h3>
          <p className="text-gray-600">Logolarınızı kolayca yükleyin ve toplulukla paylaşın.</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Oy Ver</h3>
          <p className="text-gray-600">Beğendiğiniz logolara 1-5 yıldız arası puan verin.</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Trend Keşfet</h3>
          <p className="text-gray-600">En popüler ve trend logoları keşfedin.</p>
        </div>
      </div>

      {/* Recent Logos */}
      <div className="py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Son Yüklenen Logolar</h2>
        <LogoGrid />
      </div>
    </div>
  );
}
