import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col min-h-[300px]">
      
      <div className="h-[140px] flex items-center justify-center mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-[130px] object-contain"
        />
      </div>

      <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 text-left min-h-[44px]">
        {product.name}
      </h4>

      <p className="text-sm font-bold text-gray-900 mb-3 text-left">
        {product.price.toLocaleString("vi-VN")} VND
      </p>

      <div className="mt-auto flex items-center justify-center gap-2">
        
        <button className="px-5 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition">
          Xem
        </button>

        <button
          aria-label="Add to cart"
          className="w-[40px] h-[40px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg transition"
        >
          🛒
        </button>

      </div>
    </div>
  );
}