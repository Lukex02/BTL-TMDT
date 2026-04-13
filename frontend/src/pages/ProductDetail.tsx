import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductById } from "../services/product.service";
import { getReviewsByProductId, createReview } from "../services/review.service";
import { getAuthUser } from "../services/auth.service";
import { mockProducts } from "../services/mockproduct";
import type { Product } from "../types/product";
import { AppContext } from "../AppContext";
import AccountHeader from "../components/AccountHeader";

interface Review {
  id?: number;
  userId?: string;
  productId?: number;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const user = getAuthUser();
  const { setCart } = useContext(AppContext);

  // State quản lý Sản phẩm
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromMock, setIsFromMock] = useState(false);
  const [added, setAdded] = useState(false);

  // State quản lý Form Đánh giá
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddToCart = async (product: Product) => {
    try {
      setCart((prev) => {
        if (prev.find((p) => p.id === product.id)) {
          return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p));
        }
        return [...prev, { ...product, quantity: quantity }];
      });
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 1500); // 1.5s quay lại icon
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const productId = parseInt(id, 10);
        
        // 1. Lấy thông tin sản phẩm
        const data = await getProductById(productId);
        if (!data) throw new Error("Không tìm thấy sản phẩm trên server");
        
        setProduct(data);
        setIsFromMock(false);

        // 2. Lấy danh sách đánh giá
        const reviewData = await getReviewsByProductId(productId);
        setReviews(reviewData || []);
      } catch (err) {
        console.error("Dùng dữ liệu mẫu do API lỗi:", err);
        const mockProduct = mockProducts.find((p) => p.id === parseInt(id, 10));
        if (mockProduct) {
          setProduct(mockProduct);
          setIsFromMock(true);
          setReviews([]);
        } else {
          setError("Sản phẩm không tồn tại.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Logic xử lý khi submit form đánh giá
  const handleSubmittingReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá sản phẩm!");
      return;
    }
    
    if (!id) return;

    try {
      setSubmitting(true);
      const reviewData = {
        productId: parseInt(id, 10),
        userId: user.id,
        rating: newRating,
        comment: newComment,
      };

      // Gọi API tạo review
      await createReview(reviewData);

      alert("Cảm ơn bạn đã để lại đánh giá!");
      
      // Xóa trắng form sau khi gửi thành công
      setNewComment("");
      setNewRating(5);

      // Tải lại danh sách review mới nhất
      const updatedReviews = await getReviewsByProductId(parseInt(id, 10));
      setReviews(updatedReviews);
    } catch (err) {
      console.error("Gửi đánh giá thất bại:", err);
      alert("Không thể gửi đánh giá lúc này. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  // Các trạng thái Loading và Lỗi
  if (loading) return <><Navbar /><div style={{ padding: "100px", textAlign: "center" }}><h2>Đang tải...</h2></div><Footer /></>;
  if (!product) return <><Navbar /><div style={{ padding: "100px", textAlign: "center", color: "#1e293b" }}><h2>{error || "Sản phẩm không tồn tại!"}</h2><Link to="/">Về trang chủ</Link></div><Footer /></>;

  // Tính toán điểm đánh giá trung bình
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  // Hàm render giao diện ngôi sao
  const renderStars = (rating: number, clickable = false) => {
    return (
      <div style={{ display: "inline-flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => clickable && setNewRating(star)}
            style={{
              cursor: clickable ? "pointer" : "default",
              color: star <= (clickable ? newRating : rating) ? "#facc15" : "#cbd5e1",
              fontSize: clickable ? "28px" : "18px",
              transition: "color 0.2s"
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Xác định hình ảnh chính
  const mainImage = product.images && product.images.length > 0 ? product.images[0].url : (isFromMock ? (product as any).image : null);
  return (
    <>
      <title>{product.name}</title>
      <Navbar />
      
      {isFromMock && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '10px', textAlign: 'center' }}>
          <strong>Lưu ý:</strong> Đang hiển thị dữ liệu mẫu do API hiện không phản hồi.
        </div>
      )}

      <div className="product-detail-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Breadcrumb */}
        <div className="breadcrumb" style={{ marginBottom: "20px", fontSize: "14px", color: "#64748b", textAlign: "left" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Trang chủ</Link> / 
          <span> {product.category?.name || "Linh kiện"}</span> / 
          <span style={{ fontWeight: "600", color: "#1e293b" }}> {product.name}</span>
        </div>

        {/* Thông tin chính */}
        <div className="detail-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "50px" }}>
          <div className="detail-gallery">
            <div className="main-img-box" style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
              {mainImage ? (
                <img src={mainImage} alt={product.name} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
              ) : (
                <span style={{ fontSize: "64px", color: "#cbd5e1" }}>📦</span>
              )}
            </div>
          </div>

          <div className="detail-info" style={{ textAlign: "left" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px", color: "#1e293b" }}>{product.name}</h1>
            <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              {renderStars(averageRating)} 
              <span style={{ color: "#64748b", marginLeft: "10px", fontWeight: "500" }}>({reviews.length} đánh giá)</span>
            </div>
            <div style={{ fontSize: "32px", fontWeight: "800", color: "var(--primary)", marginBottom: "20px" }}>
              {product.price.toLocaleString("vi-VN")} VNĐ
            </div>
            <p style={{ color: "#475569", lineHeight: "1.6", marginBottom: "25px" }}>{product.description}</p>
            
            <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "30px" }}>
              <div className="qty-control" style={{ display: "flex", border: "1px solid #cbd5e1", borderRadius: "25px", overflow: "hidden" }}>
                <button style={{ padding: "10px 15px", border: "none", background: "#f8fafc", cursor: "pointer", color: "#0f172a" }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input style={{ width: "40px", textAlign: "center", border: "none", fontWeight: "600", outline: "none", color: "#0f172a" }} type="text" value={quantity} readOnly />
                <button style={{ padding: "10px 15px", border: "none", background: "#f8fafc", cursor: "pointer", color: "#0f172a" }} onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button style={{ flex: 1, width: "15rem", padding: "12px", borderRadius: "25px", border: "none", background: `${added ? "green" : "var(--primary)"}`, color: "#fff", fontWeight: "700", cursor: "pointer", transition: "opacity 0.2s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"} onMouseOut={(e) => e.currentTarget.style.opacity = "1"} onClick={() => handleAddToCart(product)}>
                {added ? "✔" : "Thêm vào giỏ hàng"}
              </button>
            </div>
          </div>
        </div>

        {/* Thông tin Người bán */}
        {/* <section style={{ padding: "30px", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "40px", textAlign: "left" }}>
          <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Thông tin người bán</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold" }}>
              {product.seller?.username ? product.seller.username.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h4 style={{ fontSize: "18px", margin: 0, color: "#1e293b" }}>{product.seller?.username || "Người dùng ẩn danh"} <span title="Đã xác thực">🛡️</span></h4>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "5px 0" }}>Tham gia: {product.createdAt ? new Date(product.createdAt).getFullYear() : "2026"}</p>
            </div>
         */}
            {/* Nhóm nút chức năng */}
           {/* <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
              <button 
                onClick={() => navigate('/customer-chat')}
                style={{ padding: "8px 20px", borderRadius: "20px", border: "none", background: "var(--primary)", color: "#fff", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px" }}
                onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"} 
                onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
              >
                Nhắn tin
              </button>
              <button 
                onClick={() => navigate('/seller')}
                style={{ padding: "8px 20px", borderRadius: "20px", border: "1px solid var(--primary)", color: "var(--primary)", background: "transparent", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }} 
                onMouseOver={(e) => {e.currentTarget.style.background = "var(--bg-light)"; e.currentTarget.style.color = "var(--primary)"}} 
                onMouseOut={(e) => {e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--primary)"}}
              >
                Xem Shop
              </button>
            </div>
          </div>
        </section> */}
        <AccountHeader account={product.seller}/>

        {/* Tab Đánh giá */}
        <section style={{ marginBottom: "50px", textAlign: "left" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "25px", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", color: "#1e293b" }}>Đánh giá sản phẩm</h3>
          
          {/* Form nhập đánh giá */}
          <div style={{ background: "#f8fafc", padding: "25px", borderRadius: "16px", marginBottom: "30px", border: "1px solid #e2e8f0" }}>
            <h4 style={{ marginBottom: "15px", color: "#0f172a" }}>Viết đánh giá của bạn</h4>
            <form onSubmit={handleSubmittingReview}>
              <div style={{ marginBottom: "15px" }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "600", color: "#475569" }}>Chọn số sao:</p>
                {renderStars(0, true)}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Bạn thấy sản phẩm này thế nào? Chia sẻ trải nghiệm của bạn nhé..."
                  style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "1px solid #cbd5e1", minHeight: "100px", outline: "none", fontSize: "14px", fontFamily: "inherit", color: "#1e293b" }}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                style={{ padding: "10px 30px", borderRadius: "25px", border: "none", background: submitting ? "#94a3b8" : "#1e293b", color: "#fff", fontWeight: "600", cursor: submitting ? "not-allowed" : "pointer", transition: "background 0.2s" }}
              >
                {submitting ? "Đang gửi..." : "Gửi đánh giá ngay"}
              </button>
            </form>
          </div>

          {/* Danh sách đánh giá */}
          <div className="review-list" style={{ textAlign: "left" }}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} style={{ padding: "20px 0", borderBottom: "1px solid #f1f5f9", textAlign: "left" }}>
                  <div style={{ marginBottom: "8px" }}>{renderStars(review.rating)}</div>
                  <p style={{ margin: "0 0 8px 0", color: "#1e293b", lineHeight: "1.5" }}>{review.comment}</p>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Đăng bởi người dùng ẩn danh • {review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : 'Mới đây'}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                Chưa có đánh giá nào. Hãy là người đầu tiên!
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}