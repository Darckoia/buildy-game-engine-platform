import { healthcheck, supportedPlatforms } from '../src';

describe('platform bootstrap baseline', () => {
  it('returns healthy status', () => {
    expect(healthcheck().status).toBe('ok');
  });

  it('defines default supported platforms', () => {
    expect(supportedPlatforms.map((p) => p.id)).toEqual(['android', 'ios', 'web']);
  });
});
