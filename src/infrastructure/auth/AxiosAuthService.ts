
import apiClient from '@/services/api';
import type { IAuthService } from '@/application/auth/IAuthService';
import type { AuthRequest, AuthResponse, RegistrationRequest } from '@/domain/models';
import { useAuthStore } from '@/stores/auth';

export class AxiosAuthService implements IAuthService {
  async login(request: AuthRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/Auth/login', request);
    // Guardar usuario en Pinia y localStorage
    const authStore = useAuthStore();
    authStore.setUser(response.data);
    // También guardar los tokens por compatibilidad si se usan en otros lugares
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  async register(request: RegistrationRequest): Promise<any> {
    const response = await apiClient.post('/Auth/register', request);
    return response.data;
  }

  logout(): void {
    this.clearTokens();
    const authStore = useAuthStore();
    authStore.logout();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('jwtToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
  }
}
