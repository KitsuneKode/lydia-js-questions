import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getQuestions } from '@/lib/content/loaders';
import { type LocaleCode, SUPPORTED_LOCALES } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Dashboard — ${siteConfig.name}`,
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: LocaleCode }>;
}) {
  const { locale } = await params;
  const questions = getQuestions(locale);

  return (
    <main className="pt-24 pb-16 md:pt-32">
      <Container>
        <DashboardShell questions={questions} />
      </Container>
    </main>
  );
}
