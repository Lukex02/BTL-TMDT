import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { setCart } = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (product: Product) => {
    try {
      setCart((prev) => {
        if (prev.find((p) => p.id === product.id)) {
          return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
        }
        return [...prev, { ...product, quantity: 1 }];
      });

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1500); // 1.5s quay lại icon
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  
  return (
    <div className="group bg-gradient-to-tr from-slate-50 to-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col h-full border border-gray-100">
      <div className="h-36 flex items-center justify-center mb-4 overflow-hidden">
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10 leading-5">
          {product.name}
        </h4>

        <p className="text-sm font-bold text-gray-900 mt-auto">
          {product.price.toLocaleString("vi-VN")} VND
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 bg-blue-600 text-white text-sm font-bold py-2.5 rounded-full text-center hover:bg-blue-700 transition-colors"
          style={{ textDecoration: 'none' }}
        >
          Xem
        </Link>
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors
            ${added ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}
          `}
          aria-label="Add to cart"
          onClick={() => handleAddToCart(product)}
        >
          {added ? "✔" : "🛒"}
        </button>
      </div>
    </div>
  );
}