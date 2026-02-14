'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'slideUp' | 'fadeIn' | 'scale';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay: number;
  variant?: Variant;
  className?: string;
  /**
   * Si true, l'animation se déclenche immédiatement au mount (hero sections)
   * Si false, l'animation attend que l'élément soit visible (scroll reveals)
   */
  immediate?: boolean;
}

const variantClasses: Record<Variant, string> = {
  slideUp: 'animate-[slideInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  fadeIn: 'animate-[fadeIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  scale: 'animate-[slideInUp-title_1s_cubic-bezier(0.16,1,0.3,1)_forwards]',
};

export function AnimatedSection({
  children,
  delay,
  variant = 'slideUp',
  className = '',
  immediate = true,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) {
      // Animation immédiate pour hero sections
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Animation au scroll avec Intersection Observer
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -60px 0px', // Déclenche légèrement avant que l'élément soit visible
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isVisible ? variantClasses[variant] : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
