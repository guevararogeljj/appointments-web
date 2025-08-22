
import type { AxiosInstance } from 'axios';
import apiClient from '@/services/api';

export interface IChatbotReto97Service {
  sendMessage(message: string): Promise<string>;
}

export class AxiosChatbotKConsultoresService implements IChatbotReto97Service {

  private axios: AxiosInstance;
  private endpoint: string = 'Chatbot/ask-Reto97'; // Ajusta la ruta según tu backend

  constructor(axios?: AxiosInstance) {
    this.axios = axios || apiClient;
  }

    async sendMessage(message: string): Promise<string> {
      const response = await apiClient.post<{ reply: string }>(this.endpoint, { ask: message });
      return response.data.reply;
  }
}

