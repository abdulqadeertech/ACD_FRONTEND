import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Send,
  User,
  Search,
  Sparkles,
  MessageSquare,
  Clock,
  CheckCheck,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function MessagesPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const directRecipientId = searchParams.get("recipient");
  const directRecipientName = searchParams.get("name");

  const [conversations, setConversations] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  // Quick message template prompts for Quran learning
  const quickTemplates = [
    "Assalamu Alaikum Teacher, here is the homework update.",
    "Can we reschedule today's session by 30 minutes?",
    "JazakAllahu Khairan for the monthly progress report!",
    "Could you please clarify the Tajweed rule for Idgham?",
  ];

  useEffect(() => {
    loadConversations();
  }, [directRecipientId]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/messages/conversations");
      let convs = res.data || [];

      // If a specific partner was passed via query param and not in conversations list yet, synthesize an entry
      if (directRecipientId && !convs.some((c) => String(c.partnerId) === String(directRecipientId))) {
        const newPartnerConv = {
          conversationId: `conv_${directRecipientId}`,
          partnerId: directRecipientId,
          partnerName: directRecipientName || "Quran Teacher",
          lastMessage: "Start a new conversation...",
          unread: false,
          updatedAt: new Date().toISOString(),
        };
        convs = [newPartnerConv, ...convs];
      }

      setConversations(convs);

      // Select active partner
      if (directRecipientId) {
        const target = convs.find((c) => String(c.partnerId) === String(directRecipientId));
        if (target) {
          selectConversation(target);
        }
      } else if (convs.length > 0) {
        selectConversation(convs[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to load conversations:", err);
      setLoading(false);
    }
  };

  const selectConversation = async (conv) => {
    setSelectedPartner(conv);
    try {
      const res = await api.get(`/messages/${conv.partnerId}`);
      setMessages(res.data || []);
      scrollToBottom();
    } catch (err) {
      console.error("Failed to load thread:", err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !selectedPartner || sending) return;

    try {
      setSending(true);
      const res = await api.post("/messages", {
        recipientId: selectedPartner.partnerId,
        content: newMessage.trim(),
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      setSending(false);
      scrollToBottom();

      // Refresh conversations list to update snippet
      const updated = conversations.map((c) =>
        c.partnerId === selectedPartner.partnerId
          ? { ...c, lastMessage: res.data.content, updatedAt: res.data.createdAt }
          : c
      );
      setConversations(updated);
    } catch (err) {
      alert("Failed to deliver message. Please retry.");
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.partnerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section" style={{ padding: "30px 5%" }}>
      {/* Top Breadcrumb & Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--slate-500)", marginBottom: "4px" }}>
            <Link to="/dashboard" style={{ color: "var(--emerald-800)", fontWeight: "600" }}>Dashboard</Link>
            <span>/</span>
            <span>Academic Messages</span>
          </div>
          <h1 style={{ fontSize: "26px", color: "var(--emerald-950)", margin: 0 }}>
            In-App Academy Communications
          </h1>
        </div>
        <div className="arabic-bismillah" style={{ fontSize: "20px", color: "var(--gold-600)" }}>
          وَقُولُوا لِلنَّاسِ حُسْنًا
        </div>
      </div>

      {/* Main Dual-Pane Container */}
      <div
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          height: "calc(100vh - 220px)",
          minHeight: "560px",
          padding: 0,
          overflow: "hidden",
          borderRadius: "20px",
          border: "1px solid var(--ivory-300)",
        }}
      >
        {/* Left Pane: Conversations List */}
        <div
          style={{
            borderRight: "1px solid var(--ivory-200)",
            background: "var(--ivory-50)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search Box */}
          <div style={{ padding: "16px", borderBottom: "1px solid var(--ivory-200)", background: "white" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                color="var(--slate-400)"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search teachers or students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: "36px", fontSize: "13px", borderRadius: "10px" }}
              />
            </div>
          </div>

          {/* Conversations Scroll Area */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {loading ? (
              <div style={{ padding: "30px", textAlign: "center", color: "var(--slate-500)", fontSize: "13px" }}>
                Loading conversations...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div style={{ padding: "30px 20px", textAlign: "center", color: "var(--slate-500)" }}>
                <MessageSquare size={32} color="var(--slate-400)" style={{ margin: "0 auto 10px" }} />
                <p style={{ fontSize: "13px", margin: 0 }}>No conversations yet.</p>
                <Link to="/find-teacher" style={{ fontSize: "12px", color: "var(--emerald-800)", fontWeight: "600", marginTop: "8px", display: "inline-block" }}>
                  Browse teachers to message →
                </Link>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = selectedPartner?.partnerId === conv.partnerId;
                return (
                  <div
                    key={conv.conversationId}
                    onClick={() => selectConversation(conv)}
                    style={{
                      padding: "14px 18px",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--ivory-200)",
                      background: isSelected ? "white" : "transparent",
                      borderLeft: isSelected ? "4px solid var(--gold-500)" : "4px solid transparent",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <b style={{ fontSize: "14px", color: "var(--emerald-950)" }}>
                        {conv.partnerName}
                      </b>
                      {conv.unread && (
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--gold-500)",
                            display: "inline-block",
                          }}
                        />
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--slate-500)",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conv.lastMessage || "No messages"}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Window */}
        <div style={{ display: "flex", flexDirection: "column", background: "white" }}>
          {selectedPartner ? (
            <>
              {/* Chat Header */}
              <div
                style={{
                  padding: "14px 24px",
                  borderBottom: "1px solid var(--ivory-200)",
                  background: "var(--ivory-50)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--emerald-800)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    {selectedPartner.partnerName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", color: "var(--emerald-950)", margin: 0 }}>
                      {selectedPartner.partnerName}
                    </h3>
                    <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>
                      Online · Minara-ul-Quran Verified Channel
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    to={`/teachers/${selectedPartner.partnerId}/cv`}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px" }}
                  >
                    View Teacher CV
                  </Link>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div
                style={{
                  flex: 1,
                  padding: "20px 24px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  background: "#fcfbf9",
                }}
              >
                {messages.length === 0 ? (
                  <div style={{ textAlign: "center", margin: "auto", color: "var(--slate-400)" }}>
                    <Sparkles size={32} color="var(--gold-500)" style={{ margin: "0 auto 8px" }} />
                    <p style={{ fontSize: "14px", margin: 0, color: "var(--slate-600)" }}>
                      Send an introductory message or inquiry to <b>{selectedPartner.partnerName}</b>.
                    </p>
                  </div>
                ) : (
                  messages.map((m) => {
                    const isMine = String(m.sender) === String(user?._id);
                    return (
                      <div
                        key={m._id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isMine ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "70%",
                            padding: "12px 16px",
                            borderRadius: isMine ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                            background: isMine
                              ? "linear-gradient(135deg, var(--emerald-900), var(--emerald-950))"
                              : "white",
                            color: isMine ? "white" : "var(--slate-800)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            border: isMine ? "none" : "1px solid var(--ivory-300)",
                            fontSize: "14px",
                            lineHeight: "1.5",
                          }}
                        >
                          {m.content}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--slate-400)",
                            marginTop: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {isMine && <CheckCheck size={12} color="var(--gold-500)" />}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div
                style={{
                  padding: "8px 24px",
                  background: "white",
                  borderTop: "1px solid var(--ivory-200)",
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {quickTemplates.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setNewMessage(t)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "14px",
                      fontSize: "11px",
                      background: "var(--ivory-100)",
                      border: "1px solid var(--ivory-300)",
                      color: "var(--emerald-950)",
                      cursor: "pointer",
                    }}
                  >
                    + {t}
                  </button>
                ))}
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: "16px 24px",
                  background: "white",
                  borderTop: "1px solid var(--ivory-200)",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Type your message, homework update, or recitation question..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="form-control"
                  style={{ flex: 1, borderRadius: "24px", padding: "10px 18px" }}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="btn btn-gold"
                  style={{ borderRadius: "24px", padding: "10px 22px" }}
                >
                  <Send size={15} /> Send
                </button>
              </form>
            </>
          ) : (
            <div style={{ margin: "auto", textAlign: "center", color: "var(--slate-400)" }}>
              <MessageSquare size={48} color="var(--slate-300)" style={{ margin: "0 auto 12px" }} />
              <h3 style={{ fontSize: "18px", color: "var(--slate-700)" }}>Select a Conversation</h3>
              <p style={{ fontSize: "13px", maxWidth: "340px", margin: "0 auto" }}>
                Choose a conversation from the left or browse verified teachers to ask questions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
