import { useEffect } from "react";
import { getProducts } from "../../services/product.service";
import type { Product } from "../../types/product";
import type { CartItem } from "../../pages/Checkout";

type Props = {
  cartItems: (Product & { quantity?: number })[]; // Added quantity support
  setCartItems: (items: any[]) => void;
  next: () => void;
};

export default function CartStep({ cartItems, setCartItems, next }: Props) {
  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      
      const initialCart: CartItem[] = data.slice(0, 2).map((p) => ({
        ...p,
        quantity: 1,
      }));

      setCartItems(initialCart);
    };

    if (cartItems.length === 0) fetch();
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
  };

  const total = cartItems.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

  return (
    <div className="grid grid-cols-3 gap-8 items-start">
      {/* List of Items */}
      <div className="col-span-2 space-y-4">
        {cartItems.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-gray-200 p-5 rounded-xl bg-white shadow-sm">
            <div className="flex gap-4 flex-1">
              <img
                src={p.images?.[0]?.url || "/placeholder.png"}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div className="flex flex-col justify-center max-w-[300px]">
                <h4 className="text-left font-medium text-gray-800 line-clamp-2 leading-snug">
                  {p.name}
                </h4>
                <p className="text-left text-blue-600 font-bold mt-1">
                  {p.price.toLocaleString()}đ
                </p>
              </div>
            </div>

            {/* Quantity Controller */}
            <div className="flex items-center border rounded-lg bg-gray-50">
              <button
                onClick={() => updateQuantity(p.id, -1)}
                className="px-3 py-1 hover:bg-gray-200 transition text-lg font-medium"
              >
                -
              </button>
              <span className="px-4 py-1 font-semibold min-w-[40px] text-center">
                {p.quantity || 1}
              </span>
              <button
                onClick={() => updateQuantity(p.id, 1)}
                className="px-3 py-1 hover:bg-gray-200 transition text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Sidebar */}
      <div className="border border-gray-200 p-6 rounded-xl bg-gray-50 sticky top-4">
        <h3 className="font-bold text-lg mb-6 border-b pb-2 text-gray-800">Tóm tắt đơn hàng</h3>

        <div className="space-y-3 text-gray-600">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span>Vận chuyển:</span>
            <span className="text-green-600 font-medium">Miễn phí</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Tổng:</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
        </div>

        <button
          onClick={next}
          className="mt-8 w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg
          hover:bg-green-600 hover:shadow-lg transition-all active:scale-[0.98]"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}