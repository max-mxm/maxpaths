'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { useMobileNav } from '@/components/mobile-nav-fab';

interface Section {
  id: string;
  title: string;
  icon?: React.ReactNode;
  emoji?: string;
  badge?: string;
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
  { id: 'advanced', label: 'Avance', color: 'from-red-500 to-rose-500' },
] as const;

export function CourseLayout({ title, subtitle, sections }: CourseLayoutProps) {
  const [activeSection, setActiveSection] = useState('');
  const scrollProgress = useScrollProgress();
  const [sectionsAnimated, setSectionsAnimated] = useState(false);
  const { setGuideNav } = useMobileNav();

  // Trigger entrance animation after mount (content stays visible during SSR)
  useEffect(() => {
    setSectionsAnimated(true);
  }, []);

  // Register guide sections in the global mobile nav context
  useEffect(() => {
    setGuideNav({
      title,
      subtitle,
      sections: sections.map((s) => ({
        id: s.id,
        title: s.title,
        icon: s.icon,
        badge: s.badge,
        category: s.category,
      })),
      activeSection,
    });

    return () => {
      setGuideNav(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, subtitle, sections, setGuideNav]);

  // Keep activeSection synced in the context
  useEffect(() => {
    setGuideNav((prev) => prev ? { ...prev, activeSection } : null);
  }, [activeSection, setGuideNav]);

  // Scroll spy for active section detection (throttled with rAF)
  useEffect(() => {
    let rafId: number;

    const detectActiveSection = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        let closestSection = '';
        let closestDistance = Infinity;

        sections.forEach((s) => {
          const element = document.getElementById(s.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top - 150);
            if (distance < closestDistance && rect.top <= 200) {
              closestDistance = distance;
              closestSection = s.id;
            }
          }
        });

        if (closestSection) {
          setActiveSection(closestSection);
        }
      });
    };

    detectActiveSection();
    window.addEventListener('scroll', detectActiveSection, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', detectActiveSection);
    };
  }, [sections]);

  // Shared navigation content renderer (for desktop sidebar only)
  const renderNavContent = () => (
    <>
      {/* Titre du Guide */}
      <div className="mb-6 pb-6 border-b border-border/40">
        <h1 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-lg font-black text-transparent leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

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
                      'group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 min-h-[44px]',
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 font-semibold border-l-2 border-primary'
                        : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 border-l-2 border-transparent',
                    )}
                  >
                    <span className="flex items-center gap-2 flex-1 truncate">
                      {section.icon}
                      {section.title}
                    </span>
                    {section.badge && (
                      <span className="shrink-0 rounded-md bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                        {section.badge}
                      </span>
                    )}
                    {activeSection === section.id && (
                      <div className="bg-primary h-2 w-2 rounded-full animate-pulse" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );

  return (
    <div className="relative min-h-screen scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Progress bar global */}
      <div className="fixed top-0 right-0 left-0 z-50 h-0.5 bg-slate-200 dark:bg-slate-800">
        <div
          className="from-primary to-brand-secondary h-full bg-gradient-to-r transition-all duration-300 shadow-[0_0_10px_rgba(0,150,136,0.5)] dark:shadow-[0_0_15px_rgba(0,150,136,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container flex gap-8 py-8">
        {/* Desktop Sidebar */}
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-64 flex-shrink-0 overflow-y-auto lg:block">
          <nav className="space-y-6">
            {renderNavContent()}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-24">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={cn(
                  'scroll-mt-32',
                  sectionsAnimated && 'transition-all duration-700 opacity-100 translate-y-0'
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Section header */}
                <div className="mb-8 text-center md:text-left">
                  <div className="mb-2 flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span>
                      {categories.find((c) => c.id === section.category)?.label}
                    </span>
                    <span>·</span>
                    <span>
                      Section {index + 1}/{sections.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h2 className="text-3xl font-black tracking-tight">
                      {section.emoji && <span className="mr-3">{section.emoji}</span>}
                      {section.title}
                    </h2>
                    {section.badge && (
                      <span className="rounded-lg bg-orange-500/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                        {section.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Section content */}
                <div className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-950/70">
                  {section.component}
                </div>
              </section>
            ))}
          </div>

          {/* End marker */}
          <div className="mt-24 text-center">
            <h3 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-2xl font-black text-transparent">
              Felicitations !
            </h3>
            <p className="text-muted-foreground mt-2">
              Vous avez termine ce guide.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
