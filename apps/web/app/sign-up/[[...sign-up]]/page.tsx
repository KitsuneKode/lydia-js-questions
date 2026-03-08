import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center py-12">
      <SignUp />
    </main>
  );
}
