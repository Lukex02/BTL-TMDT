import axios from "axios";

const API_URL = "http://localhost:3000";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl?: string;
  address?: string;
  phone?: string;
}

// Get user by id
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const res = await axios.get(`${API_URL}/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Get user by username
export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const res = await axios.get(`${API_URL}/user/username/${username}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
};
