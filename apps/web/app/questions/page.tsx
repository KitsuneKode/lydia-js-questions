import { Container } from '@/components/container';
import { FiltersBar } from '@/components/filters-bar';
import { PaginationNav } from '@/components/pagination-nav';
import { QuestionsResults } from '@/components/questions-results';
import { NextRecommendedBanner } from '@/components/next-recommended-banner';
import { applyServerFilters, paginate } from '@/lib/content/query';
import { getManifest, getQuestions } from '@/lib/content/loaders';

const PAGE_SIZE = 18;

type SearchParams = Record<string, string | string[] | undefined>;
type ListingStatus = 'all' | 'answered' | 'unanswered' | 'bookmarked';

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return value ?? '';
}

export default async function QuestionsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await searchParams;
  const allQuestions = getQuestions();
  const manifest = getManifest();

  const pageParam = Number.parseInt(firstValue(resolvedSearchParams.page), 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const q = firstValue(resolvedSearchParams.q);
  const tag = firstValue(resolvedSearchParams.tag);
  const runnable = firstValue(resolvedSearchParams.runnable);
  const rawStatus = firstValue(resolvedSearchParams.status);
  const status: ListingStatus =
    rawStatus === 'answered' || rawStatus === 'unanswered' || rawStatus === 'bookmarked' ? rawStatus : 'all';

  const filtered = applyServerFilters(allQuestions, {
    q,
    tag,
    runnable: runnable === 'true' ? true : undefined,
  });

  const paged = paginate(filtered, page, PAGE_SIZE);

  const createHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (targetPage > 1) params.set('page', String(targetPage));
    if (q) params.set('q', q);
    if (tag && tag !== 'all') params.set('tag', tag);
    if (runnable === 'true') params.set('runnable', 'true');
    if (status && status !== 'all') params.set('status', status);

    const query = params.toString();
    return query ? `/questions?${query}` : '/questions';
  };

  return (
    <main className="py-10 md:py-14">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <header className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {allQuestions.length} Questions
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
            </div>
            <h1 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Question Library
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground/80">
              Browse and practice JavaScript interview questions. Commit to an answer, then explore the explanation and run the code.
            </p>
          </header>

          {/* Recommended Banner */}
          <NextRecommendedBanner questions={allQuestions} />

          {/* Filters and Results */}
          <section className="space-y-6">
            <FiltersBar
              tags={manifest.tags}
              selectedTag={tag || 'all'}
              search={q}
              runnable={runnable}
              status={status}
              totalQuestions={allQuestions.length}
            />

            {/* Results count bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
              <p>
                <span className="text-foreground/70">{paged.items.length}</span>
                <span className="mx-1.5 text-muted-foreground/30">/</span>
                <span>{paged.total} questions</span>
              </p>
              <p className="flex items-center gap-1.5 font-mono">
                <span className="text-foreground/70">{paged.page}</span>
                <span className="text-muted-foreground/30">/</span>
                <span>{paged.pageCount}</span>
              </p>
            </div>

            <QuestionsResults questions={paged.items} status={status} />

            <PaginationNav page={paged.page} pageCount={paged.pageCount} createHref={createHref} />
          </section>
        </div>
      </Container>
    </main>
  );
}
