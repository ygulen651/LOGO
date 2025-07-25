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
            Şehrimizi en iyi yansıtan turizm logosunu birlikte seçiyoruz!
            <br />
            <span className="text-blue-600 font-semibold">Yaratıcılığına güveniyorsan, kültürel mirasımızı ve doğal güzelliklerimizi yansıtan bir logo tasarla, yarışmamıza katıl!</span>
          </p>
        </div>
      </div>

      {/* Features Section - Tıklanabilir Kartlar */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <Link href="/upload" className="block">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn cursor-pointer" style={{animationDelay: '0.2s'}}>
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">Logo Yükle</h3>
            <p className="text-gray-600 font-inter leading-relaxed">Karaman&apos;ın en güzel logolarını kolayca yükleyin ve toplulukla paylaşın.</p>
          </div>
        </Link>

        <Link href="/trending" className="block">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn cursor-pointer" style={{animationDelay: '0.4s'}}>
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">Oy Ver</h3>
            <p className="text-gray-600 font-inter leading-relaxed">Beğendiğiniz logolara 1-5 yıldız arası puan verin ve en iyileri seçin.</p>
          </div>
        </Link>

        <Link href="/trending" className="block">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn cursor-pointer" style={{animationDelay: '0.6s'}}>
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">Trend Keşfet</h3>
            <p className="text-gray-600 font-inter leading-relaxed">En popüler ve trend logoları keşfedin, Karaman&apos;ın en iyi tasarımlarını görün.</p>
          </div>
        </Link>
      </div>

      {/* Why City Logo Matters Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ŞEHİR LOGOSU
            </span>
            <br />
            <span className="text-gray-800">NEDEN ÖNEMLİDİR?</span>
          </h2>
          <p className="text-lg text-gray-600 font-inter">Karaman&apos;ın kimliğini yansıtan güçlü bir logo tasarımının önemi</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {/* Card 1 - Kimlik ve Aidiyet */}
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3 font-playfair text-gray-800">Kimlik ve Aidiyet</h3>
            <p className="text-sm text-gray-600 font-inter leading-relaxed">Bir şehir logosu, o kente ait görsel bir kimlik oluşturur. Hem yerel halkın aidiyet duygusunu pekiştirir hem de dışarıdan gelenlere şehrin karakteri hakkında ipucu verir.</p>
          </div>

          {/* Card 2 - Tanıtım ve Pazarlama */}
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3 font-playfair text-gray-800">Tanıtım ve Pazarlama</h3>
            <p className="text-sm text-gray-600 font-inter leading-relaxed">Turizm, yatırım ve marka değeri açısından şehirlerin küresel rekabette öne çıkması gerekir. Güçlü ve özgün bir logo, şehri daha akılda kalıcı ve çekici hale getirir.</p>
          </div>

          {/* Card 3 - Kurumsal Görünüm */}
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3 font-playfair text-gray-800">Kurumsal Görünüm</h3>
            <p className="text-sm text-gray-600 font-inter leading-relaxed">Kamu kurumları, belediye projeleri, etkinlikler ve kampanyalarda tek bir görsel dil kullanmak şehrin profesyonel görünümünü destekler.</p>
          </div>

          {/* Card 4 - Hikâye Anlatımı */}
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.8s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3 font-playfair text-gray-800">Hikâye Anlatımı</h3>
            <p className="text-sm text-gray-600 font-inter leading-relaxed">Şehrin tarihi, kültürü, doğası veya vizyonu, logo aracılığıyla sembolik bir şekilde anlatılabilir. Bu da iletişimde güçlü bir araçtır.</p>
          </div>
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
        <div className="animate-fadeIn" style={{animationDelay: '1.0s'}}>
          <LogoGrid />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KARAMAN LOGO YARIŞMASI
                </span>
              </h3>
              <p className="text-lg text-gray-600 font-inter leading-relaxed max-w-4xl mx-auto">
                Karaman Logo Yarışması, <span className="text-blue-600 font-semibold">Karaman Tanıtım ve Turizm Derneği (KARTAP)</span> tarafından düzenlenmektedir.
                <br />
                Amaç, Karaman&apos;ın kimliğini yansıtan özgün tasarımları desteklemektir.
              </p>
            </div>
            
            {/* KARTAP Logo */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <img 
                  src="/kartap logo.png" 
                  alt="KARTAP Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-500 font-inter">
              © 2024 Karaman Tanıtım ve Turizm Derneği. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
