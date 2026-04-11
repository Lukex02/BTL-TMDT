import axios from "axios";
import type {
  AddInternalNotePayload,
  ApiItemResponse,
  ApiListResponse,
  ChatMessage,
  ChatStatus,
  Conversation,
  SendMessagePayload,
  UpdateConversationStatusPayload,
} from "../types/chat";

const API_BASE_URL = "http://localhost:3000";
const CHAT_API_URL = `${API_BASE_URL}/chats`;

const CHAT_STORAGE_KEY = "pcity_customer_chat_data";

const createFallbackData = (): Conversation[] => [
  {
    id: 1,
    customer: {
      name: "Nguyễn Đức Minh",
      email: "minh.nguyen@gmail.com",
      phone: "0903 222 889",
      address: "Quận 7, TP. Hồ Chí Minh",
      tier: "Khách hàng thân thiết",
      totalOrders: 16,
      lastOrder: "31/03/2026",
    },
    status: "Đang mở",
    channel: "Website Live Chat",
    topic: "Hỏi về tình trạng đơn hàng VGA RTX 3060",
    unread: 2,
    online: true,
    lastActive: "Vừa xong",
    lastMessagePreview: "Shop kiểm tra giúp em đơn PCITY-3021 đang tới đâu rồi ạ?",
    pinned: true,
    starred: true,
    tags: ["Đơn hàng", "VIP", "Giao nhanh"],
    internalNotes: [
      "Khách ưu tiên hỗ trợ nhanh trong giờ hành chính.",
      "Đã mua hơn 10 đơn trong 6 tháng gần đây.",
    ],
    orders: [
      { id: "PCITY-3021", title: "ASUS Dual RTX 3060 OC 12GB", price: "7.890.000₫", state: "Đang giao" },
      { id: "PCITY-2870", title: "Corsair Vengeance 32GB DDR5", price: "2.690.000₫", state: "Hoàn tất" },
    ],
    messages: [
      {
        id: 1,
        sender: "system",
        content: "Cuộc trò chuyện được tạo từ widget chat trên website.",
        time: "09:05",
      },
      {
        id: 2,
        sender: "customer",
        content: "Chào shop, cho em hỏi đơn PCITY-3021 hiện giao đến đâu rồi ạ?",
        time: "09:06",
      },
      {
        id: 3,
        sender: "agent",
        content: "Em chào anh Minh, để em kiểm tra đơn hàng cho anh ngay ạ.",
        time: "09:07",
      },
      {
        id: 4,
        sender: "customer",
        content: "Dạ với em cần gấp trước cuối tuần vì đang chờ build máy.",
        time: "09:08",
      },
    ],
  },
  {
    id: 2,
    customer: {
      name: "Trần Phương Anh",
      email: "phuonganh98@yahoo.com",
      phone: "0868 901 225",
      address: "Hải Châu, Đà Nẵng",
      tier: "Khách mới",
      totalOrders: 2,
      lastOrder: "30/03/2026",
    },
    status: "Chờ xử lý",
    channel: "Facebook Inbox",
    topic: "Đổi trả bàn phím cơ lỗi led",
    unread: 1,
    online: false,
    lastActive: "12 phút trước",
    lastMessagePreview: "Bàn phím em mới nhận bị lỗi led 1 hàng, nhờ shop hỗ trợ đổi giúp.",
    pinned: false,
    starred: false,
    tags: ["Đổi trả", "Bảo hành"],
    internalNotes: ["Đã yêu cầu khách quay video mở hộp và clip test led."],
    orders: [
      { id: "PCITY-3012", title: "AKKO 5075B Plus Black", price: "1.790.000₫", state: "Yêu cầu đổi trả" },
    ],
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Bàn phím em mới nhận bị lỗi led 1 hàng, nhờ shop hỗ trợ đổi giúp.",
        time: "08:42",
      },
      {
        id: 2,
        sender: "agent",
        content: "Chị gửi giúp em video mở hộp và video test led để em tạo phiếu bảo hành nhé.",
        time: "08:45",
      },
      {
        id: 3,
        sender: "customer",
        content: "Em đã gửi video ở file đính kèm rồi ạ.",
        time: "08:50",
        attachments: ["video_mo_hop.mp4"],
      },
    ],
  },
  {
    id: 3,
    customer: {
      name: "Lê Quang Huy",
      email: "huy.le@outlook.com",
      phone: "0977 102 333",
      address: "Ninh Kiều, Cần Thơ",
      tier: "Thành viên bạc",
      totalOrders: 7,
      lastOrder: "28/03/2026",
    },
    status: "Đã giải quyết",
    channel: "Zalo OA",
    topic: "Tư vấn RAM tương thích mainboard",
    unread: 0,
    online: false,
    lastActive: "Hôm qua",
    lastMessagePreview: "Dạ cảm ơn shop, em đặt đơn rồi ạ.",
    pinned: false,
    starred: true,
    tags: ["Tư vấn cấu hình"],
    internalNotes: ["Khách quan tâm combo RAM + main + CPU Intel."],
    orders: [
      { id: "PCITY-2995", title: "Kingston Fury Beast 16GB DDR4", price: "990.000₫", state: "Hoàn tất" },
    ],
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Main B560M của em gắn được RAM bus 3200 không shop?",
        time: "14:00",
      },
      {
        id: 2,
        sender: "agent",
        content: "Được anh nhé, nếu CPU hỗ trợ thì chạy XMP 3200 ổn ạ.",
        time: "14:03",
      },
      {
        id: 3,
        sender: "customer",
        content: "Dạ cảm ơn shop, em đặt đơn rồi ạ.",
        time: "14:10",
      },
    ],
  },
];

const getStoredConversations = (): Conversation[] => {
  const raw = localStorage.getItem(CHAT_STORAGE_KEY);

  if (!raw) {
    const fallback = createFallbackData();
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(raw) as Conversation[];
  } catch {
    const fallback = createFallbackData();
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
};

const setStoredConversations = (conversations: Conversation[]) => {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));
};

const useFallback = (error: unknown) => {
  console.warn("Chat API chưa sẵn sàng, dùng fallback localStorage:", error);
};

const getNowTime = () =>
  new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const autoReplyByText = (text: string) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("đơn") || lowerText.includes("vận chuyển") || lowerText.includes("giao")) {
    return "Dạ em thấy rồi ạ, shop giúp em kiểm tra tiến trình giao hàng với nhé.";
  }

  if (lowerText.includes("bảo hành") || lowerText.includes("đổi") || lowerText.includes("trả")) {
    return "Dạ shop hướng dẫn thêm giúp em quy trình bảo hành với ạ.";
  }

  if (lowerText.includes("giá") || lowerText.includes("khuyến mãi")) {
    return "Nếu có giá tốt hơn hoặc mã giảm giá thì shop báo em nha.";
  }

  return "Dạ em đã nhận được thông tin, shop hỗ trợ tiếp giúp em với ạ.";
};

export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const res = await axios.get<ApiListResponse<Conversation>>(CHAT_API_URL);
    return res.data.data;
  } catch (error) {
    useFallback(error);
    return getStoredConversations();
  }
};

export const getConversationById = async (
  conversationId: number | string
): Promise<Conversation | null> => {
  try {
    const res = await axios.get<ApiItemResponse<Conversation>>(`${CHAT_API_URL}/${conversationId}`);
    return res.data.data;
  } catch (error) {
    useFallback(error);
    const conversations = getStoredConversations();
    return conversations.find((item) => item.id === conversationId) ?? null;
  }
};

export const createConversation = async (): Promise<Conversation> => {
  try {
    const res = await axios.post<ApiItemResponse<Conversation>>(CHAT_API_URL, {
      topic: "Yêu cầu tư vấn mới",
    });
    return res.data.data;
  } catch (error) {
    useFallback(error);

    const conversations = getStoredConversations();

    const newConversation: Conversation = {
      id: Date.now(),
      customer: {
        name: "Khách hàng mới",
        email: "new.customer@example.com",
        phone: "Chưa cập nhật",
        address: "Chưa cập nhật",
        tier: "Khách mới",
        totalOrders: 0,
        lastOrder: "Chưa có",
      },
      status: "Đang mở",
      channel: "Website Live Chat",
      topic: "Yêu cầu tư vấn mới",
      unread: 0,
      online: true,
      lastActive: "Vừa xong",
      lastMessagePreview: "Chưa có tin nhắn",
      pinned: false,
      starred: false,
      tags: ["Tư vấn mới"],
      internalNotes: [],
      orders: [],
      messages: [
        {
          id: 1,
          sender: "system",
          content: "Hội thoại mới đã được tạo. Bạn có thể bắt đầu trả lời khách hàng.",
          time: getNowTime(),
        },
      ],
    };

    const next = [newConversation, ...conversations];
    setStoredConversations(next);
    return newConversation;
  }
};

export const sendMessage = async (
  conversationId: number | string,
  payload: SendMessagePayload
): Promise<Conversation | null> => {
  try {
    const res = await axios.post<ApiItemResponse<Conversation>>(
      `${CHAT_API_URL}/${conversationId}/messages`,
      payload
    );
    return res.data.data;
  } catch (error) {
    useFallback(error);

    const conversations = getStoredConversations();
    const replyText = autoReplyByText(payload.content);

    const next = conversations.map((conversation) => {
      if (conversation.id !== conversationId) return conversation;

      const agentMessage: ChatMessage = {
        id: Date.now(),
        sender: "agent",
        content: payload.content || "Đã gửi tệp đính kèm.",
        time: getNowTime(),
        attachments: payload.attachments,
      };

      const customerReply: ChatMessage = {
        id: Date.now() + 1,
        sender: "customer",
        content: replyText,
        time: getNowTime(),
      };

      return {
        ...conversation,
        status: conversation.status === "Đã giải quyết" ? ("Đang mở" as ChatStatus) : conversation.status,
        lastActive: "Vừa xong",
        lastMessagePreview: replyText,
        messages: [...conversation.messages, agentMessage, customerReply],
      };
    });

    setStoredConversations(next);
    return next.find((item) => item.id === conversationId) ?? null;
  }
};

export const updateConversationStatus = async (
  conversationId: number | string,
  payload: UpdateConversationStatusPayload
): Promise<Conversation | null> => {
  try {
    const res = await axios.patch<ApiItemResponse<Conversation>>(
      `${CHAT_API_URL}/${conversationId}/status`,
      payload
    );
    return res.data.data;
  } catch (error) {
    useFallback(error);

    const conversations = getStoredConversations();
    const next = conversations.map((conversation) =>
      conversation.id === conversationId
        ? { ...conversation, status: payload.status }
        : conversation
    );

    setStoredConversations(next);
    return next.find((item) => item.id === conversationId) ?? null;
  }
};

export const addInternalNote = async (
  conversationId: number | string,
  payload: AddInternalNotePayload
): Promise<Conversation | null> => {
  try {
    const res = await axios.post<ApiItemResponse<Conversation>>(
      `${CHAT_API_URL}/${conversationId}/notes`,
      payload
    );
    return res.data.data;
  } catch (error) {
    useFallback(error);

    const conversations = getStoredConversations();
    const next = conversations.map((conversation) =>
      conversation.id === conversationId
        ? { ...conversation, internalNotes: [payload.note, ...conversation.internalNotes] }
        : conversation
    );

    setStoredConversations(next);
    return next.find((item) => item.id === conversationId) ?? null;
  }
};

export const togglePinnedConversation = async (
  conversationId: number | string
): Promise<Conversation | null> => {
  try {
    const res = await axios.patch<ApiItemResponse<Conversation>>(
      `${CHAT_API_URL}/${conversationId}/pin`
    );
    return res.data.data;
  } catch (error) {
    useFallback(error);

    const conversations = getStoredConversations();
    const next = conversations.map((conversation) =>
      conversation.id === conversationId
        ? { ...conversation, pinned: !conversation.pinned }
        : conversation
    );

    setStoredConversations(next);
    return next.find((item) => item.id === conversationId) ?? null;
  }
};

export const toggleStarredConversation = async (
  conversationId: number | string
): Promise<Conversation | null> => {
  try {
    const res = await axios.patch<ApiItemResponse<Conversation>>(
      `${CHAT_API_URL}/${conversationId}/star`
    );
    return res.data.data;
  } catch (error) {
    useFallback(error);

    const conversations = getStoredConversations();
    const next = conversations.map((conversation) =>
      conversation.id === conversationId
        ? { ...conversation, starred: !conversation.starred }
        : conversation
    );

    setStoredConversations(next);
    return next.find((item) => item.id === conversationId) ?? null;
  }
};