import type { Metadata } from 'next';
import { CursorGlow } from '@/components/CursorGlow';
import { ScrollReveal } from '@/components/ScrollReveal';
import './globals.css';
import './redesign.css';

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
      <body>
        <ScrollReveal />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
