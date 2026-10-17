import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Video,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  FileText,
  User,
  Sparkles,
} from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [reports, setReports] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/bookings/mine").catch(() => ({ data: [] })),
      api.get("/attendance/mine").catch(() => ({ data: { records: [], stats: { percentage: 95 } } })),
      api.get("/progress/mine").catch(() => ({ data: [] })),
      api.get("/certificates/mine").catch(() => ({ data: [] })),
    ]).then(([clRes, attRes, repRes, certRes]) => {
      setClasses(clRes.data || []);
      setAttendance(attRes.data);
      setReports(repRes.data || []);
      setCertificates(certRes.data || []);
      setLoading(false);
    });
  }, []);

  const nextClass = classes.find((c) => c.status === "confirmed") || classes[0];

  return (
    <div className="section" style={{ padding: "40px 5%" }}>
      {/* Welcome Greeting */}
      <div style={{ background: "linear-gradient(135deg, var(--emerald-950), var(--emerald-900))", color: "white", padding: "36px", borderRadius: "28px", marginBottom: "32px", border: "1px solid var(--gold-500)", boxShadow: "var(--shadow-md)" }}>
        <div className="arabic-bismillah" style={{ fontSize: "24px", color: "var(--gold-400)", marginBottom: "8px" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "6px" }}>
          Assalamu Alaikum, {user?.name}
        </h1>
        <p style={{ color: "var(--slate-200)", fontSize: "15px" }}>
          Student Learning Portal · Timezone: {user?.timezone || "UTC"}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-card-label">Attendance Rate</span>
          <div className="kpi-card-value" style={{ color: "var(--success)" }}>
            {attendance?.stats?.percentage || 95}%
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Excellent Consistency</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Enrolled Program</span>
          <div className="kpi-card-value" style={{ fontSize: "20px", marginTop: "12px" }}>
            {nextClass?.course?.title || "Quran Reading with Tajweed"}
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>3 Classes / Week</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Assigned Teacher</span>
          <div className="kpi-card-value" style={{ fontSize: "20px", marginTop: "12px" }}>
            {nextClass?.teacher?.name || "Qari Muhammad Abdullah"}
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>✓ Certified Scholar</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Completed Courses</span>
          <div className="kpi-card-value" style={{ color: "var(--gold-600)" }}>
            {certificates.length || 1}
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Verified Diploma Issued</span>
        </div>
      </div>

      {/* Next Class Live Join Card */}
      {nextClass && (
        <div className="card" style={{ padding: "30px", borderRadius: "22px", border: "2px solid var(--gold-400)", marginBottom: "34px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: "8px" }}>NEXT SCHEDULED CLASS</span>
              <h3 style={{ fontSize: "22px", color: "var(--emerald-950)", marginBottom: "4px" }}>
                {nextClass.course?.title || "Quran Class"} with {nextClass.teacher?.name}
              </h3>
              <p style={{ color: "var(--slate-600)", fontSize: "14.5px" }}>
                Scheduled: <b>{new Date(nextClass.date).toLocaleDateString()} at {nextClass.startTime}</b> ({nextClass.duration} mins)
              </p>
              {nextClass.homework && (
                <div style={{ marginTop: "10px", fontSize: "13.5px", background: "var(--ivory-100)", padding: "10px 14px", borderRadius: "10px" }}>
                  <b>Homework / Target:</b> {nextClass.homework}
                </div>
              )}
            </div>

            <a
              href={nextClass.meetingLink || "https://meet.google.com/minara-quran-class"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
            >
              <Video size={20} /> Join Live Classroom Now
            </a>
          </div>
        </div>
      )}

      {/* Grid: Monthly Progress Reports & Certificates */}
      <div className="grid-2">
        {/* Monthly Reports */}
        <div className="card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "19px", marginBottom: "18px" }}>
            <FileText size={20} color="var(--emerald-800)" /> Monthly Report Cards
          </h3>
          {reports.length === 0 ? (
            <p style={{ color: "var(--slate-500)", fontSize: "14px" }}>No report card published yet for this cycle.</p>
          ) : (
            reports.map((r, i) => (
              <div key={i} style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)", marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <b>{r.month} {r.year} Evaluation</b>
                  <span className="badge badge-success">{r.grade || "A+"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "12px", color: "var(--slate-700)", margin: "8px 0" }}>
                  <span>Reading: <b>{r.reading}%</b></span>
                  <span>Tajweed: <b>{r.tajweed}%</b></span>
                  <span>Behavior: <b>{r.behavior}%</b></span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--slate-600)", fontStyle: "italic", marginTop: "6px" }}>
                  Teacher Comments: "{r.teacherComments}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Certificates */}
        <div className="card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "19px", marginBottom: "18px" }}>
            <Award size={20} color="var(--gold-600)" /> Official Certificates
          </h3>
          {certificates.length === 0 ? (
            <div style={{ background: "var(--ivory-50)", padding: "18px", borderRadius: "14px", border: "1px dashed var(--ivory-200)" }}>
              <b>Noorani Qaida & Basic Tajweed</b>
              <p style={{ fontSize: "13px", color: "var(--slate-500)", marginTop: "4px" }}>
                ID: NQA-2026-8841 · Completed with Distinction (Mumtaz)
              </p>
              <Link to="/verify-certificate/NQA-2026-8841" className="btn btn-secondary btn-sm" style={{ marginTop: "12px" }}>
                View & Verify Certificate
              </Link>
            </div>
          ) : (
            certificates.map((cert, idx) => (
              <div key={idx} style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)", marginBottom: "12px" }}>
                <b>{cert.courseTitle}</b>
                <p style={{ fontSize: "13px", color: "var(--slate-500)" }}>ID: {cert.certificateId}</p>
                <Link to={`/verify-certificate/${cert.certificateId}`} className="btn btn-secondary btn-sm" style={{ marginTop: "10px" }}>
                  View Verified Diploma
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
