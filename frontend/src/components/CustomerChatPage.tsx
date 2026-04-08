import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Search,
  SendHorizonal,
  Paperclip,
  Phone,
  Video,
  Info,
  CircleDot,
  Star,
  Pin,
  CircleCheckBig,
  Clock3,
  AlertCircle,
  Plus,
  X,
  BadgeCheck,
  Package,
  MessageSquareText,
  Tag,
  Filter,
} from "lucide-react";
import "../components/styles.css";
import type { ChatStatus, Conversation } from "../types/chat";
import {
  addInternalNote,
  createConversation,
  getConversations,
  sendMessage,
  togglePinnedConversation,
  toggleStarredConversation,
  updateConversationStatus,
} from "../services/chat.service.ts"

const quickReplies = [
  "Em đã tiếp nhận và đang kiểm tra cho anh/chị ạ.",
  "Anh/chị vui lòng gửi giúp em mã đơn hàng để em tra cứu nhanh hơn nhé.",
  "Em đã tạo ghi chú ưu tiên cho yêu cầu này rồi ạ.",
  "Bên em sẽ phản hồi lại trong ít phút nữa ạ.",
];

const statusIconMap: Record<ChatStatus, ReactNode> = {
  "Đang mở": <CircleDot size={14} />,
  "Chờ xử lý": <Clock3 size={14} />,
  "Đã giải quyết": <CircleCheckBig size={14} />,
};

export default function CustomerChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<number | string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tất cả" | ChatStatus>("Tất cả");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const selectedConversation = useMemo(() => {
    if (conversations.length === 0) return null;
    return (
      conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0]
    );
  }, [conversations, selectedConversationId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const keyword = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !keyword ||
        conversation.customer.name.toLowerCase().includes(keyword) ||
        conversation.topic.toLowerCase().includes(keyword) ||
        conversation.lastMessagePreview.toLowerCase().includes(keyword);

      const matchesStatus = statusFilter === "Tất cả" || conversation.status === statusFilter;
      const matchesUnread = !onlyUnread || conversation.unread > 0;

      return matchesSearch && matchesStatus && matchesUnread;
    });
  }, [conversations, onlyUnread, searchTerm, statusFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getConversations();
        setConversations(data);

        if (data.length > 0) {
          setSelectedConversationId(data[0].id);
        }
      } catch (error) {
        console.error("Lỗi load conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages, typing]);

  const markConversationAsRead = (conversationId: number | string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              unread: 0,
            }
          : conversation
      )
    );
  };

  const handleSelectConversation = (conversationId: number | string) => {
    setSelectedConversationId(conversationId);
    markConversationAsRead(conversationId);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = messageDraft.trim();

    if ((!trimmedMessage && attachedFiles.length === 0) || !selectedConversationId) return;

    try {
      setTyping(true);

      const updatedConversation = await sendMessage(selectedConversationId, {
        content: trimmedMessage,
        attachments: attachedFiles,
      });

      if (updatedConversation) {
        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === selectedConversationId ? updatedConversation : conversation
          )
        );
      }

      setMessageDraft("");
      setAttachedFiles([]);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    } finally {
      setTyping(false);
    }
  };

  const handleMessageKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map((file) => file.name);

    if (files.length === 0) return;

    setAttachedFiles((current) => [...current, ...files]);
    event.target.value = "";
  };

  const handleRemoveAttachedFile = (fileName: string) => {
    setAttachedFiles((current) => current.filter((item) => item !== fileName));
  };

  const handleTogglePin = async () => {
    if (!selectedConversationId) return;

    try {
      const updatedConversation = await togglePinnedConversation(selectedConversationId);

      if (updatedConversation) {
        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === selectedConversationId ? updatedConversation : conversation
          )
        );
      }
    } catch (error) {
      console.error("Lỗi ghim hội thoại:", error);
    }
  };

  const handleToggleStar = async () => {
    if (!selectedConversationId) return;

    try {
      const updatedConversation = await toggleStarredConversation(selectedConversationId);

      if (updatedConversation) {
        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === selectedConversationId ? updatedConversation : conversation
          )
        );
      }
    } catch (error) {
      console.error("Lỗi đánh dấu sao:", error);
    }
  };

  const handleStatusChange = async (status: ChatStatus) => {
    if (!selectedConversationId) return;

    try {
      const updatedConversation = await updateConversationStatus(selectedConversationId, { status });

      if (updatedConversation) {
        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === selectedConversationId ? updatedConversation : conversation
          )
        );
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };

  const handleAddInternalNote = async () => {
    const trimmedNote = noteDraft.trim();

    if (!trimmedNote || !selectedConversationId) return;

    try {
      const updatedConversation = await addInternalNote(selectedConversationId, {
        note: trimmedNote,
      });

      if (updatedConversation) {
        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === selectedConversationId ? updatedConversation : conversation
          )
        );
      }

      setNoteDraft("");
    } catch (error) {
      console.error("Lỗi thêm ghi chú:", error);
    }
  };

  const handleCreateNewConversation = async () => {
    try {
      const newConversation = await createConversation();

      setConversations((current) => [newConversation, ...current]);
      setSelectedConversationId(newConversation.id);
      setSearchTerm("");
      setStatusFilter("Tất cả");
      setOnlyUnread(false);
      setMessageDraft("");
      setAttachedFiles([]);
      setNoteDraft("");
    } catch (error) {
      console.error("Lỗi tạo hội thoại mới:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="customer-chat-page">
          <div className="chat-empty-state">Đang tải dữ liệu hội thoại...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!selectedConversation) {
    return (
      <>
        <Navbar />
        <main className="customer-chat-page">
          <div className="chat-empty-state">Chưa có hội thoại nào.</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="customer-chat-page">
        <section className="customer-chat-shell">
          <aside className="chat-sidebar">
            <div className="chat-sidebar-top">
              <div>
                <p className="chat-overline">CSKH Dashboard</p>
                <h1>Chat với khách hàng</h1>
              </div>

              <button className="primary-pill-btn" onClick={handleCreateNewConversation}>
                <Plus size={16} />
                Hội thoại mới
              </button>
            </div>

            <div className="chat-search-box">
              <Search size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm theo tên khách, chủ đề, nội dung..."
              />
            </div>

            <div className="chat-filter-row">
              <div className="chat-filter-label">
                <Filter size={15} />
                Bộ lọc
              </div>

              <label className="chat-unread-toggle">
                <input
                  type="checkbox"
                  checked={onlyUnread}
                  onChange={(event) => setOnlyUnread(event.target.checked)}
                />
                Chưa đọc
              </label>
            </div>

            <div className="chat-status-tabs">
              {(["Tất cả", "Đang mở", "Chờ xử lý", "Đã giải quyết"] as const).map((status) => (
                <button
                  key={status}
                  className={statusFilter === status ? "active" : ""}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="chat-conversation-list">
              {filteredConversations.length === 0 ? (
                <div className="chat-empty-state">
                  Không có hội thoại phù hợp với bộ lọc hiện tại.
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`conversation-card ${
                      selectedConversationId === conversation.id ? "selected" : ""
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="conversation-card-header">
                      <div className="conversation-avatar">
                        {conversation.customer.name.slice(0, 1)}
                      </div>

                      <div className="conversation-title-block">
                        <strong>{conversation.customer.name}</strong>
                        <span>{conversation.topic}</span>
                      </div>

                      {conversation.unread > 0 ? (
                        <span className="conversation-unread">{conversation.unread}</span>
                      ) : null}
                    </div>

                    <div className="conversation-meta-row">
                      <span
                        className={`chat-status-badge badge-${conversation.status.replaceAll(
                          " ",
                          "-"
                        )}`}
                      >
                        {statusIconMap[conversation.status]}
                        {conversation.status}
                      </span>

                      <span>{conversation.lastActive}</span>
                    </div>

                    <p className="conversation-preview">{conversation.lastMessagePreview}</p>

                    <div className="conversation-card-footer">
                      <span>{conversation.channel}</span>

                      <div className="conversation-card-icons">
                        {conversation.pinned ? <Pin size={14} /> : null}
                        {conversation.starred ? <Star size={14} /> : null}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="chat-main-panel">
            <header className="chat-main-header">
              <div className="chat-main-title-wrap">
                <div className="conversation-avatar large">
                  {selectedConversation.customer.name.slice(0, 1)}
                </div>

                <div>
                  <h2>{selectedConversation.customer.name}</h2>

                  <div className="chat-header-subline">
                    <span
                      className={
                        selectedConversation.online ? "presence-dot online" : "presence-dot offline"
                      }
                    />
                    <span>
                      {selectedConversation.online ? "Đang hoạt động" : "Ngoại tuyến"}
                    </span>
                    <span>•</span>
                    <span>{selectedConversation.channel}</span>
                    <span>•</span>
                    <span>{selectedConversation.topic}</span>
                  </div>
                </div>
              </div>

              <div className="chat-main-actions">
                <button
                  type="button"
                  className="icon-circle-btn"
                  onClick={handleTogglePin}
                  title="Ghim hội thoại"
                >
                  <Pin size={18} fill={selectedConversation.pinned ? "currentColor" : "none"} />
                </button>

                <button
                  type="button"
                  className="icon-circle-btn"
                  onClick={handleToggleStar}
                  title="Đánh dấu sao"
                >
                  <Star size={18} fill={selectedConversation.starred ? "currentColor" : "none"} />
                </button>

                <button type="button" className="icon-circle-btn" title="Gọi thoại">
                  <Phone size={18} />
                </button>

                <button type="button" className="icon-circle-btn" title="Gọi video">
                  <Video size={18} />
                </button>

                <button type="button" className="icon-circle-btn" title="Thông tin">
                  <Info size={18} />
                </button>
              </div>
            </header>

            <div className="chat-quick-replies">
              {quickReplies.map((item) => (
                <button key={item} onClick={() => setMessageDraft(item)}>
                  {item}
                </button>
              ))}
            </div>

            <div className="chat-message-list">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`chat-message-row ${message.sender}`}>
                  <div className={`chat-bubble ${message.sender}`}>
                    {message.sender === "system" ? (
                      <p className="system-text">{message.content}</p>
                    ) : (
                      <p>{message.content}</p>
                    )}

                    {message.attachments?.length ? (
                      <div className="message-attachments">
                        {message.attachments.map((attachment) => (
                          <span key={attachment}>
                            <Paperclip size={13} />
                            {attachment}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <span className="message-time">{message.time}</span>
                  </div>
                </div>
              ))}

              {typing ? (
                <div className="chat-message-row customer">
                  <div className="chat-bubble customer typing-bubble">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : null}

              <div ref={messageEndRef} />
            </div>

            <div className="chat-composer">
              {attachedFiles.length > 0 ? (
                <div className="composer-attachment-list">
                  {attachedFiles.map((fileName) => (
                    <span key={fileName}>
                      <Paperclip size={13} />
                      {fileName}
                      <button type="button" onClick={() => handleRemoveAttachedFile(fileName)}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="composer-input-wrap">
                <label className="icon-circle-btn attach-btn" title="Đính kèm file">
                  <Paperclip size={18} />
                  <input type="file" multiple hidden onChange={handleAttachFiles} />
                </label>

                <textarea
                  rows={1}
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                  onKeyDown={handleMessageKeyDown}
                  placeholder="Nhập tin nhắn cho khách hàng..."
                />

                <button type="button" className="send-btn" onClick={handleSendMessage}>
                  <SendHorizonal size={18} />
                  Gửi
                </button>
              </div>

              <p className="composer-hint">Enter để gửi • Shift + Enter để xuống dòng</p>
            </div>
          </section>

          <aside className="chat-customer-panel">
            <div className="panel-card">
              <div className="panel-card-header">
                <h3>Thông tin khách hàng</h3>

                <span className="customer-tier-chip">
                  <BadgeCheck size={14} />
                  {selectedConversation.customer.tier}
                </span>
              </div>

              <div className="customer-summary">
                <div className="conversation-avatar xlarge">
                  {selectedConversation.customer.name.slice(0, 1)}
                </div>
                <strong>{selectedConversation.customer.name}</strong>
                <span>{selectedConversation.customer.email}</span>
              </div>

              <div className="info-grid">
                <div>
                  <label>Số điện thoại</label>
                  <p>{selectedConversation.customer.phone}</p>
                </div>

                <div>
                  <label>Tổng đơn</label>
                  <p>{selectedConversation.customer.totalOrders}</p>
                </div>

                <div>
                  <label>Đơn gần nhất</label>
                  <p>{selectedConversation.customer.lastOrder}</p>
                </div>

                <div>
                  <label>Khu vực</label>
                  <p>{selectedConversation.customer.address}</p>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-card-header">
                <h3>Trạng thái xử lý</h3>
                <MessageSquareText size={18} />
              </div>

              <div className="status-action-list">
                {(["Đang mở", "Chờ xử lý", "Đã giải quyết"] as ChatStatus[]).map((status) => (
                  <button
                    key={status}
                    className={selectedConversation.status === status ? "active" : ""}
                    onClick={() => handleStatusChange(status)}
                  >
                    {statusIconMap[status]}
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-card-header">
                <h3>Tag hội thoại</h3>
                <Tag size={18} />
              </div>

              <div className="tag-list">
                {selectedConversation.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-card-header">
                <h3>Đơn hàng liên quan</h3>
                <Package size={18} />
              </div>

              {selectedConversation.orders.length === 0 ? (
                <p className="muted-text">Chưa có đơn hàng gắn với cuộc trò chuyện này.</p>
              ) : (
                <div className="related-order-list">
                  {selectedConversation.orders.map((order) => (
                    <div key={order.id} className="related-order-item">
                      <div>
                        <strong>{order.id}</strong>
                        <p>{order.title}</p>
                      </div>

                      <div>
                        <span>{order.price}</span>
                        <small>{order.state}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="panel-card">
              <div className="panel-card-header">
                <h3>Ghi chú nội bộ</h3>
                <AlertCircle size={18} />
              </div>

              <div className="note-composer">
                <textarea
                  rows={3}
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="Thêm ghi chú nội bộ để bàn giao cho nhân viên khác..."
                />
                <button className="primary-pill-btn" onClick={handleAddInternalNote}>
                  Lưu ghi chú
                </button>
              </div>

              <div className="internal-note-list">
                {selectedConversation.internalNotes.length === 0 ? (
                  <p className="muted-text">Chưa có ghi chú nội bộ.</p>
                ) : (
                  selectedConversation.internalNotes.map((note, index) => (
                    <div key={`${note}-${index}`}>{note}</div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}