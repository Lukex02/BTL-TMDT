import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { login, getAllUsers, saveAuthUser, getAuthUser } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
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
      let payload = {
        email,
        password,
        username: email,
      };

      try {
        const user = await login(payload);
        saveAuthUser(user);
        navigate("/");
        return;
      } catch (innerErr: any) {
        const innerMsg = innerErr?.response?.data?.message || innerErr?.message || "Đăng nhập thất bại";

        if (innerMsg.includes("Cannot coerce") || innerMsg.includes("User not found")) {
          try {
            const users = await getAllUsers();
            const matched = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
            if (matched && matched.username) {
              payload = {
                ...payload,
                username: matched.username,
              };
              const user = await login(payload);
              saveAuthUser(user);
              navigate("/");
              return;
            }
          } catch (userFetchErr) {
          }
        }

        throw innerErr;
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Đăng nhập thất bại";
      if (msg.includes("Cannot coerce")) {
        setError("Lỗi đăng nhập: không tìm được username phù hợp với email, vui lòng kiểm tra hoặc đăng ký lại.");
      } else {
        setError(msg);
      }
      setShowErrorModal(true);

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

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {showErrorModal && (
          <div
            onClick={() => setShowErrorModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              animation: "fadeIn 180ms ease-out",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(420px, 92%)",
                background: "linear-gradient(160deg, #1e293b 0%, #14213d 100%)",
                borderRadius: "18px",
                boxShadow: "0 24px 48px rgba(15, 23, 42, 0.35)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                padding: "24px",
                color: "#e2e8f0",
                position: "relative",
                transform: "translateY(8px)",
                animation: "popIn 220ms ease-out forwards",
              }}
            >
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "999px",
                  border: "none",
                  background: "rgba(148, 163, 184, 0.2)",
                  color: "#f8fafc",
                  cursor: "pointer",
                  fontSize: "18px",
                  lineHeight: "1",
                }}
                aria-label="Đóng"
              >
                ×
              </button>
              <h3 style={{
                fontSize: "1.1rem",
                margin: "0 0 10px",
                color: "#fecaca",
                letterSpacing: "0.02em",
              }}>
                Đăng nhập không thành công
              </h3>
              <p style={{ margin: "0 0 18px", color: "#e2e8f0", lineHeight: "1.45" }}>{error}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid rgba(96, 165, 250, 0.7)",
                  background: "#3b82f6",
                  color: "white",
                  fontWeight: 600,
                  padding: "10px 12px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        <p className="auth-footer">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
        </p>
      </div>
      </div>
      <Footer />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(9px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
