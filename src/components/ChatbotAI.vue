<template>
  <div class="chatbot-ai-container">
    <div class="chat-header">
      <v-icon color="#1976d2" class="me-2">mdi-robot</v-icon>
      <span class="font-weight-bold">ChatbotAI</span>
    </div>
    <div class="chat-body">
      <div class="message ai-message">¡Hola! Soy ChatbotAI, ¿en qué puedo ayudarte hoy?</div>
    </div>
    <div class="chat-footer">
      <v-text-field
        v-model="input"
        label="Escribe tu mensaje..."
        variant="solo"
        hide-details
        density="compact"
        class="chat-input"
      />
      <v-btn color="primary" @click="sendMessage" icon>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'ChatbotAI',
  setup() {
    const input = ref('');
    function sendMessage() {
      if (input.value.trim()) {
        // Aquí iría la lógica real de chat
        input.value = '';
      }
    }
    return { input, sendMessage };
  }
});
</script>

<style scoped>
.chatbot-ai-container {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(25, 118, 210, 0.10);
  padding: 18px 16px 10px 16px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.chat-header {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 6px;
}
.chat-body {
  flex: 1;
  margin-bottom: 8px;
}
.message {
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 4px;
  font-size: 0.98rem;
}
.chat-footer {
  display: flex;
  align-items: center;
  gap: 6px;
}
.chat-input {
  flex: 1;
}
</style>
