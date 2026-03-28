import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono, Inter, Roboto_Mono } from 'next/font/google';
import '@/app/globals.css';

import { Provider } from '@/app/provider';
import { AuthProvider } from '@/components/auth-provider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const robotoMonoRobotoMono = Roboto_Mono({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'latin', 'latin-ext', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
});

const geistGeist = Geist({
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist',
});

const bricolageGrotesqueBricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage-grotesque',
});

const geistSans = Geist({
  variable: '--font-body',
  subsets: ['latin'],
});

const geistDisplay = Geist({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JS Interview Atlas',
  description:
    'Interactive JavaScript interview questions with runnable code and timeline visualizations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html
        lang="en"
        style={{ colorScheme: 'dark' }}
        className={cn(
          'dark',
          geistDisplay.variable,
          geistSans.variable,
          geistMono.variable,
          bricolageGrotesqueBricolageGrotesque.variable,
          geistGeist.variable,
          robotoMonoRobotoMono.variable,
          'font-sans',
          inter.variable,
        )}
        suppressHydrationWarning
      >
        <body className="grain-overlay antialiased">
          <Provider>{children}</Provider>
        </body>
      </html>
    </AuthProvider>
  );
}
