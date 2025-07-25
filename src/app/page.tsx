'use client';

import Link from 'next/link';
import { LogoGrid } from '@/components/LogoGrid';

export default function Home() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Karaman
            </span>
            <br />
            <span className="text-gray-800">Logosunu Seçiyor</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-inter leading-relaxed">
            Karaman&apos;ın en güzel logolarını yükleyin, topluluktan oy alın ve 
            <span className="text-blue-600 font-semibold"> EN POPÜLER TASARIMLARI</span> keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/upload"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-poppins"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Logo Yükle</span>
              </span>
            </Link>
            <Link
              href="/trending"
              className="group bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300 font-poppins shadow-lg"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Trend Logoları Gör</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">Logo Yükle</h3>
          <p className="text-gray-600 font-inter leading-relaxed">Karaman&apos;ın en güzel logolarını kolayca yükleyin ve toplulukla paylaşın.</p>
        </div>

        <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.4s'}}>
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">Oy Ver</h3>
          <p className="text-gray-600 font-inter leading-relaxed">Beğendiğiniz logolara 1-5 yıldız arası puan verin ve en iyileri seçin.</p>
        </div>

        <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.6s'}}>
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">Trend Keşfet</h3>
          <p className="text-gray-600 font-inter leading-relaxed">En popüler ve trend logoları keşfedin, Karaman&apos;ın en iyi tasarımlarını görün.</p>
        </div>
      </div>

      {/* Recent Logos */}
      <div className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SON YÜKLENEN
            </span>
            <br />
            <span className="text-gray-800">LOGOLAR</span>
          </h2>
          <p className="text-lg text-gray-600 font-inter">Karaman&apos;ın en yeni logo tasarımlarını keşfedin</p>
        </div>
        <div className="animate-fadeIn" style={{animationDelay: '0.8s'}}>
          <LogoGrid />
        </div>
      </div>
    </div>
  );
}
