import { Bars3Icon } from '@heroicons/react/24/solid';
import AdminSidebar from './admin-sidebar';
export default function AdminNavbar({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer lg:drawer-open min-h-full">
      <input id="admin-nav-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 w-full h-24">
          <div className="flex-none lg:hidden">
            <label htmlFor="admin-nav-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Bars3Icon className="size-6"/>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-xl">G.B.B.O. Admin</div>
        </div>
        { children }
      </div>
      <AdminSidebar />
    </div>
);
}
