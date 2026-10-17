import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, User, ArrowLeft, Sparkles, Share2 } from "lucide-react";
import { api } from "../../api";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/cms/articles/${slug}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="section" style={{ textAlign: "center", padding: "100px" }}>Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "100px" }}>
        <h2>Article Not Found</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="section" style={{ maxWidth: "840px", margin: "0 auto" }}>
      <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--slate-500)", fontSize: "14px", marginBottom: "24px" }}>
        <ArrowLeft size={16} /> Back to All Articles
      </Link>

      <span className="eyebrow">{post.category}</span>
      <h1 style={{ fontSize: "36px", fontWeight: "800", color: "var(--emerald-950)", margin: "14px 0 18px", lineHeight: "1.25" }}>
        {post.title}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "14px", color: "var(--slate-500)", paddingBottom: "24px", borderBottom: "1px solid var(--ivory-200)", marginBottom: "36px" }}>
        <span>Written by <b>{post.author}</b></span>
        <span>•</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Clock size={15} /> {post.readTime || "5 min read"}
        </span>
      </div>

      <div
        style={{
          fontSize: "17px",
          color: "var(--slate-800)",
          lineHeight: "1.85",
          whiteSpace: "pre-line",
        }}
      >
        {post.content}
      </div>

      {/* Trial CTA Box inside Blog */}
      <div style={{ background: "linear-gradient(135deg, var(--emerald-950), var(--emerald-900))", color: "white", padding: "40px", borderRadius: "24px", marginTop: "60px", textAlign: "center" }}>
        <div className="arabic-bismillah" style={{ fontSize: "24px", color: "var(--gold-400)", marginBottom: "8px" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>Ready to Start Your Quran Journey?</h3>
        <p style={{ color: "var(--slate-200)", fontSize: "15px", maxWidth: "560px", margin: "0 auto 24px" }}>
          Connect with certified scholars for personalized one-to-one recitation and Tajweed mastery.
        </p>
        <Link to="/trial" className="btn btn-gold">
          Book Free Trial Class
        </Link>
      </div>
    </div>
  );
}
