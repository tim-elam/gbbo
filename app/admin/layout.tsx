import AdminNavbar from '@/components/admin/admin-navbar';
import AdminBreadcrumbs from '@/components/admin/admin-breadcrumbs';

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminNavbar>
      <div className="container mx-auto mt-4 flex flex-col gap-4">
        <AdminBreadcrumbs/>
        { children }
      </div>
    </AdminNavbar>
  );
}
