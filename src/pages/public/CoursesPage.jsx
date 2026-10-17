import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { api } from "../../api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    "Foundation",
    "Recitation",
    "Tajweed",
    "Memorization",
    "Understanding",
    "Language",
    "Islamic Education",
    "Practical Worship",
    "Sunnah",
    "History",
    "Character",
  ];

  const filtered = courses.filter((c) => {
    const matchesCategory = category === "All" || c.category === category;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Comprehensive Islamic Curriculum
        </span>
        <h2>All Quran & Islamic Studies Courses</h2>
        <p>
          Thirteen accredited courses taught one-on-one by certified male and female scholars.
          From your very first Arabic letter to full Ijazah memorization.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "36px",
          background: "var(--white)",
          padding: "16px 24px",
          borderRadius: "18px",
          border: "1px solid var(--ivory-200)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${category === cat ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setCategory(cat)}
              style={{ fontSize: "12.5px", padding: "6px 12px" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "38px" }}
          />
          <Search
            size={18}
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--slate-500)" }}>
          Loading courses...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "20px" }}>
          <h3>No courses found matching your criteria.</h3>
          <p style={{ color: "var(--slate-500)", marginTop: "8px" }}>Try selecting another category or clear the search.</p>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((c) => (
            <article className="card course-card" key={c._id || c.slug}>
              <span className="course-badge-level">
                {c.level} · {c.category}
              </span>
              <h3>{c.title}</h3>
              <p style={{ marginBottom: "16px" }}>{c.description}</p>

              <div style={{ marginBottom: "18px" }}>
                <span style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--emerald-900)", display: "block", marginBottom: "6px" }}>
                  Key Learning Highlights:
                </span>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                  {(c.benefits || []).slice(0, 2).map((b, i) => (
                    <li key={i} style={{ fontSize: "12.5px", color: "var(--slate-700)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <CheckCircle size={13} color="var(--success)" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="course-meta">
                <span>⏱ {c.duration}</span>
                <span>👥 {c.ageGroup}</span>
              </div>

              <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                <Link to={`/courses/${c.slug}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  View Syllabus
                </Link>
                <Link to="/trial" className="btn btn-gold btn-sm" style={{ flex: 1 }}>
                  Book Trial
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
