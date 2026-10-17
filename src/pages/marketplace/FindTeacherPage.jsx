import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  X,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import { api } from "../../api";
import TeacherMarketplaceCard from "../../components/TeacherMarketplaceCard";
import { useLanguage } from "../../context/LanguageContext";

export default function FindTeacherPage() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [country, setCountry] = useState("all");
  const [language, setLanguage] = useState("");
  const [course, setCourse] = useState("");
  const [hifzOnly, setHifzOnly] = useState(false);
  const [ijazahOnly, setIjazahOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(30);
  const [sortBy, setSortBy] = useState("rating");

  // Comparison State
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    fetchTeachers();
  }, [gender, country, language, course, hifzOnly, ijazahOnly, maxPrice, sortBy]);

  const fetchTeachers = () => {
    setLoading(true);
    let url = `/teachers?sortBy=${sortBy}`;
    if (gender !== "all") url += `&gender=${gender}`;
    if (country !== "all") url += `&country=${encodeURIComponent(country)}`;
    if (language) url += `&language=${encodeURIComponent(language)}`;
    if (course) url += `&course=${encodeURIComponent(course)}`;
    if (hifzOnly) url += `&hifz=true`;
    if (ijazahOnly) url += `&ijazah=true`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;

    api
      .get(url)
      .then((res) => {
        setTeachers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleToggleFavorite = async (teacherId) => {
    setFavorites((prev) => ({
      ...prev,
      [teacherId]: !prev[teacherId],
    }));
    try {
      await api.post(`/favorites/toggle/${teacherId}`);
    } catch (e) {}
  };

  const handleToggleCompare = (teacherObj) => {
    const exists = compareList.find((c) => c.id === teacherObj.id);
    if (exists) {
      setCompareList(compareList.filter((c) => c.id !== teacherObj.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 teachers at a time.");
        return;
      }
      setCompareList([...compareList, teacherObj]);
      setShowCompareModal(true);
    }
  };

  const filteredTeachers = teachers.filter((tch) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      tch.name?.toLowerCase().includes(q) ||
      tch.qualification?.toLowerCase().includes(q) ||
      tch.specializations?.some((s) => s.toLowerCase().includes(q)) ||
      tch.country?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="section">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={14} /> Global Teacher Marketplace
        </span>
        <h2>Find Your Dedicated Quran Teacher</h2>
        <p>
          Discover, compare, and book verified male and female scholars, Huffaz, and Tajweed specialists worldwide.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "36px", alignItems: "start" }}>
        {/* Left Filter Sidebar */}
        <aside
          className="card"
          style={{ padding: "24px", borderRadius: "20px", position: "sticky", top: "100px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h3 style={{ fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <SlidersHorizontal size={16} /> Filters
            </h3>
            <button
              onClick={() => {
                setGender("all");
                setCountry("all");
                setLanguage("");
                setCourse("");
                setHifzOnly(false);
                setIjazahOnly(false);
                setMaxPrice(30);
                setSearch("");
              }}
              style={{ background: "none", border: "none", color: "var(--emerald-800)", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}
            >
              Reset All
            </button>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label className="form-label">Teacher Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control"
              style={{ padding: "8px 12px", fontSize: "13px" }}
            >
              <option value="all">All Tutors (Male & Female)</option>
              <option value="Male">Male Qaris Only</option>
              <option value="Female">Female Ustadhahs Only</option>
            </select>
          </div>

          {/* Country */}
          <div className="form-group">
            <label className="form-label">Country of Origin</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              style={{ padding: "8px 12px", fontSize: "13px" }}
            >
              <option value="all">All Countries</option>
              <option value="Pakistan">Pakistan</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United Arab Emirates">UAE / Dubai</option>
              <option value="Canada">Canada</option>
              <option value="Egypt">Egypt</option>
            </select>
          </div>

          {/* Languages */}
          <div className="form-group">
            <label className="form-label">Teaching Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-control"
              style={{ padding: "8px 12px", fontSize: "13px" }}
            >
              <option value="">Any Language</option>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Course Subject */}
          <div className="form-group">
            <label className="form-label">Course Subject</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="form-control"
              style={{ padding: "8px 12px", fontSize: "13px" }}
            >
              <option value="">All Subjects</option>
              <option value="Tajweed Rules">Tajweed Rules</option>
              <option value="Noorani Qaida">Noorani Qaida</option>
              <option value="Hifz-ul-Quran">Hifz-ul-Quran</option>
              <option value="Quran Tafseer">Quran Tafseer</option>
              <option value="Masnoon Duas">Masnoon Duas</option>
            </select>
          </div>

          {/* Hourly Rate Slider */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <label className="form-label">Max Hourly Rate</label>
              <b>${maxPrice} / hr</b>
            </div>
            <input
              type="range"
              min="8"
              max="35"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--gold-600)" }}
            />
          </div>

          {/* Verified Qualifications Checkboxes */}
          <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={hifzOnly}
                onChange={(e) => setHifzOnly(e.target.checked)}
              />
              <span>Hafiz-ul-Quran Only</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={ijazahOnly}
                onChange={(e) => setIjazahOnly(e.target.checked)}
              />
              <span>Verified Ijazah Holder</span>
            </label>
          </div>
        </aside>

        {/* Right Main Grid */}
        <div>
          {/* Top Search & Sort Bar */}
          <div
            style={{
              background: "var(--white)",
              padding: "16px 20px",
              borderRadius: "18px",
              border: "1px solid var(--ivory-200)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "26px",
            }}
          >
            <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
              <input
                type="text"
                placeholder="Search by instructor name, subject, or credential..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: "36px" }}
              />
              <Search
                size={16}
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", color: "var(--slate-500)" }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control"
                style={{ padding: "6px 12px", fontSize: "13px" }}
              >
                <option value="rating">Top Rated (Highest Rating)</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="experience">Most Experience</option>
                <option value="classes">Most Classes Completed</option>
              </select>
            </div>
          </div>

          {/* Active Comparison Bar */}
          {compareList.length > 0 && (
            <div
              style={{
                background: "var(--emerald-950)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "13.5px" }}>
                <b>{compareList.length}/3 Teachers Selected for Comparison</b> ({compareList.map((c) => c.name).join(", ")})
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setShowCompareModal(true)} className="btn btn-gold btn-sm">
                  View Comparison
                </button>
                <button onClick={() => setCompareList([])} className="btn btn-secondary btn-sm" style={{ padding: "4px 8px" }}>
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Teacher Cards Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--slate-500)" }}>
              Loading verified teachers...
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "20px" }}>
              <h3>No teachers found matching your filters.</h3>
              <p style={{ color: "var(--slate-500)", marginTop: "8px" }}>Try broadening your search or resetting filters.</p>
            </div>
          ) : (
            <div className="grid-2">
              {filteredTeachers.map((teacher) => (
                <TeacherMarketplaceCard
                  key={teacher.id || teacher.user?._id}
                  teacher={teacher}
                  isFavorite={!!favorites[teacher.id || teacher.user?._id]}
                  onToggleFavorite={handleToggleFavorite}
                  isCompared={!!compareList.find((c) => c.id === teacher.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.65)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div className="card" style={{ width: "min(960px, 100%)", maxHeight: "90vh", overflowY: "auto", padding: "34px", borderRadius: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "22px", color: "var(--emerald-950)" }}>
                Compare Teachers Side-by-Side
              </h3>
              <button onClick={() => setShowCompareModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${compareList.length}, 1fr)`, gap: "20px" }}>
              {compareList.map((t) => (
                <div key={t.id} style={{ background: "var(--ivory-50)", padding: "20px", borderRadius: "16px", border: "1px solid var(--ivory-200)" }}>
                  <b style={{ fontSize: "16px", color: "var(--emerald-950)", display: "block" }}>{t.name}</b>
                  <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>{t.country} ({t.gender})</span>

                  <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                    <div><b>Hourly Rate:</b> ${t.hourlyRate}/hr</div>
                    <div><b>Rating:</b> {t.rating} ★ ({t.reviewsCount} reviews)</div>
                    <div><b>Experience:</b> {t.experience} Years</div>
                    <div><b>Hifz / Ijazah:</b> {t.hafiz ? "Hafiz " : ""}{t.ijazah ? "✓ Ijazah" : ""}</div>
                    <div><b>Languages:</b> {(t.languages || []).join(", ")}</div>
                    <div><b>Students:</b> {t.studentsCount}+</div>
                    <div><b>Trial:</b> {t.offersFreeTrial ? "Free Trial Available" : "Standard"}</div>
                  </div>

                  <Link to={`/book/${t.id}`} className="btn btn-gold btn-sm" style={{ width: "100%", marginTop: "18px" }}>
                    Book Trial
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
