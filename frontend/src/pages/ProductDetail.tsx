// src/pages/ProductDetail.tsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockProducts } from "../services/mockproduct";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === id);

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

  return (
    <>
      <Navbar />

      <div className="product-detail-page">
        <div className="breadcrumb">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Trang chủ</Link> / <span>Máy tính & Laptop</span> / <span className="active">{product.name}</span>
        </div>

        <div className="detail-main">
          <div className="detail-gallery">
            <div className="main-img-box">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="thumb-list">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="thumb-item">
                  <img src={product.image} alt={`thumb-${item}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-rating">
              ★★★★★ <span>(132 đánh giá)</span>
            </div>

            <div className="detail-price">
              {product.price.toLocaleString("vi-VN")} VNĐ
            </div>
            
            <div className="detail-stock">
              • Còn hàng (3 sản phẩm)
            </div>

            <div className="detail-short-desc">
              <strong>Thông tin sản phẩm:</strong> Máy tính để bàn chơi game. Cấu hình mạnh mẽ, lý tưởng cho các tác vụ đòi hỏi cao, hoàn hảo để hiển thị hình ảnh chất lượng cao trong trò chơi và video.
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
              <p><strong>SKU:</strong> {product.id.toUpperCase()}-001</p>
              <p><strong>Bảo hành:</strong> 2 năm</p>
              <p><strong>Vận chuyển:</strong> Miễn phí (1-3 ngày làm việc)</p>
            </div>
          </div>
        </div>

        <section className="section-block">
          <h3 className="section-title">Thông tin người bán</h3>
          <div className="seller-box">
            <div className="seller-avatar">N</div>
            <div className="seller-info-main">
              <h4>Nguyễn Văn A <span style={{ color: '#3b82f6' }}>🛡️</span></h4>
              <div className="seller-buttons">
                <button className="btn-view-shop">Xem Shop</button>
                <button className="btn-follow">Theo dõi</button>
              </div>
            </div>
            <div className="seller-stats">
              <div className="stat-item">Đánh giá <strong>4.7k</strong></div>
              <div className="stat-item">Sản phẩm <strong>36</strong></div>
              <div className="stat-item">Tham gia <strong>7 năm trước</strong></div>
              <div className="stat-item">Số lượng theo dõi <strong>3k</strong></div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <h3 className="section-title">Mô tả sản phẩm</h3>
          <div className="desc-content">
            Máy tính này sử dụng hệ điều hành Windows 11, kết hợp sức mạnh và tính bảo mật của Windows 10 với giao diện và trải nghiệm được làm mới, tích hợp các công cụ, âm thanh và ứng dụng mới để mang lại trải nghiệm hoàn toàn được nâng cao. Máy được trang bị bộ xử lý hiệu năng cao với tám lõi và tám luồng, lý tưởng cho các tác vụ đòi hỏi cao. Nó bao gồm card đồ họa chuyên dụng, hoàn hảo để hiển thị hình ảnh chất lượng cao trong trò chơi và video. RAM DDR4 băng thông cao cho phép đa nhiệm liên tục, mạnh mẽ, lý tưởng cho các trò chơi đòi hỏi cấu hình cao, chỉnh sửa video và chạy nhiều ứng dụng cùng lúc. Ngoài ra, nó còn bao gồm ổ cứng SSD đảm bảo thời gian khởi động nhanh và truy cập dữ liệu nhanh chóng.
          </div>
        </section>

        <section className="section-block">
          <h3 className="section-title">Đánh giá</h3>
          <div className="review-box">
            <div className="review-header">
              <span>★★★★★</span> 5.0/5.0 (4 đánh giá)
            </div>
            <div className="review-filter">
              Tích cực nhất ↓
            </div>
            
            <div className="review-list">
              {[1, 2].map((item) => (
                <div key={item} className="review-item">
                  <div className="reviewer-avatar">
                    <img src={`https://ui-avatars.com/api/?name=User+${item}&background=random`} alt="user" />
                  </div>
                  <div className="review-content">
                    <h5>Người dùng {item} <span className="stars">★★★★★</span></h5>
                    <div className="date">2023-10-15 10:10</div>
                    <p>Sản phẩm chất lượng!</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button>&lt;</button>
              <button className="active">1</button>
              <button>2</button>
              <button>&gt;</button>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}