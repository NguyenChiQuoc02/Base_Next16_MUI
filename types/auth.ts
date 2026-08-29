export type Role = "ROLE_USER" | "ROLE_TEACHER" | "ROLE_ADMIN";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export interface MessageResponse {
  message: string;
}
