import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export interface StorageClient {
  putObject(key: string, body: Uint8Array | string, contentType: string): Promise<void>;
}

export function createS3Storage(config: {
  endpoint?: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}): StorageClient {
  const client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: Boolean(config.endpoint),
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    }
  });

  return {
    async putObject(key, body, contentType) {
      await client.send(new PutObjectCommand({ Bucket: config.bucket, Key: key, Body: body, ContentType: contentType }));
    }
  };
}
