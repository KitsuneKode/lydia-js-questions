import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandX,
  IconFileCode,
  IconHammer,
  IconHeartHandshake,
  IconLayersIntersect,
  IconQuote,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';
import { getManifest } from '@/lib/content/loaders';
import { type LocaleCode, SUPPORTED_LOCALES } from '@/lib/i18n/config';
import { withLocale } from '@/lib/locale-paths';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Credits - ${siteConfig.name}`,
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

interface CreditsPageProps {
  params: Promise<{ locale: LocaleCode }>;
}

const additions = [
  'a focused question library instead of a long README scroll',
  'worker-based runnable snippets that stay inside the app',
  'event-loop visualization for runtime-heavy questions',
  'progress, review cues, bookmarks, and a cleaner practice loop',
];

export default async function CreditsPage({ params }: CreditsPageProps) {
  const { locale } = await params;
  const manifest = getManifest(locale);

  return (
    <main className="pt-24 pb-16 md:pt-32">
      <Container>
        <section className="relative overflow-hidden rounded-[36px] border border-border-subtle bg-surface/80 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:px-10 md:py-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12)_0%,transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08)_0%,transparent_45%)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
            Credits & Attribution
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl tracking-[-0.04em] text-foreground md:text-6xl">
            Built by {siteConfig.creator.displayHandle}, powered by Lydia Hallie&apos;s questions.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-secondary md:text-lg">
            {siteConfig.name} is a creator-built practice product. The original questions and
            explanations come from Lydia Hallie&apos;s{' '}
            <Link
              href={siteConfig.source.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
            >
              {siteConfig.source.name}
            </Link>
            . My contribution is the product layer around that source: the interface, runner,
            visualization, scratchpad, and progress loop that make the material feel more usable in
            real practice sessions.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            This page extends the original credits, it does not replace them. The upstream source
            references, attribution, and supported language listing stay preserved below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={siteConfig.creator.xUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/15"
            >
              <IconBrandX className="h-4 w-4" />
              {siteConfig.creator.displayHandle}
            </Link>
            <Link
              href={siteConfig.creator.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <IconBrandGithub className="h-4 w-4" />
              GitHub profile
            </Link>
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Project repository
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[28px] border border-border-subtle bg-surface/75 p-7 shadow-[0_18px_56px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-3 text-primary">
              <IconHammer className="h-5 w-5" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Why I Built It
              </p>
            </div>
            <h2 className="mt-5 font-display text-3xl tracking-[-0.03em] text-foreground">
              A strong source deserved a stronger practice surface.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Lydia&apos;s repository is one of the best JavaScript references on the internet, but
              interview prep usually needs a faster loop than reading a long markdown file. I built
              this so you can answer first, reveal second, run code immediately, and come back with
              progress that still means something.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This project is also personal proof-of-work. I wanted the site itself to show care:
              design restraint, faster interactions, better mobile ergonomics, and a clearer sense
              that someone is actively making the experience better.
            </p>
          </article>

          <article className="rounded-[28px] border border-border-subtle bg-surface/75 p-7 shadow-[0_18px_56px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-3 text-primary">
              <IconLayersIntersect className="h-5 w-5" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                What I Added
              </p>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              {additions.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[28px] border border-border-subtle bg-surface/75 p-7 shadow-[0_18px_56px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-3 text-primary">
              <IconHeartHandshake className="h-5 w-5" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Original Credits
              </p>
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Thank you to{' '}
              <Link
                href={siteConfig.source.creatorUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
              >
                {siteConfig.source.creatorName}
              </Link>{' '}
              for creating and maintaining the source material this experience is built on. The
              question content, explanations, and the original educational foundation belong to that
              work and its contributors.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The original repo links and the supported language files stay visible here so the
              source material remains easy to trace back to.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={siteConfig.source.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Original repository
                <IconArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.source.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Lydia Hallie
              </Link>
            </div>
          </article>

          <article className="rounded-[28px] border border-border-subtle bg-surface/75 p-7 shadow-[0_18px_56px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-3 text-primary">
              <IconQuote className="h-5 w-5" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Source Integrity
              </p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-border/60 bg-background/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Source file
                </p>
                <p className="mt-3 font-mono text-sm text-foreground">
                  {manifest.source.upstreamPath ?? manifest.source.file}
                </p>
              </div>
              <div className="rounded-[22px] border border-border/60 bg-background/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Generated
                </p>
                <p className="mt-3 font-mono text-sm text-foreground">
                  {new Date(manifest.generatedAt).toLocaleString()}
                </p>
              </div>
              <div className="rounded-[22px] border border-border/60 bg-background/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Current locale
                </p>
                <p className="mt-3 font-mono text-sm text-foreground">{manifest.locale.label}</p>
              </div>
              <div className="rounded-[22px] border border-border/60 bg-background/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Questions
                </p>
                <p className="mt-3 font-mono text-sm text-foreground">
                  {manifest.totals.questions}
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[28px] border border-border-subtle bg-surface/75 p-7 shadow-[0_18px_56px_rgba(0,0,0,0.22)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Supported Languages
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] text-foreground">
                Preserved from the upstream source.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                These translation links come directly from Lydia Hallie&apos;s source material and
                stay part of the credits page so the original language coverage remains visible.
              </p>
            </div>
            <Link
              href={withLocale(locale, '/questions')}
              className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
            >
              Start practicing
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-3">
            {manifest.translations.map((translation) => (
              <li
                key={translation.href}
                className="rounded-[20px] border border-border/60 bg-background/60 px-4 py-3"
              >
                <Link
                  href={`https://github.com/lydiahallie/javascript-questions/blob/master/${translation.href.replace('./', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                >
                  <IconFileCode className="h-4 w-4 text-muted-foreground" />
                  {translation.label}
                  <IconArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}
