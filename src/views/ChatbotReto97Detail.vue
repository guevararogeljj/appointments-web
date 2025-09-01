<template>
  <v-container class="py-8" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="mx-auto elevation-4 pa-4 pa-sm-8 rounded-lg" style="background:rgba(245,246,250,0.97);">
          <v-card-title class="font-weight-bold text-h5 mb-2" style="color:#2473ac;">
            <v-icon class="me-2" color="#ffb300">mdi-cash-multiple</v-icon> Chatbot Reto97
          </v-card-title>
          <v-card-text>
            <div class="mb-4">Aquí puedes interactuar con el asesor virtual de Reto97 y ver información detallada sobre su servicio.</div>
            <ChatbotReto97 />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ChatbotReto97 from '../components/ChatbotReto97.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { ChatbotReto97 }
});
</script>

<style scoped>
.v-card-title {
  word-break: break-word;
  font-size: 1.2rem;
}
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1rem;
  }
  .v-card {
    padding: 16px !important;
  }
}
</style>