'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'slideUp' | 'fadeIn' | 'scale';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay: number;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  slideUp: 'animate-[slideInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  fadeIn: 'animate-[fadeIn_0.6s_ease-out_forwards]',
  scale: 'animate-[slideInUp-title_1s_cubic-bezier(0.16,1,0.3,1)_forwards]',
};

export function AnimatedSection({
  children,
  delay,
  variant = 'slideUp',
  className = ''
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

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
