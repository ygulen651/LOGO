import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Vote from '@/lib/models/Vote';

export async function GET() {
  try {
    await connectDB();

    // Kullanıcı aktivitelerini grupla
    const userActivities = await Vote.aggregate([
      {
        $group: {
          _id: '$user',
          totalVotes: { $sum: 1 },
          firstVoteDate: { $min: '$createdAt' },
          lastVoteDate: { $max: '$createdAt' },
          votedLogos: { $addToSet: '$logo' }
        }
      },
      {
        $sort: { lastVoteDate: -1 }
      }
    ]);

    return NextResponse.json(userActivities);
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json(
      { error: 'Kullanıcı verileri alınırken hata oluştu' },
      { status: 500 }
    );
  }
} 