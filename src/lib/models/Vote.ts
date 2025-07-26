import mongoose, { Schema, Document } from 'mongoose';

export interface IVote extends Document {
  logo: mongoose.Types.ObjectId;
  user: string; // IP adresi veya kullanıcı kimliği
  like: boolean; // true = beğenildi, false = beğenilmedi
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
  like: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  timestamps: true,
});

// Aynı kullanıcının aynı logoya birden fazla oy vermesini engelle
VoteSchema.index({ logo: 1, user: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema); 