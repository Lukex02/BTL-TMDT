export type ChatStatus = "Đang mở" | "Chờ xử lý" | "Đã giải quyết";
export type Sender = "agent" | "customer" | "system";

export interface ChatMessage {
  id: number | string;
  sender: Sender;
  content: string;
  time: string;
  attachments?: string[];
}

export interface ChatCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  tier: string;
  totalOrders: number;
  lastOrder: string;
}

export interface ChatOrder {
  id: string;
  title: string;
  price: string;
  state: string;
}

export interface Conversation {
  id: number | string;
  customer: ChatCustomer;
  status: ChatStatus;
  channel: string;
  topic: string;
  unread: number;
  online: boolean;
  lastActive: string;
  lastMessagePreview: string;
  pinned: boolean;
  starred: boolean;
  tags: string[];
  internalNotes: string[];
  orders: ChatOrder[];
  messages: ChatMessage[];
}

export interface ApiListResponse<T> {
  data: T[];
  message?: string;
}

export interface ApiItemResponse<T> {
  data: T;
  message?: string;
}

export interface SendMessagePayload {
  content: string;
  attachments?: string[];
}

export interface UpdateConversationStatusPayload {
  status: ChatStatus;
}

export interface AddInternalNotePayload {
  note: string;
}