import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import CoursesPage from "./pages/public/CoursesPage";
import CourseDetailPage from "./pages/public/CourseDetailPage";
import TeachersPage from "./pages/public/TeachersPage";
import TeacherProfilePage from "./pages/public/TeacherProfilePage";
import HowItWorksPage from "./pages/public/HowItWorksPage";
import PricingPage from "./pages/public/PricingPage";
import TrialPage from "./pages/public/TrialPage";
import TestimonialsPage from "./pages/public/TestimonialsPage";
import FaqPage from "./pages/public/FaqPage";
import BlogPage from "./pages/public/BlogPage";
import BlogPostPage from "./pages/public/BlogPostPage";
import ContactPage from "./pages/public/ContactPage";
import VerifyCertificatePage from "./pages/public/VerifyCertificatePage";
import BecomeTeacherPage from "./pages/public/BecomeTeacherPage";
import {
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage,
} from "./pages/public/LegalPages";

// Marketplace Pages
import FindTeacherPage from "./pages/marketplace/FindTeacherPage";
import TeacherCvPage from "./pages/marketplace/TeacherCvPage";
import BookTeacherPage from "./pages/marketplace/BookTeacherPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ApplyTeacherPage from "./pages/auth/ApplyTeacherPage";

// Dashboards & In-App Messages
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ParentDashboard from "./pages/dashboard/ParentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import MessagesPage from "./pages/dashboard/MessagesPage";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/:id" element={<TeacherProfilePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/trial" element={<TrialPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
            <Route path="/verify-certificate/:id" element={<VerifyCertificatePage />} />
            <Route path="/become-a-teacher" element={<BecomeTeacherPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />

            {/* Teacher Marketplace & Dual Timezone Scheduler */}
            <Route path="/find-teacher" element={<FindTeacherPage />} />
            <Route path="/teachers/:id/cv" element={<TeacherCvPage />} />
            <Route path="/book/:teacherId" element={<BookTeacherPage />} />

            {/* Authentication & Application */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/apply-teacher" element={<ApplyTeacherPage />} />

            {/* In-App Messaging */}
            <Route path="/messages" element={<MessagesPage />} />

            {/* Role-Based Dashboards */}
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/parent" element={<ParentDashboard />} />
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </LanguageProvider>
  );
}
