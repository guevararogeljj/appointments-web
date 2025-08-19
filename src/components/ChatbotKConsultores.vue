<template>
  <div class="chatbot-kconsultores-container">
    <div class="chat-header">
      <span class="bot-emoji" aria-label="bot">🤖</span>
      <span class="font-weight-bold ms-2">Chatbot KConsultores</span>
    </div>
  <div class="chat-body" ref="chatBodyRef">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="[
          'message',
          msg.from === 'bot'
            ? (botColorIndex(idx) % 2 === 0 ? 'k-message' : 'k-message-alt')
            : (userColorIndex(idx) % 2 === 0 ? 'user-message' : 'user-message-alt')
        ]"
      >
        {{ msg.text }}
      </div>
      <div v-if="loading" class="message k-message" style="opacity:0.7;">Escribiendo...</div>
    </div>
    <div class="chat-footer">
      <v-text-field
        v-model="input"
        label="Escribe tu consulta..."
        variant="solo"
        hide-details
        density="compact"
        class="chat-input"
        @keyup.enter="sendMessage"
      />
      <v-btn color="secondary" @click="sendMessage" icon>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick } from 'vue';
import { AxiosChatbotKConsultoresService } from '../infrastructure/chat/AxiosChatbotKConsultoresService';
import axios from 'axios';

export default defineComponent({
  name: 'ChatbotKConsultores',
  setup() {
    const input = ref('');
    const messages = ref([
      { from: 'bot', text: '¡Hola! Soy tu asesor virtual de KConsultores, ¿cómo puedo ayudarte?' }
    ]);
  const loading = ref(false);
  const chatService = new AxiosChatbotKConsultoresService(axios);
  const chatBodyRef = ref<HTMLElement | null>(null);

    // Alternancia por tipo de mensaje
    function botColorIndex(idx: number) {
      let count = 0;
      for (let i = 0; i <= idx; i++) {
        if (messages.value[i].from === 'bot') count++;
      }
      return count % 2;
    }
    function userColorIndex(idx: number) {
      let count = 0;
      for (let i = 0; i <= idx; i++) {
        if (messages.value[i].from === 'user') count++;
      }
      return count % 2;
    }

    async function sendMessage() {
      if (input.value.trim()) {
        const userMsg = input.value;
        messages.value.push({ from: 'user', text: userMsg });
        input.value = '';
        await nextTick();
        scrollToBottom();
        loading.value = true;
        try {
          const reply = await chatService.sendMessage(userMsg);
          messages.value.push({ from: 'bot', text: reply });
          await nextTick();
          scrollToBottom();
        } catch (e) {
          messages.value.push({ from: 'bot', text: 'Ocurrió un error al contactar al servicio.' });
          await nextTick();
          scrollToBottom();
        } finally {
          loading.value = false;
        }
      }
    }

    function scrollToBottom() {
      if (chatBodyRef.value) {
        chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
      }
    }
  return { input, sendMessage, messages, loading, botColorIndex, userColorIndex, chatBodyRef };
  }
});
</script>

<style scoped>
:root {
  --kc-black: #000000;
  --kc-black-abs: #000004;
  --kc-purple: #800080;
  --kc-purple-dark: #7F007F;
  --kc-purple-intense: #810081;
  --kc-lime: #8BB400;

  /* Nuevos colores para el chat */
  --kc-sent-blue: #007bff;
  --kc-sent-blue-alt: #0056b3;
  --kc-received-red: #dc3545;
  --kc-received-red-alt: #c82333;
  --kc-text-light: #ffffff;
}

.chatbot-kconsultores-container {
  background: var(--kc-black-abs);
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.18);
  padding: 18px 16px 10px 16px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid var(--kc-purple-intense);
}

.chat-header {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 6px;
  color: var(--kc-lime);
}
.bot-emoji {
  font-size: 1.6rem;
  margin-right: 8px;
}

.chat-body {
  flex: 1;
  margin-bottom: 8px;
  background: var(--kc-black);
  border-radius: 12px;
  padding: 8px 4px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 320px;
  min-height: 120px;
}

.message {
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 4px;
  font-size: 0.98rem;
  max-width: 85%;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.10);
  word-break: break-word;
}

/* Bot alterna entre rojo y rojo oscuro (Recibidos) */
.k-message {
  background:#800080;
  color: white;
  align-self: flex-start;
}
.k-message-alt {
  background: #800080;
  color: white;
  align-self: flex-start;
}

/* Usuario alterna entre azul y azul oscuro (Enviados) */
.user-message {
  background:#8BB400;
  color: white;
  align-self: flex-end;
  font-weight: 500;
}
.user-message-alt {
  background: #8BB400;
  color: white;
  align-self: flex-end;
  font-weight: 500;
}

.chat-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--kc-black-abs);
  border-radius: 10px;
  padding: 6px 8px;
}
.chat-input {
  flex: 1;
}
</style>