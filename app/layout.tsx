import type { Metadata, Viewport } from 'next';
import { CursorGlow } from '@/components/CursorGlow';
import { Navbar } from '@/components/Navbar';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';
import './redesign.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Squarespace Web Design for Service Businesses | Bazalel',
    template: '%s | Bazalel',
  },
  description:
    'Bazalel creates strategic Squarespace websites that help professional-service businesses earn trust, attract qualified enquiries, and turn more attention into action.',
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ScrollReveal />
        <CursorGlow />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
