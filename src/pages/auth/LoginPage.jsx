import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { auth } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await auth("/auth/login", { email, password });
      loginUser(data.user, data.token);

      // Route by role
      if (["admin", "super_admin"].includes(data.user.role)) {
        navigate("/dashboard/admin");
      } else if (data.user.role === "teacher") {
        navigate("/dashboard/teacher");
      } else if (data.user.role === "parent") {
        navigate("/dashboard/parent");
      } else {
        navigate("/dashboard/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="section" style={{ maxWidth: "520px", margin: "40px auto 90px" }}>
      <div className="form-card" style={{ padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <Link to="/">
            <img
              src="/assets/branding/minara-logo.jpg"
              alt="Minara-ul-Quran"
              style={{ maxHeight: "68px", width: "auto", objectFit: "contain", margin: "0 auto", borderRadius: "8px" }}
            />
          </Link>
        </div>
        <div className="arabic-bismillah" style={{ fontSize: "24px", marginBottom: "8px" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h2 style={{ fontSize: "28px", fontWeight: "800", color: "var(--dark-slate)", textAlign: "center", marginBottom: "6px" }}>
          Sign In to Your Account
        </h2>
        <p style={{ color: "var(--muted-text)", fontSize: "14px", textAlign: "center", marginBottom: "26px" }}>
          Welcome back to Minara-ul-Quran Learning Portal
        </p>

        {error && (
          <div style={{ padding: "12px", borderRadius: "10px", background: "#fee2e2", color: "#991b1b", marginBottom: "18px", fontSize: "13.5px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. parent@nooracademy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label className="form-label">Password</label>
              <span style={{ fontSize: "12px", color: "var(--emerald-700)", cursor: "pointer" }}>Forgot?</span>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "10px" }}>
            {loading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "22px", fontSize: "14px", color: "var(--slate-600)" }}>
          Don't have an account yet? <Link to="/register" style={{ color: "var(--emerald-900)", fontWeight: "bold" }}>Register here</Link>
        </p>

        {/* 1-Click Demo Quick Fill Box */}
        <div style={{ marginTop: "28px", borderTop: "1px dashed var(--ivory-200)", paddingTop: "20px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--slate-500)", textTransform: "uppercase", display: "block", marginBottom: "10px", textAlign: "center" }}>
            1-Click Quick Demo Login:
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fillDemo("admin@nooracademy.com", "Admin123!")}
              style={{ fontSize: "12px" }}
            >
              👑 Admin
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fillDemo("teacher@nooracademy.com", "Teacher123!")}
              style={{ fontSize: "12px" }}
            >
              📖 Teacher (Qari)
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fillDemo("parent@nooracademy.com", "Parent123!")}
              style={{ fontSize: "12px" }}
            >
              👨‍👩‍👧 Parent
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fillDemo("student@nooracademy.com", "Student123!")}
              style={{ fontSize: "12px" }}
            >
              🎓 Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
