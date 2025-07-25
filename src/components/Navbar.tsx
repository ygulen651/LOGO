'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LogoVote
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Ana Sayfa
            </Link>
            <Link href="/trending" className="text-gray-700 hover:text-blue-600">
              Trend Logolar
            </Link>
            {session && (
              <>
                <Link href="/upload" className="text-gray-700 hover:text-blue-600">
                  Logo Yükle
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'Kullanıcı'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-gray-700">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Giriş Yap
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Ana Sayfa
              </Link>
              <Link href="/trending" className="text-gray-700 hover:text-blue-600">
                Trend Logolar
              </Link>
              {session && (
                <>
                  <Link href="/upload" className="text-gray-700 hover:text-blue-600">
                    Logo Yükle
                  </Link>
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                </>
              )}
              {session ? (
                <div className="flex items-center space-x-2">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'Kullanıcı'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-gray-700">{session.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Çıkış
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn('google')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Giriş Yap
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 