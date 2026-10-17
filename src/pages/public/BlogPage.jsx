import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Clock, ArrowRight, User } from "lucide-react";
import { api } from "../../api";

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let url = "/cms/articles";
    if (category !== "All") url += `?category=${category}`;
    api.get(url).then((res) => setArticles(res.data)).catch(() => {});
  }, [category]);

  const categories = ["All", "Tajweed", "Hifz", "Duas", "Quran", "Hadith", "Parenting"];

  return (
    <div className="section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Islamic Knowledge & Guides
        </span>
        <h2>Articles, Tajweed Insights & Parenting Advice</h2>
        <p>
          Enrich your family's understanding of the Holy Quran, Sunnah ethics, and proven memorization habits.
        </p>

        {/* Category Pills */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginTop: "24px" }}>
          {categories.map((c) => (
            <button
              key={c}
              className={`btn btn-sm ${category === c ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setCategory(c)}
              style={{ fontSize: "12.5px" }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3">
        {articles.map((art) => (
          <article className="card" key={art._id || art.slug} style={{ display: "flex", flexDirection: "column" }}>
            <span className="course-badge-level" style={{ alignSelf: "flex-start", marginBottom: "12px" }}>
              {art.category}
            </span>
            <h3 style={{ fontSize: "20px", marginBottom: "12px", lineHeight: "1.4" }}>
              <Link to={`/blog/${art.slug}`} style={{ color: "var(--emerald-950)" }}>
                {art.title}
              </Link>
            </h3>
            <p style={{ color: "var(--slate-700)", fontSize: "14px", lineHeight: "1.65", marginBottom: "18px" }}>
              {art.excerpt}
            </p>
            <div style={{ marginTop: "auto", borderTop: "1px dashed var(--ivory-200)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12.5px", color: "var(--slate-500)" }}>
              <span>By {art.author?.split(" ")[0]}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={13} /> {art.readTime || "5 min read"}
              </span>
            </div>
            <Link to={`/blog/${art.slug}`} className="btn btn-secondary btn-sm" style={{ marginTop: "14px" }}>
              Read Full Article <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
