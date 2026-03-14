import { cache } from 'react';
import fs from 'node:fs';
import path from 'node:path';

import type { QuestionRecord, QuestionsManifest } from '@/lib/content/types';

function resolveDataFile(relativePath: string): string {
  const candidates = [
    path.resolve(process.cwd(), '../../', relativePath),
    path.resolve(process.cwd(), relativePath),
  ];

  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(`Data file not found: ${relativePath}`);
  }

  return found;
}

export const getQuestions = cache((): QuestionRecord[] => {
  const filePath = resolveDataFile('content/generated/questions.v1.json');
  const file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file) as QuestionRecord[];
});

export const getManifest = cache((): QuestionsManifest => {
  const filePath = resolveDataFile('content/generated/manifest.v1.json');
  const file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file) as QuestionsManifest;
});

export const getQuestionById = cache((id: number): QuestionRecord | null => {
  const question = getQuestions().find((item) => item.id === id);
  return question ?? null;
});

export const getRelatedQuestions = cache((question: QuestionRecord, limit = 3): QuestionRecord[] => {
  const all = getQuestions();
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
});
