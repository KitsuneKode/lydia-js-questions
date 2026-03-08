'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Play, RotateCcw, Terminal } from 'lucide-react';

import type { QuestionRecord } from '@/lib/content/types';
import type { TimelineEvent } from '@/lib/run/types';
import { runJavaScriptInSandbox } from '@/lib/run/sandbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimpleCodeEditor } from '@/components/editor/simple-code-editor';
import { StackBlitzEmbedLazy } from '@/components/editor/stackblitz-embed-lazy';
import { TimelineChart } from '@/components/visualization/timeline-chart';

interface CodePlaygroundProps {
  question: QuestionRecord;
  onTimelineUpdate?: (timeline: TimelineEvent[]) => void;
}

export function CodePlayground({ question, onTimelineUpdate }: CodePlaygroundProps) {
  const runnableBlocks = useMemo(
    () => question.codeBlocks.filter((block) => block.language === 'javascript' || block.language === 'js'),
    [question.codeBlocks],
  );

  const hasModuleSyntax = useMemo(
    () => runnableBlocks.some((block) => /^\s*(import|export)\s/m.test(block.code)),
    [runnableBlocks],
  );

  const [stackblitzFailed, setStackblitzFailed] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  // Worker sandbox state (for timeline analysis)
  const [selectedId, setSelectedId] = useState<string | null>(runnableBlocks[0]?.id ?? null);
  const currentBlock = runnableBlocks.find((block) => block.id === selectedId) ?? runnableBlocks[0] ?? null;
  const [code, setCode] = useState(currentBlock?.code ?? '');
  const [logs, setLogs] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const first = runnableBlocks[0] ?? null;
    setSelectedId(first?.id ?? null);
    setCode(first?.code ?? '');
    setLogs([]);
    setErrors([]);
    setTimeline([]);
    setStackblitzFailed(false);
    setTimelineOpen(false);
  }, [question.id, runnableBlocks]);

  function resetCode() {
    if (!currentBlock) return;
    setCode(currentBlock.code);
  }

  async function runTimeline() {
    if (!currentBlock) {
      setErrors(['No runnable JavaScript snippet is available for this question.']);
      return;
    }

    setRunning(true);
    setLogs([]);
    setErrors([]);
    setTimeline([]);

    const result = await runJavaScriptInSandbox(code);
    setLogs(result.logs);
    setErrors(result.errors);
    setTimeline(result.timeline);
    onTimelineUpdate?.(result.timeline);
    setRunning(false);
  }

  if (!currentBlock) {
    return (
      <div className="rounded-lg border border-border bg-card/60 p-4">
        <p className="text-sm text-muted-foreground">This question has no browser-runnable JavaScript snippet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Primary: StackBlitz embed */}
      {!stackblitzFailed ? (
        <StackBlitzEmbedLazy
          codeBlocks={question.codeBlocks}
          questionId={question.id}
        />
      ) : (
        /* Fallback: SimpleCodeEditor when StackBlitz fails */
        <>
          <div className="flex flex-wrap items-center gap-2">
            {runnableBlocks.map((block, index) => {
              const active = block.id === currentBlock.id;
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(block.id);
                    setCode(block.code);
                    setLogs([]);
                    setErrors([]);
                    setTimeline([]);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                    active ? 'border-primary/40 bg-primary/15 text-primary' : 'border-border bg-muted/30 text-muted-foreground'
                  }`}
                >
                  Snippet {index + 1}
                </button>
              );
            })}
          </div>

          <SimpleCodeEditor value={code} onChange={setCode} />

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={runTimeline} disabled={running}>
              <Play className="mr-2 h-4 w-4" />
              {running ? 'Running...' : 'Run Code'}
            </Button>
            <Button variant="secondary" onClick={resetCode}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Badge>{currentBlock.language}</Badge>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-border bg-black/20 p-4">
              <p className="mb-2 inline-flex items-center gap-2 text-sm text-foreground">
                <Terminal className="h-4 w-4" />
                Console Output
              </p>
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                {logs.length === 0 && errors.length === 0 ? 'No output yet.' : [...logs, ...errors.map((err) => `[error] ${err}`)].join('\n')}
              </pre>
            </div>

            <div className="rounded-lg border border-border bg-black/20 p-4">
              <p className="mb-2 text-sm text-foreground">Event Loop Timeline</p>
              <TimelineChart events={timeline} />
            </div>
          </div>
        </>
      )}

      {/* Secondary: Timeline Analysis (collapsible) */}
      {!stackblitzFailed && (
        <div className="rounded-lg border border-border bg-card/40">
          <button
            type="button"
            onClick={() => setTimelineOpen((prev) => !prev)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Event Loop Timeline Analysis</span>
            {timelineOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {timelineOpen && (
            <div className="space-y-4 border-t border-border px-4 pb-4 pt-3">
              {hasModuleSyntax ? (
                <p className="text-xs text-muted-foreground">
                  Timeline analysis is unavailable for module-syntax snippets. Use the StackBlitz editor above to run them.
                </p>
              ) : (
                <>
                  {runnableBlocks.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {runnableBlocks.map((block, index) => {
                        const active = block.id === currentBlock.id;
                        return (
                          <button
                            key={block.id}
                            type="button"
                            onClick={() => {
                              setSelectedId(block.id);
                              setCode(block.code);
                              setLogs([]);
                              setErrors([]);
                              setTimeline([]);
                            }}
                            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                              active ? 'border-primary/40 bg-primary/15 text-primary' : 'border-border bg-muted/30 text-muted-foreground'
                            }`}
                          >
                            Snippet {index + 1}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <SimpleCodeEditor value={code} onChange={setCode} />

                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" onClick={runTimeline} disabled={running}>
                      <Play className="mr-2 h-4 w-4" />
                      {running ? 'Running...' : 'Run Timeline Analysis'}
                    </Button>
                    <Button size="sm" variant="secondary" onClick={resetCode}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                    <div className="rounded-lg border border-border bg-black/20 p-4">
                      <p className="mb-2 inline-flex items-center gap-2 text-sm text-foreground">
                        <Terminal className="h-4 w-4" />
                        Console Output
                      </p>
                      <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                        {logs.length === 0 && errors.length === 0 ? 'No output yet.' : [...logs, ...errors.map((err) => `[error] ${err}`)].join('\n')}
                      </pre>
                    </div>

                    <div className="rounded-lg border border-border bg-black/20 p-4">
                      <p className="mb-2 text-sm text-foreground">Event Loop Timeline</p>
                      <TimelineChart events={timeline} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
