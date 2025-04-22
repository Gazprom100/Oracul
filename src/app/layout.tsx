import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SettingsProvider } from '@/context/SettingsContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'OraculAnalytics - Аналитика криптовалют',
  description: 'Платформа для анализа криптовалют и блокчейн-данных',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
} 