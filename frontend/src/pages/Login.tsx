import { useState } from "react";
import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("login", { email, password });
    alert("Đăng nhập thành công (giả lập)");
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Đăng nhập</h1>
          <form onSubmit={handleSubmit} className="auth-form">
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

          <div className="auth-support">
            <Link to="/forgot">Quên mật khẩu?</Link>
          </div>

          <button className="auth-submit" type="submit">
            Đăng nhập
          </button>
        </form>

        <p className="auth-footer">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
}
