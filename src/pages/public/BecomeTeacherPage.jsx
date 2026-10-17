import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Globe,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  Video,
  FileCheck,
  Users,
  Sparkles,
  ArrowRight,
  BookOpen,
  Headphones,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function BecomeTeacherPage() {
  const { isRTL } = useLanguage();

  // Interactive Earnings Calculator state
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(12);

  const weeklyIncome = hoursPerWeek * hourlyRate;
  const monthlyIncome = Math.round(weeklyIncome * 4.33);

  const requirements = [
    {
      title: "Academic & Quranic Credentials",
      desc: "Certified Hafiz-e-Quran, Qari with authentic Tajweed Sanad/Ijazah, or Alimiyyah graduate from an accredited Islamic institution.",
    },
    {
      title: "Teaching Passion & Pedagogy",
      desc: "At least 2 years of teaching experience with children and adults. Patient, encouraging demeanor with Islamic Adab.",
    },
    {
      title: "Language Fluency",
      desc: "Fluent communication in English, Urdu, or Arabic to cater to international students across the UK, USA, UAE, and beyond.",
    },
    {
      title: "Technical Setup",
      desc: "High-speed broadband internet (10+ Mbps), HD webcam, noise-canceling headset, and a quiet, professional environment.",
    },
  ];

  const benefits = [
    {
      icon: <Globe size={28} color="var(--gold-500)" />,
      title: "Global Student Reach",
      desc: "Connect with eager students and families from the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Europe.",
    },
    {
      icon: <Clock size={28} color="var(--gold-500)" />,
      title: "Flexible Scheduling",
      desc: "Set your own weekly availability and accept class times that fit your personal schedule and timezone.",
    },
    {
      icon: <DollarSign size={28} color="var(--gold-500)" />,
      title: "Guaranteed Fair Payouts",
      desc: "Receive timely payments via Direct Bank Transfer, JazzCash, Easypaisa, or PayPal with transparent ledger reporting.",
    },
    {
      icon: <ShieldCheck size={28} color="var(--gold-500)" />,
      title: "Verified Teacher Status",
      desc: "Earn the distinguished Verified Teacher badge upon document review and Tajweed audition.",
    },
    {
      icon: <Video size={28} color="var(--gold-500)" />,
      title: "Integrated LMS Tools",
      desc: "Access 1-click video classrooms, attendance trackers, digital Mushaf curriculum, and monthly report generators.",
    },
    {
      icon: <Award size={28} color="var(--gold-500)" />,
      title: "Dignified Islamic Mission",
      desc: "Join a revered international faculty serving the Book of Allah with respect, modesty, and professional decorum.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Submit Application",
      desc: "Complete your online profile, list your certifications, Ijazah details, language proficiency, and upload your CV.",
    },
    {
      step: "02",
      title: "Tajweed & Recitation Audition",
      desc: "Attend a live 20-minute video session with our Senior Academic Board to demonstrate Makharij, Ahkam, and teaching style.",
    },
    {
      step: "03",
      title: "Document Verification",
      desc: "Our verification team validates your Ijazah Sanad, Shahadah degree, and national identity documents.",
    },
    {
      step: "04",
      title: "Launch & Teach",
      desc: "Receive your Verified Teacher badge, gain public visibility on our international marketplace, and welcome students.",
    },
  ];

  const faqs = [
    {
      q: "Can female teachers teach exclusively female students and young children?",
      a: "Yes, absolutely. We strictly honor privacy preferences. Female teachers can select to teach only sisters, girls, and children under 10 years of age.",
    },
    {
      q: "How and when do teachers receive their payouts?",
      a: "Withdrawals can be requested at any time from your Teacher Dashboard once your balance exceeds $25. Funds are remitted through Direct Local Bank Transfer, JazzCash, Easypaisa, or PayPal within 2 business days.",
    },
    {
      q: "What teaching material and curriculum are provided?",
      a: "Minara-ul-Quran equips you with digital Noorani Qaida, color-coded Tajweed Mushaf, Tafseer summaries, and structured milestone syllabi ready to share on-screen.",
    },
    {
      q: "Do I need to recruit my own students?",
      a: "No. Minara-ul-Quran's international admissions team actively matches enrolled students and free trial requests with verified teachers based on language, timezone, and course expertise.",
    },
  ];

  return (
    <div style={{ background: "var(--ivory-50)", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--emerald-950) 0%, var(--emerald-900) 60%, #061c14 100%)",
          color: "white",
          padding: "80px 5% 70px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div className="arabic-bismillah" style={{ fontSize: "28px", color: "var(--gold-400)", marginBottom: "16px" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(197, 155, 39, 0.15)",
              border: "1px solid var(--gold-500)",
              color: "var(--gold-300)",
              padding: "6px 18px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            <Sparkles size={15} /> GLOBAL FACULTY RECRUITMENT PROGRAM
          </div>

          <h1 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: "800", lineHeight: "1.2", marginBottom: "20px" }}>
            Teach the Holy Quran Globally. <br />
            <span style={{ color: "var(--gold-400)" }}>Inspire Hearts Across the Ummah.</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--slate-200)", maxWidth: "780px", margin: "0 auto 28px", lineHeight: "1.6" }}>
            Join Minara-ul-Quran's verified international faculty. Teach qualified one-to-one online classes to students across the UK, USA, Canada, UAE, Australia, and Europe with dignified pay and flexible scheduling.
          </p>

          {/* Authentic Hadith Banner */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(197, 155, 39, 0.35)",
              borderRadius: "16px",
              padding: "16px 24px",
              maxWidth: "680px",
              margin: "0 auto 36px",
            }}
          >
            <p style={{ fontSize: "16px", fontStyle: "italic", color: "var(--gold-200)", marginBottom: "4px" }}>
              "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
            </p>
            <p style={{ fontSize: "13px", color: "var(--slate-300)", margin: 0 }}>
              "The best among you are those who learn the Qur'an and teach it." — Sahih Al-Bukhari 5027
            </p>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/apply-teacher" className="btn btn-gold btn-lg">
              <FileCheck size={18} /> Apply as a Teacher
            </Link>
            <Link to="/find-teacher" className="btn btn-secondary btn-lg" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
              Explore Faculty Directory <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Income Calculator */}
      <section className="section" style={{ padding: "60px 5%" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="section-header" style={{ marginBottom: "36px" }}>
            <span className="badge badge-gold">EARNINGS ESTIMATOR</span>
            <h2 style={{ fontSize: "32px", marginTop: "10px" }}>Calculate Your Monthly Teaching Income</h2>
            <p style={{ color: "var(--slate-600)" }}>
              Teachers set their own hourly rates and choose how many hours they wish to teach each week.
            </p>
          </div>

          <div
            className="card"
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 12px 36px rgba(15, 56, 44, 0.08)",
              border: "1px solid var(--ivory-200)",
            }}
          >
            <div className="grid-2" style={{ alignItems: "center", gap: "40px" }}>
              <div>
                {/* Hours Slider */}
                <div style={{ marginBottom: "28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontWeight: "700", color: "var(--emerald-950)" }}>
                      Hours Taught Per Week
                    </label>
                    <span style={{ fontWeight: "800", color: "var(--emerald-800)", fontSize: "18px" }}>
                      {hoursPerWeek} Hours / Wk
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="1"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--emerald-700)" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--slate-500)", marginTop: "4px" }}>
                    <span>Part-time (5 hrs)</span>
                    <span>Standard (20 hrs)</span>
                    <span>Full-time (45 hrs)</span>
                  </div>
                </div>

                {/* Rate Slider */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontWeight: "700", color: "var(--emerald-950)" }}>
                      Hourly Teaching Rate (USD)
                    </label>
                    <span style={{ fontWeight: "800", color: "var(--gold-600)", fontSize: "18px" }}>
                      ${hourlyRate} / Hour
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="25"
                    step="1"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--gold-500)" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--slate-500)", marginTop: "4px" }}>
                    <span>$8/hr (Entry Qari)</span>
                    <span>$14/hr (Experienced)</span>
                    <span>$25/hr (Senior Ijazah Scholar)</span>
                  </div>
                </div>
              </div>

              {/* Calculated Results Box */}
              <div
                style={{
                  background: "linear-gradient(135deg, var(--emerald-900), var(--emerald-950))",
                  color: "white",
                  padding: "36px",
                  borderRadius: "20px",
                  textAlign: "center",
                  border: "1px solid var(--gold-500)",
                }}
              >
                <span style={{ fontSize: "12px", letterSpacing: "1.5px", color: "var(--gold-300)", textTransform: "uppercase" }}>
                  Estimated Monthly Income
                </span>
                <div style={{ fontSize: "44px", fontWeight: "900", color: "var(--gold-400)", margin: "10px 0" }}>
                  ${monthlyIncome.toLocaleString()} <span style={{ fontSize: "20px", color: "white" }}>USD</span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--slate-300)", marginBottom: "20px" }}>
                  Approx. ${weeklyIncome} / week based on {hoursPerWeek} weekly classroom hours.
                </p>

                <Link to="/apply-teacher" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  Start Teaching Now
                </Link>
                <div style={{ fontSize: "11px", color: "var(--slate-400)", marginTop: "12px" }}>
                  ✓ Bi-weekly & on-demand direct payouts to Bank, JazzCash, Easypaisa, or PayPal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Minara-ul-Quran Faculty */}
      <section className="section" style={{ padding: "60px 5%", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-header" style={{ marginBottom: "48px" }}>
            <span className="badge badge-gold">FACULTY ADVANTAGES</span>
            <h2 style={{ fontSize: "32px", marginTop: "10px" }}>Why Teach With Minara-ul-Quran?</h2>
            <p style={{ color: "var(--slate-600)", maxWidth: "600px", margin: "0 auto" }}>
              We provide a dignified, technologically superior environment designed specifically for Quran teachers and Islamic scholars.
            </p>
          </div>

          <div className="grid-3">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "32px",
                  borderRadius: "18px",
                  border: "1px solid var(--ivory-200)",
                  background: "var(--ivory-50)",
                }}
              >
                <div style={{ marginBottom: "16px" }}>{b.icon}</div>
                <h3 style={{ fontSize: "19px", color: "var(--emerald-950)", marginBottom: "10px" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--slate-600)", lineHeight: "1.6" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Verification Funnel */}
      <section className="section" style={{ padding: "70px 5%", background: "var(--ivory-100)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="section-header" style={{ marginBottom: "48px" }}>
            <span className="badge badge-gold">RIGOROUS STANDARDS</span>
            <h2 style={{ fontSize: "32px", marginTop: "10px" }}>The 4-Step Onboarding Process</h2>
            <p style={{ color: "var(--slate-600)", maxWidth: "650px", margin: "0 auto" }}>
              To ensure excellence for our students and parents, every teacher undergoes a thorough vetting procedure.
            </p>
          </div>

          <div className="grid-4">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  background: "white",
                  padding: "28px",
                  borderRadius: "18px",
                  position: "relative",
                  border: "1px solid var(--ivory-300)",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "900",
                    color: "var(--gold-500)",
                    marginBottom: "12px",
                    opacity: 0.8,
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontSize: "17px", color: "var(--emerald-950)", marginBottom: "8px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--slate-600)", lineHeight: "1.5" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Requirements Checklist */}
      <section className="section" style={{ padding: "60px 5%", background: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="section-header" style={{ marginBottom: "36px" }}>
            <span className="badge badge-gold">FACULTY CRITERIA</span>
            <h2 style={{ fontSize: "30px", marginTop: "10px" }}>Who Are We Looking For?</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {requirements.map((req, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  background: "var(--ivory-50)",
                  border: "1px solid var(--ivory-200)",
                }}
              >
                <CheckCircle size={22} color="var(--emerald-800)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "16px", color: "var(--emerald-950)", marginBottom: "4px" }}>
                    {req.title}
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--slate-600)", margin: 0, lineHeight: "1.5" }}>
                    {req.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ padding: "60px 5%", background: "var(--ivory-50)" }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <div className="section-header" style={{ marginBottom: "36px" }}>
            <span className="badge badge-gold">COMMON QUESTIONS</span>
            <h2 style={{ fontSize: "30px", marginTop: "10px" }}>Teacher Frequently Asked Questions</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  background: "white",
                  border: "1px solid var(--ivory-200)",
                }}
              >
                <h4 style={{ fontSize: "16px", color: "var(--emerald-950)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <HelpCircle size={18} color="var(--gold-600)" /> {f.q}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--slate-600)", margin: 0, lineHeight: "1.6" }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--emerald-950), var(--emerald-900))",
          color: "white",
          padding: "70px 5%",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div className="arabic-bismillah" style={{ fontSize: "24px", color: "var(--gold-400)", marginBottom: "12px" }}>
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </div>
          <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "16px" }}>
            Ready to Teach with Minara-ul-Quran?
          </h2>
          <p style={{ color: "var(--slate-300)", fontSize: "16px", marginBottom: "30px" }}>
            Complete your teacher application today. Our admissions and academic board will review your credentials within 48 hours.
          </p>
          <Link to="/apply-teacher" className="btn btn-gold btn-lg">
            Complete Teacher Application <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
