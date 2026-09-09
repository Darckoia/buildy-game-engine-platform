import { Queue } from 'bullmq';

export interface GenerationJob {
  projectId: string;
  generationId: string;
  correlationId: string;
}

export interface BuildJob {
  projectId: string;
  buildId: string;
  platform: 'android' | 'ios' | 'web';
  correlationId: string;
}

export interface AssetProcessingJob {
  assetId: string;
  projectId: string;
  correlationId: string;
}

export function createQueue<T>(name: string, connection: { host: string; port: number }): Queue {
  return new Queue<T>(name, {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true
    }
  });
}

export async function moveToDeadLetter<T>(deadLetterQueue: Queue, payload: T): Promise<void> {
  await deadLetterQueue.add('dead-letter', payload, { removeOnComplete: 100 });
}
