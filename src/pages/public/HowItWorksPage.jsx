import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Laptop,
  Headphones,
  Wifi,
  Calendar,
  CheckCircle,
  Video,
  FileText,
  Award,
  ArrowRight,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Student Journey
        </span>
        <h2>How Online Quran Classes Work at Noor Academy</h2>
        <p>
          Learning the Holy Quran online with personalized one-to-one instruction has never been simpler, safer, or more effective.
        </p>
      </div>

      {/* 4 Steps In Depth */}
      <div style={{ maxWidth: "880px", margin: "0 auto 60px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div className="card" style={{ padding: "34px", display: "flex", flexDirection: "row", gap: "24px", alignItems: "flex-start" }}>
          <div className="card-icon-box" style={{ background: "var(--emerald-900)", color: "var(--gold-400)", width: "60px", height: "60px", fontSize: "24px", fontWeight: "bold", flexShrink: 0 }}>
            1
          </div>
          <div>
            <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Step 1: Request Your Free Trial</h3>
            <p style={{ color: "var(--slate-700)", fontSize: "15px", lineHeight: "1.7" }}>
              Submit your free trial booking in 2 minutes. You can choose whether you prefer a male or female teacher, your desired class days, and your convenient local timezone. No credit card is ever required.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: "34px", display: "flex", flexDirection: "row", gap: "24px", alignItems: "flex-start" }}>
          <div className="card-icon-box" style={{ background: "var(--emerald-900)", color: "var(--gold-400)", width: "60px", height: "60px", fontSize: "24px", fontWeight: "bold", flexShrink: 0 }}>
            2
          </div>
          <div>
            <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Step 2: Diagnostic Evaluation & Schedule Confirmation</h3>
            <p style={{ color: "var(--slate-700)", fontSize: "15px", lineHeight: "1.7" }}>
              Our academic coordination team contacts you via WhatsApp to introduce your teacher and coordinate your first live video link (Google Meet or Zoom). During this 30-minute session, the teacher evaluates reading fluency and recommends an individualized roadmap.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: "34px", display: "flex", flexDirection: "row", gap: "24px", alignItems: "flex-start" }}>
          <div className="card-icon-box" style={{ background: "var(--emerald-900)", color: "var(--gold-400)", width: "60px", height: "60px", fontSize: "24px", fontWeight: "bold", flexShrink: 0 }}>
            3
          </div>
          <div>
            <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Step 3: Interactive One-to-One Live Learning</h3>
            <p style={{ color: "var(--slate-700)", fontSize: "15px", lineHeight: "1.7" }}>
              Classes are held privately between the student and teacher. Using digital high-resolution Quran Mushafs, Tajweed color rules, and interactive pen tablets, the teacher listens to every letter, correcting pronunciation gently and repeating until mastered.
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: "34px", display: "flex", flexDirection: "row", gap: "24px", alignItems: "flex-start" }}>
          <div className="card-icon-box" style={{ background: "var(--emerald-900)", color: "var(--gold-400)", width: "60px", height: "60px", fontSize: "24px", fontWeight: "bold", flexShrink: 0 }}>
            4
          </div>
          <div>
            <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Step 4: Continuous Progress & Verified Certificates</h3>
            <p style={{ color: "var(--slate-700)", fontSize: "15px", lineHeight: "1.7" }}>
              Parents receive monthly scorecard reports grading Reading, Tajweed, Memorization, Revision, and Islamic Adab. Upon finishing any of our 13 courses, an official cryptographically verified digital diploma is awarded.
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Requirements */}
      <div style={{ background: "var(--white)", padding: "40px", borderRadius: "28px", border: "1px solid var(--ivory-200)", maxWidth: "880px", margin: "0 auto 50px" }}>
        <h3 style={{ fontSize: "22px", textAlign: "center", marginBottom: "24px", color: "var(--emerald-950)" }}>
          What You Need for Online Classes
        </h3>
        <div className="grid-3" style={{ textAlign: "center" }}>
          <div>
            <Laptop size={36} color="var(--emerald-800)" style={{ margin: "0 auto 12px" }} />
            <h4 style={{ fontSize: "16px", marginBottom: "6px" }}>Computer or Tablet</h4>
            <p style={{ fontSize: "13.5px", color: "var(--slate-500)" }}>Laptop, PC, iPad, or Android tablet with a clear screen.</p>
          </div>
          <div>
            <Headphones size={36} color="var(--emerald-800)" style={{ margin: "0 auto 12px" }} />
            <h4 style={{ fontSize: "16px", marginBottom: "6px" }}>Headset with Mic</h4>
            <p style={{ fontSize: "13.5px", color: "var(--slate-500)" }}>Ensures crisp audio so the teacher can hear every subtle sound.</p>
          </div>
          <div>
            <Wifi size={36} color="var(--emerald-800)" style={{ margin: "0 auto 12px" }} />
            <h4 style={{ fontSize: "16px", marginBottom: "6px" }}>Stable Internet</h4>
            <p style={{ fontSize: "13.5px", color: "var(--slate-500)" }}>Broadband or 4G connection for uninterrupted video/audio.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/trial" className="btn btn-gold btn-lg">
          Ready? Book Your Free Assessment Class <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
