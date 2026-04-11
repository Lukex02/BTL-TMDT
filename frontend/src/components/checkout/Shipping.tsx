import { useState } from "react";
import { createOrder } from "../../services/order.service";
import type { Product } from "../../types/product";

type Props = {
  cartItems: Product[];
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
    const res = await createOrder({
      phone,
      address,
      items: cartItems.map((p) => ({
        productId: p.id,
        quantity: 1,
        unitPrice: p.price,
      })),
    });

    setOrderId(res.id); // ⚠️ backend must return id
    next();
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Thông tin vận chuyển</h2>

      <input
        placeholder="Số điện thoại"
        className="w-full border p-2 mb-2"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Địa chỉ"
        className="w-full border p-2"
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <button onClick={prev}>Quay lại</button>
        <button
          onClick={handleCreateOrder}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Tạo đơn hàng
        </button>
      </div>
    </div>
  );
}