'use client';

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
    <form onSubmit={ onSubmit } className="flex max-sm:flex-col gap-4">
      <input name="file" type="file" className="file-input" accept="image/png, image/jpeg"/>
      <button className="btn btn-primary" type="submit">Upload</button>
    </form>
  );
}
