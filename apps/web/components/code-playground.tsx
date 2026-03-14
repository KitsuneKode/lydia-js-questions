'use client';

import { useEffect, useMemo, useState } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';

import type { QuestionRecord } from '@/lib/content/types';
import type { TimelineEvent } from '@/lib/run/types';
import { runJavaScriptInSandbox } from '@/lib/run/sandbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimpleCodeEditor } from '@/components/editor/simple-code-editor';
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

  const [selectedId, setSelectedId] = useState<string | null>(runnableBlocks[0]?.id ?? null);
  const currentBlock = runnableBlocks.find((block) => block.id === selectedId) ?? runnableBlocks[0] ?? null;
  const [code, setCode] = useState(currentBlock?.code ?? '');
  const [logs, setLogs] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [running, setRunning] = useState(false);

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

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card/60 p-3">
            <SimpleCodeEditor value={code} onChange={setCode} />
          </div>

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
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-black/20 p-4">
            <p className="mb-2 inline-flex items-center gap-2 text-sm text-foreground">
              <Terminal className="h-4 w-4" />
              Console Output
            </p>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
              {logs.length === 0 && errors.length === 0 ? 'Run the snippet to inspect logs and thrown errors.' : [...logs, ...errors.map((err) => `[error] ${err}`)].join('\n')}
            </pre>
          </div>

          <div className="rounded-2xl border border-border bg-black/20 p-4">
            <p className="mb-2 text-sm text-foreground">Event Loop Timeline</p>
            <TimelineChart events={timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}
