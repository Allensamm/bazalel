import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { CursorGlow } from '@/components/CursorGlow';
import { ScrollReveal } from '@/components/ScrollReveal';
import './globals.css';
import './redesign.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Bazalel — Squarespace Design Agency',
    template: '%s | Bazalel',
  },
  description:
    'Bazalel creates strategic Squarespace websites that help professional-service businesses earn trust, attract qualified enquiries, and turn more attention into action.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <ScrollReveal />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
