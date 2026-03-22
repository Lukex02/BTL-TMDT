// src/services/product.service.ts
import axios from "axios";
import type { Product } from "../types/product";

const API_URL = "http://localhost:3000/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};