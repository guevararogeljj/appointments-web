<template>
  <v-container class="d-flex align-center justify-center" style="background: transparent; min-height: 100vh;">
    <v-card class="mx-auto w-100 elevation-12 pa-8 rounded-l" style="background: rgba(255,255,255,0.97); height: 80vh; min-height: 400px;">
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
      <div class="text-center mt-6" style="color:#1976d2; font-weight:500;">
        ¿Quieres saber más? Contáctame para colaboraciones o más información.
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// PortfolioView.vue - Página de inicio de presentación de proyectos
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
