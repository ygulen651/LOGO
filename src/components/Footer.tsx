export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* KARTAP Hakkında */}
          <div>
            <h3 className="text-xl font-bold mb-4">KARAMAN LOGO YARIŞMASI</h3>
            <p className="text-gray-300 mb-4">
              Karaman Logo Yarışması, Karaman Tanıtım ve Turizm Derneği (KARTAP) tarafından düzenlenmektedir. 
              Amaç, Karaman&apos;ın kimliğini yansıtan özgün tasarımları desteklemektir.
            </p>
            <div className="flex items-center space-x-2">
              <img src="/kartap logo.png" alt="KARTAP Logo" className="w-8 h-8" />
              <span className="text-sm text-gray-400">KARTAP</span>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="/trending" className="text-gray-300 hover:text-white transition-colors">
                  Trend Logolar
                </a>
              </li>
              <li>
                <a href="/upload" className="text-gray-300 hover:text-white transition-colors">
                  Logo Yükle
                </a>
              </li>
            </ul>
          </div>

          {/* SEO İçeriği */}
          <div>
            <h3 className="text-xl font-bold mb-4">Karaman Logo Yarışması</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <strong>Karaman Logo Yarışması</strong> - Resmi logo oylama platformu. 
                Karaman şehri için en güzel logoları tasarlayın ve oy verin.
              </p>
              <p>
                <strong>KARTAP</strong> tarafından düzenlenen <strong>Karaman logo yarışması</strong>na 
                katılarak şehrin kimliğini yansıtan özgün tasarımlar oluşturun.
              </p>
              <p>
                <strong>Karaman logosu</strong>, <strong>Karaman tasarım</strong>, 
                <strong>Karaman turizm logo</strong> yarışması için hemen başvurun.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Karaman Tanıtım ve Turizm Derneği (KARTAP). Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Karaman Logo Yarışması - Resmi Oylama Platformu
          </p>
        </div>
      </div>
    </footer>
  );
} 