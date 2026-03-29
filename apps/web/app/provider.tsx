import { Toaster } from 'sonner';
import { NotificationManager } from '@/components/notification-manager';
import { FloatingScratchpadGate } from '@/components/scratchpad/floating-scratchpad-gate';
import { ScratchpadProvider } from '@/components/scratchpad/scratchpad-context';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProgressProvider } from '@/lib/progress/progress-context';
import { AuthProvider } from '@/components/auth-provider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TooltipProvider>
        <ProgressProvider>
          <ScratchpadProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <NotificationManager />
            <FloatingScratchpadGate />
            <Toaster
              theme="dark"
              toastOptions={{
                style: {
                  background: 'hsl(0, 0%, 5%)',
                  border: '1px solid hsl(0, 0%, 15%)',
                  color: 'hsl(210, 20%, 98%)',
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                },
              }}
            />
          </ScratchpadProvider>
        </ProgressProvider>
      </TooltipProvider>
    </AuthProvider>
  );
}
