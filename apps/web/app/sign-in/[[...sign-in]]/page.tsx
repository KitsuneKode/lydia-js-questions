import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center py-12">
      <SignIn />
    </main>
  );
}
