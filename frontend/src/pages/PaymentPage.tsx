import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Checkout from "../components/Checkout";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
//import { getProducts } from "../services/product.service";
import { mockProducts } from "../services/mockproduct";
import type { Product } from "../types/product";


export default function SellerPage() {

  return (
    <>
      <Navbar />
      <Checkout />
      <Footer />
    </>
  );
}