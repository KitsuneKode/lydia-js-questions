import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Roboto_Mono } from 'next/font/google';
import '@/app/globals.css';

import { Provider } from '@/app/provider';
import { cn } from '@/lib/utils';

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

// const instrumentSerif = Instrument_Serif({
//   weight: '400',
//   subsets: ['latin'],
//   variable: '--font-display',
// });
//
// const geistSans = Geist({
//   variable: '--font-sans',
//   subsets: ['latin'],
// });
//
// const geistMono = Geist_Mono({
//   variable: '--font-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'JS Mastery Atlas',
  description:
    'Interactive JavaScript interview questions with runnable code and timeline visualizations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        // instrumentSerif.variable,
        // geistSans.variable,
        // geistMono.variable,
        // 'font-sans dark',
        bricolageGrotesqueBricolageGrotesque.variable,
        geistGeist.variable,
        robotoMonoRobotoMono.variable,
        'font-sans dark',
      )}
      suppressHydrationWarning
    >
      <body className="grain-overlay antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
