import AdminNavbar from '@/components/admin/admin-navbar';
import AdminBreadcrumbs from '@/components/admin/admin-breadcrumbs';

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminNavbar>
      <div className="container mx-auto pt-4 px-4 flex flex-col gap-4 h-full">
        <AdminBreadcrumbs/>
        { children }
      </div>
    </AdminNavbar>
  );
}
