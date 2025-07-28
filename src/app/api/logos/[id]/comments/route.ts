import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Comment from '@/lib/models/Comment';

// Yorum ekleme
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { firstName, lastName, email, comment } = await request.json();
    
    // Validasyon
    if (!firstName || !lastName || !email || !comment) {
      return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 });
    }

    if (firstName.length > 50 || lastName.length > 50) {
      return NextResponse.json({ error: 'Ad ve soyad 50 karakterden uzun olamaz' }, { status: 400 });
    }

    if (comment.length > 500) {
      return NextResponse.json({ error: 'Yorum 500 karakterden uzun olamaz' }, { status: 400 });
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Geçerli bir email adresi girin' }, { status: 400 });
    }

    await connectDB();
    const { id } = await params;

    // Logo'nun var olup olmadığını kontrol et
    const logo = await Logo.findById(id);
    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    // Yeni yorum oluştur
    const newComment = await Comment.create({
      logo: id,
      firstName,
      lastName,
      email,
      comment,
    });

    return NextResponse.json({ 
      success: true, 
      comment: newComment 
    });
  } catch (error) {
    console.error('Yorum ekleme hatası:', error);
    return NextResponse.json({ error: 'Yorum eklenirken hata oluştu' }, { status: 500 });
  }
}

// Yorumları getirme
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Logo'nun var olup olmadığını kontrol et
    const logo = await Logo.findById(id);
    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    // Yorumları getir (en yeni önce)
    const comments = await Comment.find({ logo: id })
      .sort({ createdAt: -1 })
      .select('-__v');

    return NextResponse.json({ 
      success: true, 
      comments 
    });
  } catch (error) {
    console.error('Yorumları getirme hatası:', error);
    return NextResponse.json({ error: 'Yorumlar yüklenirken hata oluştu' }, { status: 500 });
  }
} 