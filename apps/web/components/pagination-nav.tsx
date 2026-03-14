import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface PaginationNavProps {
  page: number;
  pageCount: number;
  createHref: (page: number) => string;
}

export function PaginationNav({ page, pageCount, createHref }: PaginationNavProps) {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-4 py-8" aria-label="Pagination">
      <Link href={createHref(Math.max(1, page - 1))} className={page <= 1 ? 'pointer-events-none opacity-50' : ''}>
        <Button variant="secondary" size="sm" className="h-10 gap-2 px-4" disabled={page <= 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      </Link>
      <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span className="text-foreground">{page}</span>
        <span className="opacity-40">/</span>
        <span>{pageCount}</span>
      </div>
      <Link
        href={createHref(Math.min(pageCount, page + 1))}
        className={page >= pageCount ? 'pointer-events-none opacity-50' : ''}
      >
        <Button variant="secondary" size="sm" className="h-10 gap-2 px-4" disabled={page >= pageCount}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </nav>
  );
}
