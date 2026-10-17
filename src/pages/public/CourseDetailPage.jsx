import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { api } from "../../api";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/courses/${slug}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="section" style={{ textAlign: "center", padding: "100px" }}>Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "100px" }}>
        <h2>Course Not Found</h2>
        <p style={{ marginTop: "10px", color: "var(--slate-500)" }}>
          The requested course could not be located.
        </p>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--slate-500)", marginBottom: "24px" }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/courses">Courses</Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--emerald-900)", fontWeight: "700" }}>{course.title}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "48px", alignItems: "start" }}>
        {/* Left Column: Course Information & Curriculum */}
        <div>
          <span className="eyebrow">{course.category} · {course.level}</span>
          <h1 style={{ fontSize: "38px", fontWeight: "800", color: "var(--emerald-950)", margin: "12px 0 18px" }}>
            {course.title}
          </h1>
          <p style={{ fontSize: "17px", color: "var(--slate-700)", lineHeight: "1.75", marginBottom: "32px" }}>
            {course.description}
          </p>

          {/* Key Benefits */}
          <div style={{ background: "var(--white)", padding: "28px", borderRadius: "20px", border: "1px solid var(--ivory-200)", marginBottom: "36px" }}>
            <h3 style={{ fontSize: "19px", color: "var(--emerald-950)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={20} color="var(--gold-600)" /> Course Learning Outcomes & Benefits
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {(course.benefits || []).map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14.5px", color: "var(--slate-800)" }}>
                  <CheckCircle size={18} color="var(--success)" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum Breakdown */}
          {course.curriculum && course.curriculum.length > 0 && (
            <div>
              <h3 style={{ fontSize: "22px", color: "var(--emerald-950)", marginBottom: "18px" }}>
                Curriculum & Syllabus Breakdown
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {course.curriculum.map((week, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--white)",
                      padding: "20px 24px",
                      borderRadius: "16px",
                      border: "1px solid var(--ivory-200)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <b style={{ color: "var(--emerald-900)", fontSize: "16px" }}>
                        Module {week.week || idx + 1}: {week.title}
                      </b>
                    </div>
                    <p style={{ color: "var(--slate-700)", fontSize: "14px", lineHeight: "1.6" }}>
                      {week.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Enrollment Card */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div className="card" style={{ padding: "34px", borderRadius: "24px", border: "2px solid var(--gold-400)", boxShadow: "var(--shadow-md)" }}>
            <div className="arabic-bismillah" style={{ fontSize: "24px", marginBottom: "8px" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h3 style={{ fontSize: "22px", textAlign: "center", marginBottom: "16px" }}>
              Enroll in {course.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "20px 0", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)" }}>Duration</span>
                <b>{course.duration}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)" }}>Target Age</span>
                <b>{course.ageGroup}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)" }}>Class Format</span>
                <b>1-to-1 Private Online</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)" }}>Tutors</span>
                <b>Male or Female Certified</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)" }}>Schedule</span>
                <b>2, 3, or 5 Days/Week</b>
              </div>
            </div>

            <div style={{ background: "var(--gold-100)", padding: "14px", borderRadius: "12px", textAlign: "center", marginBottom: "22px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--gold-700)" }}>
                🎉 Includes 30-Minute Free Assessment Class
              </span>
            </div>

            <Link
              to={`/trial?course=${course.slug}&name=${encodeURIComponent(course.title)}`}
              className="btn btn-gold btn-lg"
              style={{ width: "100%", marginBottom: "12px" }}
            >
              Book Free Trial For This Course <ArrowRight size={18} />
            </Link>

            <Link to="/pricing" className="btn btn-secondary" style={{ width: "100%" }}>
              View Tuition & Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
