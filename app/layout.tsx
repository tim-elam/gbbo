import type { Metadata } from 'next';
import './globals.css';
import { Lobster_Two, Lora, Open_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Stem',
  description: 'Stem Site',
};

const lobsterTwo = Lobster_Two({
  subsets: ['latin'],
  variable: '--font-lobster-two',
  display: 'swap',
  weight: '400',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald"
          className={ `${ lora.variable } ${ lobsterTwo.variable } ${ openSans.variable } font-sans h-full bg-base-300` }>
    <body className="h-full">
    { children }
    </body>
    </html>
  );
}
