import { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import { NextAuthProvider } from './providers';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookWise | Plataforma de recomendações para leitores',
  description: 'Plataforma de recomendações para leitores',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className} bg-gray-800 text-gray-100`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
