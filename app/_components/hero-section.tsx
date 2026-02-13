import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center py-12 md:py-20">
      {/* Gradient radial ambiant teal→violet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,var(--brand-secondary)_40%,transparent_70%)] opacity-[0.12] dark:opacity-[0.10]" />

      <div className="container relative z-10">
        {/* Grid 2 colonnes desktop, flex mobile */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* COLONNE GAUCHE (60%) - Titre */}
          <div className="lg:col-span-3">
            {/* Eyebrow avec barre verticale */}
            <div
              className="flex items-center gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              <div className="w-1 h-10 bg-primary animate-grow-vertical" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }} />
              <span className="px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase bg-brand-secondary/10 text-primary rounded border border-primary/20">
                Frontend&ensp;/&ensp;React&ensp;/&ensp;Next.js
              </span>
            </div>

            {/* H1 MONUMENTALE */}
            <h1
              className="text-[clamp(4rem,12vw,10rem)] leading-[0.95] mt-12"
            >
              <span className="block font-black tracking-[-0.04em] text-foreground lg:bg-gradient-to-r lg:from-foreground lg:via-primary/60 lg:to-brand-secondary/40 lg:bg-clip-text lg:text-transparent animate-slideInUp-title opacity-0" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
                Bonnes pratiques
              </span>
              <span className="block font-thin tracking-[0.02em] text-primary ml-8 lg:ml-16 animate-text-shimmer opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                frontend
              </span>
            </h1>
          </div>

          {/* COLONNE DROITE (40%) - Texte descriptif + CTAs */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
            {/* Subtitle */}
            <p
              className="text-[clamp(1.125rem,2.5vw,1.375rem)] text-muted-foreground leading-relaxed animate-fade-up opacity-0"
              style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
            >
              Par Maxime Morellon — 8 ans d&apos;experience en production.
              <br className="hidden sm:block" />
              Patterns, retours terrain et guides techniques sur React et Next.js.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-5 animate-fade-up opacity-0"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <Link
                href="/guides"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-[0_8px_30px_rgb(0,150,136,0.3)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative">Lire les guides</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-border hover:border-primary/60 font-bold rounded-lg hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgb(0,150,136,0.15)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative">Parcourir le blog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de séparation gradient teal→violet→teal */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
