import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Vote from '@/lib/models/Vote';
import cloudinary from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const logo = await Logo.findById(id);

    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(logo);
  } catch (error) {
    console.error('Logo detay hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Şifre kontrolü
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'karaman2024';
    
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
    }

    const logo = await Logo.findById(id);

    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    // Cloudinary'den resmi sil
    if (logo.imageUrl) {
      try {
        const publicId = logo.imageUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary silme hatası:', cloudinaryError);
      }
    }

    // Logo ile ilgili tüm oyları sil
    await Vote.deleteMany({ logo: id });

    // Logoyu sil
    await Logo.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Logo başarıyla silindi' });
  } catch (error) {
    console.error('Logo silme hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
} 