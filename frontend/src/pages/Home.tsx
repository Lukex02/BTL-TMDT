// src/pages/Home.tsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
//import { getProducts } from "../services/product.service";
import { mockProducts } from "../services/mockproduct";
import type { Product } from "../types/product";


export default function Home() {
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
      <Banner />
      <CategoryBar />

      <main className="product-container">
        <section className="product-section">
          <h2 className="section-title">Sản phẩm đề xuất</h2>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={`recommended-${p.id}`} product={p} />
            ))}
          </div>
        </section>

        <section className="product-section">
          <h2 className="section-title">Gợi ý hôm nay</h2>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={`today-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}