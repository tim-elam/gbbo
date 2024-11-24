'use server';

import { redirect } from 'next/navigation';
import { load } from 'cheerio';
import { db } from '@/utils/data/kysely';
import { TableInsert } from '@/types/database';
import { revalidatePath } from 'next/cache';

export async function addSeries(formData: FormData) {
  const seriesNumber = Number.parseInt(formData.get('series_number') as string);
  if (seriesNumber < 1 || seriesNumber > 15) {
    console.error('series_number outside of range!');
    return redirect('/error');
  }
  const response = await fetch(`https://thegreatbritishbakeoff.co.uk/bakers/series-${ seriesNumber }/`);
  const html = await response.text();
  const $ = load(html);

  await db.insertInto('series')
    .values({
      series_number: seriesNumber,
    })
    .onConflict(oc =>
      oc.column('series_number').doUpdateSet({ updated_at: new Date().toISOString() }))
    .execute();

  const bakerUrls = $('.bakers_list > .article-container > article').map((_, article) =>
    $(article).find('a').attr('href') as string);

  const bakers = await Promise.all(bakerUrls.map(async (index, url) => {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);
    const name = $('.page-title >  h1').first().text();
    const description = $('.excerpt').first().text().trim() || null;
    return {
      name,
      description,
      series_number: seriesNumber,
    } satisfies TableInsert<'bakers'>;
  }));

  await db.insertInto('bakers')
    .values(bakers)
    .onConflict(oc => oc
      .columns(['name', 'series_number'])
      .doUpdateSet(eb => ({
        updated_at: new Date().toISOString(),
        description: eb.ref('excluded.description'),
      })))
    .execute();
  revalidatePath('/admin/series');
  revalidatePath('/');
}
