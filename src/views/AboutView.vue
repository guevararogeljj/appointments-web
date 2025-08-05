<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh; background: transparent;">
    <v-card max-width="480" class="mx-auto w-100 elevation-12 pa-6 rounded-xl" style="background: rgba(255,255,255,0.97);">
      <div class="d-flex flex-column align-center mb-4">
        <v-avatar size="72" class="mb-2" color="primary">
          <v-icon size="48" color="white">mdi-information</v-icon>
        </v-avatar>
        <span class="text-h5 font-weight-bold mb-1" style="color:#1976d2;">Sobre la aplicación</span>
        <span class="text-subtitle-2 mb-2" style="color:#888;">Información general</span>
      </div>
      <v-card-text>
        <div class="mb-2">
          Esta aplicación de citas está diseñada para facilitar la gestión de usuarios, chats y reservas de manera eficiente y moderna.
        </div>
        <div class="mb-2">
          <strong>Tecnologías usadas:</strong>
          <ul class="pl-4">
            <li>Vue 3 + TypeScript</li>
            <li>Vuetify 3</li>
            <li>Vite</li>
            <li>SignalR</li>
            <li>API RESTful</li>
          </ul>
        </div>
        <div class="mt-4" style="color:#1976d2; font-weight:500;">
          ¡Gracias por usar nuestra app!
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// AboutView con diseño moderno
</script>

<style>

</style>