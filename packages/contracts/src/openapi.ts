export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Buildy API',
    version: '0.1.0'
  },
  paths: {
    '/health': { get: { responses: { '200': { description: 'OK' } } } },
    '/ready': { get: { responses: { '200': { description: 'Ready' } } } },
    '/auth/login': { post: { responses: { '200': { description: 'Token pair' } } } },
    '/projects': { get: { responses: { '200': { description: 'Project list' } } } },
    '/projects/{id}/generations': { post: { responses: { '202': { description: 'Generation queued' } } } },
    '/projects/{id}/builds': { post: { responses: { '202': { description: 'Build queued' } } } }
  }
} as const;
