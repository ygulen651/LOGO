import mongoose, { Schema, Document } from 'mongoose';

export interface IVote extends Document {
  logo: mongoose.Types.ObjectId;
  rating: number; // 1-5 yıldız
  createdAt: Date;
  updatedAt: Date;
}

const VoteSchema: Schema = new Schema({
  logo: {
    type: Schema.Types.ObjectId,
    ref: 'Logo',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema); 