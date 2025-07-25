import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const file = formData.get('file') as File;

    if (!title || !firstName || !lastName || !email || !phone || !file) {
      return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 });
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan büyük olamaz' }, { status: 400 });
    }

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary'ye yükle
    const result = await new Promise<any>((resolve, reject) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    await connectDB();

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

    return NextResponse.json(logo);
  } catch (error) {
    console.error('Logo yükleme hatası:', error);
    return NextResponse.json({ error: 'Logo yüklenirken hata oluştu' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    const logos = await Logo.find()
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Logo.countDocuments();

    return NextResponse.json({
      logos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Logo listesi hatası:', error);
    return NextResponse.json({ error: 'Logolar yüklenirken hata oluştu' }, { status: 500 });
  }
} 