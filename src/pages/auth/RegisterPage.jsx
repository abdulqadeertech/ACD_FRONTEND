import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { auth } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    phone: "",
    whatsapp: "",
    country: "United Kingdom",
    city: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    gender: "Male",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await auth("/auth/register", formData);
      loginUser(data.user, data.token);

      if (formData.role === "parent") {
        navigate("/dashboard/parent");
      } else {
        navigate("/dashboard/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ maxWidth: "620px", margin: "40px auto 90px" }}>
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
          Create Your Learning Account
        </h2>
        <p style={{ color: "var(--muted-text)", fontSize: "14px", textAlign: "center", marginBottom: "26px" }}>
          Begin your journey with Minara-ul-Quran
        </p>

        {error && (
          <div style={{ padding: "12px", borderRadius: "10px", background: "#fee2e2", color: "#991b1b", marginBottom: "18px", fontSize: "13.5px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Account Type *</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button
                type="button"
                className={`btn btn-sm ${formData.role === "student" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFormData({ ...formData, role: "student" })}
              >
                Student Account
              </button>
              <button
                type="button"
                className={`btn btn-sm ${formData.role === "parent" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFormData({ ...formData, role: "parent" })}
              >
                Parent / Guardian
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="+44 7911 123456"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value, phone: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Country of Residence</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                placeholder="City Name"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-gold btn-lg" style={{ width: "100%", marginTop: "12px" }}>
            {loading ? "Creating Account..." : "Create Account & Start Learning"} <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "22px", fontSize: "14px", color: "var(--slate-600)" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--emerald-900)", fontWeight: "bold" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
