import apiClient from '@/services/api';
import type { IChatService } from '@/application/chat/IChatService';
import type { ChatMessage, ChatRoom, User } from '@/domain/models';

export class AxiosChatService implements IChatService {
  async createChatRoom(user1Id: string, user2Id: string): Promise<string> {
    const response = await apiClient.post<string>('/Chat/create-room', { user1Id, user2Id });
    return response.data;
  }

  async getChatMessages(chatRoomId: string): Promise<ChatMessage[]> {
    const response = await apiClient.get<ChatMessage[]>(`/Chat/messages/${chatRoomId}`);
    return response.data;
  }

  async getUserChatRooms(userId: string): Promise<ChatRoom[]> {
    const response = await apiClient.get<ChatRoom[]>(`/Chat/my-rooms?userId=${userId}`);
    return response.data;
  }

  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/Users');
    return response.data;
  }
}
