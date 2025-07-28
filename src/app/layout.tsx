import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Karaman Logo Yarışması - Resmi Logo Oylama Platformu | KARTAP",
  description: "Karaman logo yarışması resmi platformu. Karaman için en güzel logoları yükleyin, oy verin ve trend tasarımları keşfedin. KARTAP tarafından düzenlenen logo yarışmasına katılın.",
  keywords: "karaman logo, karaman logo yarışması, karaman logosu, karaman tasarım, kartap logo, karaman turizm logo, karaman şehir logosu, karaman belediye logo",
  authors: [{ name: "KARTAP - Karaman Tanıtım ve Turizm Derneği" }],
  creator: "KARTAP",
  publisher: "Karaman Tanıtım ve Turizm Derneği",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.karamanlogosunuseciyor.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Karaman Logo Yarışması - Resmi Logo Oylama Platformu",
    description: "Karaman logo yarışması resmi platformu. En güzel logoları yükleyin, oy verin ve trend tasarımları keşfedin.",
    url: 'https://www.karamanlogosunuseciyor.com',
    siteName: 'Karaman Logo Yarışması',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/kartap-logo.png',
        width: 1200,
        height: 630,
        alt: 'Karaman Logo Yarışması - KARTAP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Karaman Logo Yarışması - Resmi Logo Oylama Platformu",
    description: "Karaman logo yarışması resmi platformu. En güzel logoları yükleyin, oy verin ve trend tasarımları keşfedin.",
    images: ['/kartap-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console'dan alacağınız kod
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Karaman Logo Yarışması",
    "description": "Karaman logo yarışması resmi platformu. KARTAP tarafından düzenlenen logo yarışmasına katılın.",
    "url": "https://www.karamanlogosunuseciyor.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.karamanlogosunuseciyor.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KARTAP - Karaman Tanıtım ve Turizm Derneği",
      "url": "https://www.karamanlogosunuseciyor.com"
    },
    "mainEntity": {
      "@type": "CreativeWork",
      "name": "Karaman Logo Yarışması",
      "description": "Karaman şehri için logo tasarım yarışması",
      "creator": {
        "@type": "Organization",
        "name": "KARTAP"
      }
    }
  };

  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/kartap-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/kartap-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
