import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Printer,
  ShieldCheck,
  Star,
  Award,
  BookOpen,
  Calendar,
  Globe,
  Share2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { api } from "../../api";

export default function TeacherCvPage() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/teachers/${id}/cv`)
      .then((res) => {
        setCv(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="section" style={{ textAlign: "center", padding: "100px" }}>Loading digital CV...</div>;
  }

  if (!cv) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "100px" }}>
        <h2>Teacher CV Not Found</h2>
        <Link to="/find-teacher" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to Teacher Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="section" style={{ maxWidth: "860px", margin: "0 auto" }}>
      {/* Top action bar: Print & Share */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }} className="no-print">
        <Link to={`/teachers/${id}`} style={{ fontSize: "14px", color: "var(--slate-600)" }}>
          ← Back to Marketplace Profile
        </Link>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            <Printer size={15} /> Print / Save as PDF
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert("Public CV link copied to clipboard!");
            }}
            className="btn btn-secondary btn-sm"
          >
            <Share2 size={15} /> Share Link
          </button>
        </div>
      </div>

      {/* CV Sheet */}
      <div
        className="card cv-sheet"
        style={{
          padding: "48px 44px",
          borderRadius: "24px",
          border: "2px solid var(--ivory-200)",
          background: "var(--white)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* CV Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "28px", borderBottom: "2px solid var(--ivory-200)", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
            <div className="teacher-avatar-frame" style={{ width: "95px", height: "95px", margin: 0 }}>
              {cv.avatar ? (
                <img src={cv.avatar} alt={cv.teacherName} />
              ) : (
                <div className="teacher-avatar-placeholder" style={{ fontSize: "32px" }}>
                  {cv.teacherName[0]}
                </div>
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--emerald-950)" }}>
                  {cv.teacherName}
                </h1>
                <span className="badge badge-success" style={{ fontSize: "11px" }}>
                  <ShieldCheck size={13} /> Verified Faculty
                </span>
              </div>
              <p style={{ fontSize: "14.5px", color: "var(--gold-700)", fontWeight: "700", marginTop: "2px" }}>
                {cv.qualification}
              </p>
              <div style={{ fontSize: "13px", color: "var(--slate-500)", marginTop: "4px" }}>
                {cv.country} · Timezone: {cv.timezone} · {cv.experienceYears}+ Years Teaching
              </div>
            </div>
          </div>

          {/* Verification Stamp / QR Box */}
          <div style={{ textAlign: "right", background: "var(--ivory-50)", padding: "14px 18px", borderRadius: "14px", border: "1px dashed var(--gold-400)" }}>
            <span style={{ fontSize: "11px", color: "var(--slate-500)", textTransform: "uppercase", display: "block" }}>
              ACADEMIC ACCREDITATION
            </span>
            <b style={{ color: "var(--emerald-950)", fontSize: "13px" }}>MINARA-UL-QURAN</b>
            <div style={{ fontSize: "11.5px", color: "var(--gold-600)", fontWeight: "bold", marginTop: "4px" }}>
              ID: MQA-TCH-{id?.slice(-5)?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "17px", color: "var(--emerald-950)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
            Professional Profile
          </h3>
          <p style={{ color: "var(--slate-700)", fontSize: "14.5px", lineHeight: "1.75" }}>
            {cv.bio}
          </p>
        </div>

        {/* Academic Pedigree & Ijazah */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "17px", color: "var(--emerald-950)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
            Quranic Credentials & Chain of Transmission (Sanad)
          </h3>
          <div style={{ background: "var(--ivory-50)", padding: "18px 22px", borderRadius: "16px", border: "1px solid var(--ivory-200)" }}>
            {cv.hafiz && (
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px", fontSize: "14px" }}>
                <CheckCircle size={16} color="var(--success)" />
                <b>Hafiz-ul-Quran (Full Memorization)</b>
              </div>
            )}
            {cv.ijazah && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px", fontSize: "14px" }}>
                <CheckCircle size={16} color="var(--success)" style={{ marginTop: "2px" }} />
                <div>
                  <b>Authentic Connected Ijazah:</b>
                  <p style={{ color: "var(--slate-700)", marginTop: "2px" }}>{cv.ijazahDetails}</p>
                </div>
              </div>
            )}
            {cv.tajweedCertification && (
              <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px" }}>
                <CheckCircle size={16} color="var(--success)" />
                <span><b>Tajweed Accreditation:</b> {cv.tajweedCertification}</span>
              </div>
            )}
          </div>
        </div>

        {/* Experience Timeline */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "17px", color: "var(--emerald-950)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "14px" }}>
            Teaching Experience
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cv.experienceTimeline?.map((exp, i) => (
              <div key={i} style={{ borderLeft: "2px solid var(--gold-500)", paddingLeft: "16px" }}>
                <b style={{ color: "var(--emerald-950)", fontSize: "15px" }}>{exp.role}</b>
                <div style={{ fontSize: "12.5px", color: "var(--slate-500)" }}>{exp.institution} · {exp.period}</div>
                <p style={{ fontSize: "13.5px", color: "var(--slate-700)", marginTop: "4px" }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Statistics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "18px", background: "var(--emerald-950)", color: "white", borderRadius: "16px", marginBottom: "32px", textAlign: "center" }}>
          <div>
            <span style={{ fontSize: "12px", color: "var(--slate-200)" }}>Students Taught</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--gold-400)" }}>{cv.studentsCount}+</div>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--slate-200)" }}>Completed Classes</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--gold-400)" }}>{cv.classesCount}+</div>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--slate-200)" }}>Verified Rating</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--gold-400)" }}>{cv.rating} ★</div>
          </div>
        </div>

        {/* Booking CTA */}
        <div style={{ textAlign: "center" }} className="no-print">
          <Link to={`/book/${id}`} className="btn btn-gold btn-lg">
            Book Live One-on-One Class with {cv.teacherName.split(" ")[0]} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
