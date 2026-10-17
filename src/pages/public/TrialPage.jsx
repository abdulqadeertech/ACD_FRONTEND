import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { api } from "../../api";
import { ACADEMY_CONTACT } from "../../config/contactConfig";

export default function TrialPage() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get("name") || "Noorani Qaida";

  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "United Kingdom",
    city: "",
    studentAge: 8,
    gender: "Male",
    courseName: preselectedCourse,
    currentLevel: "Complete Beginner",
    preferredTeacher: "No Preference",
    preferredDays: ["Monday", "Wednesday", "Friday"],
    preferredTime: "Evening",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleDayToggle = (day) => {
    if (formData.preferredDays.includes(day)) {
      setFormData({
        ...formData,
        preferredDays: formData.preferredDays.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        preferredDays: [...formData.preferredDays, day],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/trials", formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit trial request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="section" style={{ maxWidth: "720px", margin: "40px auto 100px", textAlign: "center" }}>
        <div className="card" style={{ padding: "50px 40px", borderRadius: "32px", border: "2px solid var(--gold-500)", boxShadow: "var(--shadow-xl)" }}>
          <div className="arabic-bismillah" style={{ marginBottom: "16px" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--emerald-50)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle size={38} />
          </div>
          <h1 style={{ fontSize: "30px", fontWeight: "800", color: "var(--emerald-950)", marginBottom: "12px" }}>
            Trial Request Received!
          </h1>
          <p style={{ fontSize: "16px", color: "var(--slate-700)", lineHeight: "1.7", marginBottom: "26px" }}>
            Alhamdulillah! We have received the admission details for <b>{formData.fullName}</b>.
            Our academic coordinator will contact you via WhatsApp and Email within a few hours to confirm your class timing and meeting link.
          </p>

          <div style={{ background: "var(--ivory-100)", padding: "20px", borderRadius: "16px", textAlign: "left", marginBottom: "30px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "var(--slate-500)" }}>Selected Program:</span>
              <b>{formData.courseName}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "var(--slate-500)" }}>Preferred Teacher:</span>
              <b>{formData.preferredTeacher}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "var(--slate-500)" }}>Timezone:</span>
              <b>{formData.timezone}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--slate-500)" }}>Confirmation Sent To:</span>
              <b>{formData.email}</b>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-primary">
              Return to Homepage
            </Link>
            <a
              href={ACADEMY_CONTACT.getWhatsAppUrl(`Assalamu Alaikum! I just booked a free trial class for ${formData.fullName} (Course: ${formData.courseName}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <MessageSquare size={16} /> Confirm on WhatsApp ({ACADEMY_CONTACT.whatsappPrimary})
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> 100% Free · No Credit Card Required
        </span>
        <h2>Book Your 30-Minute Free Assessment Class</h2>
        <p>
          Experience our interactive one-to-one teaching firsthand. Tell us about the student's background so we can match the perfect instructor.
        </p>
      </div>

      <div className="form-card">
        <div className="arabic-bismillah" style={{ fontSize: "24px", marginBottom: "18px" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {error && (
          <div style={{ padding: "14px", borderRadius: "12px", background: "#fee2e2", color: "#991b1b", marginBottom: "20px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Student & Guardian Info */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Student's Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ibrahim Ahmed"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Parent / Guardian Name</label>
              <input
                type="text"
                placeholder="e.g. Farooq Ahmed"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                required
                placeholder="parent@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="+44 7911 123456"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value, phone: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Country of Residence *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="form-control"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Germany">Germany</option>
                <option value="Norway">Norway</option>
                <option value="Other">Other Country</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">City / State</label>
              <input
                type="text"
                placeholder="e.g. London, Dallas, Toronto"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Student Age</label>
              <input
                type="number"
                min="4"
                max="90"
                value={formData.studentAge}
                onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="form-control"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>
          </div>

          {/* Section 2: Course & Preferences */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Desired Course *</label>
              <select
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                className="form-control"
              >
                <option value="Noorani Qaida">Noorani Qaida</option>
                <option value="Quran Reading (Nazra)">Quran Reading (Nazra)</option>
                <option value="Quran Reading with Tajweed">Quran Reading with Tajweed</option>
                <option value="Hifz-ul-Quran (Memorization)">Hifz-ul-Quran (Memorization)</option>
                <option value="Quran Translation (Tarjuma)">Quran Translation (Tarjuma)</option>
                <option value="Quran Tafseer">Quran Tafseer</option>
                <option value="Arabic Language">Arabic Language</option>
                <option value="Islamic Studies">Islamic Studies</option>
                <option value="Namaz & Masnoon Duas">Namaz & Masnoon Duas</option>
                <option value="Basic Islamic Education">Basic Islamic Education</option>
                <option value="Hadith Studies">Hadith Studies</option>
                <option value="Seerah of Prophet Muhammad ﷺ">Seerah of Prophet Muhammad ﷺ</option>
                <option value="Islamic Manners & Character Building">Islamic Manners & Character Building</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Current Quran Level</label>
              <select
                value={formData.currentLevel}
                onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                className="form-control"
              >
                <option value="Complete Beginner">Complete Beginner (Cannot read Arabic)</option>
                <option value="Knows Arabic Alphabets">Knows Arabic Alphabets</option>
                <option value="Can Read Slowly">Can Read Slowly</option>
                <option value="Fluent Reader">Fluent Reader (Needs Tajweed Polishing)</option>
                <option value="Memorizing">Memorizing (Wants Hifz Program)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Teacher Preference</label>
              <select
                value={formData.preferredTeacher}
                onChange={(e) => setFormData({ ...formData, preferredTeacher: e.target.value })}
                className="form-control"
              >
                <option value="No Preference">No Preference (First Available)</option>
                <option value="Male">Male Teacher (Qari)</option>
                <option value="Female">Female Teacher (Ustadha)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time of Day</label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="form-control"
              >
                <option value="Morning">Morning (08:00 - 12:00)</option>
                <option value="Afternoon">Afternoon (12:00 - 16:00)</option>
                <option value="Evening">Evening (16:00 - 20:00)</option>
                <option value="Night">Night (20:00 - 23:00)</option>
              </select>
            </div>
          </div>

          {/* Preferred Days */}
          <div className="form-group">
            <label className="form-label">Preferred Days</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {daysList.map((day) => {
                const selected = formData.preferredDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => handleDayToggle(day)}
                    className={`btn btn-sm ${selected ? "btn-primary" : "btn-secondary"}`}
                    style={{ fontSize: "12.5px" }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Special Notes or Goals (Optional)</label>
            <textarea
              rows="3"
              placeholder="e.g. My child is 7 years old and shy. Please pair with an extra gentle teacher."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold btn-lg"
            style={{ width: "100%", marginTop: "12px" }}
          >
            {loading ? "Scheduling Trial Class..." : "Submit Free Trial Request"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
