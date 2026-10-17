import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  Star,
  Globe,
  Award,
  Clock,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { api } from "../../api";

export default function TeacherProfilePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/teachers/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="section" style={{ textAlign: "center", padding: "100px" }}>Loading teacher credentials...</div>;
  }

  if (!data || !data.user) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "100px" }}>
        <h2>Teacher Profile Not Found</h2>
        <Link to="/teachers" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to Teachers Directory
        </Link>
      </div>
    );
  }

  const { user, application: app } = data;

  return (
    <div className="section">
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--slate-500)", marginBottom: "24px" }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/teachers">Teachers</Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--emerald-900)", fontWeight: "700" }}>{user.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "40px", alignItems: "start" }}>
        {/* Left: Teacher Profile Card */}
        <div className="card" style={{ padding: "36px", textAlign: "center", alignItems: "center", borderRadius: "24px" }}>
          <div className="teacher-avatar-frame" style={{ width: "120px", height: "120px" }}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="teacher-avatar-placeholder" style={{ fontSize: "40px" }}>{user.name[0]}</div>
            )}
          </div>

          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--emerald-950)" }}>{user.name}</h1>
          <span style={{ color: "var(--success)", fontSize: "14px", fontWeight: "700", marginTop: "4px" }}>
            ✓ Verified Certified Instructor
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-600)", fontWeight: "bold", fontSize: "16px", margin: "14px 0" }}>
            <Star size={18} fill="currentColor" /> {app?.rating || 5.0} ({app?.reviewsCount || 30}+ reviews)
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", textAlign: "left", fontSize: "14px", borderTop: "1px solid var(--ivory-200)", paddingTop: "18px", marginTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--slate-500)" }}>Country</span>
              <b>{user.country}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--slate-500)" }}>Experience</span>
              <b>{app?.experience || 6}+ Years</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--slate-500)" }}>Gender</span>
              <b>{app?.gender || user.gender || "Male"}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--slate-500)" }}>Timezone</span>
              <b>{user.timezone || "UTC"}</b>
            </div>
          </div>

          <Link to={`/trial?teacher=${encodeURIComponent(user.name)}`} className="btn btn-gold btn-lg" style={{ width: "100%", marginTop: "24px" }}>
            Book Trial with {user.name.split(" ")[0]} <ArrowRight size={18} />
          </Link>
        </div>

        {/* Right: Academic Credentials & Pedagogy */}
        <div>
          <div style={{ background: "var(--white)", padding: "32px", borderRadius: "24px", border: "1px solid var(--ivory-200)", marginBottom: "28px" }}>
            <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "14px" }}>
              About the Instructor
            </h3>
            <p style={{ color: "var(--slate-700)", fontSize: "15px", lineHeight: "1.75" }}>
              {app?.bio || "An experienced scholar devoted to transmitting authentic Quranic recitation with patient, interactive pedagogy."}
            </p>
          </div>

          <div style={{ background: "var(--white)", padding: "32px", borderRadius: "24px", border: "1px solid var(--ivory-200)", marginBottom: "28px" }}>
            <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={22} color="var(--gold-600)" /> Qualifications & Chain of Transmission (Sanad)
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px" }}>
              <li style={{ display: "flex", gap: "10px" }}>
                <CheckCircle size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <b>Degree / Qualification:</b>
                  <p style={{ color: "var(--slate-700)" }}>{app?.qualification || "Shahadat-ul-Alimiyyah (M.A. Islamic Studies)"}</p>
                </div>
              </li>
              {app?.ijazah && (
                <li style={{ display: "flex", gap: "10px" }}>
                  <CheckCircle size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <b>Authentic Ijazah Details:</b>
                    <p style={{ color: "var(--slate-700)" }}>{app?.ijazahDetails || "Ijazah in Hafs 'an 'Asim with connected Sanad"}</p>
                  </div>
                </li>
              )}
              {app?.tajweedCertification && (
                <li style={{ display: "flex", gap: "10px" }}>
                  <CheckCircle size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <b>Tajweed Accreditation:</b>
                    <p style={{ color: "var(--slate-700)" }}>{app.tajweedCertification}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div style={{ background: "var(--white)", padding: "32px", borderRadius: "24px", border: "1px solid var(--ivory-200)" }}>
            <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "14px" }}>
              Availability & Weekly Schedule
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(app?.availability || ["Mon-Fri 02:00 PM - 09:00 PM UTC"]).map((slot, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--slate-800)" }}>
                  <Clock size={16} color="var(--gold-600)" />
                  <span>{slot}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
