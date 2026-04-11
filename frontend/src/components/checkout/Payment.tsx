// components/checkout/PaymentStep.tsx
import { createPayment } from "../../services/payment.service";
import type { Product } from "../../types/product";

type Props = {
  orderId: string | null;
  cartItems: Product[];
  next: () => void;
  prev: () => void;
};

export default function PaymentStep({
  orderId,
  cartItems,
  next,
  prev,
}: Props) {
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  const handlePayment = async () => {
    if (!orderId) return alert("Không có orderId!");

    await createPayment({
      orderId,
      amount: total,
      method: "card",
    });

    next();
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Thanh toán</h2>

      <p className="mb-4">
        Tổng tiền: <b>{total.toLocaleString()}đ</b>
      </p>

      <div className="flex gap-4">
        <button onClick={prev}>Quay lại</button>
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-4 py-2"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}