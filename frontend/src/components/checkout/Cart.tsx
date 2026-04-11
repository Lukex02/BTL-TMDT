import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";
import type { Product } from "../../types/product";


type Props = {
  cartItems: Product[];
  setCartItems: (items: Product[]) => void;
  next: () => void;
};

export default function CartStep({
  cartItems,
  setCartItems,
  next,
}: Props) {
  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();

      // giả lập giỏ hàng (lấy 2 sản phẩm đầu)
      setCartItems(data.slice(0, 2));
    };

    if (cartItems.length === 0) fetch();
  }, []);

  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Products */}
      <div className="col-span-2 space-y-4">
        {cartItems.map((p) => (
          <div key={p.id} className="flex justify-between border p-4 rounded">
            <div className="flex gap-4">
              <img
                src={p.images?.[0]?.url || "/placeholder.png"}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h4>{p.name}</h4>
                <p>{p.price.toLocaleString()}đ</p>
              </div>
            </div>

            <span>Số lượng: 1</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">Tóm tắt đơn hàng</h3>

        <p>Tạm tính: {total.toLocaleString()}đ</p>
        <p>Vận chuyển: Miễn phí</p>

        <div className="font-bold mt-2">
          Tổng: {total.toLocaleString()}đ
        </div>

        <button
          onClick={next}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}