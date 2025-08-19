import type { AxiosInstance } from 'axios';

export interface IChatbotAIService {
  sendMessage(message: string): Promise<string>;
}

export class AxiosChatbotAIService implements IChatbotAIService {
  private axios: AxiosInstance;
  private endpoint: string = '/api/chatbotai'; // Ajusta la ruta según tu backend

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async sendMessage(message: string): Promise<string> {
    const response = await this.axios.post(this.endpoint, { message });
    return response.data.reply;
  }
}
