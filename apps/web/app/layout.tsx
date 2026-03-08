import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import './globals.css';

import { Toaster } from 'sonner';

import { AuthProvider } from '@/components/auth-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProgressProvider } from '@/lib/progress/progress-context';
import { NotificationManager } from '@/components/notification-manager';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'JS Interview Atlas',
  description: 'Interactive JavaScript interview questions with runnable code and timeline visualizations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="en" className={`${display.variable} ${body.variable}`}>
        <body className="grain-overlay antialiased">
          <ProgressProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <NotificationManager />
            <Toaster
              theme="dark"
              toastOptions={{
                style: {
                  background: 'hsl(224, 28%, 10%)',
                  border: '1px solid hsl(223, 17%, 24%)',
                  color: 'hsl(38, 32%, 92%)',
                },
              }}
            />
          </ProgressProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
