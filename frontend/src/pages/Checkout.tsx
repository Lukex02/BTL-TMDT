
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "../services/product.service";
import axios from "axios";

export default function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: Getting cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Calculations for the whole list
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingFee: number = subtotal > 0 ? 0 : 0; // Logic for shipping
  const total = subtotal + shippingFee;

  if (loading) return <div className="text-center p-10">Đang tải...</div>;
  if (cartItems.length === 0) return <div className="text-center p-10">Giỏ hàng trống</div>;

  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg text-black font-semibold mb-6 flex items-center gap-2">
              📦 Thông tin mua hàng
            </h2>

            <div className="space-y-4">
              <input className="input" placeholder="Họ và tên" />

              <div className="grid grid-cols-2 gap-4">
                <input className="input" placeholder="Email" />
                <input className="input" placeholder="Số điện thoại" />
              </div>

              <input className="input" placeholder="Địa chỉ" />

              <div className="grid grid-cols-2 gap-4">
                <select className="input">
                  <option>Phường/xã</option>
                </select>
                <select className="input">
                  <option>Quận/huyện</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select className="input">
                  <option>Tỉnh/thành</option>
                </select>
                <input className="input" placeholder="Mã bưu điện (Tự động điền)" />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="appearance-none w-5 h-5 border border-gray-300 rounded bg-white 
             checked:bg-indigo-600 checked:bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/27/White_check.svg')] 
             bg-center bg-no-repeat bg-[length:12px_12px]"/>
                Lưu Thông Tin Này
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg text-black font-semibold mb-6 flex items-center gap-2">
              💳 Phương thức thanh toán
            </h2>

            <div className="flex gap-6 border-b mb-6">
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">Thẻ</button>
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">Momo</button>
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">Zalopay</button>
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">...</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium mb-1">Số thẻ</label>
                <input className="input" placeholder="1234 1234 1234 1234" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-left block text-sm font-medium mb-1">Ngày hết hạn</label>
                  <input className="input" placeholder="MM/YY" />
                </div>

                <div>
                  <label className="text-left block text-sm font-medium mb-1">CVC</label>
                  <input className="input" placeholder="CVC" />
                </div>
              </div>

              <div>
                <label className="text-left block text-sm font-medium mb-1">Khác</label>
                <input className="input active:blank" placeholder="..." />
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold mt-4
              hover:from-indigo-600 hover:to-purple-600 transition">
                Hoàn tất
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Cart List */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-8">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Đơn hàng của bạn</h3>
          
          {/* THE LIST OF PRODUCTS */}
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 items-center">
                <div className="relative flex-shrink-0">
                  <img
                    src={item.images?.[0]?.url || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                  />
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    1
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400">{item.category?.name}</p>
                </div>
                <div className="text-sm font-semibold">
                  {item.price.toLocaleString("vi-VN")} ₫
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="flex gap-2 mb-6 pt-4 border-t border-gray-50">
            <input className="input flex-1 text-sm" placeholder="Mã giảm giá" />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
              Sử dụng
            </button>
          </div>

          {/* Totals */}
          <div className="space-y-3 text-sm pt-4 border-t border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển</span>
              <span>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")} ₫`}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-gray-100 mt-2">
              <span>Tổng cộng</span>
              <span className="text-indigo-600">{total.toLocaleString("vi-VN")} ₫</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
}