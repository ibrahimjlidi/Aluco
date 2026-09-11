import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import { LanguageProvider } from './context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });
const cinzel = Cinzel({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alucoa Aluminium | Menuiserie Aluminium de Luxe Tunisie',
  description: 'Menuiserie aluminium premium en Tunisie, Grand Tunis, Hammamet, Nabeul, Sousse et Monastir.',
  icons: {
    icon: '/logo-alucoa-mark.svg',
    shortcut: '/logo-alucoa-mark.svg',
    apple: '/logo-alucoa-mark.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} ${plusJakarta.className} ${cinzel.className}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
