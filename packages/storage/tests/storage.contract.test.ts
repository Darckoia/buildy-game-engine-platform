import { createS3Storage } from '../src';

describe('storage contract', () => {
  it('exposes a putObject function', () => {
    const storage = createS3Storage({
      region: 'us-east-1',
      endpoint: 'http://localhost:9000',
      accessKeyId: 'minioadmin',
      secretAccessKey: 'minioadmin',
      bucket: 'buildy'
    });
    expect(typeof storage.putObject).toBe('function');
  });
});
