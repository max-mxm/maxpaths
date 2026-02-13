import type { Metadata } from 'next';
import { HeroSection } from './_components/hero-section';
import { PhilosophySection } from './_components/philosophy-section';
import { ContentCard } from '@/components/content-card';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { getContentForLanding } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Bonnes pratiques frontend, patterns et retours d\'experience par Maxime Morellon. Guides React, Next.js et articles techniques.',
  openGraph: {
    title: 'Koursorr — Bonnes pratiques frontend par Maxime Morellon',
    description:
      'Guides React, Next.js et articles techniques issus de 8 ans d\'experience en production.',
    images: ['/og-image-home.png'],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maxime Morellon',
  url: 'https://kourso.com',
  jobTitle: 'Developpeur Frontend Senior',
  sameAs: [
    'https://www.linkedin.com/in/maxime-morellon-7a9403112',
    'https://www.maxime-morellon.dev/',
  ],
};

export default async function Home() {
  const content = await getContentForLanding();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="min-h-screen">
        <HeroSection />

        {/* Unified content grid */}
        <section className="container py-20">
          <div className="space-y-3 mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Ressources
            </span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
              Guides et articles
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Retours d&apos;experience structures et analyses techniques sur le developpement
              frontend moderne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item, index) => (
              <RevealOnScroll key={item.href} delay={index * 80}>
                <ContentCard {...item} />
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <PhilosophySection />
      </div>
    </>
  );
}
