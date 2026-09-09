import cors from 'cors';
import express, { type Express } from 'express';
import { apiRouter } from './routes';
import { correlationId, errorHandler, rateLimit } from './middleware';

export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));
  app.use(correlationId);
  app.use(rateLimit);
  app.use(apiRouter);
  app.use(errorHandler);
  return app;
}
