import { Worker } from 'bullmq';
import { BuildJob } from '@buildy/queue';

const worker = new Worker<BuildJob>(
  'build',
  async (job) => {
    console.log('processing build', job.data.buildId, job.data.platform, job.data.correlationId);
    return { status: 'succeeded' };
  },
  { connection: { host: '127.0.0.1', port: 6379 } }
);

worker.on('failed', (job, err) => {
  console.error('build job failed', job?.id, err.message);
});

const shutdown = async (signal: string) => {
  console.log(`Received ${signal}; shutting down build worker`);
  await worker.close();
  process.exit(0);
};

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
