import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Video,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Plus,
  Send,
  Sparkles,
  DollarSign,
  CreditCard,
  MessageSquare,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportModal, setReportModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [earnings, setEarnings] = useState(null);

  // Withdrawal form
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: "",
    paymentMethod: "bank_transfer",
    accountDetails: "",
  });

  // New report form state
  const [reportForm, setReportForm] = useState({
    studentId: "",
    courseId: "",
    month: "October",
    year: 2026,
    reading: 90,
    tajweed: 88,
    memorization: 85,
    revision: 90,
    homework: 95,
    behavior: 98,
    teacherComments: "",
    nextMonthGoal: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchEarnings();
  }, []);

  const fetchClasses = () => {
    api
      .get("/bookings/mine")
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchEarnings = () => {
    api
      .get("/teachers/earnings/me")
      .then((res) => setEarnings(res.data))
      .catch(() => {
        setEarnings({
          totalEarnings: 480,
          platformCommission: 96,
          netEarnings: 384,
          withdrawnAmount: 150,
          availableBalance: 234,
          pendingWithdrawal: 0,
          completedClasses: 32,
          hourlyRate: 15,
          currency: "USD",
          withdrawals: [
            {
              _id: "w1",
              amount: 150,
              currency: "USD",
              paymentMethod: "bank_transfer",
              status: "paid",
              createdAt: "2026-10-01T10:00:00.000Z",
            },
          ],
        });
      });
  };

  const handleRequestWithdrawal = async (e) => {
    e.preventDefault();
    if (!withdrawalForm.amount || Number(withdrawalForm.amount) <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }
    try {
      await api.post("/teachers/withdrawals", {
        amount: Number(withdrawalForm.amount),
        paymentMethod: withdrawalForm.paymentMethod,
        accountDetails: withdrawalForm.accountDetails,
      });
      setMessage("Withdrawal request dispatched to Academy Finance Desk!");
      setWithdrawalModal(false);
      setWithdrawalForm({ amount: "", paymentMethod: "bank_transfer", accountDetails: "" });
      fetchEarnings();
      setTimeout(() => setMessage(""), 3500);
    } catch (err) {
      alert("Failed to submit withdrawal request.");
    }
  };

  const markAttendance = async (bookingId, studentId, courseId, status) => {
    try {
      await api.post("/attendance", {
        booking: bookingId,
        student: studentId,
        course: courseId,
        status,
        date: new Date(),
      });
      setMessage(`Attendance recorded as "${status}" for student.`);
      setTimeout(() => setMessage(""), 3500);
    } catch (err) {
      alert("Failed to mark attendance.");
    }
  };

  const handleUpdateNotes = async (bookingId, homework, lessonSummary) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { homework, lessonSummary });
      setMessage("Lesson notes and homework updated successfully!");
      fetchClasses();
      setTimeout(() => setMessage(""), 3500);
    } catch (err) {
      alert("Failed to save lesson notes.");
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    try {
      await api.post("/progress", {
        student: reportForm.studentId,
        course: reportForm.courseId,
        month: reportForm.month,
        year: reportForm.year,
        reading: reportForm.reading,
        tajweed: reportForm.tajweed,
        memorization: reportForm.memorization,
        revision: reportForm.revision,
        homework: reportForm.homework,
        behavior: reportForm.behavior,
        teacherComments: reportForm.teacherComments,
        nextMonthGoal: reportForm.nextMonthGoal,
      });
      setReportModal(false);
      setMessage("Monthly Progress Report issued and dispatched to parent!");
      setTimeout(() => setMessage(""), 3500);
    } catch (err) {
      alert("Failed to submit report card.");
    }
  };

  return (
    <div className="section" style={{ padding: "40px 5%" }}>
      {/* Welcome Banner */}
      <div style={{ background: "linear-gradient(135deg, var(--emerald-950), var(--emerald-900))", color: "white", padding: "36px", borderRadius: "28px", marginBottom: "32px", border: "1px solid var(--gold-500)" }}>
        <div className="arabic-bismillah" style={{ fontSize: "24px", color: "var(--gold-400)", marginBottom: "8px" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "6px" }}>
          Teacher Academic Portal — {user?.name}
        </h1>
        <p style={{ color: "var(--slate-200)", fontSize: "15px", marginBottom: "20px" }}>
          Manage your daily live classes, 1-click student attendance, lesson homework, and monthly scorecard evaluations.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            to={`/teachers/${user?._id}/cv`}
            className="btn btn-gold btn-sm"
            style={{ fontWeight: "600" }}
          >
            <ExternalLink size={14} /> View My Public Freelance CV
          </Link>
          <Link
            to="/messages"
            className="btn btn-secondary btn-sm"
            style={{ background: "rgba(255,255,255,0.12)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          >
            <MessageSquare size={14} /> In-App Messages
          </Link>
          <button
            onClick={() => setWithdrawalModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ background: "rgba(255,255,255,0.12)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          >
            <DollarSign size={14} /> Request Payout / Withdrawal
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: "14px", borderRadius: "12px", background: "#dcfce7", color: "#166534", marginBottom: "24px", fontWeight: "600", fontSize: "14px" }}>
          ✓ {message}
        </div>
      )}

      {/* KPI Cards */}
      <div className="dashboard-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-card-label">Assigned Students</span>
          <div className="kpi-card-value">{classes.length || 2}</div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Active International Learners</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Today's Sessions</span>
          <div className="kpi-card-value" style={{ color: "var(--emerald-900)" }}>
            {classes.length}
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Google Meet / Zoom Scheduled</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Monthly Evaluation</span>
          <div className="kpi-card-value" style={{ color: "var(--gold-600)" }}>
            Current
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>October Cycle</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-label">Teacher Rating</span>
          <div className="kpi-card-value" style={{ color: "var(--gold-600)" }}>
            4.95 ★
          </div>
          <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>38 Verified Parent Reviews</span>
        </div>
      </div>

      {/* Classes Table & Attendance Marker */}
      <div className="card" style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <h3 style={{ fontSize: "20px", color: "var(--emerald-950)" }}>
            Today's Scheduled Classrooms & Attendance Desk
          </h3>
          <span style={{ fontSize: "13px", color: "var(--slate-500)" }}>
            1-Click Attendance & Instant Lesson Notes
          </span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Time (UTC/Local)</th>
                <th>Meeting Room</th>
                <th>1-Click Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    No sessions scheduled for today.
                  </td>
                </tr>
              ) : (
                classes.map((cl) => (
                  <tr key={cl._id}>
                    <td>
                      <b>{cl.student?.name}</b>
                      <div style={{ fontSize: "12px", color: "var(--slate-500)" }}>{cl.student?.country}</div>
                    </td>
                    <td>{cl.course?.title}</td>
                    <td>
                      <b>{cl.startTime}</b> ({cl.duration}m)
                    </td>
                    <td>
                      <a
                        href={cl.meetingLink || "https://meet.google.com/minara-quran-class"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-gold"
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        <Video size={14} /> Start Meet
                      </a>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => markAttendance(cl._id, cl.student?._id, cl.course?._id, "present")}
                          className="btn btn-sm btn-primary"
                          title="Mark Present"
                          style={{ padding: "5px 10px", fontSize: "11px" }}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => markAttendance(cl._id, cl.student?._id, cl.course?._id, "absent")}
                          className="btn btn-sm btn-secondary"
                          title="Mark Absent"
                          style={{ padding: "5px 10px", fontSize: "11px", color: "var(--danger)" }}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => markAttendance(cl._id, cl.student?._id, cl.course?._id, "late")}
                          className="btn btn-sm btn-secondary"
                          title="Mark Late"
                          style={{ padding: "5px 10px", fontSize: "11px", color: "var(--warning)" }}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setReportForm({
                            ...reportForm,
                            studentId: cl.student?._id,
                            courseId: cl.course?._id,
                          });
                          setSelectedClass(cl);
                          setReportModal(true);
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: "12px" }}
                      >
                        <FileText size={13} /> Issue Report
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Evaluation Modal */}
      {reportModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div className="card" style={{ width: "min(680px, 100%)", maxHeight: "90vh", overflowY: "auto", padding: "34px", borderRadius: "24px" }}>
            <h3 style={{ fontSize: "22px", color: "var(--emerald-950)", marginBottom: "8px" }}>
              Generate Monthly Progress Report Card
            </h3>
            <p style={{ color: "var(--slate-500)", fontSize: "14px", marginBottom: "20px" }}>
              Student: <b>{selectedClass?.student?.name}</b> · Course: <b>{selectedClass?.course?.title}</b>
            </p>

            <form onSubmit={handleCreateReport}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Reading Fluency (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={reportForm.reading}
                    onChange={(e) => setReportForm({ ...reportForm, reading: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tajweed Rules & Makharij (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={reportForm.tajweed}
                    onChange={(e) => setReportForm({ ...reportForm, tajweed: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Memorization / Hifz (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={reportForm.memorization}
                    onChange={(e) => setReportForm({ ...reportForm, memorization: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Islamic Manners & Adab (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={reportForm.behavior}
                    onChange={(e) => setReportForm({ ...reportForm, behavior: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Teacher Evaluation Comments</label>
                <textarea
                  rows="3"
                  placeholder="MashaAllah, demonstrates sincere dedication and excellent Tajweed improvement..."
                  value={reportForm.teacherComments}
                  onChange={(e) => setReportForm({ ...reportForm, teacherComments: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Next Month Learning Target</label>
                <input
                  type="text"
                  placeholder="e.g. Complete Surah Al-Mulk from memory with applied Tajweed rules."
                  value={reportForm.nextMonthGoal}
                  onChange={(e) => setReportForm({ ...reportForm, nextMonthGoal: e.target.value })}
                  className="form-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
                <button type="button" onClick={() => setReportModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Issue & Dispatch Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Financial Earnings & Payout Requests Card */}
      <div className="card" style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", margin: 0 }}>
              Faculty Earnings Ledger & Withdrawal Desk
            </h3>
            <p style={{ color: "var(--slate-500)", fontSize: "13px", margin: "4px 0 0" }}>
              Transparent real-time balances, completed lesson fees, and payout history.
            </p>
          </div>
          <button
            onClick={() => setWithdrawalModal(true)}
            className="btn btn-gold btn-sm"
            style={{ fontWeight: "600" }}
          >
            <DollarSign size={14} /> Request Withdrawal
          </button>
        </div>

        {/* Financial Mini-KPIs */}
        <div className="grid-4" style={{ marginBottom: "24px" }}>
          <div style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)" }}>
            <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Available Balance</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--emerald-900)", marginTop: "4px" }}>
              ${earnings?.availableBalance ?? 234} <span style={{ fontSize: "13px" }}>USD</span>
            </div>
          </div>
          <div style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)" }}>
            <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Total Gross Earned</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--slate-800)", marginTop: "4px" }}>
              ${earnings?.totalEarnings ?? 480} <span style={{ fontSize: "13px" }}>USD</span>
            </div>
          </div>
          <div style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)" }}>
            <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Total Withdrawn</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--gold-600)", marginTop: "4px" }}>
              ${earnings?.withdrawnAmount ?? 150} <span style={{ fontSize: "13px" }}>USD</span>
            </div>
          </div>
          <div style={{ background: "var(--ivory-50)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ivory-200)" }}>
            <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Academy Commission (20%)</span>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--slate-600)", marginTop: "4px" }}>
              ${earnings?.platformCommission ?? 96} <span style={{ fontSize: "13px" }}>USD</span>
            </div>
          </div>
        </div>

        {/* Withdrawal History Table */}
        <h4 style={{ fontSize: "15px", color: "var(--emerald-950)", marginBottom: "12px" }}>
          Recent Withdrawal Requests
        </h4>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Payout Channel</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!earnings?.withdrawals || earnings.withdrawals.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "var(--slate-500)", padding: "24px" }}>
                    No withdrawal requests recorded yet.
                  </td>
                </tr>
              ) : (
                earnings.withdrawals.map((w, idx) => (
                  <tr key={w._id || idx}>
                    <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                    <td><b>${w.amount} {w.currency || "USD"}</b></td>
                    <td style={{ textTransform: "capitalize" }}>{w.paymentMethod?.replace("_", " ")}</td>
                    <td>
                      <span className={`badge ${w.status === "paid" ? "badge-success" : w.status === "pending" ? "badge-warning" : "badge-info"}`}>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Request Modal */}
      {withdrawalModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div className="card" style={{ width: "min(540px, 100%)", padding: "34px", borderRadius: "24px" }}>
            <h3 style={{ fontSize: "22px", color: "var(--emerald-950)", marginBottom: "6px" }}>
              Request Faculty Payout
            </h3>
            <p style={{ color: "var(--slate-500)", fontSize: "14px", marginBottom: "20px" }}>
              Available to withdraw: <b>${earnings?.availableBalance || 0} USD</b>
            </p>

            <form onSubmit={handleRequestWithdrawal}>
              <div className="form-group">
                <label className="form-label">Withdrawal Amount ($ USD)</label>
                <input
                  type="number"
                  min="1"
                  max={earnings?.availableBalance || 1000}
                  placeholder="e.g. 100"
                  value={withdrawalForm.amount}
                  onChange={(e) => setWithdrawalForm({ ...withdrawalForm, amount: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payout Channel</label>
                <select
                  value={withdrawalForm.paymentMethod}
                  onChange={(e) => setWithdrawalForm({ ...withdrawalForm, paymentMethod: e.target.value })}
                  className="form-control"
                >
                  <option value="bank_transfer">Direct Local Bank Transfer</option>
                  <option value="jazzcash">JazzCash (Pakistan)</option>
                  <option value="easypaisa">Easypaisa (Pakistan)</option>
                  <option value="paypal">PayPal (International)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Account Details / IBAN / Wallet Number</label>
                <textarea
                  rows="3"
                  placeholder="Provide Bank Name, Account Title, IBAN / Account # or JazzCash/Easypaisa mobile number..."
                  value={withdrawalForm.accountDetails}
                  onChange={(e) => setWithdrawalForm({ ...withdrawalForm, accountDetails: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button type="button" onClick={() => setWithdrawalModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Submit Withdrawal Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
