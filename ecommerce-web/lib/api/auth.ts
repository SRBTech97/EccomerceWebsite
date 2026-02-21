import { apiGet, apiPost } from './client';

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  userId: string;
  email: string;
  role: string;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  createdAt: string;
}

export async function register(dto: RegisterDto): Promise<RegisterResponse> {
  return apiPost<RegisterDto, RegisterResponse>('/auth/register', dto);
}

export async function login(dto: LoginDto): Promise<AuthResponse> {
  return apiPost<LoginDto, AuthResponse>('/auth/login', dto);
}

export async function getCurrentUser(token: string): Promise<User> {
  return apiGet<User>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
