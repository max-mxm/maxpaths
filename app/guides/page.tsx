import Link from 'next/link';
import { Rocket, BookOpen, Clock, BarChart3, Database, Brain } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    {
      id: 'nextjs-demo',
      title: 'Guide Next.js 15',
      description: 'Maîtrisez les modes de rendu modernes : SSR, SSG, ISR et Client Components avec des exemples interactifs.',
      icon: Rocket,
      tags: ['Next.js 15', 'React 19', 'TypeScript'],
      sections: 21,
      level: 'Intermédiaire',
      duration: '3h',
      gradient: 'from-primary to-brand-secondary',
      color: 'rgb(0, 150, 136)',
      ribbon: 'Testez en direct'
    },
    {
      id: 'react-19-advanced',
      title: 'React 19 - Bonnes Pratiques Seniors',
      description: 'Guide complet sur React 19 : Compiler, Server Components, Actions, useOptimistic, architecture scalable et patterns avancés.',
      icon: Rocket,
      tags: ['React 19', 'TypeScript', 'Avancé'],
      sections: 18,
      level: 'Avancé',
      duration: '4h',
      gradient: 'from-purple-500 to-pink-500',
      color: 'rgb(168, 85, 247)'
    },
    {
      id: 'tanstack-react',
      title: 'TanStack - Ecosysteme Complet React',
      description: 'Maitrisez l\'ecosysteme TanStack : Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production.',
      icon: Database,
      tags: ['TanStack', 'React Query', 'React'],
      sections: 14,
      level: 'Intermédiaire',
      duration: '4h',
      gradient: 'from-orange-500 to-amber-500',
      color: 'rgb(249, 115, 22)'
    },
    {
      id: 'react-memoization',
      title: 'useMemo, useCallback et React.memo',
      description: 'Comprendre les 3 mecanismes de memoisation React. Exemples concrets, erreurs courantes, et preparation au React Compiler.',
      icon: Brain,
      tags: ['React', 'Performance', 'Hooks'],
      sections: 10,
      level: 'Intermédiaire',
      duration: '2h',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'rgb(59, 130, 246)'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="container py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* En-tête */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Catalogue des guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Parcourez mes guides pratiques basés sur des retours d&apos;expérience et des bonnes pratiques terrain.
            </p>
          </div>

          {/* Filtres (placeholder) */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm border border-primary/20">
              Tous
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm border border-border/50 transition-colors">
              Next.js
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm border border-border/50 transition-colors">
              React
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm border border-border/50 transition-colors">
              TypeScript
            </button>
          </div>

          {/* Liste des guides */}
          <div className="grid gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/guides/${course.id}`}
                className="group block"
                style={{ '--guide-color': course.color } as React.CSSProperties}
              >
                <div
                  className="relative rounded-2xl border border-border/50 bg-card p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] overflow-hidden"
                  style={{ borderTopWidth: '3px', borderTopColor: course.color }}
                >
                  {/* Gradient accent au survol */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300`} />

                  {/* Badge interactif */}
                  {course.ribbon && (
                    <div className="absolute right-4 top-4 z-10" title={course.ribbon}>
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        Live
                      </span>
                    </div>
                  )}

                  <div className="relative grid gap-4 sm:gap-6 md:grid-cols-[auto,1fr,auto]">
                    {/* Icon - large on desktop */}
                    <div className="hidden md:flex items-start">
                      <div
                        className="w-16 h-16 rounded-2xl border flex items-center justify-center"
                        style={{ backgroundColor: `color-mix(in srgb, ${course.color} 10%, transparent)`, borderColor: `color-mix(in srgb, ${course.color} 20%, transparent)` }}
                      >
                        <course.icon className="w-8 h-8" style={{ color: course.color }} />
                      </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                          {/* Small icon inline on mobile */}
                          <div
                            className="md:hidden w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `color-mix(in srgb, ${course.color} 10%, transparent)`, borderColor: `color-mix(in srgb, ${course.color} 20%, transparent)` }}
                          >
                            <course.icon className="w-5 h-5" style={{ color: course.color }} />
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black transition-colors group-hover:text-[var(--guide-color)]">
                            {course.title}
                          </h2>
                          <span
                            className="text-xs font-bold px-2 py-1 rounded"
                            style={{ backgroundColor: `color-mix(in srgb, ${course.color} 10%, transparent)`, color: course.color }}
                          >
                            DISPONIBLE
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium border"
                            style={{ borderColor: `color-mix(in srgb, ${course.color} 20%, transparent)` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" style={{ color: course.color }} />
                          <span>{course.sections} sections</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" style={{ color: course.color }} />
                          <span>~{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" style={{ color: course.color }} />
                          <span>{course.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center">
                      <div
                        className="relative w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 text-[var(--guide-color)] overflow-hidden"
                        style={{ backgroundColor: `color-mix(in srgb, ${course.color} 10%, transparent)` }}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ backgroundColor: course.color }} />
                        <span className="relative group-hover:text-white transition-colors duration-200">Commencer</span>
                        <span className="relative group-hover:text-white group-hover:translate-x-1 transition-all duration-200">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Message guides à venir */}
          <div className="rounded-2xl border border-dashed border-border/50 bg-muted/20 p-12 text-center space-y-4">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-muted items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Plus de guides en préparation
              </h3>
              <p className="text-muted-foreground">
                D&apos;autres guides sur React, TypeScript, Node.js et bien plus seront ajoutés prochainement. Restez à l&apos;écoute !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
