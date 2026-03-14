'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Library, LayoutDashboard, Heart, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AuthControls } from '@/components/auth-controls';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/questions', label: 'Questions', icon: Library },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/credits', label: 'Credits', icon: Heart },
];

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  className,
}: {
  href: string;
  label: string;
  icon: typeof Library;
  active: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {active && (
        <span className="absolute inset-x-1 -bottom-[13px] h-[2px] rounded-full bg-primary" />
      )}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group inline-flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-all group-hover:bg-primary/15 group-hover:ring-primary/30">
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-medium tracking-tight text-foreground sm:text-lg">
            JS Interview Atlas
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={pathname === link.href || pathname.startsWith(link.href + '/')}
            />
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AuthControls />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="text-left">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-surface-elevated hover:text-foreground',
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
