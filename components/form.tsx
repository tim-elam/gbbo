'use client';

import styles from './form.module.css';
import { FormEvent } from 'react';

export default function Form({ url }: { url: string }) {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const file = (e.target as HTMLFormElement).file.files?.[0] ?? null;

    const image = await fetch(url, {
      body: file,
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${ file.name }"`,
      },
    });

    window.location.href = image.url.split('?')[0];
  }

  return (
    <form
      className={ styles.form }
      onSubmit={ onSubmit }
    >
      <input name="file" type="file" accept="image/png, image/jpeg"/>
      <button type="submit">Upload</button>
    </form>
  );
}
