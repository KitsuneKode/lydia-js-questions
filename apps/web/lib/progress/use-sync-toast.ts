'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { useSafeAuth } from '@/lib/auth-utils';
import { clerkEnabled } from '@/lib/auth-utils';

const SESSION_KEY = 'jsq_sync_toast_shown';

export function useSyncToast() {
  const { isSignedIn } = useSafeAuth();
  const shownRef = useRef(false);

  useEffect(() => {
    if (!clerkEnabled || !isSignedIn || shownRef.current) return;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    shownRef.current = true;
    sessionStorage.setItem(SESSION_KEY, '1');

    toast.success('Progress synced', {
      description: 'Your progress is saved to the cloud.',
      duration: 3000,
    });
  }, [isSignedIn]);
}
