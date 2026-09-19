import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config({ path: '.env.local' });

function stripQuotes(v: string | undefined) {
  return (v || '').trim().replace(/^["']|["']$/g, '');
}

const rawEndpoint = stripQuotes(process.env.S3_ENDPOINT);
const endpoint = rawEndpoint.replace(/\/buyukaytac\/?$/i, '').replace(/\/$/, '');
const bucket = stripQuotes(process.env.S3_BUCKET_NAME);
const keyId = stripQuotes(process.env.S3_ACCESS_KEY_ID);
const secret = stripQuotes(process.env.S3_SECRET_ACCESS_KEY);
const region = stripQuotes(process.env.S3_REGION) || 'auto';
const publicBase = stripQuotes(process.env.S3_PUBLIC_URL).replace(/\/$/, '');

console.log('Endpoint (normalized):', endpoint);
console.log('Bucket:', bucket);
console.log('Public base:', publicBase);

const s3 = new AWS.S3({
  endpoint,
  accessKeyId: keyId,
  secretAccessKey: secret,
  signatureVersion: 'v4',
  region,
  s3ForcePathStyle: true,
});

const testKey = 'connection-tests/ping.txt';
const body = `buyuk-aytac-r2-ok ${new Date().toISOString()}`;

try {
  await s3
    .putObject({
      Bucket: bucket,
      Key: testKey,
      Body: body,
      ContentType: 'text/plain',
    })
    .promise();
  console.log('PUT: OK');

  const listed = await s3
    .listObjectsV2({ Bucket: bucket, Prefix: 'connection-tests/', MaxKeys: 5 })
    .promise();
  console.log(
    'LIST: OK ->',
    (listed.Contents || []).map((o) => o.Key).join(', ')
  );

  const publicUrl = `${publicBase}/${testKey}`;
  console.log('Public URL:', publicUrl);
  const res = await fetch(publicUrl);
  console.log('Public GET status:', res.status);
  const text = await res.text();
  if (res.ok) {
    console.log('Public GET body:', text.slice(0, 100));
  } else {
    console.log('Public GET body snippet:', text.slice(0, 150));
  }
} catch (e) {
  const err = e as { code?: string; name?: string; message?: string };
  console.error('FAIL:', err.code || err.name, err.message);
  process.exit(1);
}
