import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import type { LocaleIndex, QuestionRecord, QuestionsManifest } from '@/lib/content/types';
import { DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/config';

// ---------------------------------------------------------------------------
// Path resolution
// ---------------------------------------------------------------------------

/**
 * Two candidate roots: running from within apps/web (dev/build) or from repo
 * root (e.g. tests). Probes both and returns the first that contains the file.
 */
const DATA_ROOTS = [
  path.resolve(/* turbopackIgnore: true */ process.cwd(), 'content', 'generated'),
  path.resolve(/* turbopackIgnore: true */ process.cwd(), '..', '..', 'content', 'generated'),
];

function resolveGeneratedFile(relativePath: string): string | null {
  for (const root of DATA_ROOTS) {
    const candidate = path.join(root, relativePath);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function readJson<T>(relativePath: string): T | null {
  const resolved = resolveGeneratedFile(relativePath);
  if (!resolved) return null;
  return JSON.parse(fs.readFileSync(resolved, 'utf8')) as T;
}

// ---------------------------------------------------------------------------
// Core loaders
// ---------------------------------------------------------------------------

/**
 * Returns all questions for a locale. Missing question ids (relative to English)
 * are back-filled with the English record annotated with `isFallback: true`.
 */
export const getQuestions = cache((locale: LocaleCode = DEFAULT_LOCALE): QuestionRecord[] => {
  const localePath = `locales/${locale}/questions.v1.json`;
  const localeQuestions = readJson<QuestionRecord[]>(localePath);

  // English is always the authoritative set
  if (locale === DEFAULT_LOCALE) {
    return localeQuestions ?? [];
  }

  const enQuestions = readJson<QuestionRecord[]>(`locales/en/questions.v1.json`) ?? [];

  if (!localeQuestions) {
    // Entire locale is missing — return English fallback for all questions
    return enQuestions.map((q) => ({ ...q, isFallback: true }));
  }

  // Merge: locale records take precedence; missing ids get English fallback
  const localeById = new Map<number, QuestionRecord>(localeQuestions.map((q) => [q.id, q]));

  return enQuestions.map((enQ) => {
    const localeQ = localeById.get(enQ.id);
    if (localeQ) return localeQ;
    return { ...enQ, isFallback: true };
  });
});

export const getManifest = cache((locale: LocaleCode = DEFAULT_LOCALE): QuestionsManifest => {
  const manifest = readJson<QuestionsManifest>(`locales/${locale}/manifest.v1.json`);
  if (manifest) return manifest;

  // Fallback: try legacy flat path for English
  const legacy = readJson<QuestionsManifest>('manifest.v1.json');
  if (legacy) return legacy;

  throw new Error(`Manifest not found for locale: ${locale}`);
});

export const getLocaleIndex = cache((): LocaleIndex | null => {
  return readJson<LocaleIndex>('locales/index.json');
});

export const getQuestionById = cache(
  (locale: LocaleCode = DEFAULT_LOCALE, id: number): QuestionRecord | null => {
    const question = getQuestions(locale).find((item) => item.id === id);
    return question ?? null;
  },
);

export const getRelatedQuestions = cache(
  (locale: LocaleCode = DEFAULT_LOCALE, question: QuestionRecord, limit = 3): QuestionRecord[] => {
    const all = getQuestions(locale);
    return all
      .filter((q) => q.id !== question.id)
      .map((q) => {
        const commonTags = q.tags.filter((tag) => question.tags.includes(tag));
        return { q, commonTagsCount: commonTags.length };
      })
      .filter((item) => item.commonTagsCount > 0)
      .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
      .slice(0, limit)
      .map((item) => item.q);
  },
);
