export interface PlatformTarget {
  id: string;
  displayName: string;
}

export interface EngineHealth {
  status: 'ok';
  timestamp: string;
}

export const supportedPlatforms: PlatformTarget[] = [
  { id: 'android', displayName: 'Android (Vulkan)' },
  { id: 'ios', displayName: 'iOS (Metal)' },
  { id: 'web', displayName: 'Web' }
];

export function healthcheck(): EngineHealth {
  return {
    status: 'ok',
    timestamp: new Date().toISOString()
  };
}
