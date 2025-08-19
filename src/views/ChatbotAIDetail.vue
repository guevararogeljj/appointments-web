<template>
  <v-container class="py-8">
    <v-card class="mx-auto w-100 elevation-4 pa-8 rounded-lg" style="background:rgba(245,246,250,0.97); max-width:700px;">
      <v-card-title class="font-weight-bold text-h5 mb-2" style="color:#1976d2;">
        <v-icon class="me-2" color="#1976d2">mdi-robot</v-icon> ChatbotAI - Detalle
      </v-card-title>
      <v-card-text>
        <div class="mb-4">Aquí puedes interactuar con el asistente inteligente ChatbotAI y ver información detallada sobre su funcionamiento.</div>
        <chatbot-ai />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import ChatbotAI from '../components/ChatbotAI.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { ChatbotAI }
});
</script>

<style scoped>
</style>
