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

      <main className="max-w-[1240px] mx-auto px-[20px] pt-[28px] pb-[50px]">
  <section className="mb-[42px]">
    <h2 className="text-[24px] font-bold text-[#111] mb-[24px]">
      Sản phẩm đề xuất
    </h2>

    <div className="grid grid-cols-5 gap-[24px]">
      {products.map((p) => (
        <ProductCard key={`recommended-${p.id}`} product={p} />
      ))}
    </div>
  </section>

  <section className="mb-[42px]">
    <h2 className="text-[24px] font-bold text-[#111] mb-[24px]">
      Gợi ý hôm nay
    </h2>

    <div className="grid grid-cols-5 gap-[24px]">
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