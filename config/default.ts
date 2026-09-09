export interface AppConfig {
  nodeEnv: string;
  port: number;
  logLevel: string;
}

export function getDefaultConfig(): AppConfig {
  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    logLevel: process.env.LOG_LEVEL ?? 'info'
  };
}
