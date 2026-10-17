import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Calendar, ArrowUp } from "lucide-react";
import { ACADEMY_CONTACT } from "../config/contactConfig";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Pre-Footer Parallax CTA Banner */}
      <section
        className="footer-cta-parallax"
        style={{
          backgroundImage: "url('/assets/images/quran-banner-collage.jpg')",
        }}
      >
        <div className="footer-cta-overlay"></div>
        <div className="footer-cta-content">
          <div className="arabic-bismillah" style={{ color: "var(--gold-500)", fontSize: "24px", marginBottom: "12px" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <h3>
            Begin Your Quranic Journey at Minara-ul-Quran: Nurture Faith &amp; Recitation Excellence!
          </h3>
          <p>
            Enroll now at Minara-ul-Quran Academy and elevate your spiritual connection through authentic
            Quranic instruction. Master Tajweed, memorization, and Islamic principles from the comfort of
            your home with certified male and female scholars.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
            <Link to="/trial" className="btn btn-gold btn-lg">
              <Calendar size={18} /> Start Your Free Trial Lesson
            </Link>
            <Link to="/courses" className="btn btn-outline-white btn-lg">
              Explore Our Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Main Dark Footer */}
      <footer className="site-main-footer">
        <div className="footer-grid-container">
          {/* Column 1: Logo & About */}
          <div className="footer-col">
            <div style={{ marginBottom: "20px" }}>
              {!logoError ? (
                <div
                  style={{
                    background: "#ffffff",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    display: "inline-block",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src="/assets/branding/minara-logo.jpg"
                    alt="Minara-ul-Quran (Minaratul Quran Academy)"
                    style={{ maxHeight: "60px", width: "auto", objectFit: "contain" }}
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div>
                    <b style={{ fontSize: "20px", color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                      <span className="quran-gold">MINARA</span>-UL-QURAN
                    </b>
                    <div style={{ fontSize: "11px", color: "var(--primary-light)", textTransform: "uppercase" }}>
                      Minaratul Quran Academy
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p style={{ lineHeight: "1.75", color: "#cbd5e1", marginBottom: "18px" }}>
              Minara-ul-Quran is an international online Quran academy dedicated to delivering authentic
              one-to-one recitation with Tajweed, Hifz, Arabic, and Islamic studies for kids, sisters, and adults worldwide.
            </p>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ fontFamily: "var(--font-arabic)", fontSize: "16px", color: "var(--gold-500)", marginBottom: "4px" }}>
                خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
              </div>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                "The best among you are those who learn the Quran and teach it." — Sahih Bukhari
              </span>
            </div>
          </div>

          {/* Column 2: Our Links */}
          <div className="footer-col">
            <h4>Our Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses">Our Courses</Link></li>
              <li><Link to="/find-teacher">Our Teachers</Link></li>
              <li><Link to="/pricing">Pricing Plans</Link></li>
              <li><Link to="/trial">Free Trial</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/testimonials">Student Reviews</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/verify-certificate">Verify Certificate</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Courses */}
          <div className="footer-col">
            <h4>Our Courses</h4>
            <ul className="footer-links-list">
              <li><Link to="/courses/hifz-ul-quran">Hifz Memorization Course</Link></li>
              <li><Link to="/courses/noorani-qaida">Noorani Qaida for Beginners</Link></li>
              <li><Link to="/courses/quran-reading-with-tajweed">Quran with Tajweed</Link></li>
              <li><Link to="/courses/quran-reading-with-tajweed">Dedicated Female Quran Classes</Link></li>
              <li><Link to="/courses/quran-tafseer">Online Quran Tafsir Course</Link></li>
              <li><Link to="/courses/quran-reading">Quran Classes for Adults</Link></li>
              <li><Link to="/courses/basic-islamic-education">Online Quran Classes for Kids</Link></li>
              <li><Link to="/courses/arabic-language">Online Arabic &amp; Quran Classes</Link></li>
              <li><Link to="/courses/islamic-studies">Islamic Studies Program</Link></li>
              <li><Link to="/courses/namaz-and-masnoon-duas">Namaz &amp; Masnoon Duas</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <MapPin size={16} />
                <span>{ACADEMY_CONTACT.servingRegions}</span>
              </div>
              <div className="footer-contact-row">
                <Phone size={16} />
                <a
                  href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum! I would like to inquire about Quran classes.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#cbd5e1" }}
                  title="WhatsApp & Call (Primary)"
                >
                  WhatsApp: {ACADEMY_CONTACT.whatsappPrimary}
                </a>
              </div>
              <div className="footer-contact-row">
                <Phone size={16} />
                <a
                  href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum! I would like to inquire about Quran classes.", true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#cbd5e1" }}
                  title="WhatsApp & Call (Secondary)"
                >
                  WhatsApp: {ACADEMY_CONTACT.whatsappSecondary}
                </a>
              </div>
              <div className="footer-contact-row">
                <Mail size={16} />
                <a href={ACADEMY_CONTACT.getMailtoUrl("Inquiry regarding Quran Classes")} style={{ color: "#cbd5e1" }}>
                  {ACADEMY_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="footer-social-circles">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="footer-copyright-bar">
          <div>
            © <Link to="/" style={{ color: "#ffffff", borderBottom: "1px solid var(--gold-500)" }}>Minara-ul-Quran</Link> (Minaratul Quran Academy), All Rights Reserved {new Date().getFullYear()}.
          </div>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="floating-action-widgets">
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        <a
          href={ACADEMY_CONTACT.getWhatsAppUrl("Assalamu Alaikum! I would like to know more about the courses at Minara-ul-Quran Academy.")}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-pill-btn btn-floating-whatsapp"
          title="Send a message on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp Chat</span>
        </a>

        <Link
          to="/trial"
          className="floating-pill-btn btn-floating-trial"
          title="Book a free trial"
        >
          <Calendar size={18} />
          <span>Book Free Trial</span>
        </Link>
      </div>
    </>
  );
}
