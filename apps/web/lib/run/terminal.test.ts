import { describe, expect, it } from 'vitest';
import { formatSandboxStackFrame, getPrimaryErrorMessage, toTerminalLogEntries } from './terminal';
import type { SandboxRunResult } from './types';

describe('terminal helpers', () => {
  it('formats stack frames consistently', () => {
    expect(
      formatSandboxStackFrame({
        functionName: 'handleClick',
        file: 'snippet.js',
        line: 7,
        column: 11,
      }),
    ).toBe('at handleClick (snippet.js:7:11)');
  });

  it('prefers sandbox summaries for primary error messages', () => {
    expect(
      getPrimaryErrorMessage({
        kind: 'runtime',
        name: 'TypeError',
        message: 'Cannot read properties of undefined',
        summary: 'TypeError: Cannot read properties of undefined',
        rawStack: null,
        frames: [],
        userLine: null,
        userColumn: null,
      }),
    ).toBe('TypeError: Cannot read properties of undefined');
  });

  it('converts sandbox logs and errors into terminal entries', () => {
    const result: SandboxRunResult = {
      logs: ['[log] hello', '[warn] careful'],
      timeline: [],
      errors: [
        {
          kind: 'runtime',
          name: 'ReferenceError',
          message: 'x is not defined',
          summary: 'ReferenceError: x is not defined',
          rawStack: 'ReferenceError: x is not defined\n    at snippet.js:2:3',
          frames: [
            {
              functionName: null,
              file: 'snippet.js',
              line: 2,
              column: 3,
            },
          ],
          userLine: 2,
          userColumn: 3,
        },
      ],
    };

    const entries = toTerminalLogEntries(result, 1000);

    expect(entries.map((entry) => entry.type)).toEqual(['log', 'warn', 'error', 'trace']);
    expect(entries.map((entry) => entry.content)).toEqual([
      'hello',
      'careful',
      'ReferenceError: x is not defined',
      'at snippet.js:2:3',
    ]);
  });
});
