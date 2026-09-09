import { createApp } from './app';

const app = createApp();
const port = Number(process.env.PORT || 3000);

const server = app.listen(port, () => {
  console.log(`Buildy API listening on ${port}`);
});

function shutdown(signal: string): void {
  console.log(`Received ${signal}; shutting down API server`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
