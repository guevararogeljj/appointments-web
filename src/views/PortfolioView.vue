<template>
  <v-container class="d-flex align-center justify-center" style="background: transparent; min-height: 100vh;">
    <v-card class="mx-auto elevation-12 pa-4 pa-md-8 rounded-l"
      style="background: rgba(255,255,255,0.97); width: 100%; max-width: 1200px;">
      <div class="d-flex flex-column align-center mb-6">
        <span class="text-h4 font-weight-bold mb-1" style="color:#1976d2;">Portafolio de Proyectos</span>
        <span class="text-subtitle-1 mb-2" style="color:#888;">Bienvenido, explora mis aplicaciones destacadas</span>
      </div>
      <v-row>
        <v-col cols="12" md="6" class="mb-4">
          <v-card class="elevation-4 rounded-lg h-100" style="background:rgba(245,246,250,0.95);">
            <v-card-title class="font-weight-bold" style="color:#1976d2;">App de Citas</v-card-title>
            <v-card-text>
              <div class="mb-2">Gestión de usuarios, chats y reservas en tiempo real.</div>
              <ul class="pl-4 mb-2">
                <li>Vue 3 + TypeScript</li>
                <li>Vuetify 3</li>
                <li>SignalR</li>
                <li>API RESTful</li>
              </ul>
              <v-btn color="primary" variant="tonal" to="/about">Ver detalles</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="mb-4">
          <v-card class="elevation-4 rounded-lg h-100" style="background:rgba(245,246,250,0.95);">
            <v-card-title class="font-weight-bold" style="color:#1976d2;">Proyecto Demo</v-card-title>
            <v-card-text>
              <div class="mb-2">Ejemplo de integración de APIs y UI moderna.</div>
              <ul class="pl-4 mb-2">
                <li>Vue 3</li>
                <li>Vuetify</li>
                <li>Vite</li>
              </ul>
              <v-btn color="primary" variant="tonal" href="#" disabled>Próximamente</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-h5 font-weight-bold mt-8 mb-4 text-center" style="color:#1976d2; letter-spacing:1px;">Chats
        Destacados</div>
      <v-row>
        <v-col cols="12" md="6" class="mb-4">
          <v-card class="elevation-4 rounded-lg h-100" style="background:rgba(245,246,250,0.95);">
            <v-card-title class="font-weight-bold d-flex align-center" style="color:#1976d2;">
              <v-icon class="me-2" color="#1976d2">mdi-robot</v-icon> ChatbotAI
            </v-card-title>
            <v-card-text>
              <div class="mb-2">Asistente inteligente para consultas rápidas y soporte 24/7.</div>
              <chatbot-ai />
              <v-btn color="primary" variant="tonal" class="mt-3" :to="{ name: 'ChatbotAIDetail' }">Ver detalles</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="mb-4">
          <v-card class="elevation-4 rounded-lg h-100" style="background:rgba(245,246,250,0.95);">
            <v-card-title class="font-weight-bold d-flex align-center" style="color:#1976d2;">
              <v-icon class="me-2" color="#8e24aa">mdi-account-tie</v-icon> ChatbotKConsultores
            </v-card-title>
            <v-card-text>
              <div class="mb-2">Especialista en asesoría y consultoría personalizada.</div>
              <chatbot-kconsultores />
              <v-btn color="primary" variant="tonal" class="mt-3" :to="{ name: 'ChatbotKConsultoresDetail' }">Ver
                detalles</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="mb-4">
          <v-card class="elevation-4 rounded-lg h-100" style="background:rgba(245,246,250,0.95);">
            <v-card-title class="font-weight-bold d-flex align-center" style="color:#1976d2;">
              <v-icon class="me-2" color="#ffb300">mdi-trophy</v-icon> ChatbotReto97
            </v-card-title>
            <v-card-text>
              <div class="mb-2"> Reto97: 9 partidos, 7 días, un solo ganador.</div>
     
              <v-btn color="primary" variant="tonal" class="mt-3" :to="{ name: 'ChatbotReto97Detail' }">Ver
                detalles</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center mt-6" style="color:#1976d2; font-weight:500;">
        ¿Quieres saber más? Contáctame para colaboraciones o más información.
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// PortfolioView.vue - Página de inicio de presentación de proyectos
import ChatbotAI from '../components/ChatbotAI.vue';
import ChatbotKConsultores from '../components/ChatbotKConsultores.vue';
import ChatbotReto97 from '../components/ChatbotReto97.vue';
</script>

<style scoped>
.h-100 {
  height: 100%;
}
@media (max-width: 960px) {
  .pa-md-8 {
    padding: 16px !important;
  }
  .mt-8 {
    margin-top: 32px !important;
  }
}
</style>