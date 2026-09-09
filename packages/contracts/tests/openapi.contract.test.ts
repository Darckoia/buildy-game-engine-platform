import { openApiDocument } from '../src/openapi';

describe('OpenAPI contracts', () => {
  it('contains core endpoints', () => {
    expect(openApiDocument.paths['/health']).toBeDefined();
    expect(openApiDocument.paths['/auth/login']).toBeDefined();
    expect(openApiDocument.paths['/projects/{id}/builds']).toBeDefined();
  });
});
