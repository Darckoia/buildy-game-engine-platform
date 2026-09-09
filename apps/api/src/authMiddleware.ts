import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '@buildy/errors';
import { verifyAccessToken } from '@buildy/auth';

export interface RequestAuth {
  sub: string;
  orgId: string;
  roles: string[];
  permissions: string[];
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.header('authorization')?.replace('Bearer ', '');
  if (!token) {
    next(new UnauthorizedError());
    return;
  }

  try {
    const claims = verifyAccessToken(token, process.env.JWT_SECRET || 'development-secret');
    (req as Request & { auth: RequestAuth }).auth = claims;
    next();
  } catch {
    next(new UnauthorizedError());
  }
}

export function requireTenant(req: Request, res: Response, next: NextFunction): void {
  const orgId = req.header('x-org-id');
  const auth = (req as Request & { auth?: RequestAuth }).auth;
  if (auth && orgId && auth.orgId === orgId) {
    next();
    return;
  }
  res.status(403).json({ code: 'FORBIDDEN', message: 'Tenant mismatch' });
}
