import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AccountHeader from "../components/SellerAcount";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
//import { getProducts } from "../services/product.service";
import { mockProducts } from "../services/mockproduct";
import type { Product } from "../types/product";


export default function SellerPage() {
  const [products, setProducts] = useState<Product[]>([]);

 /*useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  fetchProducts();
}, []);*/
useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <>
      <Navbar />
      <AccountHeader />

      <main className="max-w-[1240px] mx-auto px-[20px] pt-[28px] pb-[50px]">
        <section className="mb-[42px]">
          <h2 className="text-[24px] font-bold text-[#111] mb-[24px] text-left">
            Sản phẩm
          </h2>
      
          <div className="grid grid-cols-5 gap-[24px]">
            {products.map((p) => (
              <ProductCard key={`recommended-${p.id}`} product={p} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
  <button className="px-8 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition">
    Xem thêm
  </button>
</div>
        </section>
      
        <section className="mb-[42px]">
          <h2 className="text-[24px] font-bold text-[#111] mb-[24px] text-left">
            Sản phẩm bán chạy
          </h2>
      
          <div className="grid grid-cols-5 gap-[24px]">
            {products.map((p) => (
              <ProductCard key={`today-${p.id}`} product={p} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
  <button className="px-8 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition">
    Xem thêm
  </button>
</div>
        </section>
      </main>

      <Footer />
    </>
  );
}