import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle, Sparkles, Send } from "lucide-react";
import { api } from "../../api";
import { ACADEMY_CONTACT } from "../../config/contactConfig";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "United Kingdom",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/cms/contact", formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Admissions & Support
        </span>
        <h2>Contact Minara-ul-Quran</h2>
        <p>
          Have questions regarding courses, scheduling, teacher qualifications, or custom family plans?
          Our team is here to assist you 24 hours a day.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", maxWidth: "1080px", margin: "0 auto", alignItems: "start" }}>
        {/* Contact Info Card */}
        <div className="card" style={{ padding: "38px", borderRadius: "24px" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "18px", color: "var(--emerald-950)" }}>
            Get in Touch Directly
          </h3>
          <p style={{ color: "var(--slate-700)", fontSize: "14.5px", lineHeight: "1.7", marginBottom: "28px" }}>
            Connect with our admissions office directly via WhatsApp, phone, or email.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "14.5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="card-icon-box" style={{ margin: 0, width: "42px", height: "42px" }}>
                <Phone size={18} />
              </div>
              <div>
                <b style={{ color: "var(--emerald-950)" }}>Primary WhatsApp / Phone</b>
                <p style={{ color: "var(--slate-600)" }}>{ACADEMY_CONTACT.whatsappPrimary}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="card-icon-box" style={{ margin: 0, width: "42px", height: "42px" }}>
                <Phone size={18} />
              </div>
              <div>
                <b style={{ color: "var(--emerald-950)" }}>Secondary WhatsApp / Phone</b>
                <p style={{ color: "var(--slate-600)" }}>{ACADEMY_CONTACT.whatsappSecondary}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="card-icon-box" style={{ margin: 0, width: "42px", height: "42px" }}>
                <Mail size={18} />
              </div>
              <div>
                <b style={{ color: "var(--emerald-950)" }}>Official Email</b>
                <p style={{ color: "var(--slate-600)" }}>{ACADEMY_CONTACT.email}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="card-icon-box" style={{ margin: 0, width: "42px", height: "42px" }}>
                <MapPin size={18} />
              </div>
              <div>
                <b style={{ color: "var(--emerald-950)" }}>Operating Centers</b>
                <p style={{ color: "var(--slate-600)" }}>{ACADEMY_CONTACT.operatingCenters}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "32px", borderTop: "1px solid var(--ivory-200)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum! I would like to inquire about Quran classes & admissions.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <MessageSquare size={16} /> Chat on WhatsApp ({ACADEMY_CONTACT.whatsappPrimary})
            </a>
            <a
              href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum! I would like to inquire about Quran classes & admissions.", true)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <MessageSquare size={16} /> Alternative WhatsApp ({ACADEMY_CONTACT.whatsappSecondary})
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="form-card" style={{ margin: 0, width: "100%", padding: "36px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <CheckCircle size={44} color="var(--success)" style={{ margin: "0 auto 14px" }} />
              <h3>Message Sent Successfully!</h3>
              <p style={{ color: "var(--slate-700)", marginTop: "10px", lineHeight: "1.6" }}>
                Thank you for reaching out, <b>{formData.name}</b>. Your message has been safely received. You can also chat with us directly on WhatsApp right now for an instant reply.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
                <a
                  href={ACADEMY_CONTACT.getWhatsAppUrl(`Assalamu Alaikum! I just submitted an inquiry on the website (${formData.subject}): ${formData.message}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-sm"
                >
                  <MessageSquare size={16} /> Open in WhatsApp Now
                </a>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "18px" }}>Send Us a Message</h3>

              {error && (
                <div style={{ padding: "10px", borderRadius: "10px", background: "#fee2e2", color: "#991b1b", marginBottom: "14px", fontSize: "13.5px" }}>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-control"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Course Syllabus">Course Syllabus Question</option>
                    <option value="Teacher Inquiry">Teacher Preference</option>
                    <option value="Tuition & Payments">Tuition & Payments</option>
                    <option value="Institutional / Group Class">Institutional / Community Class</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="How can we assist your Quran learning journey?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-control"
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                {loading ? "Sending..." : "Submit Inquiry"} <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
