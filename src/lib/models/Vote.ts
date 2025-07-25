import mongoose, { Schema, Document } from 'mongoose';

export interface IVote extends Document {
  logo: mongoose.Types.ObjectId;
  user: string; // IP adresi veya kullanıcı kimliği
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
  user: {
    type: String,
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

// Aynı kullanıcının aynı logoya birden fazla oy vermesini engelle
VoteSchema.index({ logo: 1, user: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema); 