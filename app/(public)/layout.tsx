import Navbar from '@/components/public/navbar';

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Navbar>
      { children }
    </Navbar>
  );
}
