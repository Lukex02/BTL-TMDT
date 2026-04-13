import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AccountHeader from "../components/AccountHeader";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

export default function Seller() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetching real data from your NestJS/Supabase backend
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <title>Kênh người bán</title>
      <Navbar />
      <AccountHeader />

      <main className="max-w-[1240px] mx-auto px-5 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-50 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 font-medium animate-pulse">
              Đang tải...
            </p>
          </div>

        ) : (

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="mb-12">
              <h2 className="text-left text-2xl font-extrabold !text-gray-900 !mb-6">
                Sản phẩm
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.slice(0, 10).map((p) => (
                  <ProductCard key={`all-${p.id}`} product={p} />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <button className="px-10 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-sm font-bold transition-all active:scale-95">
                  Xem thêm
                </button>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-left text-2xl font-extrabold !text-gray-900 !mb-6">
                Sản phẩm bán chạy
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                
                {products.slice(2, 7).map((p) => (
                  <ProductCard key={`top-${p.id}`} product={p} />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <button className="px-10 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-sm font-bold transition-all active:scale-95">
                  Xem thêm
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}