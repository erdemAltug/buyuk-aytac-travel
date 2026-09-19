/**
 * R2 upload smoke test — gerçek bir JPEG buffer yükler
 * Kullanım: npx tsx scripts/test-r2-upload-image.ts
 */
import dotenv from 'dotenv';
import { createR2Client, getR2PublicBase, isR2Configured, uploadBufferToR2 } from '../src/lib/r2';

dotenv.config({ path: '.env.local' });

// Minimal 1x1 JPEG
const JPEG_1X1 = Buffer.from(
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  'base64'
);

async function main() {
  if (!isR2Configured()) {
    console.error('R2 env eksik');
    process.exit(1);
  }

  const key = `tours/smoke-${Date.now()}.jpg`;
  const { url } = await uploadBufferToR2({
    buffer: JPEG_1X1,
    key,
    contentType: 'image/jpeg',
  });

  console.log('Uploaded key:', key);
  console.log('Public URL:', url);
  console.log('Public base:', getR2PublicBase());

  const s3 = createR2Client();
  const head = await s3
    .headObject({
      Bucket: process.env.S3_BUCKET_NAME!.replace(/^["']|["']$/g, ''),
      Key: key,
    })
    .promise();
  console.log('HEAD ContentType:', head.ContentType, 'Size:', head.ContentLength);
  console.log('OK — admin upload bu URL kalıbını kullanacak');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
