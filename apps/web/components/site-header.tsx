'use client';

import { Menu, X, Zap, Terminal } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AuthControls } from '@/components/auth-controls';
import { useScratchpad } from '@/components/scratchpad/scratchpad-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/questions', label: 'Questions' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/credits', label: 'Credits' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const { openScratchpad } = useScratchpad();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > lastY && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(latest);
  });

  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: '-150%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none"
      >
        <header
          className="pointer-events-auto mx-auto flex h-12 max-w-3xl items-center justify-between rounded-full border border-border/50 px-5 shadow-sm"
          style={{ backdropFilter: 'blur(16px)', background: 'rgba(9, 9, 11, 0.8)' }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <span className="font-display text-[22px] text-foreground mt-0.5">Atlas</span>
            <Zap className="h-[14px] w-[14px] text-primary fill-primary" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-[14px] transition-colors duration-200 ease-out',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[6px] left-1/2 h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-primary"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openScratchpad()}
                className="h-8 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Terminal className="h-3.5 w-3.5" />
                Scratchpad
              </Button>
              <div className="h-4 w-px bg-border/50 mx-1" />
              <AuthControls />
            </div>

            {/* Mobile menu trigger */}
            <Button
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-xl px-6 py-8"
          >
            <div className="flex items-center justify-between mb-12">
              <Link
                href="/"
                className="flex items-center gap-2 outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-display text-[26px] text-foreground mt-0.5">Atlas</span>
                <Zap className="h-[18px] w-[18px] text-primary fill-primary" />
              </Link>
              <Button
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-8 text-2xl font-medium tracking-tight mt-4">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'transition-colors duration-200',
                      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openScratchpad();
                }}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-left"
              >
                <Terminal className="h-6 w-6" />
                Scratchpad
              </Button>
            </nav>

            <div className="mt-auto pb-8">
              <AuthControls />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

