import { FilmIcon } from '@heroicons/react/24/outline';
import { addSeries } from './actions';
import { PlusIcon } from '@heroicons/react/20/solid';

export default function AddSeries() {
  return (
    <form>
      <div className="card bg-base-100 shadow-md w-96 mx-auto">
        <div className="card-body">
          <h2 className="card-title flex gap-2 items-center">
            <FilmIcon className="size-6"/>
            Add Series
          </h2>
          <label className="my-4 input input-bordered flex items-center gap-2">
            Number:
            <input className="grow"
                   type="number"
                   placeholder="1, 2, 3, etc..."
                   name="series_number"
                   min="1"
                   max="15"
                   required/>
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"
                    formAction={ addSeries }
                    type="submit">
              <PlusIcon className="size-6"/>
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
