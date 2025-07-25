'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

const uploadSchema = z.object({
  title: z.string().min(1, 'Başlık gerekli').max(100, 'Başlık çok uzun'),
  firstName: z.string().min(1, 'Ad gerekli').max(50, 'Ad çok uzun'),
  lastName: z.string().min(1, 'Soyad gerekli').max(50, 'Soyad çok uzun'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin').max(15, 'Telefon numarası çok uzun'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Logo yüklemek için izin onayı gerekli',
  }),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setError(null);
        
        // Preview oluştur
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setError('Lütfen geçerli bir resim dosyası seçin');
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const onSubmit = async (data: UploadFormData) => {
    console.log('Form submit başladı', { data, selectedFile, consent });
    
    if (!selectedFile) {
      setError('Lütfen bir logo dosyası seçin');
      return;
    }

    if (!consent) {
      setError('Logo yüklemek için izin onayı gerekli');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      console.log('API çağrısı başlıyor...');
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('file', selectedFile);

      console.log('FormData hazırlandı, API çağrısı yapılıyor...');
      const response = await fetch('/api/logos', {
        method: 'POST',
        body: formData,
      });

      console.log('API yanıtı alındı:', response.status);
      const result = await response.json();
      console.log('API sonucu:', result);

      if (response.ok) {
        console.log('Başarılı! Logo yüklendi');
        // Başarı mesajı göster
        alert('Teşekkürler! Tasarımınız sergilenmek üzere başarıyla yüklendi. Yayından kaldırmak isterseniz bizimle iletişime geçebilirsiniz.');
        router.push(`/logo/${result._id}`);
      } else {
        console.log('API hatası:', result);
        const errorMessage = result.error || 'Logo yüklenirken hata oluştu';
        const details = result.details ? ` (${result.details})` : '';
        setError(errorMessage + details);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Logo yüklenirken hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Logo Yükle</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Başlığı */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Logo Başlığı
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Logo başlığını girin"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* İletişim Bilgileri */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h3>
            
            {/* Ad Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Ad *
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınız"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Soyad *
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Soyadınız"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email ve Telefon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0555 123 45 67"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dosya Seçimi */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Logo Dosyası
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="file" className="cursor-pointer">
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Dosya seçmek için tıklayın
                    </span>
                    <p className="text-sm">veya sürükleyip bırakın</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF, SVG (200x200px - 1200x1200px, max. 5MB)</p>
                </div>
              </label>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Seçilen dosya: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Preview */}
          {previewUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Önizleme
              </label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <Image
                  src={previewUrl}
                  alt="Logo önizleme"
                  width={400}
                  height={256}
                  className="max-w-full h-auto max-h-64 mx-auto object-contain"
                />
              </div>
            </div>
          )}

          {/* İzin Onayı */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
                <span className="font-medium text-blue-900">İzin Onayı:</span> Bu tasarımın web sitesinde sergilenmesine ve herkese açık şekilde görüntülenmesine izin veriyorum. Yayından kaldırmak isterseniz bizimle iletişime geçebilirsiniz.
              </label>
            </div>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !selectedFile || !consent}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? 'Yükleniyor...' : 'Logo Yükle'}
          </button>
        </form>
      </div>
    </div>
  );
} 