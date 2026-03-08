'use client';

import { useEffect, useRef, useState } from 'react';

import type { QuestionCodeBlock } from '@/lib/content/types';

interface StackBlitzEmbedProps {
  codeBlocks: QuestionCodeBlock[];
  questionId: number;
}

export function StackBlitzEmbed({ codeBlocks, questionId }: StackBlitzEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setError(null);

    const jsBlocks = codeBlocks.filter(
      (b) => b.language === 'javascript' || b.language === 'js',
    );

    if (jsBlocks.length === 0) {
      setError('No JavaScript snippets available for this question.');
      setLoading(false);
      return;
    }

    const files: Record<string, string> = {};
    let entryFile: string;

    if (jsBlocks.length === 1) {
      entryFile = 'index.js';
      files[entryFile] = jsBlocks[0].code;
    } else {
      jsBlocks.forEach((block, i) => {
        files[`snippet-${i + 1}.js`] = block.code;
      });
      entryFile = 'snippet-1.js';
      // Create an index that imports all snippets sequentially
      files['index.js'] = jsBlocks
        .map((_, i) => `import './snippet-${i + 1}.js';`)
        .join('\n');
    }

    files['index.html'] = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <p>Open the console (F12) to see output.</p>
    <script type="module" src="./index.js"><\/script>
  </body>
</html>`;

    import('@stackblitz/sdk').then((sdk) => {
      if (cancelled) return;

      sdk.default
        .embedProject(container, {
          title: `JS Question #${questionId}`,
          description: 'JavaScript interview question sandbox',
          template: 'javascript',
          files,
        }, {
          height: 420,
          openFile: entryFile,
          view: 'editor',
          theme: 'dark',
          hideNavigation: false,
        })
        .then(() => {
          if (!cancelled) setLoading(false);
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : 'Failed to load StackBlitz embed.');
            setLoading(false);
          }
        });
    }).catch(() => {
      if (!cancelled) {
        setError('Failed to load StackBlitz SDK.');
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      // Clear embed on cleanup
      if (container) container.innerHTML = '';
    };
  }, [questionId, codeBlocks]);

  if (error) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-border bg-card/30">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex h-[420px] items-center justify-center rounded-xl border border-border bg-card/30">
          <p className="text-sm text-muted-foreground animate-pulse">Preparing sandbox...</p>
        </div>
      )}
      <div ref={containerRef} key={questionId} className="overflow-hidden rounded-xl" />
    </div>
  );
}
