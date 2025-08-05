<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh; background: transparent;">
    <v-card max-width="420" class="mx-auto w-100 elevation-12 pa-6 rounded-xl" style="background: rgba(255,255,255,0.95);">
      <div class="d-flex flex-column align-center mb-4">
        <!-- <v-avatar size="72" class="mb-2" color="primary">
          <v-icon size="48" color="white">mdi-account-circle</v-icon>
        </v-avatar> -->
        <span class="text-h5 font-weight-bold mb-1" style="color:#1976d2;">Bienvenido</span>
        <span class="text-subtitle-2 mb-2" style="color:#888;">Inicia sesión para continuar</span>
      </div>
      <v-card-text>
<v-form @submit.prevent="login">
  <v-text-field
    v-model="email"
    label="Correo electrónico"
    :error-messages="errors.email"
    type="email"
    prepend-inner-icon="mdi-email"
    color="primary"
    class="mb-3"
    variant="outlined"
    autocomplete="username"
  ></v-text-field>
  <v-text-field
    v-model="password"
    label="Contraseña"
    :error-messages="errors.password"
    type="password"
    prepend-inner-icon="mdi-lock"
    color="primary"
    class="mb-4"
    variant="outlined"
    autocomplete="current-password"
  ></v-text-field>
  <v-btn :loading="isSubmitting" type="submit" color="primary" block size="large" class="mb-2" elevation="2">Entrar</v-btn>
  <BaseMessage v-if="error" :message="error" type="error" class="mt-3" />
  <BaseMessage v-if="successMessage" :message="successMessage" type="success" class="mt-3" />
</v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AxiosAuthService } from '../infrastructure/auth/AxiosAuthService';
import BaseMessage from '../components/BaseMessage.vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();
const authService = new AxiosAuthService();
const error = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const schema = yup.object({
  email: yup.string().required('El correo es obligatorio').email('Correo inválido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});
const { value: email } = useField('email');
const { value: password } = useField('password');

const login = handleSubmit(async (values) => {
  try {
    error.value = null;
    await authService.login({ email: values.email, password: values.password });
    successMessage.value = '¡Inicio de sesión exitoso! Redirigiendo...';
    
    setTimeout(() => {
      router.push('/');
      successMessage.value = null;
    }, 1200);
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed';
    console.error(err);
  }
});
</script>
