'use server';

import { db } from '@/utils/data/kysely';
import { revalidatePath } from 'next/cache';

export async function deleteSeries(seriesNumber: number) {
  await db.deleteFrom('series')
    .where('series_number', '=', seriesNumber)
    .execute();
  revalidatePath('/admin/series');
}
