import mongoose, { Schema, Document } from 'mongoose';

export interface ILogo extends Document {
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  totalVotes: number;
  totalLikes: number; // Beğeni sayısı
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const LogoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Logo || mongoose.model<ILogo>('Logo', LogoSchema); 