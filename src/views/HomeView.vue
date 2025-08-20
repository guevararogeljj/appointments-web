<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Users</v-card-title>
          <v-list dense>
            <v-list-item
              v-for="user in users"
              :key="user.id"
              @click="startChat(user)"
            >
              <v-list-item-title>{{ user.userName }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Chat Rooms</v-card-title>
          <v-list dense>
            <v-list-item
              v-for="room in chatRooms"
              :key="room.id"
              @click="selectChatRoom(room)"
            >
              <v-list-item-title>
                {{ room.user1.id === currentUserId ? room.user2.userName : room.user1.userName }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card v-if="selectedChatRoom">
          <v-card-title>Chat with {{ chatPartnerName }}</v-card-title>
          <v-card-text>
            <div class="messages-container" style="height: 400px; overflow-y: auto;">
              <div v-for="message in messages" :key="message.id">
                <strong>{{ message.sender.userName }}:</strong> {{ message.message }}
              </div>
            </div>
            <v-text-field
              v-model="newMessage"
              label="Type your message"
              append-icon="mdi-send"
              @click:append="sendMessage"
              @keyup.enter="sendMessage"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>Select a user or chat room to start chatting</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { AxiosChatService } from '../infrastructure/chat/AxiosChatService';
import type { User, ChatRoom, ChatMessage } from '../domain/models';
import * as signalR from '@microsoft/signalr';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const chatService = new AxiosChatService();
    const users = ref<User[]>([]);
    const chatRooms = ref<ChatRoom[]>([]);
    const selectedChatRoom = ref<ChatRoom | null>(null);
    const messages = ref<ChatMessage[]>([]);
    const newMessage = ref('');
    const currentUserId = ref<string | null>(null);
    const chatPartnerName = computed(() => {
      if (!selectedChatRoom.value) return '';
      return selectedChatRoom.value.user1.id === currentUserId.value
        ? selectedChatRoom.value.user2.userName
        : selectedChatRoom.value.user1.userName;
    });

    let connection: signalR.HubConnection | null = null;

    onMounted(async () => {
      currentUserId.value = localStorage.getItem('userId'); // Assuming userId is stored on login
      await fetchUsers();
      await fetchChatRooms();
      setupSignalR();
    });

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await chatService.getUsers();
        users.value = fetchedUsers.filter(u => u.id !== currentUserId.value);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchChatRooms = async () => {
      try {
        if (currentUserId.value) {
          chatRooms.value = await chatService.getUserChatRooms(currentUserId.value);
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

   // ...existing code...
const setupSignalR = () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7001/chatHub', {
      accessTokenFactory: () => localStorage.getItem('jwtToken') || '',
    })
    .withAutomaticReconnect()
    .build();

  connection.on('ReceiveMessage', (chatRoomId: string, senderId: string, receiverId: string, message: string, timestamp: string) => {
    if (selectedChatRoom.value && chatRoomId === selectedChatRoom.value.id) {
      messages.value.push({
        id: '', // ID will be assigned by backend
        chatRoomId,
        sender: { id: senderId, userName: '', email: '', firstName: '', lastName: '' }, // Populate full user data if needed
        receiver: { id: receiverId, userName: '', email: '', firstName: '', lastName: '' },
        message,
        timestamp,
      });
    }
  });

  connection.start().catch(err => console.error('SignalR Connection Error: ', err));
};
// ...existing code...

    const startChat = async (user: User) => {
      try {
        const roomId = await chatService.createChatRoom(currentUserId.value!, user.id);
        const newRoom: ChatRoom = { id: roomId, user1: { ...user, id: currentUserId.value! }, user2: user };
        selectedChatRoom.value = newRoom;
        messages.value = [];
        await loadMessages(roomId);
      } catch (error) {
        console.error('Error starting chat:', error);
      }
    };

    const selectChatRoom = async (room: ChatRoom) => {
      selectedChatRoom.value = room;
      messages.value = [];
      await loadMessages(room.id);
    };

    const loadMessages = async (roomId: string) => {
      try {
        messages.value = await chatService.getChatMessages(roomId);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    const sendMessage = async () => {
      if (newMessage.value.trim() === '' || !selectedChatRoom.value) return;

      try {
        await connection?.invoke('SendMessage',
          selectedChatRoom.value.id,
          selectedChatRoom.value.user1.id === currentUserId.value ? selectedChatRoom.value.user2.id : selectedChatRoom.value.user1.id,
          newMessage.value
        );
        newMessage.value = '';
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };

    return {
      users,
      chatRooms,
      selectedChatRoom,
      messages,
      newMessage,
      currentUserId,
      chatPartnerName,
      startChat,
      selectChatRoom,
      sendMessage,
    };
  },
});
</script>

<style scoped>
.messages-container {
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>