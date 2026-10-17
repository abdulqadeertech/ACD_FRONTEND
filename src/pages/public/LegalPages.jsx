import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, FileText, RefreshCw, Sparkles } from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <div className="section" style={{ maxWidth: "840px", margin: "0 auto" }}>
      <div className="section-header">
        <span className="eyebrow"><ShieldCheck size={14} /> Trust & Safeguarding</span>
        <h2>Privacy & Child Protection Policy</h2>
        <p>Last updated: October 2026</p>
      </div>

      <div className="card" style={{ padding: "40px", fontSize: "15px", lineHeight: "1.8", color: "var(--slate-800)" }}>
        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>1. Commitment to Child Safeguarding</h3>
        <p style={{ marginBottom: "20px" }}>
          At Minara-ul-Quran, the safety, privacy, and spiritual welfare of our young students are paramount. All live one-to-one classrooms are conducted in a safe, transparent online environment. Instructors are strictly instructed to adhere to child protection protocols. Parents are welcome to attend, observe, or listen to any live class at any time.
        </p>

        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>2. Information Collection</h3>
        <p style={{ marginBottom: "20px" }}>
          We only collect personal information necessary to deliver educational services, coordinate schedules, and process tuition. This includes student names, guardian email addresses, contact telephone/WhatsApp numbers, and country of residence. We never sell, rent, or share personal data with external third-party advertisers.
        </p>

        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>3. Secure Payments</h3>
        <p>
          Tuition payments processed via Stripe and PayPal are encrypted with industry-standard TLS cryptographic protocols. Minara-ul-Quran does not store credit card numbers on its servers.
        </p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="section" style={{ maxWidth: "840px", margin: "0 auto" }}>
      <div className="section-header">
        <span className="eyebrow"><FileText size={14} /> Academic Terms</span>
        <h2>Terms & Conditions of Service</h2>
        <p>Last updated: October 2026</p>
      </div>

      <div className="card" style={{ padding: "40px", fontSize: "15px", lineHeight: "1.8", color: "var(--slate-800)" }}>
        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>1. Respectful Islamic Learning Atmosphere</h3>
        <p style={{ marginBottom: "20px" }}>
          Students and teachers are expected to maintain an environment of Islamic adab (respect, modesty, and kindness). Punctuality is required for all scheduled sessions.
        </p>

        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>2. Class Rescheduling & Make-Up Sessions</h3>
        <p style={{ marginBottom: "20px" }}>
          If a student cannot attend a scheduled class, guardians must notify the teacher or academy coordinator at least 4 hours in advance. Up to two make-up classes per month are granted for advance notices.
        </p>

        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>3. Teacher Substitution</h3>
        <p>
          In rare circumstances of illness or leave, the academy reserves the right to provide an equally qualified substitute instructor to ensure continuous learning momentum.
        </p>
      </div>
    </div>
  );
}

export function RefundPolicyPage() {
  return (
    <div className="section" style={{ maxWidth: "840px", margin: "0 auto" }}>
      <div className="section-header">
        <span className="eyebrow"><RefreshCw size={14} /> Satisfaction Guarantee</span>
        <h2>Refund & Cancellation Policy</h2>
        <p>Last updated: October 2026</p>
      </div>

      <div className="card" style={{ padding: "40px", fontSize: "15px", lineHeight: "1.8", color: "var(--slate-800)" }}>
        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>1. 30-Day Money-Back Guarantee</h3>
        <p style={{ marginBottom: "20px" }}>
          We believe in complete transparency and satisfaction. If you are not satisfied with your child's learning progress during the first month, you may request a teacher change or a 100% full refund of that month's tuition.
        </p>

        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>2. Cancellation of Subscription</h3>
        <p style={{ marginBottom: "20px" }}>
          There are no long-term binding contracts. You can pause or cancel your monthly tuition subscription at any time prior to the next billing cycle by simply sending a message to our support desk.
        </p>

        <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginBottom: "12px" }}>3. Processing Refunds</h3>
        <p>
          Approved refunds are processed back to the original method of payment (Stripe/Bank Transfer) within 3 to 5 business days.
        </p>
      </div>
    </div>
  );
}
