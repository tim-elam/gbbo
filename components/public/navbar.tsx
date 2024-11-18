import { Bars3Icon } from '@heroicons/react/24/solid';

export default function Navbar({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer h-full">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 w-full">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Bars3Icon className="size-6"/>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-xl">G.B.B.O.</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li><a href="#series">Series</a></li>
              <li><a href="#bakers">Bakers</a></li>
            </ul>
          </div>
        </div>
        { children }
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li><a href="#series">Series</a></li>
          <li><a href="#bakers">Bakers</a></li>
        </ul>
      </div>
    </div>);
}
