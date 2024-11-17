import AdminNavbar from '@/components/admin/admin-navbar';

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminNavbar>
      { children }
    </AdminNavbar>
  );
}
