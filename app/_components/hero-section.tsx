import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center py-20">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Mobile: Photo */}
          <div className="lg:hidden flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border border-border/30">
              <Image
                src="/moi.png"
                alt="Maxime Morellon"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Frontend&ensp;/&ensp;React&ensp;/&ensp;Next.js
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight text-foreground">
              Bonnes pratiques
              <br />
              <span className="text-primary">frontend</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[clamp(1.125rem,2vw,1.375rem)] text-muted-foreground leading-relaxed max-w-2xl">
              Par Maxime Morellon — 8 ans d&apos;experience en production.
              Patterns, retours terrain et guides techniques sur React et Next.js.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guides"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Lire les guides
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-200"
              >
                Parcourir le blog
              </Link>
            </div>
          </div>

          {/* Right: Photo (desktop) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative aspect-[4/5] max-w-sm ml-auto rounded-2xl overflow-hidden shadow-2xl border border-border/30">
              <Image
                src="/moi.png"
                alt="Maxime Morellon"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 380px, 192px"
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-8 sm:gap-12 pt-12 mt-12 border-t border-border/50">
          <div>
            <div className="text-3xl font-black text-foreground">8+ ans</div>
            <div className="text-sm text-muted-foreground mt-1">d&apos;experience terrain</div>
          </div>
          <div>
            <div className="text-3xl font-black text-foreground">4 guides</div>
            <div className="text-sm text-muted-foreground mt-1">techniques complets</div>
          </div>
          <div>
            <div className="text-3xl font-black text-foreground">60+</div>
            <div className="text-sm text-muted-foreground mt-1">sections documentees</div>
          </div>
        </div>
      </div>
    </section>
  );
}
