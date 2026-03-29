import { redirect } from 'next/navigation';

import type { LocaleCode } from '@/lib/i18n/config';

export default async function AboutPage({ params }: { params: Promise<{ locale: LocaleCode }> }) {
  const { locale } = await params;

  redirect(`/${locale}/credits`);
}
