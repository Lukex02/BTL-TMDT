import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simulate a tiny bit of extra delay so the cool loader is actually visible
        // Remove the setTimeout line in production if your DB is fast!
        // await new Promise(resolve => setTimeout(resolve, 800)); 
        
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Banner />
      <CategoryBar />

      <main className="max-w-[1240px] mx-auto px-5 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="relative">
             
              <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
              
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 font-medium animate-pulse">
              Đang tải...
            </p>
          </div>
        ) : (
          
          <div className="animate-in fade-in duration-700">
            
            <section className="mb-12">
              <h2 className="text-2xl font-extrabold !text-gray-900 !mb-6">
                Sản phẩm đề xuất
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.slice(0, 5).map((p) => (
                  <ProductCard key={`recommended-${p.id}`} product={p} />
                ))}
              </div>
            </section>

            
            <section className="mb-12">
              <h2 className="text-2xl font-extrabold !text-gray-900 !mb-6">
                Gợi ý hôm nay
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.slice(5, 10).map((p) => (
                  <ProductCard key={`today-${p.id}`} product={p} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}