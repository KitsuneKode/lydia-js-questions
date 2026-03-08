'use client';

import { useAuth } from '@clerk/nextjs';

export const clerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('REPLACE');

const guestAuth = { isSignedIn: false as const, userId: null };

/**
 * Safe wrapper around Clerk's useAuth.
 * Returns guest state when Clerk is not configured.
 * `clerkEnabled` is a build-time constant so the hook call pattern is stable.
 */
export function useSafeAuth() {
  // clerkEnabled is a module-level constant — hook call is deterministic
  if (!clerkEnabled) {
    return guestAuth;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAuth();
}
