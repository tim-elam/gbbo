import { Resource } from 'sst';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Form from '@/components/form';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.GbboPublic.name,
  });

  const url = await getSignedUrl(new S3Client({}), command);

  return (
    <div className="h-full flex flex-col justify-around">
      <main className="flex flex-col items-center gap-2">
        <h1 className="font-display text-4xl font-light">Upload File</h1>
        <Form url={ url }/>
      </main>
    </div>
  );
}
