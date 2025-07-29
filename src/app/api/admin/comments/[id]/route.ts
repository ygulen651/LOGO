import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/lib/models/Comment';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Yorumu bul ve sil
    const comment = await Comment.findByIdAndDelete(id);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Yorum bulunamadı' },
        { status: 404 }
      );
    }
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Yorum bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Yorum başarıyla silindi' 
    });
  } catch (error) {
    console.error('Yorum silme hatası:', error);
    return NextResponse.json(
      { error: 'Yorum silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 