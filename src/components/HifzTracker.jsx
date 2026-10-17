import React from "react";
import { BookOpen, CheckCircle, Award, Sparkles, Clock, AlertCircle } from "lucide-react";

export default function HifzTracker({ records = [], summary = null, onLogClick = null, isTeacher = false }) {
  const currentJuz = summary?.currentJuz || 30;
  const currentSurah = summary?.currentSurah || "Surah Al-Mulk";
  const percentage = summary?.memorizationPercentage || 25;

  return (
    <div className="card" style={{ padding: "28px", borderRadius: "24px", border: "1px solid var(--ivory-200)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <span className="eyebrow" style={{ marginBottom: "6px" }}>
            <Sparkles size={13} /> Sacred Memorization Tracker
          </span>
          <h3 style={{ fontSize: "22px", color: "var(--emerald-950)" }}>
            Hifz-ul-Quran Progress & Retention Hub
          </h3>
        </div>
        {isTeacher && onLogClick && (
          <button onClick={onLogClick} className="btn btn-gold btn-sm">
            + Log Daily Hifz Lesson
          </button>
        )}
      </div>

      {/* Progress Bar & Juz Dial */}
      <div style={{ background: "var(--ivory-50)", padding: "20px", borderRadius: "18px", border: "1px solid var(--ivory-200)", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <b style={{ color: "var(--emerald-950)", fontSize: "15px" }}>
            Current Target: {currentSurah} (Juz {currentJuz})
          </b>
          <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--gold-600)" }}>
            {percentage}% Completed
          </span>
        </div>
        <div style={{ width: "100%", height: "12px", background: "var(--ivory-200)", borderRadius: "10px", overflow: "hidden" }}>
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              background: "linear-gradient(90deg, var(--gold-500), var(--emerald-700))",
              borderRadius: "10px",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* 30 Juz Visual Indicator */}
        <div style={{ marginTop: "16px" }}>
          <span style={{ fontSize: "12px", color: "var(--slate-500)", display: "block", marginBottom: "8px" }}>
            Juz Memorization Milestones (1 - 30):
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: "4px" }}>
            {[...Array(30)].map((_, i) => {
              const jNum = i + 1;
              const isMemorized = jNum >= 29; // sample
              return (
                <div
                  key={jNum}
                  title={`Juz ${jNum}`}
                  style={{
                    height: "22px",
                    borderRadius: "4px",
                    background: isMemorized ? "var(--emerald-800)" : "var(--ivory-200)",
                    color: isMemorized ? "var(--gold-400)" : "var(--slate-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {jNum}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3-Tier Daily Lesson Pillars (Sabaq, Sabqi, Manzil) */}
      <h4 style={{ fontSize: "16px", color: "var(--emerald-950)", marginBottom: "12px" }}>
        Classical 3-Tier Memorization Breakdown
      </h4>
      <div className="grid-3" style={{ marginBottom: "24px" }}>
        <div style={{ background: "var(--white)", border: "1px solid var(--ivory-200)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--emerald-900)", fontWeight: "bold", marginBottom: "6px" }}>
            <Award size={16} color="var(--gold-500)" /> Sabaq (New Lesson)
          </div>
          <p style={{ fontSize: "13px", color: "var(--slate-700)" }}>
            {summary?.latestRecord?.sabaq || "Ayah 1 to 15 with applied Tajweed & Ghunnah"}
          </p>
        </div>

        <div style={{ background: "var(--white)", border: "1px solid var(--ivory-200)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--emerald-900)", fontWeight: "bold", marginBottom: "6px" }}>
            <Clock size={16} color="var(--emerald-700)" /> Sabqi (Recent Revision)
          </div>
          <p style={{ fontSize: "13px", color: "var(--slate-700)" }}>
            {summary?.latestRecord?.sabqi || "Surah Al-Qalam complete delivery"}
          </p>
        </div>

        <div style={{ background: "var(--white)", border: "1px solid var(--ivory-200)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--emerald-900)", fontWeight: "bold", marginBottom: "6px" }}>
            <BookOpen size={16} color="var(--emerald-900)" /> Manzil (Long-Term Retention)
          </div>
          <p style={{ fontSize: "13px", color: "var(--slate-700)" }}>
            {summary?.latestRecord?.manzil || "Juz 29 full review without looking"}
          </p>
        </div>
      </div>

      {/* Latest Teacher Notes */}
      {summary?.latestRecord?.teacherNotes && (
        <div style={{ background: "var(--gold-100)", border: "1px solid rgba(184, 141, 34, 0.2)", padding: "14px 18px", borderRadius: "14px", fontSize: "13.5px", color: "var(--slate-800)" }}>
          <b>Teacher Evaluation Note:</b> "{summary.latestRecord.teacherNotes}"
        </div>
      )}
    </div>
  );
}
