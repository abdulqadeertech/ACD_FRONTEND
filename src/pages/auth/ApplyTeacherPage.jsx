import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, CheckCircle, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { api } from "../../api";

export default function ApplyTeacherPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    qualification: "Shahadat-ul-Alimiyyah",
    hafiz: true,
    ijazah: true,
    ijazahDetails: "Ijazah in Hafs 'an 'Asim",
    experience: 5,
    languages: "English, Urdu, Arabic",
    specializations: "Tajweed, Noorani Qaida, Hifz",
    bio: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="section" style={{ maxWidth: "680px", margin: "40px auto 90px" }}>
      <div className="section-header">
        <span className="eyebrow">Faculty Recruitment</span>
        <h2>Join Our International Teaching Faculty</h2>
        <p>
          Teach students worldwide from home with competitive remuneration and structured schedules.
        </p>
      </div>

      <div className="form-card" style={{ padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <Link to="/">
            <img
              src="/assets/branding/minara-logo.jpg"
              alt="Minara-ul-Quran"
              style={{ maxHeight: "64px", width: "auto", objectFit: "contain", margin: "0 auto", borderRadius: "8px" }}
            />
          </Link>
        </div>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <CheckCircle size={48} color="var(--success)" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "24px", color: "var(--emerald-950)" }}>Application Submitted!</h3>
            <p style={{ color: "var(--slate-700)", marginTop: "12px", lineHeight: "1.7" }}>
              JazakAllah Khair for your interest. Our Academic Board will review your credentials and contact you to schedule an oral recitation and Tajweed assessment.
            </p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: "24px" }}>
              Back to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="arabic-bismillah" style={{ fontSize: "24px", marginBottom: "12px" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Qari Bilal Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="form-control"
                >
                  <option value="Male">Male (Qari)</option>
                  <option value="Female">Female (Ustadha)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Contact *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 321 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Formal Degree / Islamic Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. Shahadat-ul-Alimiyyah (Dars-e-Nizami)"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Teaching Experience (Years)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                  className="form-control"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "24px", margin: "14px 0" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.hafiz}
                  onChange={(e) => setFormData({ ...formData, hafiz: e.target.checked })}
                />
                <b>Hafiz-ul-Quran</b>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.ijazah}
                  onChange={(e) => setFormData({ ...formData, ijazah: e.target.checked })}
                />
                <b>Holds Verified Ijazah / Sanad</b>
              </label>
            </div>

            {formData.ijazah && (
              <div className="form-group">
                <label className="form-label">Ijazah Riwayah & Sanad Lineage Details</label>
                <input
                  type="text"
                  placeholder="e.g. Hafs 'an 'Asim via Shatibiyyah"
                  value={formData.ijazahDetails}
                  onChange={(e) => setFormData({ ...formData, ijazahDetails: e.target.value })}
                  className="form-control"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Languages Spoken</label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Brief Biography & Pedagogy Approach</label>
              <textarea
                rows="3"
                placeholder="Describe your teaching experience, patience with young children, and Tajweed methodology..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="form-control"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "12px" }}>
              {loading ? "Submitting Application..." : "Submit Teacher Application"} <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
