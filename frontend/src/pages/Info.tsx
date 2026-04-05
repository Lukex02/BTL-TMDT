import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser, clearAuthUser } from "../services/auth.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const orderBuyData = [
  { id: "DH-2024-001", product: "Laptop Gaming Asus ROG Strix", price: "25.500.000đ", status: "Đang vận chuyển" },
  { id: "DH-2024-002", product: "Card màn hình RTX 4060 Ti", price: "12.900.000đ", status: "Đã nhận" },
  { id: "DH-2024-003", product: "SSD Samsung 990 Pro 1TB", price: "3.200.000đ", status: "Đang vận chuyển" },
  { id: "DH-2024-004", product: "RAM Corsair Vengeance 32GB DDR5", price: "2.850.000đ", status: "Đã nhận" },
];

const sellProducts = [
  { title: "RAM 16GB DDR4 3200MHz cũ", price: "850.000đ", views: 234, icon: "💾" },
  { title: "Bàn phím cơ Akko 3068B", price: "1.200.000đ", views: 189, icon: "⌨️" },
  { title: "CPU Intel i5-12400F", price: "3.500.000đ", views: 156, icon: "🔳" },
  { title: "Màn hình LG 27inch 144Hz", price: "4.200.000đ", views: 312, icon: "🖥️" },
];

export default function Info() {
  const navigate = useNavigate();
  const user = getAuthUser();
  const [activeTab, setActiveTab] = useState("overview");

  // State và Ref cho phần tải ảnh
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profile = user || { username: "Nguyễn Thành", role: "Premium Member" };

  const handleLogout = () => {
    clearAuthUser();
    navigate("/login");
  };

  // Xử lý khi chọn ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    
    // Kiểm tra giới hạn 8 ảnh
    if (images.length + newFiles.length > 8) {
      alert("Bạn chỉ được tải lên tối đa 8 ảnh.");
      return;
    }

    // Tạo URL xem trước cho ảnh
    const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImageUrls]);
    
    // Reset input để có thể chọn lại cùng 1 ảnh nếu cần
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Xử lý xóa ảnh đã chọn
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

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
               {[
                 { label: "Tên sản phẩm", placeholder: "Nhập tên linh kiện..." },
                 { label: "Giá bán", placeholder: "Ví dụ: 1.000.000" },
                 { label: "Danh mục", placeholder: "Chọn danh mục sản phẩm" }
               ].map((f) => (
                 <div key={f.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", alignItems: "center" }}>
                   <label style={{ fontSize: "14px", color: "#4b5563" }}>{f.label}:</label>
                   <input type="text" placeholder={f.placeholder} style={{ padding: "10px 15px", borderRadius: "25px", border: "1px solid #e5e7eb", outline: "none", fontSize: "14px" }} />
                 </div>
               ))}
               <div style={{ display: "grid", gridTemplateColumns: "180px 1fr" }}>
                 <label style={{ fontSize: "14px", color: "#4b5563", marginTop: "10px" }}>Mô tả sản phẩm:</label>
                 <textarea style={{ padding: "15px", borderRadius: "12px", border: "1px solid #e5e7eb", minHeight: "120px", outline: "none", fontSize: "14px" }} placeholder="Mô tả chi tiết về tình trạng, bảo hành..." />
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
               <button style={{ padding: "12px 35px", borderRadius: "25px", border: "none", background: "var(--primary)", color: "#fff", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,119,255,0.2)" }}>Lưu & Đăng bài</button>
               <button onClick={() => setActiveTab("overview")} style={{ padding: "12px 35px", borderRadius: "25px", border: "1px solid #e5e7eb", background: "#fff", color: "#4b5563", fontWeight: "600", cursor: "pointer" }}>Hủy bỏ</button>
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
                        { title: "Đơn chờ xử lý", value: "8", icon: "📋" },
                        { title: "Tin đang đăng", value: "12", icon: "👁️" },
                        { title: "Doanh thu", value: "15.8M", icon: "📊" },
                      ].map(stat => (
                        <div className="card" key={stat.title} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 2px 6px rgba(0,0,0,0.01)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h4 style={{ color: "#6b7280", margin: 0, fontSize: "14px", fontWeight: "500" }}>{stat.title}</h4>
                            <span style={{ fontSize: "18px", opacity: 0.7 }}>{stat.icon}</span>
                          </div>
                          <p style={{ fontSize: "28px", fontWeight: "800", margin: "12px 0 0", color: "var(--text-main)" }}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="selllist-card" style={{ border: "1px solid #e5e7eb", borderRadius: "14px", backgroundColor: "#fff", padding: "25px" }}>
                    <h4 style={{ margin: "0 0 20px 0", fontSize: "16px", color: "var(--text-main)" }}>Linh kiện đang rao bán</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                      {sellProducts.map((product, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "center", padding: "15px", borderRadius: "12px", border: "1px solid #f3f4f6", transition: "all 0.15s ease" }} onMouseOver={(e) => {e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.backgroundColor = "var(--bg-light)"}} onMouseOut={(e) => {e.currentTarget.style.borderColor = "#f3f4f6"; e.currentTarget.style.backgroundColor = "transparent"}}>
                          <div style={{ width: "45px", height: "45px", backgroundColor: "var(--bg-light)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px", fontSize: "18px" }}>
                            {product.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "600", fontSize: "15px", color: "var(--text-main)" }}>{product.title}</div>
                            <div style={{ fontSize: "13px", color: "#94a3b8" }}>{product.views} lượt xem</div>
                          </div>
                          <div style={{ fontWeight: "700", color: "var(--primary)", fontSize: "16px" }}>{product.price}</div>
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