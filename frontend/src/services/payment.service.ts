import axios from "axios";

const API_URL = "http://localhost:3000";

export const createPayment = async (data: any) => {
  const token = localStorage.getItem("access_token");

  const res = await axios.post(
    `${API_URL}/payment/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};