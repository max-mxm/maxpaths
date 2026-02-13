import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

export function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'relative py-1 text-sm transition-colors',
        active
          ? 'text-foreground font-semibold'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}
