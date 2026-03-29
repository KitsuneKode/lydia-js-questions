import { DEFAULT_LOCALE, type LocaleCode, SUPPORTED_LOCALES } from '@/lib/i18n/config';

export function getLocaleFromPathname(pathname: string): LocaleCode {
  const segment = pathname.split('/')[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(segment)
    ? (segment as LocaleCode)
    : DEFAULT_LOCALE;
}

export function withLocale(locale: string, href: string): string {
  if (!href.startsWith('/')) {
    return href;
  }

  if (href === '/') {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}

export function switchLocalePath(pathname: string, targetLocale: string): string {
  const parts = pathname.split('/');

  if ((SUPPORTED_LOCALES as readonly string[]).includes(parts[1])) {
    parts[1] = targetLocale;
    return parts.join('/');
  }

  return `/${targetLocale}${pathname}`;
}
