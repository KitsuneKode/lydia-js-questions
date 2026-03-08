import dynamic from 'next/dynamic';

export const StackBlitzEmbedLazy = dynamic(
  () => import('./stackblitz-embed').then((m) => m.StackBlitzEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-border bg-card/30">
        <p className="text-sm text-muted-foreground animate-pulse">Preparing sandbox...</p>
      </div>
    ),
  },
);
