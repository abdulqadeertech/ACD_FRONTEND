import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, Award, Globe, Users, ArrowRight, BookOpen, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="section" style={{ padding: "50px 5%" }}>
      <div className="section-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--gold-100)", color: "var(--gold-600)", padding: "6px 16px", borderRadius: "20px", fontWeight: "700", fontSize: "13px" }}>
          <Sparkles size={14} /> Sacred Tradition & Global Excellence
        </span>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", color: "var(--dark-slate)", margin: "14px 0 8px" }}>About Minara-ul-Quran</h1>
        <p style={{ color: "var(--muted-text)", fontSize: "17px", fontStyle: "italic" }}>
          "Illuminating Hearts with the Light and Wisdom of the Holy Quran"
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto 60px" }}>
        {/* Brand Showcase Card */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              background: "#ffffff",
              padding: "16px 28px",
              borderRadius: "16px",
              display: "inline-block",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              border: "1.5px solid var(--border-color)",
            }}
          >
            <img
              src="/assets/branding/minara-logo.jpg"
              alt="Minara-ul-Quran (Minaratul Quran Academy)"
              style={{ maxHeight: "88px", width: "auto", objectFit: "contain", margin: "0 auto" }}
            />
          </div>
        </div>

        {/* Banner Collage */}
        <div style={{ borderRadius: "22px", overflow: "hidden", marginBottom: "36px", border: "1px solid var(--border-color)", boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08)" }}>
          <img
            src="/assets/images/quran-banner-collage.jpg"
            alt="Minara-ul-Quran Sacred Quran Community"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div className="card" style={{ padding: "40px", borderRadius: "24px", border: "1px solid var(--border-color)", marginBottom: "36px", background: "var(--light-gray)" }}>
          <div className="arabic-bismillah" style={{ textAlign: "center", fontSize: "24px", color: "var(--gold-600)", marginBottom: "16px" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <h2 style={{ fontSize: "24px", color: "var(--dark-slate)", marginBottom: "16px", textAlign: "center" }}>
            A Sacred Trust &amp; International Quranic Institution
          </h2>
          <p style={{ color: "var(--body-text)", fontSize: "16px", lineHeight: "1.8", marginBottom: "18px" }}>
            Founded under the academic guidance of certified Islamic scholars, <b>Minara-ul-Quran (Minaratul Quran Academy)</b> was established to bridge traditional Quranic scholarship with contemporary Muslim households worldwide. In Arabic, a <i>Minarah</i> represents a minaret—a soaring beacon of divine guidance calling believers toward worship and illumination.
          </p>
          <p style={{ color: "var(--body-text)", fontSize: "16px", lineHeight: "1.8" }}>
            Our academy operates across the United Kingdom, United States, Canada, Australia, the United Arab Emirates, Europe, and Asia, serving thousands of families who seek trustworthy, child-friendly, and spiritually uplifting Quran instruction in full conformity with the Sunnah and classical Tajweed rules.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid-2" style={{ marginBottom: "40px", gap: "20px" }}>
          <div className="card" style={{ padding: "26px", borderRadius: "18px", border: "1px solid var(--border-color)" }}>
            <div className="card-icon-box" style={{ width: "48px", height: "48px", background: "var(--primary-light)", color: "var(--primary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: "18px", color: "var(--dark-slate)", marginBottom: "8px" }}>Authentic Scholarship</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-text)", lineHeight: "1.65" }}>
              We preserve the chain of transmission (Sanad) of Quranic recitation through qualified Qaris and Huffaz holding verified Ijazahs from prestigious institutions such as Al-Azhar.
            </p>
          </div>

          <div className="card" style={{ padding: "26px", borderRadius: "18px", border: "1px solid var(--border-color)" }}>
            <div className="card-icon-box" style={{ width: "48px", height: "48px", background: "var(--gold-100)", color: "var(--gold-600)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <Heart size={26} />
            </div>
            <h3 style={{ fontSize: "18px", color: "var(--dark-slate)", marginBottom: "8px" }}>Gentle Child Pedagogy</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-text)", lineHeight: "1.65" }}>
              We strictly prohibit harsh discipline. We cultivate a lasting love for Allah's Word through encouraging praise, patience, and positive reinforcement.
            </p>
          </div>

          <div className="card" style={{ padding: "26px", borderRadius: "18px", border: "1px solid var(--border-color)" }}>
            <div className="card-icon-box" style={{ width: "48px", height: "48px", background: "var(--gold-100)", color: "var(--gold-600)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontSize: "18px", color: "var(--dark-slate)", marginBottom: "8px" }}>Transparent Evaluation</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-text)", lineHeight: "1.65" }}>
              Every student receives structured monthly report cards evaluating reading, Tajweed rules, memorization, and Islamic manners (Adab).
            </p>
          </div>

          <div className="card" style={{ padding: "26px", borderRadius: "18px", border: "1px solid var(--border-color)" }}>
            <div className="card-icon-box" style={{ width: "48px", height: "48px", background: "var(--primary-light)", color: "var(--primary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <Globe size={26} />
            </div>
            <h3 style={{ fontSize: "18px", color: "var(--dark-slate)", marginBottom: "8px" }}>Child Safeguarding Standards</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-text)", lineHeight: "1.65" }}>
              All online sessions are private, strictly monitored for safety, and adhere to international child online safeguarding best practices.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/trial" className="btn btn-gold btn-lg">
            Join the Minara-ul-Quran Family — Book Free Trial <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
