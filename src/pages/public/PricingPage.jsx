import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const [currency, setCurrency] = useState("USD");

  const plans = {
    USD: { symbol: "$", basic: 35, standard: 48, premium: 75, sibling: 40 },
    GBP: { symbol: "£", basic: 28, standard: 38, premium: 60, sibling: 32 },
    EUR: { symbol: "€", basic: 32, standard: 44, premium: 70, sibling: 37 },
    CAD: { symbol: "CA$", basic: 48, standard: 65, premium: 102, sibling: 55 },
    AUD: { symbol: "A$", basic: 54, standard: 74, premium: 115, sibling: 62 },
    PKR: { symbol: "Rs ", basic: 8500, standard: 11500, premium: 18500, sibling: 9800 },
    AED: { symbol: "AED ", basic: 130, standard: 175, premium: 275, sibling: 148 },
  };

  const curr = plans[currency] || plans.USD;

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Affordable Monthly Tuition
        </span>
        <h2>Transparent Pricing with No Hidden Fees</h2>
        <p>
          Invest in your family's Islamic foundation. Choose from flexible 2, 3, or 5 classes per week packages.
          Enjoy a 100% risk-free 30-day money-back satisfaction guarantee.
        </p>

        {/* Currency Switcher */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
          {["USD", "GBP", "EUR", "CAD", "AUD", "AED", "PKR"].map((code) => (
            <button
              key={code}
              className={`btn btn-sm ${currency === code ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setCurrency(code)}
              style={{ padding: "6px 14px", fontSize: "12.5px" }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid-3" style={{ marginBottom: "50px" }}>
        {/* Basic */}
        <article className="card pricing-card">
          <h3>BASIC</h3>
          <p>For revision or busy adult schedules</p>
          <div className="price-display">
            {curr.symbol}{curr.basic} <small>/ month</small>
          </div>
          <span style={{ fontSize: "13px", color: "var(--emerald-800)", fontWeight: "bold" }}>
            2 Classes / Week (8 Sessions/Month)
          </span>

          <ul className="pricing-features-list">
            <li><CheckCircle size={16} color="var(--success)" /> One-to-One Private Instruction</li>
            <li><CheckCircle size={16} color="var(--success)" /> 30-Minute Live Sessions</li>
            <li><CheckCircle size={16} color="var(--success)" /> Flexible Weekend or Weekday Slots</li>
            <li><CheckCircle size={16} color="var(--success)" /> Monthly Student Progress Report</li>
            <li><CheckCircle size={16} color="var(--success)" /> Certified Male or Female Tutors</li>
          </ul>

          <Link to="/trial" className="btn btn-secondary" style={{ width: "100%" }}>
            Start Free Trial
          </Link>
        </article>

        {/* Standard */}
        <article className="card pricing-card featured">
          <div className="popular-badge">RECOMMENDED FOR FAMILIES</div>
          <h3>STANDARD</h3>
          <p>Ideal pace for kids learning Qaida & Nazra</p>
          <div className="price-display">
            {curr.symbol}{curr.standard} <small>/ month</small>
          </div>
          <span style={{ fontSize: "13px", color: "var(--emerald-800)", fontWeight: "bold" }}>
            3 Classes / Week (12 Sessions/Month)
          </span>

          <ul className="pricing-features-list">
            <li><CheckCircle size={16} color="var(--success)" /> One-to-One Private Instruction</li>
            <li><CheckCircle size={16} color="var(--success)" /> Tajweed & Makharij Pronunciation Drills</li>
            <li><CheckCircle size={16} color="var(--success)" /> Masnoon Duas & Namaz Training</li>
            <li><CheckCircle size={16} color="var(--success)" /> Printable Monthly PDF Report Card</li>
            <li><CheckCircle size={16} color="var(--success)" /> 15% Sibling Discount for Additional Children</li>
            <li><CheckCircle size={16} color="var(--success)" /> Priority Rescheduling & Support</li>
          </ul>

          <Link to="/trial" className="btn btn-gold" style={{ width: "100%" }}>
            Start Free Trial
          </Link>
        </article>

        {/* Premium */}
        <article className="card pricing-card">
          <h3>PREMIUM</h3>
          <p>Best for Hifz-ul-Quran & rapid Quran mastery</p>
          <div className="price-display">
            {curr.symbol}{curr.premium} <small>/ month</small>
          </div>
          <span style={{ fontSize: "13px", color: "var(--emerald-800)", fontWeight: "bold" }}>
            5 Classes / Week (20 Sessions/Month)
          </span>

          <ul className="pricing-features-list">
            <li><CheckCircle size={16} color="var(--success)" /> Intensive One-to-One Mentorship</li>
            <li><CheckCircle size={16} color="var(--success)" /> Classical Sabaq, Sabqi & Manzil System</li>
            <li><CheckCircle size={16} color="var(--success)" /> Senior Certified Scholar Assignment</li>
            <li><CheckCircle size={16} color="var(--success)" /> Verified Course Graduation Diploma</li>
            <li><CheckCircle size={16} color="var(--success)" /> Direct WhatsApp Communication with Teacher</li>
            <li><CheckCircle size={16} color="var(--success)" /> Recorded Review Sessions upon Request</li>
          </ul>

          <Link to="/trial" className="btn btn-secondary" style={{ width: "100%" }}>
            Start Free Trial
          </Link>
        </article>
      </div>

      {/* Sibling Discount & Guarantee Banner */}
      <div style={{ background: "var(--white)", padding: "36px", borderRadius: "24px", border: "1px solid var(--ivory-200)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <Heart size={32} color="var(--gold-600)" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: "18px", color: "var(--emerald-950)", marginBottom: "6px" }}>15% Family & Sibling Discount</h4>
            <p style={{ color: "var(--slate-700)", fontSize: "14px", lineHeight: "1.6" }}>
              Enrolling multiple siblings? Enjoy a 15% discount for every additional child, making premium Quranic education affordable for the entire household.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <ShieldCheck size={32} color="var(--success)" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: "18px", color: "var(--emerald-950)", marginBottom: "6px" }}>100% Satisfaction Guarantee</h4>
            <p style={{ color: "var(--slate-700)", fontSize: "14px", lineHeight: "1.6" }}>
              If you or your child are not completely delighted within your first month, we will change the teacher immediately or issue a full refund upon request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
