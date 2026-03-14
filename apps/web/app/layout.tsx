import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
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
  weight: ['400', '500', '600', '700'],
});

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'JS Interview Atlas',
  description: 'Interactive JavaScript interview questions with runnable code and timeline visualizations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
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
                  background: 'hsl(220, 13%, 9%)',
                  border: '1px solid hsl(220, 10%, 18%)',
                  color: 'hsl(210, 20%, 93%)',
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                },
              }}
            />
          </ProgressProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
