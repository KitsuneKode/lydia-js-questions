'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import { guestAuth, SafeAuthProvider } from '@/lib/auth-utils';

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasValidClerkKey = clerkKey?.startsWith('pk_') && !clerkKey.includes('REPLACE');

function ClerkAuthBridge({ children }: { children: ReactNode }) {
  const { isSignedIn, userId } = useAuth();

  return (
    <SafeAuthProvider value={{ isSignedIn: Boolean(isSignedIn), userId: userId ?? null }}>
      {children}
    </SafeAuthProvider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!hasValidClerkKey) {
    return <SafeAuthProvider value={guestAuth}>{children}</SafeAuthProvider>;
  }

  return (
    <ClerkProvider>
      <ClerkAuthBridge>{children}</ClerkAuthBridge>
    </ClerkProvider>
  );
}
