import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles, ArrowRight, Quote } from "lucide-react";
import { api } from "../../api";

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/cms/testimonials").then((res) => setReviews(res.data)).catch(() => {});
  }, []);

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Student & Parent Reflections
        </span>
        <h2>Verified Reviews from Families Worldwide</h2>
        <p>
          Read firsthand experiences from parents and adult learners who have entrusted Minara-ul-Quran with their Quranic education.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: "50px" }}>
        {reviews.map((r, i) => (
          <article className="card" key={i} style={{ position: "relative" }}>
            <Quote size={32} color="var(--ivory-200)" style={{ position: "absolute", top: "20px", right: "20px" }} />
            <div style={{ display: "flex", gap: "4px", color: "var(--gold-500)", marginBottom: "14px" }}>
              {[...Array(r.rating || 5)].map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            <p style={{ fontStyle: "italic", marginBottom: "20px", color: "var(--slate-800)", lineHeight: "1.75" }}>
              "{r.testimonial}"
            </p>
            <div style={{ marginTop: "auto", borderTop: "1px dashed var(--ivory-200)", paddingTop: "14px" }}>
              <b style={{ color: "var(--emerald-950)", fontSize: "16px", display: "block" }}>{r.name}</b>
              <span style={{ fontSize: "12.5px", color: "var(--slate-500)" }}>
                {r.role} · {r.country} {r.childName ? `(Parent of ${r.childName})` : ""}
              </span>
              <div style={{ fontSize: "12px", color: "var(--gold-700)", fontWeight: "600", marginTop: "4px" }}>
                Course: {r.course}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/trial" className="btn btn-gold btn-lg">
          Experience It Yourself — Book Free Trial <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
