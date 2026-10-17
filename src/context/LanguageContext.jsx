import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    brandName: "MINARA-UL-QURAN",
    tagline: "Online Quran Reading Academy & Islamic Studies",
    findTeacher: "Find a Quran Teacher",
    courses: "Courses",
    howItWorks: "How It Works",
    pricing: "Pricing",
    becomeTeacher: "Become a Teacher",
    reviews: "Reviews",
    articles: "Articles",
    about: "About",
    contact: "Contact",
    bookTrial: "Book Free Trial",
    signIn: "Sign In",
    dashboard: "Dashboard",
    logout: "Logout",
    heroTitle: "Learn Quran Online with Certified Male & Female Scholars",
    heroSubtitle: "Connect with certified Al-Azhar scholars, Huffaz, and Tajweed experts for personalized one-to-one online classes worldwide.",
    verified: "Verified",
    startingFrom: "Starting From",
    perHour: "/ Hour",
    students: "Students",
    classes: "Classes",
    compare: "Compare",
    favorite: "Favorite",
    viewProfile: "View Profile",
  },
  ur: {
    brandName: "منارة القرآن اکیڈمی",
    tagline: "آن لائن قرآن ریڈنگ اکیڈمی اور علومِ اسلامیہ",
    findTeacher: "قرآن استاد تلاش کریں",
    courses: "کورسز",
    howItWorks: "طریقہ کار",
    pricing: "فیس و پیکجز",
    becomeTeacher: "استاد بنیں",
    reviews: "آراء",
    articles: "مضامین",
    about: "ہمارے بارے میں",
    contact: "رابطہ",
    bookTrial: "مفت ٹرائل بک کریں",
    signIn: "لاگ ان",
    dashboard: "ڈیش بورڈ",
    logout: "لاگ آؤٹ",
    heroTitle: "مستند اور تصدیق شدہ اساتذہ سے آن لائن قرآن سیکھیں",
    heroSubtitle: "پوری دنیا سے ماہر قراء، حفاظ اور عالمات کے ساتھ ون ٹو ون کلاسز کے ذریعے قرآن کی تلاوت اور تجوید سیکھیں۔",
    verified: "تصدیق شدہ",
    startingFrom: "شروع از",
    perHour: "/ گھنٹہ",
    students: "طلباء",
    classes: "کلاسز",
    compare: "موازنہ کریں",
    favorite: "پسندیدہ",
    viewProfile: "پروفائل دیکھیں",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const isRTL = lang === "ur";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ur" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
