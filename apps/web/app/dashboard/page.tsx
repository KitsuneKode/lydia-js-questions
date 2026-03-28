import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getQuestions } from '@/lib/content/loaders';

export const metadata: Metadata = {
  title: 'Dashboard — JS Interview Atlas',
};

export default function DashboardPage() {
  const questions = getQuestions();

  return (
    <main className="py-8 md:py-10">
      <Container>
        <DashboardShell questions={questions} />
      </Container>
    </main>
  );
}
