import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  CheckCircle,
  FileText,
  CreditCard,
  MessageSquare,
  Sparkles,
  Video,
} from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";
import HifzTracker from "../../components/HifzTracker";

export default function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [payments, setPayments] = useState([]);
  const [hifzData, setHifzData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/auth/me").catch(() => ({ data: {} })),
      api.get("/bookings/mine").catch(() => ({ data: [] })),
      api.get("/progress/mine").catch(() => ({ data: [] })),
      api.get("/payments/mine").catch(() => ({ data: [] })),
    ]).then(([userRes, clRes, repRes, payRes]) => {
      const kids = userRes.data?.children || [
        { _id: "c1", name: "Zayd Mahmood", role: "student" },
        { _id: "c2", name: "Aisha Mahmood", role: "student" },
      ];
      setChildren(kids);
      setSelectedChild(kids[0]);
      setClasses(clRes.data || []);
      setReports(repRes.data || []);
      setPayments(payRes.data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedChild?._id) {
      api
        .get(`/hifz/student/${selectedChild._id}`)
        .then((res) => setHifzData(res.data))
        .catch(() => {
          // Provide fallback demo data
          setHifzData({
            summary: {
              currentJuz: 30,
              currentSurah: "Surah Al-Mulk (Ayah 1-30)",
              memorizationPercentage: 35,
              latestRecord: {
                sabaq: "Surah Al-Mulk, Ayah 1-14 with Tajweed Ghunnah rules",
                sabqi: "Surah An-Naba & Surah An-Nazi'at revision",
                manzil: "Juz 30 (Al-A'la to An-Nas) full recitation",
              },
            },
            records: [
              {
                date: new Date().toISOString(),
                surah: "Surah Al-Mulk",
                sabaq: "Ayah 1 to 14",
                sabqi: "Surah An-Naba",
                manzil: "Juz 30",
                rating: "Mumtaz (A+)",
                notes: "MashaAllah, pristine pronunciation and smooth rhythm.",
              },
            ],
          });
        });
    }
  }, [selectedChild]);

  return (
    <div className="section" style={{ padding: "40px 5%" }}>
      {/* Welcome Header */}
      <div style={{ background: "linear-gradient(135deg, var(--emerald-950), var(--emerald-900))", color: "white", padding: "36px", borderRadius: "28px", marginBottom: "32px", border: "1px solid var(--gold-500)" }}>
        <div className="arabic-bismillah" style={{ fontSize: "24px", color: "var(--gold-400)", marginBottom: "8px" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "6px" }}>
          Assalamu Alaikum, {user?.name} (Parent Portal)
        </h1>
        <p style={{ color: "var(--slate-200)", fontSize: "15px" }}>
          Monitor your children's live lessons, attendance logs, teacher notes, and monthly evaluations.
        </p>
      </div>

      {/* Child Switcher Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap" }}>
        {children.map((child) => {
          const isSelected = selectedChild?._id === child._id;
          return (
            <button
              key={child._id}
              onClick={() => setSelectedChild(child)}
              className={`btn ${isSelected ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "10px 22px", borderRadius: "30px" }}
            >
              <Users size={16} /> Child: {child.name}
            </button>
          );
        })}
      </div>

      {/* KPI Stats */}
      <div className="dashboard-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-card-label">Selected Child</span>
          <div className="kpi-card-value" style={{ fontSize: "22px", marginTop: "10px" }}>
            {selectedChild?.name || "Student"}
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Enrolled & Active</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Monthly Attendance</span>
          <div className="kpi-card-value" style={{ color: "var(--success)" }}>
            96%
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>12/12 Sessions Attended</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Current Grade</span>
          <div className="kpi-card-value" style={{ color: "var(--gold-600)" }}>
            A+ (Mumtaz)
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>91% Overall Performance</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Tuition Status</span>
          <div className="kpi-card-value" style={{ fontSize: "20px", color: "var(--success)", marginTop: "10px" }}>
            Paid (Active)
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Auto-Renews Nov 1</span>
        </div>
      </div>

      {/* Hifz & Memorization Progress Hub for Selected Child */}
      <div style={{ marginBottom: "36px" }}>
        <HifzTracker
          summary={hifzData?.summary}
          records={hifzData?.records || []}
        />
      </div>

      {/* Upcoming Classes & Teacher Notes */}
      <div className="grid-2" style={{ marginBottom: "36px" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "19px", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={18} color="var(--emerald-800)" /> Scheduled Lessons
            </h3>
            <Link to="/messages" className="btn btn-secondary btn-sm" style={{ fontSize: "12px" }}>
              <MessageSquare size={14} /> Teacher Chat
            </Link>
          </div>
          {classes.length === 0 ? (
            <p style={{ color: "var(--slate-500)", fontSize: "14px" }}>No scheduled classes found.</p>
          ) : (
            classes.slice(0, 3).map((cl) => (
              <div key={cl._id} style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)", marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <b>{cl.course?.title || "Quran Class"}</b>
                  <span className="badge badge-success">Confirmed</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <p style={{ fontSize: "13px", color: "var(--slate-600)", margin: 0 }}>
                    Teacher: {cl.teacher?.name} · {new Date(cl.date).toLocaleDateString()} at {cl.startTime}
                  </p>
                  {cl.teacher?._id && (
                    <Link
                      to={`/messages?recipient=${cl.teacher._id}&name=${encodeURIComponent(cl.teacher.name || "Teacher")}`}
                      style={{ fontSize: "12px", color: "var(--emerald-850)", fontWeight: "600", textDecoration: "underline" }}
                    >
                      Message
                    </Link>
                  )}
                </div>
                {cl.homework && (
                  <p style={{ fontSize: "12px", color: "var(--gold-700)", marginTop: "4px" }}>
                    <b>Homework Target:</b> {cl.homework}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Monthly Evaluation & Teacher Feedback */}
        <div className="card">
          <h3 style={{ fontSize: "19px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={18} color="var(--emerald-800)" /> Monthly Report Cards
          </h3>
          {reports.length === 0 ? (
            <p style={{ color: "var(--slate-500)", fontSize: "14px" }}>No monthly reports released yet.</p>
          ) : (
            reports.slice(0, 2).map((r, i) => (
              <div key={i} style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)", marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <b>{r.month} {r.year} Report</b>
                  <span className="badge badge-gold">{r.grade || "A+"}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--slate-700)", margin: "6px 0" }}>
                  "{r.teacherComments}"
                </p>
                <div style={{ fontSize: "12px", color: "var(--slate-500)" }}>
                  Next Month Target: <b>{r.nextMonthGoal || "Surah Al-Mulk Revision"}</b>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tuition Payments & Invoices */}
      <div className="card">
        <h3 style={{ fontSize: "19px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <CreditCard size={18} color="var(--emerald-800)" /> Tuition Invoices & Payment Receipts
        </h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Student</th>
                <th>Program / Plan</th>
                <th>Amount</th>
                <th>Billing Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td>INV-2026-1049</td>
                  <td>Zayd Mahmood</td>
                  <td>Standard (3 Classes/Wk)</td>
                  <td>$48 USD</td>
                  <td>October 2026</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id}>
                    <td><b>{p.invoiceNumber}</b></td>
                    <td>{p.studentName || selectedChild?.name}</td>
                    <td>{p.courseTitle || "Quran Program"}</td>
                    <td>${p.amount} {p.currency}</td>
                    <td>{p.billingMonth}</td>
                    <td>
                      <span className={`badge ${p.status === "completed" ? "badge-success" : "badge-warning"}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
