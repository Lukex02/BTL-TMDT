import axios from "axios";

const API_URL = "http://localhost:3000";

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export interface Order {
  id: string;
  totalAmount: number;
  status: string;
  phone: string;
  address: string;
  createdAt: string;
  items?: OrderItem[];
}

// Get orders by buyer
export const getOrdersByBuyer = async (userId: string): Promise<Order[]> => {
  try {
    const res = await axios.get(`${API_URL}/order/buyer/${userId}`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching buyer orders:", error);
    return [];
  }
};

// Get order by id
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const res = await axios.get(`${API_URL}/order/${orderId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};
