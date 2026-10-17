import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  Globe,
  LayoutDashboard,
  LogOut,
  LogIn,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { ACADEMY_CONTACT } from "../config/contactConfig";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { user, logoutUser } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    setMobileOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setMobileCoursesOpen(false);
  };

  const courseDropdownItems = [
    { label: "Quran Memorization (Hifz) Course", to: "/courses/hifz-ul-quran" },
    { label: "Noorani Qaida Course", to: "/courses/noorani-qaida" },
    { label: "Learn Quran Easily at Home", to: "/courses/quran-reading" },
    { label: "Female Quran Classes", to: "/courses/quran-reading-with-tajweed" },
    { label: "Learn Quran Online with Tajweed", to: "/courses/quran-reading-with-tajweed" },
    { label: "Online Quran Tafsir Course", to: "/courses/quran-tafseer" },
    { label: "Online Arabic and Quran Classes", to: "/courses/arabic-language" },
    { label: "Islamic Studies for Kids & Adults", to: "/courses/islamic-studies" },
    { label: "Namaz & Masnoon Duas", to: "/courses/namaz-and-masnoon-duas" },
    { label: "Explore All Courses", to: "/courses" },
  ];

  return (
    <>
      {/* Topbar Start — Matches Reference Topbar */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-left">
            <div className="topbar-item">
              <Phone size={14} color="var(--gold-500)" />
              <a
                href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum! I would like information about Quran classes.")}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (Primary)"
              >
                WhatsApp: {ACADEMY_CONTACT.whatsappPrimary}
              </a>
            </div>
            <div className="topbar-item" style={{ display: "none" }} id="topbar-secondary-wa">
              <a
                href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum!", true)}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (Secondary)"
              >
                {ACADEMY_CONTACT.whatsappSecondary}
              </a>
            </div>
            <div className="topbar-item">
              <Mail size={14} color="var(--gold-500)" />
              <a href={ACADEMY_CONTACT.getMailtoUrl("Inquiry regarding Quran Classes")}>
                {ACADEMY_CONTACT.email}
              </a>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-social">
              <span style={{ fontSize: "13px", color: "#9ca3af", marginRight: "4px" }}>Follow Us:</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>

            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>

            <button
              onClick={toggleLanguage}
              style={{
                background: "transparent",
                border: "none",
                color: "#e2e8f0",
                fontSize: "12.5px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
              title="Switch Language"
            >
              <Globe size={13} color="var(--gold-500)" />
              {lang === "en" ? "اردو" : "English"}
            </button>

            {user ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                <Link
                  to="/messages"
                  style={{ color: "#e2e8f0", fontSize: "12.5px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <MessageSquare size={13} color="var(--gold-500)" /> Messages
                </Link>
                <Link
                  to="/dashboard"
                  style={{ color: "var(--gold-400)", fontSize: "12.5px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <LayoutDashboard size={13} /> Dashboard ({user.role})
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ background: "none", border: "none", color: "#f87171", fontSize: "12.5px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "3px" }}
                >
                  <LogOut size={13} /> Logout
                </button>
              </div>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                <Link
                  to="/login"
                  style={{ color: "#e2e8f0", fontSize: "12.5px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <LogIn size={13} color="var(--gold-500)" /> Sign In
                </Link>
                <Link
                  to="/become-a-teacher"
                  style={{ color: "#cbd5e1", fontSize: "12.5px" }}
                >
                  Teach With Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Sticky Main Navbar Start */}
      <header className="site-navbar">
        <div className="navbar-container" style={{ paddingRight: 0, maxWidth: "100%" }}>
          <div style={{ paddingLeft: "4%" }}>
            <Link to="/" className="brand-logo-link" onClick={closeMenu}>
              {!logoError ? (
                <img
                  src="/assets/branding/minara-logo.jpg"
                  alt="Minara-ul-Quran (Minaratul Quran Academy)"
                  style={{ height: "58px", width: "auto", objectFit: "contain", borderRadius: "6px" }}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="brand-text-block">
                  <span className="brand-title-main">
                    <span className="quran-gold">MINARA</span>-UL-QURAN
                  </span>
                  <span className="brand-subtext">Minaratul Quran Academy</span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <ul className="nav-menu-desktop" style={{ marginLeft: "auto", marginRight: "28px" }}>
            <li>
              <Link
                to="/"
                className={`nav-link-item ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`nav-link-item ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
            <li className="nav-dropdown-wrapper">
              <Link
                to="/courses"
                className={`nav-link-item ${location.pathname.startsWith("/courses") ? "active" : ""}`}
              >
                Courses <ChevronDown size={15} />
              </Link>
              <div className="nav-dropdown-menu">
                {courseDropdownItems.map((item, idx) => (
                  <Link key={idx} to={item.to} className="dropdown-link">
                    <span>{item.label}</span>
                    <span style={{ color: "#0084d6", fontWeight: "700" }}>›</span>
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link
                to="/blog"
                className={`nav-link-item ${location.pathname.startsWith("/blog") ? "active" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                className={`nav-link-item ${location.pathname === "/testimonials" ? "active" : ""}`}
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/find-teacher"
                className={`nav-link-item ${
                  location.pathname === "/find-teacher" || location.pathname.startsWith("/teachers")
                    ? "active"
                    : ""
                }`}
              >
                Our Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`nav-link-item ${location.pathname === "/contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Flush Action Buttons on Far Right (Exact Match to Screenshot) */}
          <div className="nav-action-buttons">
            <Link to="/pricing" className="nav-btn-pricing">
              <span>Pricing</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/trial" className="nav-btn-trial">
              <Calendar size={16} />
              <span>Free Trial</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div style={{ paddingRight: "4%" }} className="mobile-toggle-wrap">
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-nav-drawer ${mobileOpen ? "open" : ""}`}>
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>
            About
          </Link>

          <div>
            <button
              type="button"
              className="mobile-nav-link"
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #f1f5f9" }}
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
            >
              <span>Courses</span>
              <ChevronDown size={18} />
            </button>
            {mobileCoursesOpen && (
              <div style={{ paddingLeft: "16px", background: "#f8fafc", borderRadius: "6px", marginTop: "6px" }}>
                {courseDropdownItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    onClick={closeMenu}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      fontSize: "14px",
                      color: "#334155",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" className="mobile-nav-link" onClick={closeMenu}>
            Blog
          </Link>
          <Link to="/testimonials" className="mobile-nav-link" onClick={closeMenu}>
            Reviews
          </Link>
          <Link to="/find-teacher" className="mobile-nav-link" onClick={closeMenu}>
            Our Teachers (Find Tutor)
          </Link>
          <Link to="/teachers" className="mobile-nav-link" onClick={closeMenu}>
            Teachers Directory
          </Link>
          <Link to="/pricing" className="mobile-nav-link" onClick={closeMenu}>
            Pricing Plans
          </Link>
          <Link to="/how-it-works" className="mobile-nav-link" onClick={closeMenu}>
            How It Works
          </Link>
          <Link to="/become-a-teacher" className="mobile-nav-link" onClick={closeMenu}>
            Become a Teacher
          </Link>
          <Link to="/verify-certificate" className="mobile-nav-link" onClick={closeMenu}>
            Verify Certificate
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>
            Contact
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
            <Link to="/trial" className="btn btn-primary" onClick={closeMenu}>
              <Calendar size={16} /> Book Free Trial
            </Link>
            <Link to="/pricing" className="btn btn-secondary" onClick={closeMenu}>
              View Pricing <ArrowRight size={16} />
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary" onClick={closeMenu}>
                  <LayoutDashboard size={16} /> Go to Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-secondary" onClick={closeMenu}>
                <LogIn size={16} /> Sign In to Account
              </Link>
            )}
          </div>
        </div>
      </header>
      {/* Sticky Main Navbar End */}
    </>
  );
}
