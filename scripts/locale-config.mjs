/**
 * Pilot locale configuration.
 * Single source of truth shared between sync-upstream.mjs and parse-readme.mjs.
 * Update here when adding or removing locale support.
 */

export const PILOT_LOCALES = [
  {
    code: 'en',
    upstreamPath: 'README.md',
    label: 'English',
    dir: 'ltr',
  },
  {
    code: 'es',
    upstreamPath: 'es-ES/README-ES.md',
    label: 'Español',
    dir: 'ltr',
  },
  {
    code: 'fr',
    upstreamPath: 'fr-FR/README_fr-FR.md',
    label: 'Français',
    dir: 'ltr',
  },
  {
    code: 'de',
    upstreamPath: 'de-DE/README.md',
    label: 'Deutsch',
    dir: 'ltr',
  },
  {
    code: 'ja',
    upstreamPath: 'ja-JA/README-ja_JA.md',
    label: '日本語',
    dir: 'ltr',
  },
  {
    code: 'pt-BR',
    upstreamPath: 'pt-BR/README_pt_BR.md',
    label: 'Português (BR)',
    dir: 'ltr',
  },
];

export const DEFAULT_LOCALE = 'en';
