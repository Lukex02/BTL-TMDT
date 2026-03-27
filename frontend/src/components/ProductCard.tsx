import type { Product } from "../types/product";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <h4 className="product-name">{product.name}</h4>

      <p className="product-price">
        {product.price.toLocaleString("vi-VN")} VND
      </p>

      <div className="product-actions">
        <Link 
          to={`/product/${product.id}`} 
          className="product-card-btn product-card-view"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Xem
        </Link>

        <button
          className="product-card-btn product-card-cart"
          aria-label="Add to cart"
        >
          🛒
        </button>
      </div>
    </div>
  );
}