import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  console.log('POST /api/logos başladı');
  
  try {
    console.log('FormData parse ediliyor...');
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const file = formData.get('file') as File;

    console.log('Form verileri alındı:', { title, firstName, lastName, email, phone, fileName: file?.name });

    if (!title || !firstName || !lastName || !email || !phone || !file) {
      console.log('Eksik alanlar var');
      return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 });
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log('Dosya boyutu çok büyük:', file.size);
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan büyük olamaz' }, { status: 400 });
    }

    console.log('Dosya buffer\'a çevriliyor...');
    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Cloudinary\'ye yükleniyor...');
    // Cloudinary'ye yükle
    const result = await new Promise<any>((resolve, reject) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'logos',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload hatası:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload başarılı:', result?.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    console.log('MongoDB\'ye bağlanılıyor...');
    await connectDB();

    console.log('Logo veritabanına kaydediliyor...');
    const logo = await Logo.create({
      title,
      firstName,
      lastName,
      email,
      phone,
      imageUrl: result.secure_url,
      width: result.width,
      height: result.height,
    });

    console.log('Logo başarıyla kaydedildi:', logo._id);
    return NextResponse.json(logo);
  } catch (error) {
    console.error('Logo yükleme hatası:', error);
    
    // Daha detaylı hata mesajı
    let errorMessage = 'Logo yüklenirken hata oluştu';
    let errorDetails = 'Bilinmeyen hata';
    
    if (error instanceof Error) {
      errorDetails = error.message;
      
      // Cloudinary hatalarını yakala
      if (error.message.includes('cloudinary') || error.message.includes('CLOUDINARY')) {
        errorMessage = 'Resim yükleme servisi hatası';
      }
      
      // MongoDB hatalarını yakala
      if (error.message.includes('mongodb') || error.message.includes('MONGODB')) {
        errorMessage = 'Veritabanı bağlantı hatası';
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      details: errorDetails
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const sortOrder = order === 'desc' ? -1 : 1;

    const logos = await Logo.find()
      .sort({ [sort]: sortOrder });

    return NextResponse.json({
      logos,
    });
  } catch (error) {
    console.error('Logo listesi hatası:', error);
    return NextResponse.json({ 
      error: 'Logolar yüklenirken hata oluştu',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
} 