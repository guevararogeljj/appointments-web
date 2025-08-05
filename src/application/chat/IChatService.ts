import type { ChatMessage, ChatRoom, User } from '@/domain/models';

export interface IChatService {
  createChatRoom(user1Id: string, user2Id: string): Promise<string>;
  getChatMessages(chatRoomId: string): Promise<ChatMessage[]>;
  getUserChatRooms(userId: string): Promise<ChatRoom[]>;
  getUsers(): Promise<User[]>;
}
