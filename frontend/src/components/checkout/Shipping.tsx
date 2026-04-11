import { useState } from "react";
import { createOrder } from "../../services/order.service";
import { getAuthUser } from "../../services/auth.service";
import type { CartItem } from "../../pages/Checkout";

type Props = {
  cartItems: CartItem[];
  setOrderId: (id: string) => void;
  next: () => void;
  prev: () => void;
};

export default function ShippingStep({
  cartItems,
  setOrderId,
  next,
  prev,
}: Props) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

const handleCreateOrder = async () => {
  const totalWithQuantities = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1), 
    0
  );

  const res = await createOrder({
    phone,
    address,
    userId: user?.id,
    totalAmount: totalWithQuantities,
    status: "pending",
    items: cartItems.map((p) => ({
      productId: p.id,
      quantity: p.quantity || 1,
      unitPrice: p.price,
    })),
  });

  setOrderId(res.id); 
  next();
};

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center !text-[#333]">
        Thông tin vận chuyển
      </h2>

      <div className="flex flex-col gap-3">
        <input
          placeholder="Số điện thoại"
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Địa chỉ"
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="flex justify-between mt-2">
        <button 
          onClick={prev} 
          className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Quay lại
        </button>
        <button
          onClick={handleCreateOrder}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Tạo đơn hàng
        </button>
      </div>
    </div>
  );
}