import { ClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasValidClerkKey = clerkKey && clerkKey.startsWith('pk_') && !clerkKey.includes('REPLACE');

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!hasValidClerkKey) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
