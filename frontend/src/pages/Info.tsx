import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser, clearAuthUser } from "../services/auth.service";
import { getOrdersByBuyer } from "../services/order.service";
import { getProductsBySeller, createProduct, getProductCategories, deleteProduct } from "../services/product.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface FormData {
  name: string;
  price: string;
  stock: string;
  categoryId: string;
  description: string;
  status: string;
}

export default function Info() {
  const navigate = useNavigate();
  const user = getAuthUser();

  const [orderBuyData, setOrderBuyData] = useState<any[]>([]);
  const [sellProducts, setSellProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    status: "active",
  });

  const loadUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const orders = await getOrdersByBuyer(user.id);
      const formattedOrders = orders.map((order: any) => ({
        id: order.id,
        product: order.items?.[0]?.product?.name || "Unknown",
        price: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(order.totalAmount || 0),
        status: order.status,
      }));
      setOrderBuyData(formattedOrders);
      
      const sellerProds = await getProductsBySeller(user.id);
      console.log("Sản phẩm của người bán:", sellerProds);
      const formattedProducts = sellerProds.map((prod: any) => ({
        id: prod.id,
        title: prod.name,
        price: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(prod.price || 0),
        views: Math.floor(Math.random() * 500),
        
        firstImageUrl: (Array.isArray(prod.images) && prod.images.length > 0) 
          ? prod.images[0].url 
          : null,
      }));
      setSellProducts(formattedProducts);

      const cats = await getProductCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      loadUserData();
    }
  }, [user?.id, loadUserData, navigate]);


  if (!user) {
    return null;
  }

  const handleLogout = () => {
    clearAuthUser();
    navigate("/login");
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    if (images.length + newFiles.length > 8) {
      alert("Bạn chỉ được tải lên tối đa 8 ảnh.");
      return;
    }

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages((prev) => [...prev, base64String]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleAddProduct = async () => {
    try {
      if (!formData.name || !formData.price || images.length === 0) {
        alert("Vui lòng điền đầy đủ thông tin và thêm ít nhất 1 ảnh.");
        return;
      }

      setLoading(true);

      const productData = {
        name: formData.name,
        price: Number(formData.price.replace(/[^0-9]/g, "")),
        stock: Number(formData.stock),
        description: formData.description,
        status: formData.status,
        category: { 
          id: Number(formData.categoryId) 
        },
        seller: { 
          id: user.id 
        },
        images: images.map((base64) => ({ 
          url: base64 
        })),
        attributes: []
      };
      console.log("Dữ liệu sản phẩm gửi đi:", productData);
      await createProduct(productData);

      setFormData({ name: "", price: "", stock: "", categoryId: "", description: "", status: "active" });
      setImages([]);
      await loadUserData();
      setActiveTab("sell-listings");
      alert("Thêm sản phẩm thành công!");
    } catch (error: any) {
      console.error("Lỗi:", error);
      alert("Không thể tạo sản phẩm. Hãy kiểm tra lại kết nối.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

    try {
      setLoading(true);
      await deleteProduct(productId); 
      
      alert("Xóa sản phẩm thành công!");
      
      await loadUserData(); 
    } catch (error: any) {
      console.error("Lỗi khi xóa:", error);
      alert(`Lỗi: ${error.response?.data?.message || "Không thể xóa sản phẩm"}`);
    } finally {
      setLoading(false);
    }
  };

  const profile = user;

  const menuStructure = [
    { id: "overview", label: "Tổng quan", icon: "📊", type: "parent" },
    { label: "Quản lý mua hàng", icon: "🛒", type: "heading" },
    { id: "buy-orders", label: "Đơn mua của tôi", type: "child", parentId: "buy" },
    { id: "awaiting-confirm", label: "Chờ xác nhận", type: "child", parentId: "buy", disabled: true },
    { id: "shipping", label: "Đang giao", type: "child", parentId: "buy", disabled: true },
    { id: "liked-products", label: "Sản phẩm đã thích", type: "child", parentId: "buy" },
    { id: "reviews", label: "Lịch sử đánh giá", type: "child", parentId: "buy" },
    { label: "Quản lý bán hàng", icon: "📦", type: "heading" },
    { id: "sell-listings", label: "Tin đăng của tôi", type: "child", parentId: "sell" },
    { id: "add-part", label: "Thêm linh kiện mới", type: "child", parentId: "sell" },
    { id: "active-listings", label: "Đang hiển thị", type: "child", parentId: "sell", disabled: true },
    { id: "revenue", label: "Thống kê doanh thu", type: "child", parentId: "sell" },
    { label: "Tài khoản", icon: "👤", type: "heading" },
    { id: "profile", label: "Hồ sơ cá nhân", type: "child", parentId: "account" },
    { id: "addresses", label: "Số địa chỉ", type: "child", parentId: "account" },
    { id: "payments", label: "Cài đặt thanh toán", type: "child", parentId: "account" },
  ];

  return (
    <div style={{ backgroundColor: "#f4f7f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div className="dashboard-wrapper" style={{ display: "flex", flex: 1, maxWidth: "1400px", margin: "20px auto", gap: "20px", padding: "0 20px", width: "100%" }}>
        
        {/* === SIDEBAR === */}
        <aside className="info-sidebar" style={{ 
          width: "300px", flexShrink: 0, 
          backgroundColor: "#fff", 
          borderRadius: "16px", 
          padding: "25px 15px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
          display: "flex", flexDirection: "column"
        }}>
          <div className="sidebar-profile" style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", padding: "0 10px" }}>
            <div className="sidebar-avatar" style={{ 
              width: "50px", height: "50px", 
              backgroundColor: "var(--primary)", 
              borderRadius: "12px", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              color: "#fff", fontWeight: "700", fontSize: "20px",
              boxShadow: "0 4px 8px rgba(0,119,255,0.15)"
            }}>
              {profile.username.charAt(0)}
            </div>
            <div>
              <div className="sidebar-name" style={{ fontWeight: "700", fontSize: "16px", color: "var(--text-main)" }}>{profile.username}</div>
              <div className="sidebar-role" style={{ fontSize: "13px", color: "#94a3b8" }}>{profile.role}</div>
            </div>
          </div>

          <nav className="info-menu" style={{ flex: 1 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
              {menuStructure.map((item, index) => {
                if (item.type === "heading") {
                  return (
                    <li key={`heading-${index}`} style={{ 
                      fontSize: "12px", textTransform: "uppercase", color: "#94a3b8", fontWeight: "600",
                      letterSpacing: "0.5px", marginTop: "20px", marginBottom: "8px", paddingLeft: "15px", display: "flex", alignItems: "center", gap: "8px"
                    }}>
                      <span>{item.icon}</span> {item.label}
                    </li>
                  );
                }

                const isActive = activeTab === item.id;
                const isChild = item.type === "child";

                return (
                  <li key={item.id || `item-${index}`}>
                    <button 
                      onClick={() => !item.disabled && item.id && setActiveTab(item.id)}
                      disabled={item.disabled}
                      className={`menu-item ${isActive ? "active" : ""} ${isChild ? "child" : ""}`}
                      style={{ 
                        width: "100%", border: "none", background: isActive ? "var(--bg-light)" : "transparent",
                        color: isActive ? "var(--primary)" : (item.disabled ? "#cbd5e1" : "#4b5563"),
                        padding: "12px 15px", paddingLeft: isChild ? "35px" : "15px",
                        borderRadius: "10px", cursor: item.disabled ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", gap: "10px",
                        fontSize: "14px", fontWeight: isActive ? "600" : "400", textAlign: "left",
                        transition: "all 0.2s ease", position: "relative", opacity: item.disabled ? 0.7 : 1,
                      }}
                    >
                      {!isChild && item.icon && <span style={{ fontSize: "16px" }}>{item.icon}</span>}
                      <span>{item.label}</span>
                      {isActive && isChild && (
                        <div style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", width: "3px", height: "16px", backgroundColor: "var(--primary)", borderRadius: "0 2px 2px 0" }}></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #f3f4f6", padding: "0 10px" }}>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Đăng xuất
            </button>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="info-content" style={{ flex: 1, backgroundColor: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          
          {/* TAB: THÊM LINH KIỆN MỚI */}
          {activeTab === "add-part" ? (
             <section>
             <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "30px" }}>Thêm linh kiện mới</h1>
             
             {/* Thông tin cơ bản */}
             <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: "10px", marginBottom: "25px" }}>
               <h3 style={{ fontSize: "18px", margin: 0 }}>Thông tin cơ bản</h3>
             </div>
             
             <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
               <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", alignItems: "center" }}>
                 <label style={{ fontSize: "14px", color: "#4b5563" }}>Tên sản phẩm:</label>
                 <input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleFormChange}
                   placeholder="Nhập tên linh kiện..."
                   style={{ padding: "10px 15px", borderRadius: "25px", border: "1px solid #e5e7eb", outline: "none", fontSize: "14px" }}
                 />
               </div>
               <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", alignItems: "center" }}>
                 <label style={{ fontSize: "14px", color: "#4b5563" }}>Giá bán:</label>
                 <input
                   type="text"
                   name="price"
                   value={formData.price}
                   onChange={handleFormChange}
                   placeholder="Ví dụ: 1.000.000"
                   style={{ padding: "10px 15px", borderRadius: "25px", border: "1px solid #e5e7eb", outline: "none", fontSize: "14px" }}
                 />
               </div>
               <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", alignItems: "center" }}>
                 <label style={{ fontSize: "14px", color: "#4b5563" }}>Số lượng:</label>
                 <input
                   type="text"
                   name="stock"
                   value={formData.stock}
                   onChange={handleFormChange}
                   placeholder="Nhập số lượng"
                   style={{ padding: "10px 15px", borderRadius: "25px", border: "1px solid #e5e7eb", outline: "none", fontSize: "14px" }}
                 />
               </div>
               <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", alignItems: "center" }}>
                 <label style={{ fontSize: "14px", color: "#4b5563" }}>Danh mục:</label>
                 <select
                   name="categoryId"
                   value={formData.categoryId}
                   onChange={handleFormChange}
                   style={{ padding: "10px 15px", borderRadius: "25px", border: "1px solid #e5e7eb", outline: "none", fontSize: "14px" }}
                 >
                   <option value="">Chọn danh mục sản phẩm</option>
                   {categories.map((cat: any) => (
                     <option key={cat.id} value={cat.id}>
                       {cat.name}
                     </option>
                   ))}
                 </select>
               </div>
               <div style={{ display: "grid", gridTemplateColumns: "180px 1fr" }}>
                 <label style={{ fontSize: "14px", color: "#4b5563", marginTop: "10px" }}>Mô tả sản phẩm:</label>
                 <textarea
                   name="description"
                   value={formData.description}
                   onChange={handleFormChange}
                   style={{ padding: "15px", borderRadius: "12px", border: "1px solid #e5e7eb", minHeight: "120px", outline: "none", fontSize: "14px" }}
                   placeholder="Mô tả chi tiết về tình trạng, bảo hành..."
                 />
               </div>
             </div>

             {/* Quản lý hình ảnh (Đã thêm logic tải ảnh thật) */}
             <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: "10px", margin: "40px 0 25px" }}>
               <h3 style={{ fontSize: "18px", margin: 0 }}>Quản lý hình ảnh</h3>
             </div>

             <div style={{ marginBottom: "25px" }}>
               <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "15px" }}>Hình ảnh sản phẩm ({images.length}/8 ảnh):</p>
               
               {/* Input file ẩn */}
               <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  onChange={handleImageUpload} 
               />

               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 85px)", gap: "15px" }}>
                 
                 {/* Render các ảnh đã tải lên */}
                 {images.map((imgSrc, index) => (
                   <div key={index} style={{ position: "relative", width: "85px", height: "85px", borderRadius: "8px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                     <img src={imgSrc} alt={`preview-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                     
                     {/* Nút xóa ảnh */}
                     <button 
                       onClick={() => handleRemoveImage(index)}
                       style={{ position: "absolute", top: "2px", right: "2px", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                     >
                       ×
                     </button>
                   </div>
                 ))}

                 {/* Ô thêm ảnh (ẩn đi nếu đã đủ 8 ảnh) */}
                 {images.length < 8 && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      style={{ width: "85px", height: "85px", border: "1px dashed #cbd5e1", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8", fontSize: "20px", transition: "0.2s", backgroundColor: "#f8fafc" }} 
                      onMouseOver={(e)=>e.currentTarget.style.borderColor="var(--primary)"} 
                      onMouseOut={(e)=>e.currentTarget.style.borderColor="#cbd5e1"}
                    >
                      +
                    </div>
                 )}
               </div>
             </div>

             <div style={{ display: "flex", gap: "15px", marginTop: "50px" }}>
               <button
                 onClick={handleAddProduct}
                 disabled={loading}
                 style={{
                   padding: "12px 35px",
                   borderRadius: "25px",
                   border: "none",
                   background: loading ? "#cbd5e1" : "var(--primary)",
                   color: "#fff",
                   fontWeight: "600",
                   cursor: loading ? "not-allowed" : "pointer",
                   boxShadow: "0 4px 10px rgba(0,119,255,0.2)",
                 }}
               >
                 {loading ? "Đang xử lý..." : "Lưu & Đăng bài"}
               </button>
               <button onClick={() => setActiveTab("overview")} disabled={loading} style={{ padding: "12px 35px", borderRadius: "25px", border: "1px solid #e5e7eb", background: "#fff", color: "#4b5563", fontWeight: "600", cursor: "pointer" }}>Hủy bỏ</button>
             </div>
           </section>
          ) : (
            /* CÁC TAB KHÁC */
            <>
              <header style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "28px", margin: "0 0 8px 0", color: "var(--text-main)" }}>
                  {activeTab === "overview" ? "Tổng quan hoạt động" : menuStructure.find(i => i.id === activeTab)?.label}
                </h1>
                <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>Chào mừng trở lại! Đây là các dữ liệu mới nhất của bạn.</p>
              </header>

              {(activeTab === "overview" || activeTab === "buy-orders") && (
                <section className="dashboard-block" style={{ marginBottom: "35px" }}>
                  <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", color: "var(--text-main)" }}>
                    <span style={{ color: "var(--primary)" }}>💠</span> Hoạt động Mua hàng
                  </h3>
                  
                  <div className="table-card" style={{ border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", backgroundColor: "#fff" }}>
                    <table className="info-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ backgroundColor: "var(--bg-light)" }}>
                          <th style={{ textAlign: "left", padding: "15px", fontSize: "13px", textTransform: "uppercase", color: "#64748b" }}>Mã đơn</th>
                          <th style={{ textAlign: "left", padding: "15px", fontSize: "13px", textTransform: "uppercase", color: "#64748b" }}>Tên linh kiện</th>
                          <th style={{ textAlign: "left", padding: "15px", fontSize: "13px", textTransform: "uppercase", color: "#64748b" }}>Tổng tiền</th>
                          <th style={{ textAlign: "left", padding: "15px", fontSize: "13px", textTransform: "uppercase", color: "#64748b" }}>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderBuyData.map((order) => (
                          <tr key={order.id} style={{ borderTop: "1px solid #f3f4f6", transition: "background-color 0.15s ease" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#fafafa"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                            <td style={{ padding: "15px", color: "var(--primary)", fontWeight: "600" }}>{order.id}</td>
                            <td style={{ padding: "15px" }}>{order.product}</td>
                            <td style={{ padding: "15px", fontWeight: "700" }}>{order.price}</td>
                            <td style={{ padding: "15px" }}>
                              <span className={`tag ${order.status === "Đã nhận" ? "tag-success" : "tag-warning"}`} style={{ fontSize: "12px", padding: "5px 10px", borderRadius: "20px" }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
              
              {(activeTab === "overview" || activeTab === "sell-listings") && (
                <section className="dashboard-block">
                  <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", color: "var(--text-main)" }}>
                    <span style={{ color: "var(--primary)" }}>📈</span> Hoạt động Bán hàng
                  </h3>

                  {activeTab === "overview" && (
                    <div className="info-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", marginBottom: "25px" }}>
                      {[
                        { title: "Đơn chờ xử lý", value: "8" },
                        { title: "Tin đang đăng", value: "12" },
                        { title: "Doanh thu", value: "15.8M" },
                      ].map(stat => (
                        <div className="card" key={stat.title} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 2px 6px rgba(0,0,0,0.01)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h4 style={{ color: "#6b7280", margin: 0, fontSize: "14px", fontWeight: "500" }}>{stat.title}</h4>
                          </div>
                          <p style={{ fontSize: "28px", fontWeight: "800", margin: "12px 0 0", color: "var(--text-main)" }}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="selllist-card" style={{ border: "1px solid #e5e7eb", borderRadius: "14px", backgroundColor: "#fff", padding: "25px" }}>
                    <h4 style={{ margin: "0 0 20px 0", fontSize: "16px", color: "var(--text-main)"}}>Linh kiện đang rao bán</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                      {sellProducts.map((product, idx) => (
                        <li 
                          key={idx} 
                          style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            padding: "15px", 
                            borderRadius: "12px", 
                            border: "1px solid #f3f4f6", 
                            transition: "all 0.15s ease", 
                            cursor: "pointer",
                            position: "relative" 
                          }} 
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary)"; 
                            e.currentTarget.style.backgroundColor = "var(--bg-light)";
                          }} 
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = "#f3f4f6"; 
                            e.currentTarget.style.backgroundColor = "transparent";
                          }} 
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                          }}
                        >
                          {/* === PHẦN HIỂN THỊ ẢNH ĐẦU TIÊN === */}
                          <div style={{ 
                            width: "50px", 
                            height: "50px", 
                            backgroundColor: "#f8fafc", 
                            borderRadius: "10px", 
                            marginRight: "15px", 
                            overflow: "hidden",
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            border: "1px solid #e5e7eb"
                          }}>
                            {product.firstImageUrl ? (
                              <img 
                                src={product.firstImageUrl} 
                                alt={product.title} 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                              />
                            ) : (
                              <span style={{ fontSize: "20px" }}>📦</span>
                            )}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "600", fontSize: "15px", color: "var(--text-main)" }}>{product.title}</div>
                            <div style={{ fontSize: "13px", color: "#94a3b8" }}>{product.views} lượt xem</div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <div style={{ fontWeight: "700", color: "var(--primary)", fontSize: "16px" }}>{product.price}</div>
                            
                            <button
                              onClick={(e) => handleDeleteProduct(e, product.id)}
                              style={{
                                border: "none",
                                background: "#fee2e2",
                                color: "#ef4444",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: "600",
                                transition: "all 0.2s"
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = "#ef4444";
                                e.currentTarget.style.color = "#fff";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = "#fee2e2";
                                e.currentTarget.style.color = "#ef4444";
                              }}
                            >
                              Xóa
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />

      <style>{`
        .menu-item:hover {
          background-color: var(--bg-light) !important;
          color: var(--primary) !important;
        }
        .menu-item.active {
          color: var(--primary) !important;
        }
        .menu-item.disabled {
          background-color: transparent !important;
          color: #cbd5e1 !important;
        }
        .tag-success { background: #dcfce7; color: #166534; }
        .tag-warning { background: #fef3c7; color: #92400e; }
        .logout-btn {
          width: 100%; padding: 12px; borderRadius: 10px; border: 1px solid #fee2e2; background: #fff; color: #ef4444; cursor: pointer; font-weight: 600; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease;
        }
        .logout-btn:hover { background-color: #fef2f2; border-color: #fecaca; }
      `}</style>
    </div>
  );
}