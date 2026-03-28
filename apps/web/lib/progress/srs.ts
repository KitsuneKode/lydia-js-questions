export type Grade = 'hard' | 'good' | 'easy';

export interface SRSData {
  repetition: number;
  interval: number; // in days
  easeFactor: number;
  nextReviewDate: string; // ISO string
}

export const DEFAULT_EASE_FACTOR = 2.5;

/**
 * SuperMemo-2 (SM-2) algorithm for Spaced Repetition.
 * Maps 'hard', 'good', 'easy' to 0-5 scale grades.
 */
export function calculateNextReview(
  gradeName: Grade,
  current: SRSData = {
    repetition: 0,
    interval: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    nextReviewDate: new Date().toISOString(),
  },
): SRSData {
  // Map our UI grades to SM-2 grades
  // 2: Incorrect response, but remembered easily upon seeing the answer (Hard)
  // 4: Correct response after a hesitation (Good)
  // 5: Perfect response (Easy)
  let grade = 4;
  if (gradeName === 'hard') grade = 2;
  if (gradeName === 'good') grade = 4;
  if (gradeName === 'easy') grade = 5;

  let { repetition, interval, easeFactor } = current;

  if (grade >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    repetition,
    interval,
    easeFactor,
    nextReviewDate: nextReviewDate.toISOString(),
  };
}
