import { defineStore } from 'pinia';

export interface User {
  id: string;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    loadUser() {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});
