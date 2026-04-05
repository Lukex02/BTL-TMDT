import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { login, saveAuthUser, getAuthUser } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existing = getAuthUser();
    if (existing) {
      navigate("/info");
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login({ email, password });
      saveAuthUser(user);
      alert("Đăng nhập thành công");
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
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

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
