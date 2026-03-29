import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { register, saveAuthUser, getAuthUser } from "../services/auth.service";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existing = getAuthUser();
    if (existing) {
      navigate("/info");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!agree) {
      setError("Vui lòng đồng ý điều khoản dịch vụ và chính sách bảo mật");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      const username = fullname.trim() || email.split("@")[0];
      const user = await register({ email, password, username, role: "customer" });
      saveAuthUser(user);
      alert("Đăng ký thành công");
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
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

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
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
