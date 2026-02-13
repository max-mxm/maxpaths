import Link from 'next/link';
import Image from 'next/image';
import { Target, Zap, Users, Check, Linkedin, Globe, Github } from 'lucide-react';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { Timeline } from './_components/timeline';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* =============================================
          SECTION 1 — Hero Storytelling
      ============================================= */}
      <section className="py-16 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Mobile: Photo circle */}
            <div className="lg:hidden flex justify-center">
              <RevealOnScroll delay={0}>
                <div className="relative w-52 h-52 rounded-full overflow-hidden shadow-2xl border border-border/30">
                  <Image
                    src="/moi.png"
                    alt="Maxime Morellon, developpeur frontend senior"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </RevealOnScroll>
            </div>

            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left">
              <RevealOnScroll delay={0}>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  A propos
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-black leading-[1.05] tracking-tight text-foreground">
                  8 ans a resoudre les problemes que personne ne veut{' '}
                  <span className="text-primary">documenter</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <p className="text-[clamp(1.05rem,2vw,1.375rem)] text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Les bugs obscurs de Server Components. Les re-renders en cascade.
                  Les optimisations qui cassent tout. Ce site regroupe les solutions
                  que j&apos;ai construites quand Stack Overflow n&apos;avait pas la reponse.
                </p>
              </RevealOnScroll>
            </div>

            {/* Right: Photo (desktop) */}
            <div className="lg:col-span-5 hidden lg:block">
              <RevealOnScroll delay={300}>
                <div className="relative aspect-[4/5] max-w-sm ml-auto rounded-2xl overflow-hidden shadow-2xl border border-border/20">
                  <Image
                    src="/moi.png"
                    alt="Maxime Morellon, developpeur frontend senior"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 380px, 208px"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 2 — Le Declencheur
      ============================================= */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <RevealOnScroll>
              <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight">
                Pourquoi ce site existe
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <p className="text-base md:text-lg text-muted-foreground leading-[1.8] mt-6">
                En 2017, junior dev, je copiais du code Stack Overflow sans comprendre.
                En 2020, mid-level, je resolvais des bugs mais sans vision d&apos;ensemble.
                En 2024, apres 8 ans sur des projets reels, j&apos;ai compris : les vrais
                problemes n&apos;ont pas de documentation officielle.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <blockquote className="border-l-4 border-primary pl-6 md:pl-8 my-10 md:my-14">
                <p className="text-xl md:text-2xl italic text-foreground/80 leading-relaxed">
                  &laquo;&nbsp;La documentation officielle vous apprend la syntaxe.
                  L&apos;experience terrain vous apprend quoi ne jamais faire.&nbsp;&raquo;
                </p>
              </blockquote>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <p className="text-base md:text-lg text-muted-foreground leading-[1.8]">
                Kourso est ne de cette frustration : pourquoi personne ne documente
                les anti-patterns reels ? Les choix d&apos;architecture qui font mal 6 mois
                plus tard ? Les optimisations qui creent plus de bugs qu&apos;elles n&apos;en resolvent ?
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 3 — Timeline du Parcours
      ============================================= */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container">
          <RevealOnScroll>
            <div className="text-center lg:text-left mb-12 md:mb-20">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Parcours
              </span>
              <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight mt-3">
                Les etapes qui ont construit Kourso
              </h2>
            </div>
          </RevealOnScroll>

          <Timeline />
        </div>
      </section>

      {/* =============================================
          SECTION 4 — Philosophie (3 valeurs)
      ============================================= */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container">
          <RevealOnScroll>
            <div className="text-center lg:text-left mb-10 md:mb-16">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Philosophie
              </span>
              <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight mt-3">
                Trois principes, zero compromis
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Target,
                title: 'Terrain avant theorie',
                description:
                  'Chaque pattern documente ici a ete teste en production. Pas de speculation academique, uniquement des solutions eprouvees sur des projets a fort trafic.',
              },
              {
                icon: Zap,
                title: 'Demos vivantes',
                description:
                  'Les concepts s\'apprennent en manipulant. Toutes les demos sont interactives, avec des mesures en temps reel et du code que vous pouvez modifier.',
              },
              {
                icon: Users,
                title: 'Open source',
                description:
                  'Le code est libre, les guides aussi. Contribuez, critiquez, ameliorez. La connaissance technique doit circuler librement.',
              },
            ].map((value, index) => (
              <RevealOnScroll key={value.title} delay={index * 80}>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 5 — Bio + Photo
      ============================================= */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Photo with caption */}
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/moi.png"
                    alt="Maxime Morellon"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 380px, 320px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-foreground/5 backdrop-blur-sm px-6 py-4">
                    <p className="font-bold text-white text-lg">Maxime Morellon</p>
                    <p className="text-white/80 text-sm">Senior Frontend Developer</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Bio content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <RevealOnScroll delay={100}>
                <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight">
                  En bref
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <ul className="space-y-4 mt-8 text-left max-w-lg mx-auto lg:mx-0">
                  {[
                    '8 ans d\'experience frontend en agence et produit',
                    'Specialise React, Next.js, TypeScript',
                    'Passionne par l\'architecture et la performance web',
                    'Contributeur open source',
                    'Base en France',
                  ].map((fact) => (
                    <li key={fact} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground/80">{fact}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <div className="flex flex-wrap gap-3 mt-10 justify-center lg:justify-start">
                  <a
                    href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#0077B5]/90 transition-all duration-200 text-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                  <a
                    href="https://www.maxime-morellon.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-200 text-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Globe size={16} />
                    Portfolio
                  </a>
                  <a
                    href="https://github.com/maxime-morellon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-200 text-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 6 — CTA Final
      ============================================= */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.04] pointer-events-none" />

        <div className="container relative z-10">
          <RevealOnScroll>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Pret a plonger ?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explorez les guides, testez les demos, et decouvrez les patterns
                qui changeront votre approche du frontend React.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Explorer les guides
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border hover:border-primary/50 font-semibold rounded-xl hover:bg-primary/5 transition-all duration-200"
                >
                  Lire le blog
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
