import { useState } from "react";
import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!agree) {
      alert("Vui lòng đồng ý điều khoản dịch vụ và chính sách bảo mật");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    console.log("register", { fullname, email, password });
    alert("Đăng ký thành công (giả lập)");
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Đăng ký tài khoản</h1>
          <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label className="auth-checkbox">
            <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
                Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
            </span>
          </label>

          <button className="auth-submit" type="submit">
            Đăng ký
          </button>
        </form>

        <p className="auth-footer">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay!</Link>
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
}
