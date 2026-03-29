import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

/**
 * Root "/" redirects to the default locale.
 * next-intl's proxy handles all locale-prefixed paths after that.
 */
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
