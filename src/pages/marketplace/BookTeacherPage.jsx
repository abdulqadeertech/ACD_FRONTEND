import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Video,
  ShieldCheck,
  CreditCard,
  CheckCircle,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function BookTeacherPage() {
  const { teacherId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [bookingType, setBookingType] = useState("trial"); // "trial" or "regular"
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState("17:00");
  const [packagePlan, setPackagePlan] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const studentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  useEffect(() => {
    Promise.all([
      api.get(`/teachers/${teacherId}`).catch(() => ({ data: null })),
      api.get("/courses").catch(() => ({ data: [] })),
    ]).then(([tRes, cRes]) => {
      setTeacher(tRes.data);
      setCourses(cRes.data || []);
      if (cRes.data?.[0]) setSelectedCourse(cRes.data[0]._id);
      setLoading(false);
    });
  }, [teacherId]);

  const timeSlots = [
    "09:00",
    "10:30",
    "12:00",
    "14:00",
    "15:30",
    "17:00",
    "18:30",
    "20:00",
    "21:30",
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate(`/login?redirect=/book/${teacherId}`);
      return;
    }

    setSubmitting(true);
    try {
      const scheduledDateTime = new Date(`${selectedDate}T${selectedSlot}:00Z`);

      // 1. Create Booking
      const bookingRes = await api.post("/bookings", {
        teacher: teacher?.user?._id || teacherId,
        student: user._id,
        course: selectedCourse,
        date: scheduledDateTime,
        startTime: selectedSlot,
        duration: 30,
        timezone: studentTimezone,
        type: bookingType,
        notes,
      });

      // 2. If regular package, create invoice
      if (bookingType === "regular") {
        await api.post("/payments", {
          studentId: user._id,
          studentName: user.name,
          courseTitle: courses.find((c) => c._id === selectedCourse)?.title,
          plan: `${packagePlan.toUpperCase()} (Live Classes)`,
          amount: packagePlan === "basic" ? 35 : packagePlan === "premium" ? 75 : 48,
          currency: "USD",
          paymentMethod,
        });
      }

      setSuccess(true);
    } catch (err) {
      alert("Booking failed. Please check schedule slot availability.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="section" style={{ textAlign: "center", padding: "100px" }}>Loading booking options...</div>;
  }

  if (success) {
    return (
      <div className="section" style={{ maxWidth: "680px", margin: "40px auto 100px", textAlign: "center" }}>
        <div className="card" style={{ padding: "46px 36px", borderRadius: "28px", border: "2px solid var(--gold-500)" }}>
          <div className="arabic-bismillah" style={{ marginBottom: "14px" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <CheckCircle size={52} color="var(--success)" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "28px", color: "var(--emerald-950)", marginBottom: "10px" }}>
            {bookingType === "trial" ? "Free Trial Confirmed!" : "Classroom Booking Confirmed!"}
          </h2>
          <p style={{ color: "var(--slate-700)", fontSize: "15.5px", lineHeight: "1.7", marginBottom: "26px" }}>
            Alhamdulillah! Your session with <b>{teacher?.user?.name}</b> is reserved for{" "}
            <b>{selectedDate} at {selectedSlot}</b> (Your Timezone: {studentTimezone}).
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px" }}>
            <Link to="/dashboard" className="btn btn-primary">
              Go to Student Dashboard
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ maxWidth: "880px", margin: "0 auto" }}>
      <div className="section-header">
        <span className="eyebrow"><Sparkles size={14} /> Schedule a Live Classroom</span>
        <h2>Book Your Online Class with {teacher?.user?.name}</h2>
        <p>
          Select your course, session type, date, and local timezone slot. Dual timezone conversion prevents schedule conflicts.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: "36px", alignItems: "start" }}>
        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="form-card" style={{ margin: 0, padding: "34px" }}>
          {/* Booking Type Selector */}
          <div className="form-group">
            <label className="form-label">Session Type</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                className={`btn btn-sm ${bookingType === "trial" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setBookingType("trial")}
              >
                Free 30-Min Trial Class
              </button>
              <button
                type="button"
                className={`btn btn-sm ${bookingType === "regular" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setBookingType("regular")}
              >
                Regular Enrollment
              </button>
            </div>
          </div>

          {/* Course Selector */}
          <div className="form-group">
            <label className="form-label">Select Course Program</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-control"
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title} ({c.level})
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="form-group">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Time Slot Selector */}
          <div className="form-group">
            <label className="form-label">Available Time Slots</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`btn btn-sm ${selectedSlot === slot ? "btn-gold" : "btn-secondary"}`}
                  style={{ fontSize: "12px", padding: "8px" }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* If regular, choose package plan & payment method */}
          {bookingType === "regular" && (
            <>
              <div className="form-group">
                <label className="form-label">Tuition Plan</label>
                <select
                  value={packagePlan}
                  onChange={(e) => setPackagePlan(e.target.value)}
                  className="form-control"
                >
                  <option value="basic">Basic Plan (2 Classes/Wk) — $35/mo</option>
                  <option value="standard">Standard Plan (3 Classes/Wk) — $48/mo</option>
                  <option value="premium">Premium Plan (5 Classes/Wk) — $75/mo</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-control"
                >
                  <option value="stripe">Credit / Debit Card (Stripe)</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Manual Bank Wire</option>
                  <option value="jazzcash">JazzCash (Pakistan)</option>
                  <option value="easypaisa">Easypaisa (Pakistan)</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Special Notes / Goals</label>
            <textarea
              rows="2"
              placeholder="e.g. Focus on Noon Sakinah rules..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-gold btn-lg"
            style={{ width: "100%", marginTop: "12px" }}
          >
            {submitting ? "Confirming Slot..." : "Confirm & Book Classroom"} <ArrowRight size={18} />
          </button>
        </form>

        {/* Dual Timezone Visualizer & Instructor Summary Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Dual Timezone Box */}
          <div className="card" style={{ padding: "24px", borderRadius: "20px", background: "var(--white)" }}>
            <h4 style={{ fontSize: "16px", color: "var(--emerald-950)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={18} color="var(--gold-600)" /> Dual Timezone Synchronizer
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px" }}>
              <div style={{ background: "var(--ivory-50)", padding: "12px", borderRadius: "10px", border: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)", display: "block" }}>Your Local Time:</span>
                <b>{selectedDate} at {selectedSlot} ({studentTimezone})</b>
              </div>
              <div style={{ background: "var(--ivory-50)", padding: "12px", borderRadius: "10px", border: "1px solid var(--ivory-200)" }}>
                <span style={{ color: "var(--slate-500)", display: "block" }}>Teacher's Local Time:</span>
                <b>{teacher?.user?.country} ({teacher?.user?.timezone || "Asia/Karachi"})</b>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "var(--slate-500)", marginTop: "10px" }}>
              ✓ Times are automatically normalized to UTC on the server to prevent conflicts.
            </p>
          </div>

          {/* Teacher Summary Box */}
          <div className="card" style={{ padding: "24px", borderRadius: "20px", background: "var(--white)" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
              <div className="teacher-avatar-frame" style={{ width: "54px", height: "54px", margin: 0 }}>
                {teacher?.user?.avatar ? (
                  <img src={teacher.user.avatar} alt={teacher.user.name} />
                ) : (
                  <div className="teacher-avatar-placeholder">{teacher?.user?.name?.[0]}</div>
                )}
              </div>
              <div>
                <b style={{ color: "var(--emerald-950)", fontSize: "16px" }}>{teacher?.user?.name}</b>
                <span style={{ fontSize: "12.5px", color: "var(--slate-500)", display: "block" }}>
                  {teacher?.application?.qualification}
                </span>
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "var(--slate-700)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div><b>Classroom:</b> HD Video (Google Meet / Zoom)</div>
              <div><b>Duration:</b> 30 Minutes</div>
              <div><b>Rate:</b> ${teacher?.application?.hourlyRate || 12} / hr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
