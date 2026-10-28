import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function stripQuotes(value: string | undefined): string {
  return (value || '').trim().replace(/^["']|["']$/g, '');
}

/** R2 S3 endpoint — bucket adı path'te olmamalı */
export function getR2Endpoint(): string {
  return stripQuotes(process.env.S3_ENDPOINT)
    .replace(/\/buyukaytac\/?$/i, '')
    .replace(/\/$/, '');
}

export function getR2PublicBase(): string {
  return stripQuotes(process.env.S3_PUBLIC_URL).replace(/\/$/, '');
}

export function isR2Configured(): boolean {
  return Boolean(
    stripQuotes(process.env.S3_BUCKET_NAME) &&
      stripQuotes(process.env.S3_ACCESS_KEY_ID) &&
      stripQuotes(process.env.S3_SECRET_ACCESS_KEY) &&
      getR2Endpoint() &&
      getR2PublicBase()
  );
}

export function createR2Client(): S3Client {
  if (!isR2Configured()) {
    throw new Error(
      'R2 yapılandırılmamış. S3_BUCKET_NAME, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_ENDPOINT, S3_PUBLIC_URL gerekli.'
    );
  }

  return new S3Client({
    endpoint: getR2Endpoint(),
    region: stripQuotes(process.env.S3_REGION) || 'auto',
    forcePathStyle: true,
    credentials: {
      accessKeyId: stripQuotes(process.env.S3_ACCESS_KEY_ID),
      secretAccessKey: stripQuotes(process.env.S3_SECRET_ACCESS_KEY),
    },
  });
}

export function buildPublicObjectUrl(key: string): string {
  const base = getR2PublicBase();
  const cleanKey = key.replace(/^\/+/, '');
  return `${base}/${cleanKey}`;
}

export type UploadToR2Params = {
  buffer: Buffer;
  key: string;
  contentType: string;
};

export async function uploadBufferToR2({
  buffer,
  key,
  contentType,
}: UploadToR2Params): Promise<{ key: string; url: string }> {
  const s3 = createR2Client();
  const bucket = stripQuotes(process.env.S3_BUCKET_NAME);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  return {
    key,
    url: buildPublicObjectUrl(key),
  };
}

export function sanitizeUploadFolder(folder: string): string {
  const cleaned = folder
    .replace(/\\/g, '/')
    .split('/')
    .filter((part) => part && part !== '.' && part !== '..')
    .join('/');
  return cleaned || 'uploads';
}
