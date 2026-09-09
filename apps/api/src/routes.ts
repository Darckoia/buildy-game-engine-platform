import { Router, type Router as ExpressRouter } from 'express';
import { signAccessToken } from '@buildy/auth';
import { gameSpecSchema } from '@buildy/types';
import { openApiDocument } from '@buildy/contracts';

export const apiRouter: ExpressRouter = Router();

apiRouter.get('/health', (_req, res) => res.status(200).json({ ok: true }));
apiRouter.get('/ready', (_req, res) => res.status(200).json({ ready: true }));

apiRouter.post('/auth/login', (_req, res) => {
  const accessToken = signAccessToken(
    { sub: 'user-1', orgId: 'org-1', roles: ['owner'], permissions: ['admin:*'] },
    process.env.JWT_SECRET || 'development-secret'
  );
  res.status(200).json({ accessToken, refreshToken: 'refresh-token-placeholder' });
});
apiRouter.post('/auth/register', (_req, res) => res.status(201).json({ userId: 'todo' }));
apiRouter.post('/auth/refresh', (_req, res) => res.status(200).json({ accessToken: 'todo' }));
apiRouter.get('/me', (_req, res) => res.status(200).json({ id: 'user-1' }));

apiRouter.get('/organizations', (_req, res) => res.status(200).json([]));
apiRouter.post('/organizations', (_req, res) => res.status(201).json({ id: 'org-1' }));
apiRouter.get('/organizations/:id/members', (_req, res) => res.status(200).json([]));
apiRouter.post('/organizations/:id/members', (_req, res) => res.status(201).json({ id: 'member-1' }));

apiRouter.get('/projects', (_req, res) => res.status(200).json([]));
apiRouter.post('/projects', (_req, res) => res.status(201).json({ id: 'project-1' }));
apiRouter.get('/projects/:id', (_req, res) => res.status(200).json({ id: 'project-1' }));
apiRouter.post('/projects/:id/generations', (_req, res) => res.status(202).json({ id: 'generation-1', status: 'queued' }));
apiRouter.post('/projects/:id/builds', (_req, res) => res.status(202).json({ id: 'build-1', status: 'queued' }));

apiRouter.get('/generations/:id', (_req, res) => res.status(200).json({ status: 'queued' }));
apiRouter.post('/generations/:id/cancel', (_req, res) => res.status(202).json({ status: 'cancelled' }));
apiRouter.post('/generations/:id/retry', (_req, res) => res.status(202).json({ status: 'queued' }));
apiRouter.get('/generations/:id/logs', (_req, res) => res.status(200).json({ logs: [] }));
apiRouter.get('/generations/:id/artifacts', (_req, res) => res.status(200).json({ artifacts: [] }));

apiRouter.get('/builds/:id', (_req, res) => res.status(200).json({ status: 'queued' }));
apiRouter.post('/builds/:id/retry', (_req, res) => res.status(202).json({ status: 'queued' }));
apiRouter.get('/builds/:id/download', (_req, res) => res.status(200).json({ url: 'https://example.local/artifact' }));

apiRouter.get('/templates', (_req, res) => res.status(200).json([]));
apiRouter.get('/templates/:id', (_req, res) => res.status(200).json({ id: 'template-1' }));
apiRouter.get('/genres', (_req, res) => res.status(200).json(['platformer']));
apiRouter.get('/mechanics', (_req, res) => res.status(200).json(['jump']));
apiRouter.post('/validation/spec', (req, res) => {
  const parsed = gameSpecSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ code: 'VALIDATION', message: 'Invalid game spec', issues: parsed.error.issues });
  }
  return res.status(200).json({ valid: true });
});

apiRouter.post('/assets/upload', (_req, res) => res.status(202).json({ id: 'asset-1' }));
apiRouter.get('/assets', (_req, res) => res.status(200).json([]));
apiRouter.post('/assets/import', (_req, res) => res.status(202).json({ id: 'asset-import-1' }));
apiRouter.post('/assets/validate', (_req, res) => res.status(200).json({ valid: true }));
apiRouter.get('/assets/:id', (_req, res) => res.status(200).json({ id: 'asset-1' }));

apiRouter.get('/platforms', (_req, res) => res.status(200).json(['android', 'ios', 'web']));
apiRouter.get('/export-presets', (_req, res) => res.status(200).json([]));

apiRouter.get('/admin/health', (_req, res) => res.status(200).json({ ok: true }));
apiRouter.get('/docs/openapi.json', (_req, res) => res.status(200).json(openApiDocument));
