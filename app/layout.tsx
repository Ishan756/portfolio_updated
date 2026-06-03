import type { Metadata } from 'next';
import '../styles/globals.css';
import MovingBlob from '../components/MovingBlob';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Ishan Mishra',
  description: 'Full Stack Developer & AI Engineer',
  themeColor: '#0a0a0a',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <MovingBlob />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
