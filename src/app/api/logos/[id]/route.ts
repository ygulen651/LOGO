import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';

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
    return NextResponse.json({ error: 'Logo yüklenirken hata oluştu' }, { status: 500 });
  }
} 