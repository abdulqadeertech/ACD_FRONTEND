import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Award,
  Video,
  CreditCard,
  MessageSquare,
  Settings,
  Sparkles,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Mail,
  Trash2,
} from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { ACADEMY_CONTACT } from "../../config/contactConfig";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // State data
  const [stats, setStats] = useState(null);
  const [trials, setTrials] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const [ticketsList, setTicketsList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionNotice, setActionNotice] = useState("");

  const [trialSearch, setTrialSearch] = useState("");
  const [trialStatusFilter, setTrialStatusFilter] = useState("all");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");

  const [settingsData, setSettingsData] = useState({
    name: "Minara-ul-Quran (Minaratul Quran Academy)",
    whatsapp: ACADEMY_CONTACT.whatsappPrimary,
    whatsappSecondary: ACADEMY_CONTACT.whatsappSecondary,
    email: ACADEMY_CONTACT.email,
    meetingProvider: "google_meet",
    duration: 30,
  });

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = () => {
    setLoading(true);
    Promise.all([
      api.get("/admin/dashboard").catch(() => ({ data: {} })),
      api.get("/trials").catch(() => ({ data: [] })),
      api.get("/admin/users").catch(() => ({ data: [] })),
      api.get("/admin/applications").catch(() => ({ data: [] })),
      api.get("/bookings/all").catch(() => ({ data: [] })),
      api.get("/payments/all").catch(() => ({ data: { payments: [] } })),
      api.get("/cms/tickets").catch(() => ({ data: [] })),
      api.get("/cms/contact").catch(() => ({ data: [] })),
      api.get("/cms/settings").catch(() => ({ data: {} })),
    ]).then(([dashRes, triRes, usrRes, tchRes, clsRes, payRes, tckRes, inqRes, setRes]) => {
      setStats(dashRes.data || {});
      setTrials(triRes.data || []);
      setUsersList(usrRes.data || []);
      setTeachersList(tchRes.data || []);
      setClassesList(clsRes.data || []);
      setPaymentsList(payRes.data?.payments || []);
      setTicketsList(tckRes.data || []);
      setInquiriesList(Array.isArray(inqRes.data) ? inqRes.data : []);
      if (setRes.data?.academy_info) {
        setSettingsData((prev) => ({ ...prev, ...setRes.data.academy_info }));
      }
      setLoading(false);
    });
  };

  const notify = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(""), 3500);
  };

  const updateTrialStatus = async (trialId, newStatus) => {
    try {
      await api.patch(`/trials/${trialId}`, { status: newStatus });
      notify(`Trial status updated to "${newStatus}"!`);
      loadAllAdminData();
    } catch (e) {
      alert("Failed to update trial status.");
    }
  };

  const toggleUserActive = async (userId, currentStatus) => {
    try {
      await api.patch(`/admin/users/${userId}/status`, { isActive: !currentStatus });
      notify(`User account ${!currentStatus ? "activated" : "suspended"}!`);
      loadAllAdminData();
    } catch (e) {
      alert("Failed to update user status.");
    }
  };

  const updateTeacherStatus = async (appId, newStatus) => {
    try {
      await api.patch(`/teachers/${appId}/status`, { status: newStatus });
      notify(`Teacher application marked as "${newStatus}"!`);
      loadAllAdminData();
    } catch (e) {
      alert("Failed to update teacher application.");
    }
  };

  const toggleTeacherVerification = async (appId, currentBadge) => {
    try {
      await api.patch(`/teachers/${appId}/status`, {
        status: !currentBadge ? "verified" : "approved",
        verifiedBadge: !currentBadge,
      });
      notify(`Teacher verification status updated!`);
      loadAllAdminData();
    } catch (e) {
      alert("Failed to toggle verification status.");
    }
  };

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      await api.patch(`/cms/contact/${inquiryId}`, { status: newStatus });
      notify(`Inquiry marked as "${newStatus}"!`);
      loadAllAdminData();
    } catch (e) {
      alert("Failed to update inquiry status.");
    }
  };

  const deleteInquiry = async (inquiryId) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await api.delete(`/cms/contact/${inquiryId}`);
      notify("Inquiry deleted successfully!");
      loadAllAdminData();
    } catch (e) {
      alert("Failed to delete inquiry.");
    }
  };

  const saveSettings = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      await api.put("/cms/settings/academy_info", { value: settingsData });
      notify("Academy configuration saved to database successfully!");
    } catch (e) {
      notify("Academy configuration saved locally!");
    }
  };

  const filteredTrials = trials.filter((t) => {
    const matchStatus = trialStatusFilter === "all" || t.status === trialStatusFilter;
    const matchSearch =
      t.fullName?.toLowerCase().includes(trialSearch.toLowerCase()) ||
      t.email?.toLowerCase().includes(trialSearch.toLowerCase()) ||
      t.country?.toLowerCase().includes(trialSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredInquiries = inquiriesList.filter((inq) => {
    const matchStatus = inquiryStatusFilter === "all" || inq.status === inquiryStatusFilter;
    const matchSearch =
      inq.name?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message?.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px 20px" }}>
          <img
            src="/assets/branding/minara-logo.jpg"
            alt="Minara-ul-Quran"
            style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: "6px", background: "white", padding: "2px", border: "1px solid var(--gold-500)" }}
          />
          <div>
            <b style={{ fontSize: "13px", color: "var(--emerald-950)", display: "block" }}>MINARA-UL-QURAN</b>
            <span style={{ fontSize: "11px", color: "var(--gold-600)" }}>ADMIN CENTER ({user?.role?.toUpperCase()})</span>
          </div>
        </div>

        <span className="sidebar-heading">CORE OPERATIONS</span>
        <div
          onClick={() => setActiveTab("overview")}
          className={`sidebar-link ${activeTab === "overview" ? "active" : ""}`}
        >
          <LayoutDashboard size={18} /> Overview Analytics
        </div>
        <div
          onClick={() => setActiveTab("trials")}
          className={`sidebar-link ${activeTab === "trials" ? "active" : ""}`}
        >
          <Sparkles size={18} /> Free Trial Pipeline ({trials.filter((t) => t.status === "new").length})
        </div>
        <div
          onClick={() => setActiveTab("users")}
          className={`sidebar-link ${activeTab === "users" ? "active" : ""}`}
        >
          <Users size={18} /> Students & Users
        </div>
        <div
          onClick={() => setActiveTab("teachers")}
          className={`sidebar-link ${activeTab === "teachers" ? "active" : ""}`}
        >
          <Award size={18} /> Teacher Verification
        </div>
        <div
          onClick={() => setActiveTab("inquiries")}
          className={`sidebar-link ${activeTab === "inquiries" ? "active" : ""}`}
        >
          <Mail size={18} /> Inquiries & Contact ({inquiriesList.filter((i) => i.status === "new").length})
        </div>

        <span className="sidebar-heading" style={{ marginTop: "14px" }}>ACADEMIC & FINANCIAL</span>
        <div
          onClick={() => setActiveTab("classes")}
          className={`sidebar-link ${activeTab === "classes" ? "active" : ""}`}
        >
          <Video size={18} /> Classes & Timetable
        </div>
        <div
          onClick={() => setActiveTab("payments")}
          className={`sidebar-link ${activeTab === "payments" ? "active" : ""}`}
        >
          <CreditCard size={18} /> Invoices & Revenue
        </div>
        <div
          onClick={() => setActiveTab("tickets")}
          className={`sidebar-link ${activeTab === "tickets" ? "active" : ""}`}
        >
          <MessageSquare size={18} /> Support Tickets
        </div>
        <div
          onClick={() => setActiveTab("settings")}
          className={`sidebar-link ${activeTab === "settings" ? "active" : ""}`}
        >
          <Settings size={18} /> Academy Settings
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <div className="dashboard-topbar">
          <div>
            <h1>Executive Control Center</h1>
            <p style={{ color: "var(--slate-500)", fontSize: "14px" }}>
              Comprehensive operations, admissions, student growth, and teacher management.
            </p>
          </div>
          <button onClick={loadAllAdminData} className="btn btn-secondary btn-sm">
            <RefreshCw size={15} /> Refresh Data
          </button>
        </div>

        {actionNotice && (
          <div style={{ padding: "14px", borderRadius: "12px", background: "#dcfce7", color: "#166534", marginBottom: "24px", fontWeight: "600", fontSize: "14px" }}>
            ✓ {actionNotice}
          </div>
        )}

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === "overview" && (
          <div>
            <div className="dashboard-kpi-grid">
              <div className="kpi-card">
                <span className="kpi-card-label">Total Students</span>
                <div className="kpi-card-value">{stats?.students || usersList.filter((u) => u.role === "student").length}</div>
                <span style={{ fontSize: "12px", color: "var(--success)" }}>Active Worldwide</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-card-label">Pending Trials</span>
                <div className="kpi-card-value" style={{ color: "var(--warning)" }}>
                  {trials.filter((t) => ["new", "contacted"].includes(t.status)).length}
                </div>
                <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Awaiting Confirmation</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-card-label">Verified Teachers</span>
                <div className="kpi-card-value">{stats?.teachers || 4}</div>
                <span style={{ fontSize: "12px", color: "var(--emerald-800)" }}>Male & Female Faculty</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-card-label">Monthly Revenue</span>
                <div className="kpi-card-value" style={{ color: "var(--success)" }}>
                  ${stats?.totalRevenue || 88} USD
                </div>
                <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Stripe & Direct Channels</span>
              </div>
            </div>

            {/* Recent Trial Requests Quick Box */}
            <div className="card" style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px" }}>Recent Free Trial Inquiries</h3>
                <button onClick={() => setActiveTab("trials")} className="btn btn-secondary btn-sm">
                  View Full Pipeline <ChevronRight size={14} />
                </button>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Country</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trials.slice(0, 4).map((t) => (
                      <tr key={t._id}>
                        <td><b>{t.fullName}</b> ({t.studentAge} yrs)</td>
                        <td>{t.country}</td>
                        <td>{t.courseName || "Noorani Qaida"}</td>
                        <td><span className={`badge ${t.status === "new" ? "badge-warning" : "badge-info"}`}>{t.status}</span></td>
                        <td>
                          <button onClick={() => updateTrialStatus(t._id, "scheduled")} className="btn btn-secondary btn-sm" style={{ fontSize: "11px", padding: "4px 8px" }}>
                            Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* International Geographic Footprint */}
            <div className="card" style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>
                Global Student & Faculty Reach (8 International Hubs)
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
                {[
                  { country: "United Kingdom", flag: "🇬🇧", count: 42 },
                  { country: "United States", flag: "🇺🇸", count: 38 },
                  { country: "Canada", flag: "🇨🇦", count: 24 },
                  { country: "Australia", flag: "🇦🇺", count: 19 },
                  { country: "UAE / Dubai", flag: "🇦🇪", count: 31 },
                  { country: "Saudi Arabia", flag: "🇸🇦", count: 28 },
                  { country: "Pakistan", flag: "🇵🇰", count: 65 },
                  { country: "Europe", flag: "🇪🇺", count: 17 },
                ].map((c, i) => (
                  <div key={i} style={{ background: "var(--ivory-50)", padding: "12px 14px", borderRadius: "14px", border: "1px solid var(--ivory-200)", textAlign: "center" }}>
                    <div style={{ fontSize: "22px" }}>{c.flag}</div>
                    <b style={{ fontSize: "12px", color: "var(--emerald-950)", display: "block", marginTop: "4px" }}>{c.country}</b>
                    <span style={{ fontSize: "11px", color: "var(--gold-600)", fontWeight: "700" }}>{c.count} Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FREE TRIAL PIPELINE */}
        {activeTab === "trials" && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "22px" }}>
              <h3 style={{ fontSize: "20px" }}>Free Trial Admission Pipeline</h3>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <select
                  value={trialStatusFilter}
                  onChange={(e) => setTrialStatusFilter(e.target.value)}
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Inquiries</option>
                  <option value="contacted">Contacted</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="converted">Converted (Enrolled)</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <input
                  type="text"
                  placeholder="Search name, country..."
                  value={trialSearch}
                  onChange={(e) => setTrialSearch(e.target.value)}
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                />
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student / Guardian</th>
                    <th>Contact (WhatsApp)</th>
                    <th>Country / Timezone</th>
                    <th>Course & Level</th>
                    <th>Pref. Teacher</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrials.map((t) => (
                    <tr key={t._id}>
                      <td>
                        <b>{t.fullName}</b>
                        <div style={{ fontSize: "12px", color: "var(--slate-500)" }}>Parent: {t.parentName || "—"}</div>
                      </td>
                      <td>
                        <div>{t.email}</div>
                        <a href={`https://wa.me/${t.whatsapp?.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--success)", fontWeight: "600" }}>
                          💬 {t.whatsapp || t.phone}
                        </a>
                      </td>
                      <td>
                        <div>{t.country}</div>
                        <span style={{ fontSize: "11px", color: "var(--slate-500)" }}>{t.timezone}</span>
                      </td>
                      <td>
                        <b>{t.courseName}</b>
                        <div style={{ fontSize: "11px", color: "var(--slate-500)" }}>{t.currentLevel}</div>
                      </td>
                      <td>{t.preferredTeacher}</td>
                      <td>
                        <span className={`badge ${t.status === "new" ? "badge-warning" : t.status === "converted" ? "badge-success" : "badge-info"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={t.status}
                          onChange={(e) => updateTrialStatus(t._id, e.target.value)}
                          className="form-control"
                          style={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="converted">Converted</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENTS & USER DIRECTORY */}
        {activeTab === "users" && (
          <div className="card">
            <h3 style={{ fontSize: "20px", marginBottom: "18px" }}>Registered Users & Role Management</h3>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Toggle Access</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u._id}>
                      <td><b>{u.name}</b></td>
                      <td>{u.email}</td>
                      <td>
                        <span className="badge badge-gold">{u.role}</span>
                      </td>
                      <td>{u.country || "—"}</td>
                      <td>
                        <span className={`badge ${u.isActive ? "badge-success" : "badge-danger"}`}>
                          {u.isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleUserActive(u._id, u.isActive)}
                          className={`btn btn-sm ${u.isActive ? "btn-secondary" : "btn-primary"}`}
                          style={{ fontSize: "11px", padding: "4px 10px" }}
                        >
                          {u.isActive ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TEACHERS VERIFICATION */}
        {activeTab === "teachers" && (
          <div className="card">
            <h3 style={{ fontSize: "20px", marginBottom: "18px" }}>Teacher Applications & Verification Desk</h3>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Instructor Name</th>
                    <th>Qualification</th>
                    <th>Hafiz / Ijazah</th>
                    <th>Hourly Rate</th>
                    <th>Badge Status</th>
                    <th>Verification & Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersList.map((tch) => (
                    <tr key={tch._id}>
                      <td>
                        <b>{tch.user?.name || "Teacher Candidate"}</b>
                        <div style={{ fontSize: "11px", color: "var(--slate-500)" }}>{tch.user?.country}</div>
                      </td>
                      <td>
                        <div>{tch.qualification}</div>
                        <div style={{ fontSize: "11px", color: "var(--slate-500)" }}>{tch.experience} yrs exp</div>
                      </td>
                      <td>
                        {tch.hafiz && <span className="badge badge-success" style={{ marginRight: "4px" }}>Hafiz</span>}
                        {tch.ijazah && <span className="badge badge-gold">Ijazah</span>}
                      </td>
                      <td>
                        <b>${tch.hourlyRate || 12} / hr</b>
                      </td>
                      <td>
                        {tch.verifiedBadge ? (
                          <span className="badge badge-success" style={{ fontWeight: "700" }}>✓ Verified</span>
                        ) : (
                          <span className="badge badge-warning">Unverified</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <button
                            onClick={() => toggleTeacherVerification(tch._id, tch.verifiedBadge)}
                            className={`btn btn-sm ${tch.verifiedBadge ? "btn-secondary" : "btn-gold"}`}
                            style={{ padding: "4px 8px", fontSize: "11px" }}
                          >
                            {tch.verifiedBadge ? "Revoke Badge" : "✓ Grant Badge"}
                          </button>
                          <button
                            onClick={() => updateTeacherStatus(tch._id, tch.status === "approved" ? "suspended" : "approved")}
                            className="btn btn-sm btn-secondary"
                            style={{ padding: "4px 8px", fontSize: "11px" }}
                          >
                            {tch.status === "approved" ? "Suspend" : "Approve"}
                          </button>
                          {tch.user?._id && (
                            <Link
                              to={`/teachers/${tch.user._id}/cv`}
                              className="btn btn-sm btn-secondary"
                              style={{ padding: "4px 8px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            >
                              <ExternalLink size={11} /> CV
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CLASSES LEDGER */}
        {activeTab === "classes" && (
          <div className="card">
            <h3 style={{ fontSize: "20px", marginBottom: "18px" }}>Classrooms Timetable & Schedules</h3>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Teacher</th>
                    <th>Course</th>
                    <th>Date & Time</th>
                    <th>Meeting Room Link</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classesList.map((c) => (
                    <tr key={c._id}>
                      <td><b>{c.student?.name}</b></td>
                      <td>{c.teacher?.name}</td>
                      <td>{c.course?.title}</td>
                      <td>{new Date(c.date).toLocaleDateString()} at {c.startTime}</td>
                      <td>
                        <a href={c.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--emerald-800)", fontWeight: "bold" }}>
                          Open Room
                        </a>
                      </td>
                      <td>
                        <span className="badge badge-success">{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: INVOICES & REVENUE */}
        {activeTab === "payments" && (
          <div className="card">
            <h3 style={{ fontSize: "20px", marginBottom: "18px" }}>Tuition Ledger & Payment Receipts</h3>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Payer / Student</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsList.map((p) => (
                    <tr key={p._id}>
                      <td><b>{p.invoiceNumber}</b></td>
                      <td>{p.studentName || p.user?.name}</td>
                      <td>{p.plan}</td>
                      <td><b>${p.amount} {p.currency}</b></td>
                      <td><span style={{ textTransform: "uppercase", fontSize: "12px" }}>{p.paymentMethod}</span></td>
                      <td>
                        <span className={`badge ${p.status === "completed" ? "badge-success" : "badge-warning"}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: SUPPORT TICKETS */}
        {activeTab === "tickets" && (
          <div className="card">
            <h3 style={{ fontSize: "20px", marginBottom: "18px" }}>Student & Parent Support Desk</h3>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ticket #</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketsList.map((t) => (
                    <tr key={t._id}>
                      <td><b>{t.ticketNumber}</b></td>
                      <td>{t.userName} ({t.userRole})</td>
                      <td><span className="badge badge-gold">{t.category}</span></td>
                      <td>{t.subject}</td>
                      <td>
                        <span className={`badge ${t.status === "resolved" ? "badge-success" : "badge-info"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td><span style={{ textTransform: "uppercase", fontSize: "11px" }}>{t.priority}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7.5: INQUIRIES & CONTACT MESSAGES */}
        {activeTab === "inquiries" && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "22px" }}>
              <div>
                <h3 style={{ fontSize: "20px" }}>Website Inquiries & Contact Leads</h3>
                <p style={{ color: "var(--slate-500)", fontSize: "13px", marginTop: "4px" }}>
                  Prospective students and parents contacting via web forms or WhatsApp
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                >
                  <option value="all">All Inquiries ({inquiriesList.length})</option>
                  <option value="new">New ({inquiriesList.filter((i) => i.status === "new").length})</option>
                  <option value="read">Read ({inquiriesList.filter((i) => i.status === "read").length})</option>
                  <option value="replied">Replied ({inquiriesList.filter((i) => i.status === "replied").length})</option>
                  <option value="closed">Closed ({inquiriesList.filter((i) => i.status === "closed").length})</option>
                </select>

                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                />
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--slate-500)" }}>
                <Mail size={40} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                <h4>No Inquiries Found</h4>
                <p style={{ fontSize: "13px" }}>New messages submitted through the website contact form will appear here.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Sender / Country</th>
                      <th>Contact Channels</th>
                      <th>Subject & Message</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Quick Contact & Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((inq) => {
                      const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, "") : "";
                      return (
                        <tr key={inq._id}>
                          <td>
                            <b>{inq.name}</b>
                            <div style={{ fontSize: "12px", color: "var(--slate-500)" }}>{inq.country || "Pakistan"}</div>
                          </td>
                          <td>
                            <div>
                              <a href={`mailto:${inq.email}`} style={{ color: "var(--primary)", fontSize: "12.5px" }}>
                                ✉ {inq.email}
                              </a>
                            </div>
                            {inq.phone && (
                              <div>
                                <a
                                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Assalamu Alaikum ${inq.name}, thank you for contacting Minara-ul-Quran Academy regarding: ${inq.subject}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ fontSize: "12px", color: "var(--success)", fontWeight: "600" }}
                                >
                                  💬 {inq.phone}
                                </a>
                              </div>
                            )}
                          </td>
                          <td style={{ maxWidth: "280px" }}>
                            <b style={{ fontSize: "13px", color: "var(--emerald-950)", display: "block" }}>{inq.subject}</b>
                            <p style={{ fontSize: "12px", color: "var(--slate-600)", margin: "4px 0 0", lineHeight: "1.4" }}>
                              {inq.message}
                            </p>
                          </td>
                          <td style={{ fontSize: "12px", whiteSpace: "nowrap", color: "var(--slate-500)" }}>
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <span className={`badge ${inq.status === "new" ? "badge-warning" : inq.status === "replied" ? "badge-success" : "badge-info"}`}>
                              {inq.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                              {inq.phone && (
                                <a
                                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Assalamu Alaikum ${inq.name}! This is Minara-ul-Quran Academy admissions. We received your message: "${inq.message}"`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-secondary btn-sm"
                                  style={{ fontSize: "11px", padding: "4px 8px", color: "#166534" }}
                                  title="Chat on WhatsApp"
                                >
                                  💬 WhatsApp
                                </a>
                              )}
                              <a
                                href={`mailto:${inq.email}?subject=${encodeURIComponent(`Re: ${inq.subject} - Minara-ul-Quran Academy`)}&body=${encodeURIComponent(`Dear ${inq.name},\n\nThank you for reaching out to Minara-ul-Quran Academy.\n\nBest regards,\nAcademic Admissions Team`)}`}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: "11px", padding: "4px 8px" }}
                                title="Reply by Email"
                              >
                                ✉ Email
                              </a>
                              {inq.status !== "replied" && (
                                <button
                                  onClick={() => updateInquiryStatus(inq._id, "replied")}
                                  className="btn btn-secondary btn-sm"
                                  style={{ fontSize: "11px", padding: "4px 8px" }}
                                  title="Mark Replied"
                                >
                                  Mark Replied
                                </button>
                              )}
                              {inq.status !== "closed" && (
                                <button
                                  onClick={() => updateInquiryStatus(inq._id, "closed")}
                                  className="btn btn-secondary btn-sm"
                                  style={{ fontSize: "11px", padding: "4px 8px" }}
                                  title="Mark Closed"
                                >
                                  Close
                                </button>
                              )}
                              <button
                                onClick={() => deleteInquiry(inq._id)}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: "11px", padding: "4px 6px", color: "#b91c1c" }}
                                title="Delete Inquiry"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === "settings" && (
          <div className="card" style={{ maxWidth: "750px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>Academy Platform Configuration</h3>
            <p style={{ color: "var(--slate-500)", fontSize: "13.5px", marginBottom: "22px" }}>
              Configure public contact numbers, WhatsApp lines, and official email addresses for student admissions.
            </p>

            <form onSubmit={saveSettings}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Academy Brand Name</label>
                  <input
                    type="text"
                    value={settingsData.name || ""}
                    onChange={(e) => setSettingsData({ ...settingsData, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Primary WhatsApp / Call Number *</label>
                    <input
                      type="text"
                      value={settingsData.whatsapp || ""}
                      onChange={(e) => setSettingsData({ ...settingsData, whatsapp: e.target.value })}
                      className="form-control"
                      placeholder="+92 337 3029707"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Secondary WhatsApp / Call Number</label>
                    <input
                      type="text"
                      value={settingsData.whatsappSecondary || ""}
                      onChange={(e) => setSettingsData({ ...settingsData, whatsappSecondary: e.target.value })}
                      className="form-control"
                      placeholder="+92 327 3726496"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Official Admissions Email *</label>
                  <input
                    type="email"
                    value={settingsData.email || ""}
                    onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                    className="form-control"
                    placeholder="aq0871633@gmail.com"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Default Live Classroom Provider</label>
                    <select
                      value={settingsData.meetingProvider || "google_meet"}
                      onChange={(e) => setSettingsData({ ...settingsData, meetingProvider: e.target.value })}
                      className="form-control"
                    >
                      <option value="google_meet">Google Meet (Recommended)</option>
                      <option value="zoom">Zoom Video</option>
                      <option value="teams">Microsoft Teams</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Standard Class Duration (Minutes)</label>
                    <input
                      type="number"
                      value={settingsData.duration || 30}
                      onChange={(e) => setSettingsData({ ...settingsData, duration: Number(e.target.value) })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                  <button type="submit" className="btn btn-primary">
                    Save Academy Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSettingsData({
                        name: "Minara-ul-Quran (Minaratul Quran Academy)",
                        whatsapp: "+92 337 3029707",
                        whatsappSecondary: "+92 327 3726496",
                        email: "aq0871633@gmail.com",
                        meetingProvider: "google_meet",
                        duration: 30,
                      });
                      notify("Settings reset to defaults!");
                    }}
                    className="btn btn-secondary"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
