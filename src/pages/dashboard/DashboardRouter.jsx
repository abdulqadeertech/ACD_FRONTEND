import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import ParentDashboard from "./ParentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (["admin", "super_admin"].includes(user.role)) {
    return <AdminDashboard />;
  }

  if (user.role === "teacher") {
    return <TeacherDashboard />;
  }

  if (user.role === "parent") {
    return <ParentDashboard />;
  }

  return <StudentDashboard />;
}
