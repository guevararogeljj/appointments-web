import type { AuthRequest, AuthResponse, RegistrationRequest } from '@/domain/models';

export interface IAuthService {
  login(request: AuthRequest): Promise<AuthResponse>;
  register(request: RegistrationRequest): Promise<any>; // Adjust return type as needed
  logout(): void;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setTokens(accessToken: string, refreshToken: string): void;
  clearTokens(): void;
}
