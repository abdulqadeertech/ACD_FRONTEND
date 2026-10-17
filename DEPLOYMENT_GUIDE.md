# Production Deployment & Setup Guide
### Minara-ul-Quran (Minaratul Quran Academy) SaaS Ecosystem

This document provides complete instructions for deploying the **Minara-ul-Quran Academy** web platform to production.

---

## 1. Verified Contact Configuration

All contact points (Website Header, Footer, Contact Page, Free Trial booking, Floating WhatsApp widget, and Admin Configuration) are configured with your exact details:

* **Primary WhatsApp / Call**: `+92 337 3029707` (Link: `https://wa.me/923373029707`)
* **Secondary WhatsApp / Call**: `+92 327 3726496` (Link: `https://wa.me/923273726496`)
* **Admissions Email**: `aq0871633@gmail.com`

---

## 2. Architecture Overview

* **Frontend**: React 19 + Vite 7 + React Router 7 (`/frontend`)
* **Backend**: Node.js v18+ + Express 5 + Mongoose 9 (`/backend`)
* **Database**: MongoDB (Supports MongoDB Atlas cloud or fallback in-memory database)

---

## 3. Deployment Options

### Option A: Standard Decoupled Deployment (Recommended)
* **Frontend**: Deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
* **Backend**: Deploy on [Render](https://render.com) or [Railway](https://railway.app)
* **Database**: Free cloud database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### 1. Setup Cloud Database (MongoDB Atlas)
1. Create a free M0 cluster on [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User with username & password.
3. In "Network Access", allow access from anywhere (`0.0.0.0/0`).
4. Copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/noor_academy?retryWrites=true&w=majority`

#### 2. Deploy Backend (e.g. Render / Railway)
1. Push this repository to GitHub.
2. On Render.com, create a **New Web Service**:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
3. Add Environment Variables:
   * `NODE_ENV`: `production`
   * `PORT`: `5000` (or leave default on Render)
   * `MONGO_URI`: Your MongoDB Atlas URI
   * `JWT_SECRET`: A secure random 32+ character string
   * `CLIENT_URL`: `*` (or your frontend domain e.g. `https://your-academy.vercel.app`)
   * `CONTACT_EMAIL`: `aq0871633@gmail.com`
   * `WHATSAPP_PRIMARY`: `+923373029707`
   * `WHATSAPP_SECONDARY`: `+923273726496`
4. Deploy! Your API URL will be e.g. `https://your-api.onrender.com`.

#### 3. Deploy Frontend (e.g. Vercel)
1. On Vercel.com, click **Add New Project** and select your GitHub repo.
2. In Project Settings:
   * **Root Directory**: `frontend`
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Add Environment Variable:
   * `VITE_API_URL`: `https://your-api.onrender.com/api`
4. Deploy!

---

### Option B: Single Service Monorepo (Render / Railway / VPS / EC2)
The backend is equipped to automatically serve the compiled frontend (`frontend/dist`) on the same port!

1. **Build Command**: `npm run build` (builds the frontend)
2. **Start Command**: `npm start` (starts the backend)
3. Set `MONGO_URI` and `JWT_SECRET` in environment variables.
4. When accessed, the root `/` will serve the React UI and `/api/*` handles all backend API requests seamlessly without CORS issues!

---

## 4. Default Accounts (Seeded)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@nooracademy.com` | `Admin123!` |
| **Teacher (Qari)** | `teacher@nooracademy.com` | `Teacher123!` |
| **Parent** | `parent@nooracademy.com` | `Parent123!` |
| **Student** | `student@nooracademy.com` | `Student123!` |

---

## 5. Automated Verification Checklist

Run from your terminal:
```bash
# 1. Platform & database test suite
npm run test

# 2. Frontend compilation check
npm run build
```
Both commands are tested and verified with 100% pass rates.
