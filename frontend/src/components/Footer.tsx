// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-col">
          <h3>PCity</h3>
          <p>Về PCity</p>
          <p>Kênh Người Bán</p>
          <p>Liên Hệ Truyền Thông</p>
          <p>Chính Sách Bảo Mật</p>
          <p>Điều Khoản PCity</p>
        </div>

        
        <div className="footer-col">
          <h3>Dịch vụ khách hàng</h3>
          <p>Trung Tâm Trợ Giúp</p>
          <p>Hướng Dẫn Mua Hàng</p>
          <p>Hướng Dẫn Bán Hàng</p>
          <p>Liên Hệ PCity</p>
        </div>

        
        <div className="footer-col">
          <h3>Theo dõi PCity</h3>
          <p className="third-col">Đăng ký để nhận ưu đãi và tin tức</p>

          <div className="subscribe">
            <input placeholder="Email của bạn" />
            <button>Đăng ký</button>
          </div>
        </div>
      </div>

      
      <div className="footer-bottom">
        © 2026 PCity. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}