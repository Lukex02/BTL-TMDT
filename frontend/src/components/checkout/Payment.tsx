import { useState } from "react";
import { createPayment } from "../../services/payment.service";
import type { CartItem } from "../../pages/Checkout";

type Props = {
  orderId: string | null;
  cartItems: CartItem[];
  next: () => void;
  prev: () => void;
};

type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';

export default function PaymentStep({
  orderId,
  cartItems,
  next,
  prev,
}: Props) {
  const [method, setMethod] = useState<PaymentMethod>("credit_card");
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  const handlePayment = async () => {
    if (!orderId) return alert("Không có orderId!");

    try {
      await createPayment({
        orderId: Number(orderId),
        amount: total,
        method: method,
        status: "pending",
      });
      next();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Thanh toán thất bại, vui lòng thử lại.");
    }
  };

  const paymentOptions: { id: PaymentMethod; label: string; icon: string }[] = [
    { id: "credit_card", label: "Thẻ tín dụng", icon: "💳" },
    { id: "paypal", label: "PayPal", icon: "🅿️" },
    { id: "bank_transfer", label: "Chuyển khoản", icon: "🏦" },
    { id: "cash", label: "Tiền mặt", icon: "💵" },
  ];

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold !text-[#333] mb-2">Thanh toán</h2>
        <p className="text-lg text-gray-600">
          Tổng tiền: <span className="font-bold text-black">{total.toLocaleString()}đ</span>
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="w-full mt-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
            Chọn phương thức thanh toán
          </h3>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
          {paymentOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMethod(opt.id)}
              className={`flex items-center justify-start px-6 py-5 border-2 rounded-2xl transition-all duration-200 ${
                method === opt.id
                  ? "border-blue-500 bg-blue-50/50 shadow-sm translate-y-[-2px]"
                  : "border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-3xl mr-4">{opt.icon}</span>
              <span className={`font-semibold text-lg ${method === opt.id ? "text-blue-700" : "text-gray-700"}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 w-full mt-4">
        <button 
          onClick={prev} 
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition w-32"
        >
          Quay lại
        </button>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-md flex-1 max-w-[200px]"
        >
          Xác nhận {total.toLocaleString()}đ
        </button>
      </div>
    </div>
  );
}