'use client';

import { cn } from '@/lib/utils';

type CategoryType =
  | 'fundamentals'
  | 'rendering'
  | 'optimization'
  | 'best-practices'
  | 'advanced'
  | 'architecture'
  | 'testing';

interface SchemaVideoProps {
  src: string;
  title: string;
  description?: string;
  category?: CategoryType;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

const categoryColors: Record<CategoryType, string> = {
  fundamentals: 'rgb(0, 150, 136)',
  rendering: 'rgb(59, 130, 246)',
  optimization: 'rgb(249, 115, 22)',
  'best-practices': 'rgb(168, 85, 247)',
  advanced: 'rgb(239, 68, 68)',
  architecture: 'rgb(59, 130, 246)',
  testing: 'rgb(249, 115, 22)',
};

export function SchemaVideo({
  src,
  title,
  description,
  category = 'fundamentals',
  autoPlay = true,
  loop = true,
  className,
}: SchemaVideoProps) {
  const borderColor = categoryColors[category];

  return (
    <div
      className={cn(
        'group relative rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm',
        className
      )}
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-border/50 bg-muted/20">
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{
            backgroundColor: `${borderColor}15`,
            color: borderColor,
          }}
        >
          schema
        </span>
        <span className="text-sm font-medium text-foreground/80">
          {title}
        </span>
      </div>

      <div className="relative aspect-video bg-black/5">
        <video
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>

      {description && (
        <div className="px-4 sm:px-6 py-3 text-sm text-muted-foreground leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
}
