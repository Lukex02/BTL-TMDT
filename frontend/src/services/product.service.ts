import { apiClient } from "./axios-config";
import type { Product } from "../types/product";


export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await apiClient.get("/product/all");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await apiClient.get(`/product/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getProductsBySeller = async (sellerId: string): Promise<Product[]> => {
  try {
    const res = await apiClient.get("/product/filter", {
      params: { 
        sellerId: sellerId
      },
    });
    return res.data || [];
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return [];
  }
};

export const getProductCategories = async () => {
  try {
    const res = await apiClient.get("/product/categories/all");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createProduct = async (productData: any) => {
  try {
    const token = localStorage.getItem("access_token");

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const res = await apiClient.post("/product/create", productData, config);
    return res.data;
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productData: any) => {
  try {
    const res = await apiClient.put("/product/update", productData);
    return res.data;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const res = await apiClient.delete(`/product/delete/${id}`, config);
    return res.data;
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw error;
  }
};