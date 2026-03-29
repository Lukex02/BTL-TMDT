// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser } from "../services/auth.service";
import "./styles.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser();

  const handleProfileClick = () => {
    if (user) {
      navigate("/info");
    } else {
      navigate("/info");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/">Trang chủ</Link>
        <Link to="/seller">Kênh Người Bán</Link>
        <Link to="/support">Hỗ Trợ</Link>
      </div>

      <div className="nav-right">
        <span className="icon">🔍</span>
        <button
          onClick={handleProfileClick}
          className="icon"
          aria-label={user ? "Thông tin người dùng" : "Đăng nhập"}
          style={{ border: "none", background: "transparent", cursor: "pointer" }}
        >
          👤
        </button>
        <Link to="/cart" className="icon" aria-label="Giỏ hàng">
          🛒
        </Link>
      </div>
    </div>
  );
}