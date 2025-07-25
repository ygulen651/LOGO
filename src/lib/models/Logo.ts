import mongoose, { Schema, Document } from 'mongoose';

export interface ILogo extends Document {
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  totalVotes: number;
  averageRating: number;
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
  averageRating: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Logo || mongoose.model<ILogo>('Logo', LogoSchema); 