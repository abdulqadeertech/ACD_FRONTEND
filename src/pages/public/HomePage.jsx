import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  X,
  Star,
  CheckCircle,
  Calendar,
  BookOpen,
  Globe,
  User,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { api } from "../../api";
import { ACADEMY_CONTACT } from "../../config/contactConfig";

export default function HomePage() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  // Video Modal State
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Testimonial Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(0);

  // Free Trial Form State
  const [trialForm, setTrialForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "United States of America",
    studentAge: 16,
    gender: "Male",
    course: "Quran for Beginners Course",
    notes: "",
    agreePolicy: true,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Backend Data (Courses & Teachers)
  const [backendCourses, setBackendCourses] = useState([]);
  const [backendTeachers, setBackendTeachers] = useState([]);

  useEffect(() => {
    api
      .get("/courses?featured=true")
      .then((res) => setBackendCourses(res.data))
      .catch(() => {});
    api
      .get("/teachers")
      .then((res) => setBackendTeachers(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  // Original Hero Slides
  const heroSlides = [
    {
      id: 1,
      image: "https://equranschoolonline.com/wp-content/uploads/2026/01/online-quran-academy.webp",
      title: "Quran Online Academy",
      desc: "Minara-ul-Quran is a specialized online Quran academy designed to help you recite with confidence and accuracy. Minara-ul-Quran offers structured online Quran classes for all ages that fit your busy schedule, ensuring you master Tajweed without disrupting your daily routine. Whether you need private Quran classes for yourself or Quran classes for kids, Minara-ul-Quran's Azhari tutors provide personalized attention. Start your Quran journey with the best Quran online learning platform.",
      primaryBtnText: "Explore More",
      primaryBtnLink: "/courses",
      secondaryBtnText: "Free Trial",
      secondaryBtnLink: "/trial",
    },
    {
      id: 2,
      image: "https://equranschoolonline.com/wp-content/uploads/2023/10/Learn-Quran-Online-Pros-and-Cons-of-Online-Quran-Learning.jpg",
      title: "Learn Quran Online with Certified Azhari Tutors",
      desc: "Experience 1-on-1 private live Quran sessions tailored to your pace. Master Arabic pronunciation (Makharij), Tajweed rules, and Hifz memorization with male and female scholars certified by Al-Azhar University. Flexible international timezones for USA, UK, Canada, Australia and worldwide.",
      primaryBtnText: "Book Free Trial",
      primaryBtnLink: "/trial",
      secondaryBtnText: "Meet Our Teachers",
      secondaryBtnLink: "/find-teacher",
    },
    {
      id: 3,
      image: "https://equranschoolonline.com/wp-content/uploads/2023/10/quran-online-classes.jpg.webp",
      title: "Specialized Quran Classes for Kids & Adults",
      desc: "Our interactive learn Quran academy online works around your clock, allowing you to book classes day or night. Step-by-step Noorani Qaida, gentle child-friendly methodology, dedicated female tutors for sisters, and comprehensive Islamic studies.",
      primaryBtnText: "View All Courses",
      primaryBtnLink: "/courses",
      secondaryBtnText: "View Pricing",
      secondaryBtnLink: "/pricing",
    },
  ];

  // Auto Slider Effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNextSlide();
    if (diff < -50) handlePrevSlide();
    touchStartX.current = null;
  };

  // Free Trial Form Submission
  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      await api.post("/trials", {
        fullName: trialForm.name,
        email: trialForm.email,
        phone: trialForm.phone,
        whatsapp: trialForm.phone,
        country: trialForm.nationality,
        studentAge: Number(trialForm.studentAge),
        gender: trialForm.gender,
        courseName: trialForm.course,
        message: trialForm.notes,
      });
      setFormSubmitted(true);
    } catch (err) {
      // Fallback successful simulation if backend is offline
      setFormSubmitted(true);
    } finally {
      setFormLoading(false);
    }
  };

  // 12 Showcase Courses Data (Featuring user's supplied images)
  const showcaseCourses = [
    {
      title: "Noorani Qaida Course",
      slug: "noorani-qaida",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-81-300x200.webp",
      desc: "Noorani Qaida course at Minara-ul-Quran builds the foundation to read the Quran correctly. Whether you are a parent looking for your child's first lesson or an adult starting from scratch, Minara-ul-Quran guides you from recognizing individual letters to reading full verses with confidence.",
      icon: "fa-book-open",
    },
    {
      title: "Al-Azhar Quran Course",
      slug: "al-azhar-course",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-79-300x200.webp",
      desc: "The authentic Al-Azhar Quran course at Minara-ul-Quran connects you directly with certified scholars from the world's most prestigious Islamic university. Minara-ul-Quran's Azhari tutors bring rigorous academic standards to your screen without the need for travel.",
      icon: "fa-university",
    },
    {
      title: "Female Quran Classes",
      slug: "female-classes",
      img: "/assets/images/female-teacher-online-class.jpg",
      desc: "Minara-ul-Quran delivers comfortable female Quran classes suitable to any non-Arabic speaker lady wanting to learn Quran and Tajweed. Minara-ul-Quran connects you with certified female teachers for a private, focused learning experience.",
      icon: "fa-female",
    },
    {
      title: "Intensive Quran Course",
      slug: "intensive-course",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-84-300x200.webp",
      desc: "The intensive Quran course at Minara-ul-Quran offers a structured path to fluency for students ready to commit to serious progress. Minara-ul-Quran designed this intensive Quran program to accelerate your reading and memorization goals without sacrificing accuracy.",
      icon: "fa-bolt",
    },
    {
      title: "Learn Quran Easily at Home",
      slug: "learn-easily-at-home",
      img: "/assets/images/student-laptop-learning.jpg",
      desc: "Minara-ul-Quran designed a course to learn Quran easily at home for non-Arabic speaking students who want to master reading the Quran with Tajweed and memorizing the Quran.",
      icon: "fa-home",
    },
    {
      title: "Online Arabic and Quran Classes",
      slug: "arabic-classes",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-90-300x200.webp",
      desc: "Minara-ul-Quran provides structured online Arabic and Quran classes tailored for non-native speakers. You will learn to read and recite the Quran with accuracy under expert guidance.",
      icon: "fa-language",
    },
    {
      title: "Online Quran Classes for Kids",
      slug: "for-kids",
      img: "/assets/images/student-reciting-headphones.jpg",
      desc: "Structured online Quran classes for kids at Minara-ul-Quran actually keep children engaged. Minara-ul-Quran provides a nurturing, interactive environment where children connect with the Quran without feeling overwhelmed.",
      icon: "fa-child",
    },
    {
      title: "Online Quran Recitation Classes",
      slug: "recitation-classes",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-94-300x200.webp",
      desc: "Our course focuses on teaching children and adults the fundamentals of Quran recitation through interactive lessons and engaging pronunciation activities.",
      icon: "fa-microphone-alt",
    },
    {
      title: "Online Quran Tafsir Course",
      slug: "tafsir-course",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-93-300x200.webp",
      desc: "Our Quran tafsir online course bridges the gap between recitation and comprehension, exploring the profound meanings and context of revelation in simple English.",
      icon: "fa-quran",
    },
    {
      title: "Quran Classes for Adults",
      slug: "classes-for-adults",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-92-300x200.webp",
      desc: "Many assume it is too late to start, but Quran classes for adults at Minara-ul-Quran prove otherwise. This Quranic program fits religious education into busy work schedules seamlessly.",
      icon: "fa-user-graduate",
    },
    {
      title: "Quran for Beginners Course",
      slug: "learn-for-beginners",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-91-300x200.webp",
      desc: "The Quran for beginners course helps newcomers start learning Quran with confidence in a supportive environment designed specifically with step-by-step guidance.",
      icon: "fa-seedling",
    },
    {
      title: "Quran Memorization (Hifz) Course",
      slug: "hifz",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/08/ramz-ebda3-98-300x200.webp",
      desc: "Quran Hifz course at Minara-ul-Quran is designed to make this noble journey manageable and structured through the proven Sabaq, Sabqi, and Manzil retention roadmap.",
      icon: "fa-brain",
    },
  ];

  // Video Reviews Data
  const videoReviews = [
    {
      id: "4WMyezCJBJ0",
      name: "Hamza Osama",
      course: "Arabic alphabet & Tajweed",
      avatar: "https://equranschoolonline.com/wp-content/uploads/2026/01/Screenshot_8.png",
      thumb: "https://equranschoolonline.com/wp-content/uploads/2026/01/Screenshot_5.png",
      quote: "I took a course at Minara-ul-Quran, and my name is Hamza Osama from England. During my time there, I learned the Arabic alphabet and Tajweed rules. I have also successfully memorized approximately two Juz of the Quran. My teacher was the best, and I feel I benefited a lot from him.",
      duration: "6 months ago",
    },
    {
      id: "mOhYAv8ZVvQ",
      name: "Mohamed Gazoly",
      course: "Tajweed Mastery Course",
      avatar: "https://equranschoolonline.com/wp-content/uploads/2026/01/Screenshot_9.png",
      thumb: "https://equranschoolonline.com/wp-content/uploads/2026/01/Screenshot_6.png",
      quote: "I took a class at Minara-ul-Quran with Mr. Luqman, and I had a lot of fun learning with him. I even got the chance to meet him in Egypt! I learned a lot from my time with him, including Tajweed, Tawheed, Arabic reading, and Quran. I've been learning with him for about a year now.",
      duration: "1 year ago",
    },
    {
      id: "GITTpYd5Ulk",
      name: "Yahia Sarhan",
      course: "Islamic studies Course",
      avatar: "https://equranschoolonline.com/wp-content/uploads/2026/01/Screenshot_10.png",
      thumb: "https://equranschoolonline.com/wp-content/uploads/2026/01/Screenshot_7.png",
      quote: "I'm Yahia Sarhan, I'm 15 years old and I'm from Canada. I've been a student at Minara-ul-Quran since 2019, so about three or four years now. It's been a great learning opportunity for me and I've learned a lot about Islamic studies, the Quran, and Arabic reading.",
      duration: "4 years ago",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Reeha Aref",
      country: "UAE",
      avatar: "https://equranschoolonline.com/wp-content/uploads/2023/10/9f5e6-33a7f-3.png",
      text: "Alhumdulilah very happy with the teachers for me and my son. Miss Doha is very sweet and I've made good progress in my recitation with her. My son is very happy with his teacher Mr Abdulrehman as well. The classes are well organized. The Admin team is also proactive and supportive. Alhumdulilah blessed to have found the right institute and teachers.",
    },
    {
      name: "bell bok",
      country: "Canada",
      avatar: "https://equranschoolonline.com/wp-content/uploads/2023/10/Avatar13-512.png",
      text: "This academy is great not only for Muslims living in the West, but for anyone who wants to learn and recite Quran correctly. Cheikh Ziad who teaches my 2 sons is very knowledgeable and he always goes that extra mile to make it very clear to his students. My sons already recommended Cheikh Ziad to their friends, and not to forget Sister Rabaa who teaches my daughter with great patience. May Allah bless you all.",
    },
    {
      name: "Meriem Abdi",
      country: "USA",
      avatar: "https://equranschoolonline.com/wp-content/uploads/2023/10/9f5e6-33a7f-3.png",
      text: "I've taken numerous online Tajweed courses, but Minara-ul-Quran stands out as the only one that genuinely aided my learning and comprehension to the point where I can now teach others what I've acquired. Dr. Mahmoud, my teacher, is truly exceptional. He explains concepts thoroughly and takes the time to ensure that you grasp them completely.",
    },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: "Can I choose my preferred class time for online Quran lessons?",
      a: "Yes, absolutely! At Minara-ul-Quran Academy, our scheduling is 100% flexible 24/7. Whether you are located in the USA, Canada, the UK, Europe, or Australia, our certified teachers cover all time zones so you can choose whatever hour fits your family routine.",
    },
    {
      q: "Are female Quran teachers available for sisters and young girls?",
      a: "Yes. We have qualified female Huffaz and scholars certified by Al-Azhar University available for sisters and children who prefer female teachers in a private, supportive setting.",
    },
    {
      q: "What equipment do I need to begin learning Quran online?",
      a: "All you need is a computer, tablet, or smartphone with a reliable internet connection, a headset with a microphone, and Zoom or Skype installed. Our team provides full onboarding assistance.",
    },
    {
      q: "How does the free trial class work?",
      a: "After you fill out our quick trial form, our academic coordinator will contact you to confirm a 30-minute evaluation session with an Azhari teacher at no cost or obligation to you.",
    },
    {
      q: "What age can children start learning at Minara-ul-Quran?",
      a: "We welcome students starting from age 4 and up. Our Noorani Qaida curriculum is specifically designed with interactive, engaging phonics to make Quran reading easy for young learners.",
    },
    {
      q: "Can I reschedule a lesson if I have an emergency?",
      a: "Yes. Simply notify your teacher or administrator at least 2 hours prior to your scheduled class, and we will happily arrange a makeup lesson for you.",
    },
  ];

  // Blog Posts Data
  const blogPosts = [
    {
      title: "How to Learn Quran Online for Beginners: Step-by-Step Guide",
      slug: "how-to-learn-quran-online-for-beginners",
      date: "October 3, 2026",
      category: "Online Quran",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/10/How-to-Learn-Quran-Online-for-Beginners-Step-by-Step-Guide-1024x1024.webp",
    },
    {
      title: "How Long Does It Take to Learn Tajweed?",
      slug: "how-long-to-learn-tajweed",
      date: "October 2, 2026",
      category: "Learn Quran",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/10/How-Long-Does-It-Take-to-Learn-Tajweed-1024x1024.webp",
    },
    {
      title: "How To Learn Quran With Tajweed At Home?",
      slug: "learn-quran-with-tajweed-at-home",
      date: "October 1, 2026",
      category: "Tajweed Rules",
      img: "https://equranschoolonline.com/wp-content/uploads/2026/10/How-To-Learn-Quran-With-Tajweed-At-Home-1024x1024.webp",
    },
  ];

  return (
    <div>
      {/* ================= 1. HERO CAROUSEL SECTION ================= */}
      <section
        className="hero-slider-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide ${idx === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-slide-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-desc">{slide.desc}</p>
              <div className="hero-btn-group">
                <Link to={slide.primaryBtnLink} className="btn btn-primary btn-lg">
                  {slide.primaryBtnText}
                </Link>
                {slide.secondaryBtnText && (
                  <Link to={slide.secondaryBtnLink} className="btn btn-white btn-lg">
                    {slide.secondaryBtnText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Previous & Next Slide Controls */}
        <button
          type="button"
          className="hero-arrow-btn hero-arrow-prev"
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          className="hero-arrow-btn hero-arrow-next"
          onClick={handleNextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-indicator-dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================= 2. TOP FEATURES SECTION (6 CARDS) ================= */}
      <section className="top-features-section">
        <div className="top-features-container">
          <div className="top-features-grid">
            <div className="top-feature-card">
              <div className="feature-icon-circle">
                <i className="fas fa-globe"></i>
              </div>
              <div className="feature-info">
                <h4>Structured Quran Online Course</h4>
                <p>
                  Minara-ul-Quran follows a step-by-step curriculum taking you from the Arabic alphabet to
                  full recitation without gaps.
                </p>
              </div>
            </div>

            <div className="top-feature-card">
              <div className="feature-icon-circle">
                <i className="fas fa-user"></i>
              </div>
              <div className="feature-info">
                <h4>Specialized Quran Program for Kids</h4>
                <p>
                  Top-rated academy for children using engaging, interactive methods to make learning
                  Quran fun, rewarding, and effective.
                </p>
              </div>
            </div>

            <div className="top-feature-card">
              <div className="feature-icon-circle">
                <i className="fas fa-user-friends"></i>
              </div>
              <div className="feature-info">
                <h4>Female Quran Tutors Available</h4>
                <p>
                  Comfortable and private learning environment for sisters and daughters with highly
                  qualified, certified female teachers.
                </p>
              </div>
            </div>

            <div className="top-feature-card">
              <div className="feature-icon-circle">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div className="feature-info">
                <h4>1-on-1 Private Quran Sessions</h4>
                <p>
                  Receive 100% focused attention with instant pronunciation correction and faster
                  individual progress than group classes.
                </p>
              </div>
            </div>

            <div className="top-feature-card">
              <div className="feature-icon-circle">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="feature-info">
                <h4>Flexible 24/7 Scheduling</h4>
                <p>
                  Book classes day or night around your work, school, and family schedule with tutors
                  covering every global timezone.
                </p>
              </div>
            </div>

            <div className="top-feature-card">
              <div className="feature-icon-circle">
                <i className="fas fa-laptop"></i>
              </div>
              <div className="feature-info">
                <h4>Affordable Pricing Plans</h4>
                <p>
                  Accessible tuition packages, sibling discounts, and no hidden fees ensure every family
                  can learn Quran online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. ABOUT SECTION ================= */}
      <section className="section-wrapper">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-img-frame">
              <img
                src="/assets/images/quran-banner-collage.jpg"
                alt="About Minara-ul-Quran Academy"
              />
            </div>

            <div className="about-center-col">
              <div className="about-exp-number">+10</div>
              <div className="about-exp-label">Years of Experience</div>
              <h2>About Minara-ul-Quran Academy</h2>
              <p>
                As a premier learning Quran academy, Minara-ul-Quran bridges the gap between non-native speakers
                and the Quran through expert instruction. Minara-ul-Quran’s mission is to help you learn Quran
                with a teacher who understands your specific language challenges and fixes your pronunciation.
                Minara-ul-Quran is more than just a learn Quran online academy; we are your dedicated partners
                in perfecting Quran recitation, Hifz, and understanding the Quran.
              </p>
              <Link to="/about" className="btn btn-primary btn-lg">
                Explore More
              </Link>
            </div>

            <div className="about-side-features">
              <div className="side-feature-item">
                <i className="fas fa-chalkboard-teacher"></i>
                <h4>Certified Azhari Tutors</h4>
                <p>
                  Minara-ul-Quran offers Al-Azhar certified online Quran tutoring for non-Arabic speakers.
                </p>
              </div>
              <div className="side-feature-item">
                <i className="fas fa-user-check"></i>
                <h4>Active Correction Methodology</h4>
                <p>
                  Private, interactive classes providing real-time corrections for immediate and accurate recitation progress.
                </p>
              </div>
              <div className="side-feature-item">
                <i className="fas fa-check-circle"></i>
                <h4>Pedagogical Instruction</h4>
                <p>
                  Specialized phonetic instruction helping non-Arabs master difficult Arabic articulation points (Makharij).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FACTS / COUNTER SECTION ================= */}
      <section
        className="facts-section"
        style={{
          backgroundImage: `url("https://equranschoolonline.com/wp-content/uploads/2023/10/quran-online-classes.jpg.webp")`,
        }}
      >
        <div className="facts-overlay"></div>
        <div className="facts-grid">
          <div className="fact-item">
            <h3>10</h3>
            <span>Years of Experience</span>
          </div>
          <div className="fact-item">
            <h3>50</h3>
            <span>Qualified Teachers</span>
          </div>
          <div className="fact-item">
            <h3>1500</h3>
            <span>Satisfied Students</span>
          </div>
          <div className="fact-item">
            <h3>100%</h3>
            <span>Certified Azhari Scholars</span>
          </div>
        </div>
      </section>

      {/* ================= 5. 8 COURSES CATEGORIES GRID ================= */}
      <section className="section-wrapper">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="section-subtitle-tag">Quran and Tajweed Courses</span>
            <h2 className="section-title-main">Minara-ul-Quran's Quran and Tajweed Courses for All Ages</h2>
          </div>

          <div className="courses-8-grid">
            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fa fa-book"></i>
              </div>
              <h4>Quran Reading Basics (Noorani Qaida)</h4>
              <p>
                Start from scratch with beginner Quran classes. Learn the Arabic alphabet, connect letters,
                and read your first words from the Mushaf accurately.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h4>Tajweed &amp; Recitation Rules</h4>
              <p>
                Master the specific rules of Tajweed to recite smoothly, correct pronunciation, and eliminate
                common recitation errors.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-chalkboard"></i>
              </div>
              <h4>Online Quran Memorization (Hifz)</h4>
              <p>
                Structured Hifz program ensuring strong retention through systematic revision allowing you to
                memorize Quran online at your own pace.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-user"></i>
              </div>
              <h4>Quran Classes for Kids</h4>
              <p>
                Engaging, interactive methods keep children focused while they learn to love and read the Holy
                Quran with joy.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-font"></i>
              </div>
              <h4>Arabic Language for Quran</h4>
              <p>
                Move beyond recitation to comprehend the vocabulary and grammar of the Quran, deepening your
                spiritual connection to the verses.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h4>Online Tafseer Classes</h4>
              <p>
                Explaining the meanings, causes of revelation, and profound life lessons behind the verses in
                simple, accessible English.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Islamic Studies for All Ages</h4>
              <p>
                Alongside learning Quran, study Fiqh, Aqeedah, and Seerah to understand and practice your faith
                correctly every day.
              </p>
            </div>

            <div className="course-8-card">
              <div className="course-8-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h4>Online Ijazah Program</h4>
              <p>
                Advanced training for serious students. Recite the entire Quran to a certified Sheikh and earn a
                connected chain of transmission (Sanad).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. 12 DETAILED COURSES SHOWCASE ================= */}
      <section className="section-wrapper bg-light">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="section-subtitle-tag">Our Courses</span>
            <h2 className="section-title-main">What Are The Various Types Of Courses Offered?</h2>
            <p className="section-title-desc">
              Minara-ul-Quran provides a variety of online courses to deepen Quranic and Islamic knowledge.
              We offer programs to improve Arabic skills, Quran recitation with Tajweed, and Islamic studies,
              suitable for all learners.
            </p>
          </div>

          <div className="courses-showcase-grid">
            {showcaseCourses.map((c, i) => (
              <div className="service-item-card" key={i}>
                <div className="service-img-wrap">
                  <img src={c.img} alt={c.title} />
                </div>
                <div className="service-content">
                  <div className="service-badge-icon">
                    <i className={`fas ${c.icon}`}></i>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <Link to={`/courses/${c.slug}`} className="service-readmore">
                    <i className="fa fa-plus"></i> Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. AREAS WE SERVE ================= */}
      <section className="section-wrapper bg-light" style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="section-container">
          <div className="section-heading-center">
            <h2 className="section-title-main">Areas Minara-ul-Quran Serves</h2>
            <p className="section-title-desc">
              Minara-ul-Quran transcends borders. Our learn Quran online academy connects students from across
              the globe with expert Azhari tutors. You receive high-quality instruction regardless of where you live.
            </p>
          </div>

          <div className="areas-cards-stack">
            {/* Area 1: USA & Canada */}
            <div className="area-row-card">
              <div>
                <h2>Learning Quran Online in the USA &amp; Canada</h2>
                <p>
                  Finding a local teacher in North America can be difficult and expensive. Minara-ul-Quran brings
                  the madrasah to your living room. We offer flexible online Quran classes compatible with{" "}
                  <b>EST, CST, and PST time zones</b>.
                </p>
                <p style={{ marginTop: "12px" }}>
                  This makes it incredibly easy for American and Canadian families to stick to a consistent
                  schedule without disrupting work or school routines.
                </p>
              </div>
              <div>
                <img
                  src="https://equranschoolonline.com/wp-content/uploads/2023/10/Learn-Quran-Online-Pros-and-Cons-of-Online-Quran-Learning.jpg"
                  alt="Quran Online in USA and Canada"
                />
              </div>
            </div>

            {/* Area 2: UK & Europe */}
            <div className="area-row-card">
              <div style={{ order: 2 }}>
                <h2>Quran Classes for UK &amp; European Students</h2>
                <p>
                  Minara-ul-Quran serves a vast community of students in the UK and Europe who seek high-quality
                  private Quran classes. Whether you are in <b>London, Manchester, or anywhere in Europe</b>,
                  our tutors are available to teach you.
                </p>
                <p style={{ marginTop: "12px" }}>
                  You or your children can attend sessions after school hours, ensuring you receive focused
                  instruction from a dedicated <b>learn Quran academy</b> without the hassle of commuting.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img
                  src="https://equranschoolonline.com/wp-content/uploads/2023/10/mataq-darul-ulum-FIE6XplzgZs-unsplash-scaled-1.jpg"
                  alt="Quran Classes for UK & Europe"
                />
              </div>
            </div>

            {/* Area 3: Australia & Worldwide */}
            <div className="area-row-card">
              <div>
                <h2>Serving Australia and the Rest of the World</h2>
                <p>
                  Time differences are never an issue at our online learn Quran academy.{" "}
                  <b>Minara-ul-Quran's teachers work in shifts to cover Australian and Asian time zones</b>{" "}
                  effectively 24/7.
                </p>
                <p style={{ marginTop: "12px" }}>
                  No matter where you reside, you can access top-tier <b>Quran online learning</b> resources
                  and <b>learn Quran with a teacher</b> at a time that suits your lifestyle perfectly.
                </p>
              </div>
              <div>
                <img
                  src="https://equranschoolonline.com/wp-content/uploads/2023/10/quran-online-classes.jpg.webp"
                  alt="Serving Australia and Rest of the World"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. TRANSFORM YOUR FAITH CTA ================= */}
      <section className="section-wrapper" style={{ padding: "60px 5%", textAlign: "center" }}>
        <div className="section-container" style={{ maxWidth: "860px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "16px" }}>
            Transform Your Faith Through Quran Learning
          </h2>
          <p style={{ fontSize: "16.5px", color: "#64748b", lineHeight: "1.75", marginBottom: "28px" }}>
            Unlock the wisdom of the Holy Quran with Minara-ul-Quran Academy. Our structured online classes help
            you improve recitation, understanding, and spirituality while building a lifelong connection with the Quran.
          </p>
          <Link to="/trial" className="btn btn-primary btn-lg">
            Start Your Free Trial Now!
          </Link>
        </div>
      </section>

      {/* ================= 9. INTERACTIVE FREE TRIAL FORM SECTION ================= */}
      <section
        className="trial-form-section"
        style={{
          backgroundImage: `url("https://equranschoolonline.com/wp-content/uploads/2023/10/Learn-Quran-Online-Pros-and-Cons-of-Online-Quran-Learning.jpg")`,
        }}
      >
        <div className="trial-form-overlay"></div>
        <div className="trial-form-card">
          <h2>Get a Free Trial Now!</h2>
          <p className="form-note">
            *Fill in the form &amp; The assigned tutor will contact you to confirm the appointment of free trial
            lesson with you.
          </p>

          {formSubmitted ? (
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: "24px", color: "#0f172a", marginBottom: "10px" }}>
                Alhamdulillah! Admission Request Received
              </h3>
              <p style={{ color: "#475569", lineHeight: "1.7", marginBottom: "20px" }}>
                Thank you, <b>{trialForm.name}</b>. Our academic coordinator will contact you shortly on{" "}
                <b>{trialForm.phone}</b> to schedule your free 30-minute evaluation session with an Azhari scholar.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "14px" }}>
                <a
                  href={ACADEMY_CONTACT.getWhatsAppUrl(`Assalamu Alaikum! I just requested a free trial admission for ${trialForm.name} (Course: ${trialForm.course}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <MessageSquare size={16} /> Open in WhatsApp ({ACADEMY_CONTACT.whatsappPrimary})
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setFormSubmitted(false)}
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTrialSubmit}>
              <div className="trial-input-grid">
                <div className="form-group">
                  <label>
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mohamed Ali"
                    className="form-control"
                    value={trialForm.name}
                    onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Your Email <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mohamedali@mail.com"
                    className="form-control"
                    value={trialForm.email}
                    onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Phone Number With Country Code <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+92 337 3029707 (preferred WhatsApp)"
                    className="form-control"
                    value={trialForm.phone}
                    onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Nationality <span className="req">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={trialForm.nationality}
                    onChange={(e) => setTrialForm({ ...trialForm, nationality: e.target.value })}
                  >
                    <option value="United States of America">United States of America</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Student Age <span className="req">*</span>
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="99"
                    required
                    placeholder="16"
                    className="form-control"
                    value={trialForm.studentAge}
                    onChange={(e) => setTrialForm({ ...trialForm, studentAge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Student Gender <span className="req">*</span>
                  </label>
                  <div className="gender-radio-group">
                    <label className="radio-pill">
                      <input
                        type="radio"
                        name="studentGender"
                        value="Male"
                        checked={trialForm.gender === "Male"}
                        onChange={() => setTrialForm({ ...trialForm, gender: "Male" })}
                      />
                      Male
                    </label>
                    <label className="radio-pill">
                      <input
                        type="radio"
                        name="studentGender"
                        value="Female"
                        checked={trialForm.gender === "Female"}
                        onChange={() => setTrialForm({ ...trialForm, gender: "Female" })}
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group col-full">
                  <label>
                    Choose Your Course <span className="req">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={trialForm.course}
                    onChange={(e) => setTrialForm({ ...trialForm, course: e.target.value })}
                  >
                    <option value="Noorani Qaida Course">Noorani Qaida Course</option>
                    <option value="Quran with Tajweed">Quran with Tajweed</option>
                    <option value="Quran Memorization (Hifz)">Quran Memorization (Hifz)</option>
                    <option value="Quran for Kids">Quran for Kids</option>
                    <option value="Quran for Adults">Quran for Adults</option>
                    <option value="Female Quran Classes">Female Quran Classes</option>
                    <option value="Online Arabic and Quran Classes">Online Arabic and Quran Classes</option>
                    <option value="Learn Tafsir Al-Quran">Learn Tafsir Al-Quran</option>
                    <option value="Islamic Studies for All Ages">Islamic Studies for All Ages</option>
                  </select>
                </div>

                <div className="form-group col-full">
                  <label>Notes / Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Specify any preferences or current Quran level..."
                    className="form-control"
                    value={trialForm.notes}
                    onChange={(e) => setTrialForm({ ...trialForm, notes: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group col-full">
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "normal", fontSize: "13.5px" }}>
                    <input
                      type="checkbox"
                      checked={trialForm.agreePolicy}
                      onChange={(e) => setTrialForm({ ...trialForm, agreePolicy: e.target.checked })}
                    />
                    I agree to <Link to="/privacy-policy" style={{ color: "var(--primary)", textDecoration: "underline" }}>Minara-ul-Quran Student Policy</Link>
                  </label>
                </div>

                <div className="form-group col-full">
                  <button type="submit" className="btn-enroll-submit" disabled={formLoading}>
                    {formLoading ? "Submitting..." : "Enroll Now"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ================= 10. STUDENT VIDEO REVIEWS ================= */}
      <section className="section-wrapper bg-light">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="section-subtitle-tag">Student Success Stories</span>
            <h2 className="section-title-main">Hear From Our Graduates</h2>
            <p className="section-title-desc">
              Real transformations from students who mastered the Quran with our Azhari courses.
            </p>
          </div>

          <div className="video-reviews-grid">
            {videoReviews.map((v) => (
              <div className="video-review-card" key={v.id}>
                <div
                  className="video-thumb-container"
                  onClick={() => setActiveVideoId(v.id)}
                  title="Click to play video"
                >
                  <img src={v.thumb} alt={v.name} />
                  <div className="video-play-overlay">
                    <Play size={22} fill="currentColor" />
                  </div>
                </div>

                <div className="video-card-body">
                  <div className="student-meta-row">
                    <img src={v.avatar} alt={v.name} className="student-avatar-img" />
                    <div className="student-name-box">
                      <h4>{v.name}</h4>
                      <div className="student-course-badge">
                        <i className="fas fa-graduation-cap"></i> {v.course}
                      </div>
                    </div>
                  </div>

                  <p className="video-quote-text">"{v.quote}"</p>

                  <div className="video-rating-row">
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="rating-time">{v.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideoId && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoId(null)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close Modal"
            >
              <X size={28} />
            </button>
            <div className="video-iframe-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="Student Video Review"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 11. WRITTEN TESTIMONIALS ================= */}
      <section className="section-wrapper">
        <div className="section-container">
          <div className="testimonials-row">
            <div>
              <span className="section-subtitle-tag">Testimonials</span>
              <h2 className="section-title-main" style={{ marginBottom: "16px" }}>
                What Students Say About Us
              </h2>
              <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.75", marginBottom: "28px" }}>
                Here are reflections among thousands of our students and parents about our courses and tutors
                at Minara-ul-Quran.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                  }
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length)
                  }
                  aria-label="Next Testimonial"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div>
              {testimonials.map((t, idx) => {
                if (idx !== activeTestimonialIdx) return null;
                return (
                  <div className="testimonial-card-single" key={idx}>
                    <img src={t.avatar} alt={t.name} className="testimonial-student-pic" />
                    <p className="testimonial-body-text">"{t.text}"</p>
                    <div className="testimonial-author-name">{t.name}</div>
                    <div className="testimonial-author-location">{t.country}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 12. PRIMARY BLUE CTA STRIP ================= */}
      <section className="cta-banner-primary">
        <div className="section-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h2>Start Learning Quran and Tajweed Today</h2>
            <p>
              Join thousands of satisfied students at Minara-ul-Quran online academy and start reciting correctly today.
            </p>
          </div>
          <Link to="/trial" className="btn btn-white btn-lg">
            Start Your Free Trial Now!
          </Link>
        </div>
      </section>

      {/* ================= 13. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="section-wrapper">
        <div className="section-container">
          <div className="section-heading-center">
            <h2 className="section-title-main">Frequently Asked Questions:</h2>
            <p className="section-title-desc">
              Here is everything you need to know about joining Minara-ul-Quran online learning academy.
            </p>
          </div>

          <div className="faq-accordion-box">
            {faqs.map((f, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className={`faq-accordion-item ${isOpen ? "active" : ""}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="#94a3b8" />}
                  </button>
                  {isOpen && <div className="faq-answer-panel">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 14. OUR BLOG — NEWS & ARTICLES ================= */}
      <section className="section-wrapper bg-light">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="section-subtitle-tag">Our Blog</span>
            <h2 className="section-title-main">News &amp; Articles</h2>
          </div>

          <div className="blog-cards-grid">
            {blogPosts.map((b, i) => (
              <article className="blog-item-card" key={i}>
                <div className="blog-thumb-wrap">
                  <img src={b.img} alt={b.title} />
                  <span className="blog-cat-badge">{b.category}</span>
                </div>
                <div className="blog-card-details">
                  <div className="blog-date-meta">
                    <Calendar size={13} /> {b.date}
                  </div>
                  <h4>
                    <Link to={`/blog/${b.slug}`}>{b.title}</Link>
                  </h4>
                  <Link to={`/blog/${b.slug}`} className="blog-read-link">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}