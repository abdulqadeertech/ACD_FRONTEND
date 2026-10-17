# NOOR QURAN ACADEMY (نُورُ الْقُرْآن)
### VIP Master Islamic Education Platform — Production-Ready SaaS Ecosystem

> **بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ**  
> *"Learn Quran. Understand Islam. Live with Noor."*  
> *"The best among you are those who learn the Quran and teach it."* (Sahih Al-Bukhari 5027)

---

## 1. Project Overview

**Noor Quran Academy** is a comprehensive, production-grade international Online Quran Academy platform and School Management System. Engineered for students and families across the **UK, USA, Canada, Australia, UAE, Saudi Arabia, Pakistan, and Europe**, it blends authentic Islamic traditions with modern educational software engineering.

The platform eliminates cheap templates and beginner-level code, delivering a real software product crafted with deep reverence for the Holy Quran, authentic Tajweed standards, and rigorous child-safeguarding protocols.

---

## 2. Key Features

### A. Public Admissions & Portal
* **13 Accredited Programs**: Noorani Qaida, Nazra Quran, Quran with Tajweed, Hifz-ul-Quran, Quran Translation, Quran Tafseer, Arabic Language, Islamic Studies, Namaz & Masnoon Duas, Basic Islamic Education, Hadith Studies, Seerah of Prophet Muhammad ﷺ, and Islamic Manners & Character Building (Adab).
* **Multi-Step Free Trial Booking Engine**: Capture student age, gender, Quran background, preferred days, time-of-day, timezone auto-detection, male/female teacher preferences, and WhatsApp notifications.
* **Verified Teacher Directory**: Showcase authentic Ijazah and Sanad credentials, educational background (Shahadat-ul-Alimiyyah), years of experience, ratings, and language fluencies.
* **Interactive Tuition Calculator**: Currency converter supporting **USD ($), GBP (£), EUR (€), CAD (CA$), AUD (A$), AED, and PKR (Rs)** with 15% automatic sibling discounts.
* **Digital Certificate Verification**: Instant public certificate validator at `/verify-certificate/:id` with cryptographic SHA-256 validation.
* **Islamic Articles & Blog CMS**: Categorized library covering Tajweed, Hifz habits, prophetic Duas, and Islamic parenting.
* **Persistent WhatsApp Support**: Instant floating direct chat launcher.

### B. Role-Based Dashboards
1. **Student Hub (`/dashboard/student`)**:
   * Next scheduled class countdown & 1-click meeting join button (Google Meet/Zoom).
   * Attendance tracker percentage & learning streak.
   * Homework targets & teacher feedback.
   * Monthly report card viewer with download options.
   * Verified digital diplomas.

2. **Parent Guardian Portal (`/dashboard/parent`)**:
   * **Multi-Child Switcher**: Effortlessly toggle between enrolled children on one account.
   * Daily attendance logs & teacher notes.
   * Monthly report cards grading Reading, Tajweed, Memorization, Revision, and Islamic Adab.
   * Invoices, receipts, and payment history.

3. **Teacher Academic Portal (`/dashboard/teacher`)**:
   * Daily classroom schedule with 1-click Google Meet links.
   * **1-Click Attendance Desk**: Mark `Present`, `Absent`, `Late`, or `Excused`.
   * Lesson notes & homework assigner.
   * **Monthly Report Builder**: Grade students on Reading, Tajweed, Memorization, Revision, and Adab.

4. **Executive Admin SaaS Center (`/dashboard/admin`)**:
   * Executive KPI analytics (Total Students, Active Teachers, Pending Trials, Monthly Revenue).
   * **Free Trial Pipeline**: Kanban/Table management (`New` → `Contacted` → `Scheduled` → `Completed` → `Converted` → `Cancelled`).
   * User directory (search, role modification, account suspension/activation).
   * Teacher verification and application approval desk.
   * Live timetable schedule ledger.
   * Tuition ledger & financial records.
   * Support desk ticket system.
   * Platform system settings.

---

## 3. Technology Stack

* **Frontend**:
  * React 19 + Vite 7
  * React Router 7
  * Lucide React (Clean feather-style icons)
  * Axios (HTTP client with JWT request/response interceptors)
  * Modern Responsive CSS (Design System with Islamic Emerald & Gold aesthetic)
* **Backend**:
  * Node.js (v25+) & Express.js 5
  * Mongoose 9 & MongoDB (with automatic in-memory fallback for zero-friction local development)
  * JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
  * Security: `helmet`, `cors`, `express-rate-limit`
* **Abstractions Ready**:
  * Classroom Video Provider: Google Meet, Zoom, MS Teams
  * Payment Gateways: Stripe, PayPal, Bank Wire, JazzCash, Easypaisa

---

## 4. Folder Structure

```
noor-quran-academy/
├── backend/
│   ├── src/
│   │   ├── config/             # DB connection with resilient fallback, env setup
│   │   ├── middleware/         # auth (JWT & RBAC), error handlers
│   │   ├── models/             # 14 Mongoose Schemas (User, Course, Trial, Booking, etc.)
│   │   ├── routes/             # Modular REST routers (auth, courses, trials, admin, etc.)
│   │   ├── seed.js             # Rich authentic Islamic demo seeder
│   │   ├── server.js           # Server entry point
│   │   └── test-platform.js    # Automated platform verification suite
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api.js              # Axios client with interceptors
│   │   ├── components/         # Navbar, Footer, Bismillah motifs
│   │   ├── context/            # AuthContext (reactive user session)
│   │   ├── pages/
│   │   │   ├── public/         # 16 Public pages (Home, Courses, Teachers, Trial, etc.)
│   │   │   ├── auth/           # Login, Register, ApplyTeacher
│   │   │   └── dashboard/      # Student, Parent, Teacher, Admin dashboards
│   │   ├── index.css           # Complete Islamic design system & responsive styling
│   │   ├── App.jsx             # Comprehensive routing
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 5. Installation & Setup

### Prerequisites
* Node.js (v18 or higher; v25 recommended)
* npm (v9 or higher)

### Step 1: Backend Setup
```bash
cd backend
npm install
copy .env.example .env
```

Your `.env` file contains:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/noor_academy
JWT_SECRET=local_development_secret_change_before_production
CLIENT_URL=http://localhost:5173
```
> **Resilient Database Note**: If you have a local MongoDB running at `27017`, it connects immediately. If not, the backend automatically boots an internal in-memory MongoDB instance with full persistence for your session!

### Step 2: Seed the Database
```bash
npm run seed
```
This populates the 13 courses, verified teachers, trials, classes, progress reports, certificates, and demo accounts.

### Step 3: Run the Automated Verification Suite
```bash
node src/test-platform.js
```
Expected output:
```
====================================================
   NOOR QURAN ACADEMY — AUTOMATED PLATFORM TEST
====================================================
[PASS] Courses Catalog Count: 13 (Expected: 13)
[PASS] User Registry Count: 10
[PASS] User Roles Verified: admin, super_admin, teacher, parent, student
[PASS] Free Trials Seeded: 3
[PASS] Scheduled Classes: 2
[PASS] Digital Certificate Verified: ID NQA-2026-8841 for Zayd Mahmood (Mumtaz - 94%)
[PASS] Monthly Progress Report: Score 91% Grade A+
====================================================
   ALL SYSTEM AND DATA VALIDATIONS PASSED 100%!
====================================================
```

### Step 4: Start the Backend Server
```bash
npm run dev
# API running at: http://localhost:5000
```

### Step 5: Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
# Web application running at: http://localhost:5173
```

---

## 6. Pre-Seeded Demo Accounts (1-Click Login Ready)

You can log in manually or use the **1-Click Quick Demo Login** buttons on `/login`:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@nooracademy.com` | `Admin123!` | Full Operations, Trial Pipeline, User Management, Approvals |
| **Teacher (Qari)** | `teacher@nooracademy.com` | `Teacher123!` | Classroom schedule, 1-Click Attendance, Issue Monthly Reports |
| **Parent** | `parent@nooracademy.com` | `Parent123!` | Multi-child switcher (Zayd & Aisha), Attendance, Report Cards, Invoices |
| **Student** | `student@nooracademy.com` | `Student123!` | Live Google Meet join, Homework, Report cards, Verified Diplomas |

---

## 7. Production Build

To compile the optimized production bundle:
```bash
cd frontend
npm run build
```
Creates `/dist` ready for static deployment on Vercel, Netlify, Cloudflare Pages, AWS S3, or Nginx.

---

## 8. Brand Statement

**NOOR QURAN ACADEMY**  
*"Learn Quran. Understand Islam. Live with Noor."*  
All rights reserved © 2026.
