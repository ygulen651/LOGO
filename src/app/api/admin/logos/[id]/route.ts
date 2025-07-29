import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Vote from '@/lib/models/Vote';
import Comment from '@/lib/models/Comment';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { status } = await request.json();
    const { id } = await params;

    // Logo durumunu güncelle
    const updatedLogo = await Logo.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLogo) {
      return NextResponse.json(
        { error: 'Logo bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedLogo);
  } catch (error) {
    console.error('Logo update error:', error);
    return NextResponse.json(
      { error: 'Logo güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Logo'yu bul
    const logo = await Logo.findById(id);
    if (!logo) {
      return NextResponse.json(
        { error: 'Logo bulunamadı' },
        { status: 404 }
      );
    }

    // İlişkili verileri sil
    await Vote.deleteMany({ logo: id });
    await Comment.deleteMany({ logo: id });
    await Logo.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      message: 'Logo ve ilişkili veriler başarıyla silindi' 
    });
  } catch (error) {
    console.error('Logo silme hatası:', error);
    return NextResponse.json(
      { error: 'Logo silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 