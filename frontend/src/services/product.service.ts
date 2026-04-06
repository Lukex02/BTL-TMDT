// src/services/product.service.ts
import axios from "axios";
import type { Product } from "../types/product";

const API_URL = "http://localhost:3000";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/product/all`);
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await axios.get(`${API_URL}/product/${id}`);
  return res.data;
};