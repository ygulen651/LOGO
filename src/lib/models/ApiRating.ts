import mongoose, { Schema, Document } from 'mongoose';

export interface IApiRating extends Document {
  apiName: string;
  endpoint: string;
  method: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  totalResponseTime: number;
  lastRequestTime: Date;
  rating: number; // 1-5 arası puan
  createdAt: Date;
  updatedAt: Date;
}

const ApiRatingSchema = new Schema<IApiRating>({
  apiName: {
    type: String,
    required: true,
    unique: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  totalRequests: {
    type: Number,
    default: 0,
  },
  successfulRequests: {
    type: Number,
    default: 0,
  },
  failedRequests: {
    type: Number,
    default: 0,
  },
  averageResponseTime: {
    type: Number,
    default: 0,
  },
  totalResponseTime: {
    type: Number,
    default: 0,
  },
  lastRequestTime: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
}, {
  timestamps: true,
});

// Başarı oranını hesaplayan virtual field
ApiRatingSchema.virtual('successRate').get(function() {
  if (this.totalRequests === 0) return 0;
  return (this.successfulRequests / this.totalRequests) * 100;
});

// Puanı otomatik hesaplayan method
ApiRatingSchema.methods.calculateRating = function() {
  const successRate = this.successRate;
  const avgResponseTime = this.averageResponseTime;
  
  let rating = 5;
  
  // Başarı oranına göre puan düşürme
  if (successRate < 95) rating -= 1;
  if (successRate < 90) rating -= 1;
  if (successRate < 80) rating -= 1;
  
  // Response time'a göre puan düşürme
  if (avgResponseTime > 2000) rating -= 1; // 2 saniyeden fazla
  if (avgResponseTime > 5000) rating -= 1; // 5 saniyeden fazla
  
  this.rating = Math.max(1, rating);
  return this.rating;
};

export default mongoose.models.ApiRating || mongoose.model<IApiRating>('ApiRating', ApiRatingSchema); 