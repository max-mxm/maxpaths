'use client';

import { RevealOnScroll } from '@/components/reveal-on-scroll';

interface TimelineNode {
  year: string;
  title: string;
  description: string;
}

const milestones: TimelineNode[] = [
  {
    year: '2017',
    title: 'Premier contact avec React',
    description:
      'Premiers projets, premiers bugs incomprehensibles. Lifecycle Methods, Redux, et la conviction que le frontend allait bien au-dela du CSS.',
  },
  {
    year: '2019',
    title: 'Les Hooks changent tout',
    description:
      'React 16.8. Refactorisation massive des class components. Apprentissage de la vraie composition de logique et des patterns custom hooks.',
  },
  {
    year: '2021',
    title: 'Next.js en production',
    description:
      'SSR, SSG, ISR. Les problemes de performance deviennent subtils, les choix d\'architecture deviennent critiques. Premiers projets a fort trafic.',
  },
  {
    year: '2023',
    title: 'Server Components',
    description:
      'Next.js 13 App Router. Nouveau paradigme, nouvelles regles. Les erreurs "Functions cannot be passed to Client Components" deviennent familieres.',
  },
  {
    year: '2025',
    title: 'maxpaths nait',
    description:
      'Apres 8 ans, il est temps de documenter. Les patterns qui marchent, les erreurs a eviter, les choix d\'architecture qui tiennent dans le temps.',
  },
];

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line - desktop center, mobile left */}
      <div className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-12 md:space-y-20">
        {milestones.map((node, index) => {
          const isLeft = index % 2 === 0;
          return (
            <RevealOnScroll key={node.year} delay={index * 100}>
              <div className="relative">
                {/* Mobile layout */}
                <div className="md:hidden flex gap-6">
                  {/* Year badge */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-md">
                      {node.year}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-2 pb-2">
                    <h3 className="text-lg font-bold text-foreground">{node.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-2 text-sm">
                      {node.description}
                    </p>
                  </div>
                </div>

                {/* Desktop layout - alternating */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-start">
                  {/* Left content or spacer */}
                  <div className={isLeft ? 'text-right pr-4' : ''}>
                    {isLeft && (
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{node.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                          {node.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right content or spacer */}
                  <div className={!isLeft ? 'pl-4' : ''}>
                    {!isLeft && (
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{node.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                          {node.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Year badge - centered on line */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-md">
                      {node.year}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
