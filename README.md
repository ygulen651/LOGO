# Logo Oylama Uygulaması

Modern ve kullanıcı dostu bir logo oylama ve anket web uygulaması. Kullanıcılar logolarını yükleyebilir, diğer logolara oy verebilir ve trend logoları keşfedebilir.

## 🚀 Özellikler

- **Kullanıcı Kimlik Doğrulama**: Google OAuth ile güvenli giriş
- **Logo Yükleme**: Cloudinary entegrasyonu ile otomatik boyut algılama
- **Oylama Sistemi**: Tek like butonu ile beğeni sistemi
- **Trend Logolar**: En popüler logoları görüntüleme
- **Kullanıcı Dashboard**: Kişisel logo ve oy geçmişi
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Gerçek Zamanlı Güncellemeler**: Anlık oy ve puan güncellemeleri

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod** (Form validasyonu)

### Backend
- **Next.js API Routes**
- **MongoDB** (Mongoose ODM)
- **NextAuth.js** (Kimlik doğrulama)
- **Cloudinary** (Resim yükleme)

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- MongoDB veritabanı
- Google OAuth hesabı
- Cloudinary hesabı

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd logo-voting-app
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Değişkenlerini Ayarlayın
`.env.local` dosyası oluşturun:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/logo-voting-app

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Google OAuth Ayarları
1. [Google Cloud Console](https://console.cloud.google.com/)'a gidin
2. Yeni bir proje oluşturun
3. OAuth 2.0 client ID oluşturun
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 5. Cloudinary Ayarları
1. [Cloudinary](https://cloudinary.com/) hesabı oluşturun
2. Dashboard'dan cloud name, API key ve API secret'ı alın

### 6. Uygulamayı Çalıştırın
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # NextAuth.js routes
│   │   ├── logos/         # Logo CRUD operations
│   │   └── user/          # User-specific data
│   ├── dashboard/         # User dashboard page
│   ├── logo/              # Logo detail pages
│   ├── trending/          # Trending logos page
│   ├── upload/            # Logo upload page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── LogoCard.tsx       # Logo card component
│   ├── LogoGrid.tsx       # Logo grid component
│   ├── Navbar.tsx         # Navigation bar
│   └── providers/         # Context providers
├── lib/                   # Utility libraries
│   ├── models/            # Mongoose models
│   ├── auth.ts            # NextAuth.js config
│   ├── cloudinary.ts      # Cloudinary config
│   └── mongodb.ts         # MongoDB connection
└── types/                 # TypeScript type definitions
```

## 🔧 API Endpoints

### Logolar
- `GET /api/logos` - Tüm logoları listele
- `POST /api/logos` - Yeni logo yükle
- `GET /api/logos/[id]` - Logo detayı
- `GET /api/logos/trending` - Trend logolar

### Oylama
- `POST /api/logos/[id]/vote` - Logo oyla
- `GET /api/logos/[id]/vote` - Kullanıcı oyunu kontrol et

### Kullanıcı
- `GET /api/user/logos` - Kullanıcının logoları
- `GET /api/user/votes` - Kullanıcının oyları

## 🎨 Özellikler Detayı

### Logo Yükleme
- Drag & drop dosya yükleme
- Otomatik boyut algılama
- Cloudinary'de güvenli depolama
- Form validasyonu

### Oylama Sistemi
- Tek like butonu ile beğeni sistemi
- Duplicate oy engelleme
- Gerçek zamanlı beğeni sayısı güncelleme
- Kullanıcı oy geçmişi

### Dashboard
- Kişisel istatistikler
- Yüklenen logolar listesi
- Verilen oylar geçmişi
- Hızlı logo yükleme linki

## 🚀 Deployment

### Vercel Deployment
1. Projeyi GitHub'a push edin
2. Vercel'de yeni proje oluşturun
3. Environment değişkenlerini ayarlayın
4. Deploy edin

### Environment Değişkenleri (Production)
```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.
