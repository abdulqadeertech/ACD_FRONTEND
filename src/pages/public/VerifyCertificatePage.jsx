import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, CheckCircle, XCircle, Search, ShieldCheck, Calendar, User, BookOpen } from "lucide-react";
import { api } from "../../api";

export default function VerifyCertificatePage() {
  const { id } = useParams();
  const [certId, setCertId] = useState(id || "NQA-2026-8841");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const verifyCertificate = async (lookupId) => {
    if (!lookupId) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.get(`/certificates/verify/${lookupId.trim()}`);
      setResult(res.data);
    } catch (err) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setCertId(id);
      verifyCertificate(id);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCertificate(certId);
  };

  return (
    <div className="section" style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div className="section-header">
        <span className="eyebrow">Academic Credential Verification</span>
        <h2>Official Digital Certificate Verification Portal</h2>
        <p>
          Verify the authenticity of graduation diplomas and course completion certificates issued by Minara-ul-Quran.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} style={{ background: "var(--white)", padding: "26px", borderRadius: "20px", border: "1px solid var(--ivory-200)", display: "flex", gap: "12px", marginBottom: "40px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            required
            placeholder="Enter Certificate ID (e.g. NQA-2026-8841)"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "40px", fontSize: "16px", textTransform: "uppercase" }}
          />
          <Search size={20} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }} />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: "0 28px" }}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {/* Result Display */}
      {result?.certificate ? (
        <div
          style={{
            background: "var(--white)",
            borderRadius: "28px",
            border: "2px solid var(--gold-500)",
            padding: "46px 40px",
            boxShadow: "var(--shadow-xl)",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div className="arabic-bismillah" style={{ fontSize: "28px", marginBottom: "10px" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--emerald-50)", color: "var(--success)", padding: "6px 18px", borderRadius: "30px", fontWeight: "700", fontSize: "14px" }}>
              <CheckCircle size={18} /> OFFICIALLY VERIFIED & AUTHENTIC
            </div>
            <h2 style={{ fontSize: "28px", color: "var(--emerald-950)", marginTop: "16px" }}>
              Certificate of Course Completion
            </h2>
            <span style={{ fontSize: "13px", color: "var(--slate-500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              MINARA-UL-QURAN ACADEMIC REGISTRY
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", padding: "26px", background: "var(--ivory-50)", borderRadius: "18px", border: "1px solid var(--ivory-200)", marginBottom: "30px" }}>
            <div>
              <span style={{ fontSize: "12px", color: "var(--slate-500)", textTransform: "uppercase" }}>Student Name</span>
              <h3 style={{ fontSize: "20px", color: "var(--emerald-950)", marginTop: "2px" }}>
                {result.certificate.studentName}
              </h3>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "var(--slate-500)", textTransform: "uppercase" }}>Graduation Grade</span>
              <h3 style={{ fontSize: "20px", color: "var(--gold-600)", marginTop: "2px" }}>
                {result.certificate.grade}
              </h3>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "var(--slate-500)", textTransform: "uppercase" }}>Course Completed</span>
              <h4 style={{ fontSize: "16px", color: "var(--slate-900)", marginTop: "2px" }}>
                {result.certificate.courseTitle}
              </h4>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "var(--slate-500)", textTransform: "uppercase" }}>Completion Date</span>
              <h4 style={{ fontSize: "16px", color: "var(--slate-900)", marginTop: "2px" }}>
                {new Date(result.certificate.completionDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </h4>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "var(--slate-500)", textTransform: "uppercase" }}>Assigned Instructor</span>
              <p style={{ fontWeight: "600", marginTop: "2px" }}>{result.certificate.teacherName}</p>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "var(--slate-500)", textTransform: "uppercase" }}>Academic Director Signature</span>
              <p style={{ fontWeight: "600", marginTop: "2px" }}>{result.certificate.principalSignature}</p>
            </div>
          </div>

          <div style={{ textAlign: "center", borderTop: "1px solid var(--ivory-200)", paddingTop: "20px", fontSize: "12.5px", color: "var(--slate-400)" }}>
            Digital Verification Hash: <code style={{ color: "var(--slate-700)" }}>{result.certificate.verificationHash}</code>
          </div>
        </div>
      ) : searched ? (
        <div style={{ background: "var(--white)", borderRadius: "20px", padding: "40px", textAlign: "center", border: "1px solid #fee2e2" }}>
          <XCircle size={44} color="var(--danger)" style={{ margin: "0 auto 12px" }} />
          <h3 style={{ color: "var(--slate-900)" }}>No Certificate Found</h3>
          <p style={{ color: "var(--slate-500)", marginTop: "8px" }}>
            The certificate ID <b>{certId}</b> could not be validated in our international registry. Please check the ID or contact admissions.
          </p>
        </div>
      ) : null}
    </div>
  );
}
