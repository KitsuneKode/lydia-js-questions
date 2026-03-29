import { describe, expect, it, vi } from 'vitest';

import { calculateNextReview, DEFAULT_EASE_FACTOR } from './srs';

describe('SRS scheduling', () => {
  it('schedules the first successful review for the next day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-29T12:00:00.000Z'));

    const result = calculateNextReview('good');

    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBe(DEFAULT_EASE_FACTOR);
    expect(result.nextReviewDate.startsWith('2026-03-30')).toBe(true);

    vi.useRealTimers();
  });

  it('uses a longer interval and higher ease factor for easy answers', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-29T12:00:00.000Z'));

    const result = calculateNextReview('easy', {
      repetition: 2,
      interval: 6,
      easeFactor: 2.5,
      nextReviewDate: '2026-03-29T12:00:00.000Z',
    });

    expect(result.repetition).toBe(3);
    expect(result.interval).toBe(15);
    expect(result.easeFactor).toBeGreaterThan(2.5);
    expect(result.nextReviewDate.startsWith('2026-04-13')).toBe(true);

    vi.useRealTimers();
  });

  it('resets repetition and respects the ease factor floor for hard answers', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-29T12:00:00.000Z'));

    const result = calculateNextReview('hard', {
      repetition: 4,
      interval: 10,
      easeFactor: 1.35,
      nextReviewDate: '2026-03-29T12:00:00.000Z',
    });

    expect(result.repetition).toBe(0);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBe(1.3);

    vi.useRealTimers();
  });
});
