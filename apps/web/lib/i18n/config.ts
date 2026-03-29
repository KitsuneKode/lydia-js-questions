/**
 * Pilot locale configuration for the web app.
 * Must not import Node-only modules — pure TypeScript.
 * Mirrors scripts/locale-config.mjs but as a typed module for the app.
 */

export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'ja', 'pt-BR'] as const;
export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALE_LABELS: Record<LocaleCode, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  'pt-BR': 'Português (BR)',
};

export const LOCALE_DIRS: Record<LocaleCode, 'ltr' | 'rtl'> = {
  en: 'ltr',
  es: 'ltr',
  fr: 'ltr',
  de: 'ltr',
  ja: 'ltr',
  'pt-BR': 'ltr',
};

export function isValidLocale(value: string): value is LocaleCode {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
