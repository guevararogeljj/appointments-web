<template>
  <v-container class="py-8">
    <v-card class="mx-auto w-100 elevation-4 pa-8 rounded-lg" style="background:rgba(245,246,250,0.97); max-width:700px;">
      <v-card-title class="font-weight-bold text-h5 mb-2" style="color:#8e24aa;">
        <v-icon class="me-2" color="#8e24aa">mdi-account-tie</v-icon> Chatbot KConsultores
      </v-card-title>
      <v-card-text>
        <div class="mb-4">Aquí puedes interactuar con el asesor virtual de KConsultores y ver información detallada sobre su servicio.</div>
        <ChatbotKConsultores />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import ChatbotKConsultores from '../components/ChatbotKConsultores.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { ChatbotKConsultores }
});
</script>

<style scoped>
</style>
