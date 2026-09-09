import { Worker } from 'bullmq';
import { GenerationJob } from '@buildy/queue';

const worker = new Worker<GenerationJob>(
  'generation',
  async (job) => {
    console.log('processing generation', job.data.generationId, job.data.correlationId);
    return { status: 'succeeded' };
  },
  { connection: { host: '127.0.0.1', port: 6379 } }
);

worker.on('failed', (job, err) => {
  console.error('generation job failed', job?.id, err.message);
});

const shutdown = async (signal: string) => {
  console.log(`Received ${signal}; shutting down generation worker`);
  await worker.close();
  process.exit(0);
};

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
