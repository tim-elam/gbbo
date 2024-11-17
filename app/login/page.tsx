import { login, signup } from '@/app/login/actions';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/20/solid';

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col justify-around items-center">
      <form>
        <div className="card p-8 bg-base-100 shadow-md flex flex-col items-center gap-4">
          <div className="text-4xl display flex gap-2 items-center mb-4">
            <LockClosedIcon className="size-8"/>
            Login
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <EnvelopeIcon className="size-4 text-gray-500"/>
            <input className="grow" id="email" name="email" type="email" placeholder="Email" required/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <KeyIcon className="size-4 text-gray-500"/>
            <input className="grow" id="password" name="password" placeholder="Password" type="password" required/>
          </label>
          <div className="flex gap-4 mt-4">
            <button className="btn btn-primary" formAction={ login }>Log in</button>
            <button className="btn btn-outline" formAction={ signup }>Sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
}
