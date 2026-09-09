import jwt from 'jsonwebtoken';

export type Role = 'owner' | 'admin' | 'developer' | 'viewer';

export interface AuthClaims {
  sub: string;
  orgId: string;
  roles: Role[];
  permissions: string[];
}

export function signAccessToken(claims: AuthClaims, secret: string, expiresIn = '1h'): string {
  return jwt.sign(claims, secret, { expiresIn });
}

export function verifyAccessToken(token: string, secret: string): AuthClaims {
  return jwt.verify(token, secret) as AuthClaims;
}

const permissionMap: Record<Role, string[]> = {
  owner: ['project:read', 'project:write', 'generation:run', 'build:run', 'admin:*'],
  admin: ['project:read', 'project:write', 'generation:run', 'build:run'],
  developer: ['project:read', 'project:write', 'generation:run', 'build:run'],
  viewer: ['project:read']
};

export function rolePermissions(role: Role): string[] {
  return permissionMap[role];
}

export function hasPermission(claims: AuthClaims, required: string): boolean {
  return claims.permissions.includes(required) || claims.permissions.includes('admin:*');
}
