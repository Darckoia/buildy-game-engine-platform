import type { NextFunction, Request, Response } from 'express';
import { BuildyError } from '@buildy/errors';

const reqCounts = new Map<string, { count: number; timestamp: number }>();
const LIMIT_WINDOW_MS = 60_000;
const LIMIT_COUNT = 120;

export function correlationId(req: Request, res: Response, next: NextFunction): void {
  const correlationId = req.header('x-correlation-id') ?? crypto.randomUUID();
  res.setHeader('x-correlation-id', correlationId);
  (req as Request & { correlationId: string }).correlationId = correlationId;
  next();
}

export function rateLimit(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const current = reqCounts.get(key);
  if (!current || now - current.timestamp > LIMIT_WINDOW_MS) {
    reqCounts.set(key, { count: 1, timestamp: now });
    return next();
  }

  current.count += 1;
  if (current.count > LIMIT_COUNT) {
    res.status(429).json({ code: 'RATE_LIMIT', message: 'Rate limit exceeded' });
    return;
  }
  next();
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  void _next;
  const correlationId = (req as Request & { correlationId?: string }).correlationId ?? 'unknown';
  if (err instanceof BuildyError) {
    res.status(err.status).json({ code: err.code, message: err.message, correlationId, details: err.details });
    return;
  }
  res.status(500).json({ code: 'INTERNAL', message: 'Internal Server Error', correlationId });
}
