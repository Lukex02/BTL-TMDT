import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductById } from "../services/product.service";
import { mockProducts } from "../services/mockproduct";
import type { Product } from "../types/product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromMock, setIsFromMock] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
          throw new Error("ID sản phẩm không hợp lệ");
        }
        const data = await getProductById(productId);
        setProduct(data);
        setIsFromMock(false);
      } catch (err) {
        console.error("API failed, using mock data:", err);
        // Fallback to mock data
        const mockProduct = mockProducts.find((p) => p.id === parseInt(id, 10));
        if (mockProduct) {
          setProduct(mockProduct);
          setIsFromMock(true);
          setError("Sử dụng dữ liệu mẫu vì API không khả dụng");
        } else {
          setError("Không tìm thấy sản phẩm trong API và dữ liệu mẫu");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "100px", textAlign: "center" }}>
          <h2>Đang tải...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "100px", textAlign: "center" }}>
          <h2>{error}</h2>
          <Link to="/">Quay về trang chủ</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "100px", textAlign: "center" }}>
          <h2>Không tìm thấy sản phẩm!</h2>
          <Link to="/">Quay về trang chủ</Link>
        </div>
        <Footer />
      </>
    );
  }

  const mainImage = product.images && product.images.length > 0 ? product.images[0].url : (isFromMock ? (product as any).image : null);

  return (
    <>
      <Navbar />

      {isFromMock && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '10px', textAlign: 'center' }}>
          <strong>Lưu ý:</strong> Đang hiển thị dữ liệu mẫu vì API backend chưa khả dụng hoặc có lỗi.
        </div>
      )}

      <div className="product-detail-page">
        <div className="breadcrumb">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Trang chủ</Link> / <span>{product.category ? product.category.name : "Thiếu thông tin: category"}</span> / <span className="active">{product.name}</span>
        </div>

        <div className="detail-main">
          <div className="detail-gallery">
            <div className="main-img-box">
              {mainImage ? (
                <img src={mainImage} alt={product.name} />
              ) : (
                <div>Thiếu thông tin: images</div>
              )}
            </div>
            <div className="thumb-list">
              {product.images && product.images.length > 1 ? (
                product.images.slice(1, 5).map((img, index) => (
                  <div key={index} className="thumb-item">
                    <img src={img.url} alt={`thumb-${index}`} />
                  </div>
                ))
              ) : (
                <div>Thiếu thông tin: additional images</div>
              )}
            </div>
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-rating">
              ★★★★★ <span>(Thiếu thông tin: reviews)</span>
            </div>

            <div className="detail-price">
              {product.price.toLocaleString("vi-VN")} VNĐ
            </div>
            
            <div className="detail-stock">
              • {product.status === 'active' ? `Còn hàng (${product.stock} sản phẩm)` : `Hết hàng (status: ${product.status})`}
            </div>

            <div className="detail-short-desc">
              <strong>Thông tin sản phẩm:</strong> {product.description || "Thiếu thông tin: description"}
            </div>

            <div className="detail-cert">
              <div className="detail-cert-icon">🛡️</div>
              <div className="detail-cert-text">
                <strong>Sản phẩm đã được kiểm chứng</strong>
                <span>Chưa an tâm? Hãy sử dụng thêm dịch vụ kiểm tra chất lượng 120% của chúng tôi</span>
              </div>
            </div>

            <div className="detail-actions">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input className="qty-input" type="text" value={quantity} readOnly />
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn">
                Thêm vào giỏ hàng
              </button>
            </div>

            <div className="detail-meta">
              <p><strong>SKU:</strong> {product.id}-001</p>
              <p><strong>Bảo hành:</strong> Thiếu thông tin: warranty</p>
              <p><strong>Vận chuyển:</strong> Miễn phí (1-3 ngày làm việc)</p>
              {product.attributes && product.attributes.length > 0 && (
                <div>
                  <strong>Thuộc tính:</strong>
                  <ul>
                    {product.attributes.map((attr, index) => (
                      <li key={index}>{attr.attributeName}: {attr.attributeValue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!product.attributes && <p>Thiếu thông tin: attributes</p>}
            </div>
          </div>
        </div>

        <section className="section-block">
          <h3 className="section-title">Thông tin người bán</h3>
          <div className="seller-box">
            <div className="seller-avatar">{product.seller.username.charAt(0).toUpperCase()}</div>
            <div className="seller-info-main">
              <h4>{product.seller.username} <span style={{ color: '#3b82f6' }}>🛡️</span></h4>
              <div className="seller-buttons">
                <button className="btn-view-shop">Xem Shop</button>
                <button className="btn-follow">Theo dõi</button>
              </div>
            </div>
            <div className="seller-stats">
              <div className="stat-item">Đánh giá <strong>Thiếu thông tin: seller reviews</strong></div>
              <div className="stat-item">Sản phẩm <strong>Thiếu thông tin: seller products</strong></div>
              <div className="stat-item">Tham gia <strong>{product.createdAt ? new Date(product.createdAt).getFullYear() : "Thiếu thông tin: createdAt"} năm trước</strong></div>
              <div className="stat-item">Số lượng theo dõi <strong>Thiếu thông tin: followers</strong></div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <h3 className="section-title">Mô tả sản phẩm</h3>
          <div className="desc-content">
            {product.description || "Thiếu thông tin: description"}
          </div>
        </section>

        <section className="section-block">
          <h3 className="section-title">Đánh giá</h3>
          <div className="review-box">
            <div className="review-header">
              <span>★★★★★</span> Thiếu thông tin: rating (Thiếu thông tin: reviews)
            </div>
            <div className="review-filter">
              Tích cực nhất ↓
            </div>
            
            <div className="review-list">
              <div>Thiếu thông tin: reviews</div>
            </div>

            <div className="pagination">
              <button>&lt;</button>
              <button className="active">1</button>
              <button>&gt;</button>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}