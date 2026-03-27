// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/">Trang chủ</Link>
        <Link to="/seller">Kênh Người Bán</Link>
        <Link to="/support">Hỗ Trợ</Link>
      </div>

      <div className="nav-right">
        <span className="icon">🔍</span>
        <Link to="/login" className="icon" aria-label="Đăng nhập">
          👤
        </Link>
        <Link to="/cart" className="icon" aria-label="Giỏ hàng">
          🛒
        </Link>
      </div>
    </div>
  );
}