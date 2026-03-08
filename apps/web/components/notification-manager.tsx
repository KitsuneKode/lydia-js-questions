'use client';

import { useGuestPrompt } from '@/lib/progress/use-guest-prompt';
import { useSyncToast } from '@/lib/progress/use-sync-toast';

export function NotificationManager() {
  useGuestPrompt();
  useSyncToast();
  return null;
}
