export interface AuthResponse {
  id: string;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  role: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  sender: User;
  receiver: User;
  message: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  user1: User;
  user2: User;
}
