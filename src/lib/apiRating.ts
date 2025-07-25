import { NextRequest, NextResponse } from 'next/server';
import connectDB from './mongodb';
import ApiRating from './models/ApiRating';

export async function trackApiPerformance(
  request: NextRequest,
  apiName: string,
  endpoint: string,
  method: string,
  startTime: number
) {
  try {
    await connectDB();
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const isSuccess = true; // Bu değer response'a göre güncellenecek
    
    // API rating'i bul veya oluştur
    let apiRating = await ApiRating.findOne({ apiName });
    
    if (!apiRating) {
      apiRating = new ApiRating({
        apiName,
        endpoint,
        method,
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        totalResponseTime: 0,
        rating: 5,
      });
    }
    
    // İstatistikleri güncelle
    apiRating.totalRequests += 1;
    apiRating.lastRequestTime = new Date();
    
    if (isSuccess) {
      apiRating.successfulRequests += 1;
    } else {
      apiRating.failedRequests += 1;
    }
    
    // Ortalama response time'ı güncelle
    apiRating.totalResponseTime += responseTime;
    apiRating.averageResponseTime = apiRating.totalResponseTime / apiRating.totalRequests;
    
    // Puanı hesapla
    apiRating.calculateRating();
    
    await apiRating.save();
    
    return apiRating;
  } catch (error) {
    console.error('API performance tracking error:', error);
    return null;
  }
}

export async function getApiRatings() {
  try {
    await connectDB();
    const ratings = await ApiRating.find().sort({ rating: -1, totalRequests: -1 });
    return ratings;
  } catch (error) {
    console.error('Get API ratings error:', error);
    return [];
  }
}

export async function getApiRating(apiName: string) {
  try {
    await connectDB();
    const rating = await ApiRating.findOne({ apiName });
    return rating;
  } catch (error) {
    console.error('Get API rating error:', error);
    return null;
  }
} 