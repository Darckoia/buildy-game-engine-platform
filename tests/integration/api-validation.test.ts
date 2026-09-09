import request from 'supertest';
import { createApp } from '../../apps/api/src/app';

describe('api validation endpoint', () => {
  it('rejects invalid game spec payload', async () => {
    const app = createApp();
    const response = await request(app).post('/validation/spec').send({ name: '', mechanics: [], platforms: [] });
    expect(response.status).toBe(400);
    expect(response.body.code).toBe('VALIDATION');
  });
});
