import React from "react";
import { Link } from "react-router-dom";
import { Star, ShieldCheck, Heart, ArrowRight, Video, Award, Clock } from "lucide-react";

export default function TeacherMarketplaceCard({
  teacher,
  isFavorite = false,
  onToggleFavorite = null,
  isCompared = false,
  onToggleCompare = null,
}) {
  const t = teacher;
  const isFemale = t.gender === "Female";
  const title = isFemale ? "Female Quran Teacher" : "Male Quran Teacher";

  return (
    <article className="card teacher-marketplace-card" style={{ position: "relative", padding: "24px", borderRadius: "24px" }}>
      {/* Top action row: Verified badge & Favorite */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--emerald-50)", color: "var(--success)", padding: "4px 10px", borderRadius: "20px", fontSize: "11.5px", fontWeight: "750" }}>
          <ShieldCheck size={14} /> Verified ✓
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(t)}
              title="Compare Teacher"
              className={`btn btn-sm ${isCompared ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "4px 8px", fontSize: "11px" }}
            >
              {isCompared ? "✓ Compared" : "+ Compare"}
            </button>
          )}

          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(t.id || t.user?._id)}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isFavorite ? "var(--danger)" : "var(--slate-400)",
                padding: "4px",
              }}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
        <div className="teacher-avatar-frame" style={{ width: "72px", height: "72px", margin: 0, flexShrink: 0 }}>
          {t.avatar || t.user?.avatar ? (
            <img src={t.avatar || t.user?.avatar} alt={t.name} />
          ) : (
            <div className="teacher-avatar-placeholder" style={{ fontSize: "24px" }}>
              {(t.name || "Q")[0]}
            </div>
          )}
        </div>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--emerald-950)", marginBottom: "2px" }}>
            <Link to={`/teachers/${t.id || t.user?._id}`}>{t.name}</Link>
          </h3>
          <span style={{ fontSize: "12.5px", color: "var(--slate-500)", fontWeight: "600", display: "block" }}>
            {title} ({t.country})
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--gold-600)", fontWeight: "bold", fontSize: "13px", marginTop: "4px" }}>
            <Star size={14} fill="currentColor" /> {t.rating || 5.0} ({t.reviewsCount || 28} Reviews)
          </div>
        </div>
      </div>

      {/* Qualifications & Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
        <span className="tag-pill" style={{ background: "var(--emerald-50)", color: "var(--emerald-900)", fontWeight: "700" }}>
          {t.experience || 6}+ Years Exp
        </span>
        {t.hafiz && (
          <span className="tag-pill" style={{ background: "var(--gold-100)", color: "var(--gold-700)", fontWeight: "700" }}>
            {isFemale ? "Hafiza" : "Hafiz"}
          </span>
        )}
        {t.ijazah && (
          <span className="tag-pill" style={{ background: "var(--gold-100)", color: "var(--gold-700)", fontWeight: "700" }}>
            Ijazah in Quran
          </span>
        )}
        <span className="tag-pill">Tajweed Specialist</span>
      </div>

      {/* Languages Spoken */}
      <div style={{ fontSize: "12.5px", color: "var(--slate-600)", marginBottom: "12px" }}>
        <b>Languages:</b> {(t.languages || ["English", "Urdu"]).join(" | ")}
      </div>

      {/* Stats Counter Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", background: "var(--ivory-50)", padding: "10px 14px", borderRadius: "12px", border: "1px solid var(--ivory-200)", marginBottom: "16px", fontSize: "12.5px" }}>
        <div>
          <span style={{ color: "var(--slate-500)", display: "block" }}>Students</span>
          <b style={{ color: "var(--emerald-950)" }}>{t.studentsCount || 45}+</b>
        </div>
        <div>
          <span style={{ color: "var(--slate-500)", display: "block" }}>Classes</span>
          <b style={{ color: "var(--emerald-950)" }}>{t.classesCount || 920}+</b>
        </div>
        <div>
          <span style={{ color: "var(--slate-500)", display: "block" }}>Availability</span>
          <b style={{ color: "var(--success)" }}>Available Today</b>
        </div>
      </div>

      {/* Price & Booking Call to Action */}
      <div style={{ marginTop: "auto", borderTop: "1px dashed var(--ivory-200)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: "11px", color: "var(--slate-500)", textTransform: "uppercase" }}>Starting From</span>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--emerald-950)" }}>
            ${t.hourlyRate || 12} <small style={{ fontSize: "11px", color: "var(--slate-500)" }}>/ Hour</small>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <Link to={`/teachers/${t.id || t.user?._id}`} className="btn btn-secondary btn-sm" style={{ padding: "8px 12px" }}>
            Profile
          </Link>
          <Link to={`/book/${t.id || t.user?._id}`} className="btn btn-gold btn-sm" style={{ padding: "8px 14px" }}>
            Book Trial
          </Link>
        </div>
      </div>
    </article>
  );
}
