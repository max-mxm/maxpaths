'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
  emoji?: string;
  category:
    | 'fundamentals'
    | 'rendering'
    | 'advanced'
    | 'optimization'
    | 'best-practices';
  component: React.ReactNode;
}

interface CourseLayoutProps {
  title: string;
  subtitle?: string;
  sections: Section[];
}

const categories = [
  {
    id: 'fundamentals',
    label: 'Fondamentaux',
    color: 'from-primary to-brand-secondary',
  },
  {
    id: 'rendering',
    label: 'Modes de Rendu',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'optimization',
    label: 'Optimisations',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'best-practices',
    label: 'Bonnes Pratiques',
    color: 'from-purple-500 to-pink-500',
  },
  { id: 'advanced', label: 'Avancé', color: 'from-red-500 to-rose-500' },
] as const;

export function CourseLayout({ title, subtitle, sections }: CourseLayoutProps) {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll spy + progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Detect active section
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="relative min-h-screen scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Progress bar global */}
      <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="from-primary to-brand-secondary h-full bg-gradient-to-r transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-2xl font-black tracking-tight text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground hidden text-sm md:block">
                {Math.round(scrollProgress)}% complété
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex gap-8 px-6 py-8">
        {/* Sidebar */}
        <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-shrink-0 overflow-y-auto lg:block">
          <nav className="space-y-6">
            {categories.map((category) => {
              const categorySections = sections.filter(
                (s) => s.category === category.id,
              );

              if (categorySections.length === 0) return null;

              return (
                <div key={category.id}>
                  <div
                    className={cn(
                      'mb-2 bg-gradient-to-r bg-clip-text text-xs font-bold tracking-wider text-transparent uppercase',
                      category.color,
                    )}
                  >
                    {category.label}
                  </div>
                  <ul className="space-y-1">
                    {categorySections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={cn(
                            'group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all',
                            activeSection === section.id
                              ? 'bg-primary/10 text-primary dark:bg-primary/20 font-semibold'
                              : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800',
                          )}
                        >
                          <span className="flex-1 truncate">
                            {section.emoji && <span className="mr-2">{section.emoji}</span>}
                            {section.title}
                          </span>
                          {activeSection === section.id && (
                            <div className="bg-primary h-2 w-2 rounded-full" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-24">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
              >
                {/* Section header */}
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span>
                      {categories.find((c) => c.id === section.category)?.label}
                    </span>
                    <span>·</span>
                    <span>
                      Section {index + 1}/{sections.length}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">
                    {section.emoji && <span className="mr-3">{section.emoji}</span>}
                    {section.title}
                  </h2>
                </div>

                {/* Section content */}
                <div className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50">
                  {section.component}
                </div>
              </section>
            ))}
          </div>

          {/* End marker */}
          <div className="mt-24 text-center">
            <h3 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-2xl font-black text-transparent">
              Félicitations !
            </h3>
            <p className="text-muted-foreground mt-2">
              Vous avez terminé le cours.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
