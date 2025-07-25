'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg font-playfair">K</span>
              </div>
              <div>
                              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
                Karaman
              </h1>
              <p className="text-xs text-gray-500 -mt-1 font-inter">Logosunu Seçiyor</p>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group">
              ANA SAYFA
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/trending" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group">
              TREND LOGOLAR
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/api-ratings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group">
              API PUANLARI
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/upload" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              LOGO YÜKLE
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100 animate-slideDown">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
                ANA SAYFA
              </Link>
              <Link href="/trending" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
                TREND LOGOLAR
              </Link>
              <Link href="/api-ratings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
                API PUANLARI
              </Link>
              <Link href="/upload" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium text-center">
                LOGO YÜKLE
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 