import Navbar from '@/components/public/navbar';

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Navbar>
      <div className="container mt-4 mx-auto">
        { children }
      </div>
    </Navbar>
  );
}
