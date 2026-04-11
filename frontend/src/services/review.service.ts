// src/services/review.service.ts
import axios from "axios";

export interface Review {
  id?: number;
  userId?: string;
  productId?: number;
  rating: number; // Đổi thành number để dễ tương thích, hoặc giữ 1 | 2 | 3 | 4 | 5 tùy bạn
  comment?: string;
  createdAt?: Date;
}

const API_URL = "http://localhost:3000";

// Lấy danh sách đánh giá theo ID sản phẩm
export const getReviewsByProductId = async (productId: number): Promise<Review[]> => {
  try {
    const res = await axios.get(`${API_URL}/review/product/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// Gửi đánh giá mới
export const createReview = async (reviewData: Review): Promise<Review> => {
  try {
    // Lấy token từ localStorage để xác thực người dùng
    const token = localStorage.getItem("access_token");

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    // Gửi POST request tới backend (bạn hãy kiểm tra lại endpoint chính xác của backend nhé)
    const res = await axios.post(`${API_URL}/review/create`, reviewData, config);
    return res.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};