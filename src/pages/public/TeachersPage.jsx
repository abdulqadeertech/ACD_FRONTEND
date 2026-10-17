import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Star, Sparkles, Search, CheckCircle } from "lucide-react";
import { api } from "../../api";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [gender, setGender] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/teachers";
    if (gender !== "all") url += `?gender=${gender}`;
    api
      .get(url)
      .then((res) => {
        setTeachers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gender]);

  const filtered = teachers.filter((t) => {
    const nameMatch = t.user?.name?.toLowerCase().includes(search.toLowerCase());
    const specMatch = (t.specializations || []).some((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    );
    return nameMatch || specMatch;
  });

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Certified Faculty
        </span>
        <h2>Meet Our Qualified Quran Instructors</h2>
        <p>
          Learn from experienced scholars, Huffaz, and Qaris holding connected chains of transmission (Sanad & Ijazah).
          Male and female instructors available for all age groups.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "36px",
          background: "var(--white)",
          padding: "16px 24px",
          borderRadius: "18px",
          border: "1px solid var(--ivory-200)",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className={`btn btn-sm ${gender === "all" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setGender("all")}
          >
            All Instructors
          </button>
          <button
            className={`btn btn-sm ${gender === "Male" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setGender("Male")}
          >
            Male Teachers (Qaris)
          </button>
          <button
            className={`btn btn-sm ${gender === "Female" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setGender("Female")}
          >
            Female Teachers (Ustadhahs)
          </button>
        </div>

        <div style={{ position: "relative", minWidth: "240px" }}>
          <input
            type="text"
            placeholder="Search by name or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "36px" }}
          />
          <Search
            size={16}
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--slate-500)" }}>
          Loading instructor directory...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "20px" }}>
          <h3>No instructors found matching your selection.</h3>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((t) => (
            <article className="card teacher-card" key={t.id || t.user?._id}>
              <div className="teacher-avatar-frame">
                {t.user?.avatar ? (
                  <img src={t.user.avatar} alt={t.user.name} />
                ) : (
                  <div className="teacher-avatar-placeholder">{t.user?.name?.[0]}</div>
                )}
              </div>

              <h3>{t.user?.name}</h3>
              <div style={{ color: "var(--success)", fontSize: "13px", fontWeight: "700", marginBottom: "4px" }}>
                ✓ Certified {t.gender === "Female" ? "Ustadha" : "Qari"} ({t.user?.country})
              </div>

              <p style={{ fontSize: "13.5px", color: "var(--slate-700)", margin: "8px 0" }}>
                {t.qualification || "Islamic Studies Graduate"}
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px", fontSize: "12px", color: "var(--gold-700)", fontWeight: "600", margin: "6px 0" }}>
                {t.hafiz && <span>★ Hafiz-ul-Quran</span>}
                {t.ijazah && <span>★ Ijazah Holder</span>}
              </div>

              <div className="teacher-tags">
                {(t.specializations || ["Tajweed", "Noorani Qaida"]).slice(0, 3).map((spec, i) => (
                  <span className="tag-pill" key={i}>{spec}</span>
                ))}
              </div>

              <p style={{ fontSize: "13px", color: "var(--slate-500)", fontStyle: "italic", margin: "10px 0 16px", minHeight: "36px" }}>
                "{t.bio?.slice(0, 95)}..."
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--gold-600)", fontWeight: "bold", fontSize: "14px", marginBottom: "16px" }}>
                <Star size={16} fill="currentColor" /> {t.rating || 5.0} ({t.reviewsCount || 25}+ student reviews)
              </div>

              <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                <Link to={`/teachers/${t.id || t.user?._id}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  View Profile
                </Link>
                <Link to="/trial" className="btn btn-gold btn-sm" style={{ flex: 1 }}>
                  Book Trial
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Teacher Recruitment Banner */}
      <div
        style={{
          marginTop: "60px",
          background: "var(--white)",
          padding: "36px",
          borderRadius: "24px",
          border: "1px solid var(--ivory-200)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "6px" }}>
            Are You a Certified Qari or Islamic Scholar?
          </h3>
          <p style={{ color: "var(--slate-700)", fontSize: "14.5px" }}>
            Join our global faculty and teach students from the UK, USA, Canada, and Australia from home.
          </p>
        </div>
        <Link to="/apply-teacher" className="btn btn-primary">
          Apply to Teach at Noor Academy
        </Link>
      </div>
    </div>
  );
}
