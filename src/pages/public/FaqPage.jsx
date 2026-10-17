import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown, ChevronUp, Search, MessageSquare, ArrowRight } from "lucide-react";

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqList = [
    {
      category: "Admissions",
      q: "How does the 30-Minute Free Trial Class work?",
      a: "When you submit a trial request, our academic coordinator coordinates with you on WhatsApp/Email to schedule a 30-minute one-on-one session with an instructor matching your preference (Male/Female). The teacher evaluates current proficiency and discusses a personalized roadmap. No card or payment is required.",
    },
    {
      category: "Admissions",
      q: "What is the minimum age for children to start?",
      a: "We welcome children as young as 4 years old for our specialized, play-and-phonics based Noorani Qaida program. Our early-childhood tutors specialize in gentle pedagogy to keep young minds engaged.",
    },
    {
      category: "Classes & Timings",
      q: "Are the lessons strictly one-to-one?",
      a: "Yes. All core lessons are strictly 1-on-1 private classes. This guarantees that your child receives 100% of the teacher's focus for accurate phonetic Makharij and Tajweed mastery.",
    },
    {
      category: "Classes & Timings",
      q: "Can we change our class timings after enrolling?",
      a: "Yes. We accommodate evolving school and work routines. You can adjust your regular class schedule anytime by contacting the administration or your assigned teacher with 24 hours advance notice.",
    },
    {
      category: "Teachers & Safety",
      q: "Are female Quran teachers available for sisters?",
      a: "Yes, absolutely. We have an exceptional team of certified female scholars and Huffaz for young girls, children, and adult sisters seeking dedicated sister-to-sister learning.",
    },
    {
      category: "Teachers & Safety",
      q: "What qualifications do your teachers possess?",
      a: "All teachers hold formal degrees in Islamic Studies (Shahadat-ul-Alimiyyah) or Quranic Recitation (Qira'at/Tajweed Sanad) from accredited institutions (such as Al-Azhar, Wifaq-ul-Madaris, and Islamic universities). Each instructor passes strict background checks and pedological testing.",
    },
    {
      category: "Payments & Guarantee",
      q: "Do you offer a satisfaction guarantee or refund?",
      a: "Yes! If you are not completely satisfied with your child's learning experience during the first 30 days, we will switch your instructor immediately or provide a 100% full refund.",
    },
    {
      category: "Payments & Guarantee",
      q: "What payment methods are supported?",
      a: "We accept major international Credit/Debit cards (via Stripe), PayPal, direct Bank Transfer, as well as Pakistani local gateways including JazzCash and Easypaisa.",
    },
  ];

  const categories = ["All", "Admissions", "Classes & Timings", "Teachers & Safety", "Payments & Guarantee"];

  const filtered = faqList.filter((item) => {
    const catMatch = activeCategory === "All" || item.category === activeCategory;
    const searchMatch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="section" style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Help & Answers
        </span>
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about our teaching philosophy, technology, and scheduling.</p>
      </div>

      {/* Filter and Search */}
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", marginBottom: "32px", background: "var(--white)", padding: "16px 20px", borderRadius: "18px", border: "1px solid var(--ivory-200)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((c) => (
            <button
              key={c}
              className={`btn btn-sm ${activeCategory === c ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory(c)}
              style={{ fontSize: "12.5px" }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "220px" }}>
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "36px" }}
          />
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }} />
        </div>
      </div>

      {/* Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "50px" }}>
        {filtered.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                background: "var(--white)",
                border: "1px solid var(--ivory-200)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "var(--emerald-950)",
                }}
              >
                <span>{item.q}</span>
                {isOpen ? <ChevronUp size={20} color="var(--gold-600)" /> : <ChevronDown size={20} color="var(--slate-500)" />}
              </button>
              {isOpen && (
                <div style={{ padding: "0 24px 22px", color: "var(--slate-700)", fontSize: "14.5px", lineHeight: "1.7" }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions */}
      <div style={{ background: "var(--ivory-100)", padding: "30px", borderRadius: "20px", textAlign: "center", border: "1px solid var(--ivory-200)" }}>
        <h4 style={{ fontSize: "18px", color: "var(--emerald-950)", marginBottom: "8px" }}>Still Have a Question?</h4>
        <p style={{ color: "var(--slate-600)", fontSize: "14px", marginBottom: "18px" }}>
          Our admissions coordinators are available around the clock to assist you.
        </p>
        <Link to="/contact" className="btn btn-primary btn-sm">
          Contact Admissions Support
        </Link>
      </div>
    </div>
  );
}
