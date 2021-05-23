export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  clientUrl: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
  clientUrl: string;
}

export interface ResetPasswordRequest {
  userId: string | null;
  code: string | null;
  password: string;
  confirmPassword: string;
}

export interface RevokeTokenRequest {
  token: string;
}

export interface EmailConfirmationRequest {
  userId: string | null;
  code: string | null;
}

export interface ResendEmailConfirmationRequest {
  email: string;
  сlientUrl: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiredAt: number;
  message: string;
}
