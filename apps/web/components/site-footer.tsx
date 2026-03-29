import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { Zap } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { href: '/questions', label: 'Questions' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/credits', label: 'Credits' },
  ],
  resources: [
    {
      href: 'https://github.com/lydiahallie/javascript-questions',
      label: 'Original Repository',
      external: true,
    },
    {
      href: 'https://github.com/lydiahallie',
      label: 'Lydia Hallie',
      external: true,
    },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-void">
      {/* Gradient top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="grid gap-10 grid-cols-2 md:grid-cols-3">
          {/* Brand & Built by */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit"
            >
              <span className="font-display text-2xl text-foreground">Atlas</span>
              <Zap className="h-4 w-4 text-primary fill-primary" />
            </Link>
            
            <div className="mt-6 md:mt-auto">
              <p className="text-sm text-tertiary">
                Built by <span className="text-secondary font-medium">KitsuneKode</span>
              </p>
              <div className="flex items-center gap-4 mt-4 text-tertiary">
                <a href="#" className="hover:text-primary transition-colors">
                  <SiGithub className="h-[14px] w-[14px]" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <SiX className="h-[14px] w-[14px]" />
                  <span className="sr-only">X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-medium text-foreground mb-4 tracking-wider uppercase">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-tertiary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-medium text-foreground mb-4 tracking-wider uppercase">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-[13px] text-tertiary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}