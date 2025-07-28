import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/kartap logo.png" alt="KARTAP Logo" className="w-8 h-8" />
            <span className="text-sm text-gray-400">KARTAP</span>
          </div>
          
          <div className="flex justify-center space-x-8 mb-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/trending" className="text-gray-300 hover:text-white transition-colors">
              Trend Logolar
            </Link>
            <Link href="/upload" className="text-gray-300 hover:text-white transition-colors">
              Logo Yükle
            </Link>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              © 2024 Karaman Tanıtım ve Turizm Derneği (KARTAP). Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 