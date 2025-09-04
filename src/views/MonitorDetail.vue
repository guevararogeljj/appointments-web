<template>
  <v-container class="py-8" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="mx-auto elevation-4 pa-4 pa-sm-8 rounded-lg" style="background:rgba(245,246,250,0.97);">
          <v-card-title class="font-weight-bold text-h5 mb-2" style="color:#8e24aa;">
            <v-icon class="me-2" color="#8e24aa">mdi-account-tie</v-icon> Chatbot KConsultores
          </v-card-title>
          <v-card-text>
            <div class="mb-4">Aquí puedes interactuar con el Monitor GUID y ver información detallada sobre su servicio.</div>
            <Monitor />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Monitor from '../components/Monitor.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { Monitor: Monitor }
});
</script>

<style scoped>
/* Ajustes adicionales para responsividad */
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