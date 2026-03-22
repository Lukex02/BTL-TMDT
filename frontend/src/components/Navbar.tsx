// src/components/Navbar.tsx
import "./styles.css";

export default function Navbar() {
  return (
    <div className="navbar">
      {/* Left */}
      <div className="nav-left">
        <a>Trang chủ</a>
        <a>Kênh Người Bán</a>
        <a>Hỗ Trợ</a>
      </div>

      {/* Right */}
      <div className="nav-right">
        <span className="icon">🔍</span>
        <span className="icon">👤</span>
        <span className="icon">🛒</span>
      </div>
    </div>
  );
}