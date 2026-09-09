import { z } from 'zod';

export enum ErrorCode {
  VALIDATION = 'VALIDATION',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  INTERNAL = 'INTERNAL'
}

export const gameSpecSchema = z.object({
  name: z.string().min(1),
  genre: z.enum(['platformer', 'rpg', 'strategy', 'shooter', 'puzzle']),
  mechanics: z.array(z.string().min(1)).min(1),
  platforms: z.array(z.enum(['android', 'ios', 'web'])).min(1)
});

export type GameSpec = z.infer<typeof gameSpecSchema>;

export interface ApiErrorResponse {
  code: ErrorCode;
  message: string;
  correlationId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
