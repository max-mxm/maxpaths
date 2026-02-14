'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode;
  className?: string;
  /**
   * Type de micro-interaction
   * - 'subtle': Léger changement de couleur (navigation)
   * - 'lift': Élévation avec shadow (CTA cards)
   * - 'scale': Scale up discret (boutons)
   */
  variant?: 'subtle' | 'lift' | 'scale';
}

export const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ children, className, variant = 'subtle', ...props }, ref) => {
    const variantClasses = {
      subtle: 'transition-colors duration-200 hover:text-primary',
      lift: 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
      scale: 'transition-transform duration-200 active:scale-95 hover:scale-[1.02]',
    };

    return (
      <Link
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

AnimatedLink.displayName = 'AnimatedLink';
