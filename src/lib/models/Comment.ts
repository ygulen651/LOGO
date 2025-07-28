import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  logo: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
  logo: {
    type: Schema.Types.ObjectId,
    ref: 'Logo',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema); 