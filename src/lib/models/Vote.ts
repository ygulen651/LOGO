import mongoose, { Schema, Document } from 'mongoose';

export interface IVote extends Document {
  user: mongoose.Types.ObjectId;
  logo: mongoose.Types.ObjectId;
  rating: number; // 1-5 yıldız
  createdAt: Date;
  updatedAt: Date;
}

const VoteSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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

// Aynı kullanıcının aynı logo için birden fazla oy vermesini engelle
VoteSchema.index({ user: 1, logo: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema); 