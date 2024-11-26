import type { Kysely } from 'kysely';

import { up as addSeries } from './1731894442307_add-series';
import { up as addSeriesConstraint } from './1731899452363_series-number-constraint';
import { up as seriesNumberCreatedAtUpdatedAt } from './1731899704887_series-number-created-at-updated-at';
import { up as bakers } from './1731901284528_bakers';
import { up as bakersCreatedUpdated } from './1731905477326_bakers-created-updated';
import { up as seriesNumberRequired } from './1731952670915_series_number_required';
import { up as seriesDeleteCascade } from './1732153395379_series-delete-cascade';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('bakers')
    .execute();
  await db.schema.dropTable('series')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await addSeries(db);
  await addSeriesConstraint(db);
  await seriesNumberCreatedAtUpdatedAt(db);
  await bakers(db);
  await bakersCreatedUpdated(db);
  await seriesNumberRequired(db);
  await seriesDeleteCascade(db);
}
