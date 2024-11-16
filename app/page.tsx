import { Resource } from 'sst';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Form from '@/components/form';

export const dynamic = 'force-dynamic';

import styles from './page.module.css';

export default async function Home() {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.GbboPublic.name,
  });

  const url = await getSignedUrl(new S3Client({}), command);

  return (
    <div className={ styles.page }>
      <main className={ styles.main }>
        <Form url={ url }/>
      </main>
    </div>
  );
}
