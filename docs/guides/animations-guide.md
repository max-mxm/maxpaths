# Guide des Animations - maxpaths

Guide complet pour utiliser et étendre le système d'animations de maxpaths.

## Principes Fondamentaux

### Performance Mobile-First
- **Durées courtes** : 100-800ms maximum
- **GPU-accelerated uniquement** : `transform` et `opacity` seulement
- **60fps garanti** : Éviter les animations de `width`, `height`, `padding`, `margin`
- **Respect prefers-reduced-motion** : Support automatique

### Timing & Easing

Nous utilisons **ease-out-expo** (`cubic-bezier(0.16, 1, 0.3, 1)`) comme standard pour une décélération naturelle et raffinée.

```typescript
// Importez depuis lib/animation-config.ts
import { ANIMATION_TIMINGS, EASING_FUNCTIONS } from '@/lib/animation-config';

// Durées par type d'animation
ANIMATION_TIMINGS.instant      // 100ms  - feedback immédiat
ANIMATION_TIMINGS.hover        // 200ms  - changements d'état
ANIMATION_TIMINGS.modal        // 400ms  - changements de layout
ANIMATION_TIMINGS.heroSection  // 800ms  - animations d'entrée
```

---

## Composants d'Animation

### 1. AnimatedSection

Composant principal pour les animations d'entrée au chargement ou au scroll.

```tsx
import { AnimatedSection } from '@/components/ui/animated-section';

// Animation immédiate au chargement (hero sections)
<AnimatedSection delay={0} variant="scale" immediate={true}>
  <h1>Titre Hero</h1>
</AnimatedSection>

// Animation au scroll (sections de contenu)
<AnimatedSection delay={100} variant="slideUp" immediate={false}>
  <p>Contenu révélé au scroll</p>
</AnimatedSection>
```

**Variants disponibles :**
- `slideUp` : Slide from bottom + fade (default)
- `fadeIn` : Fade only
- `scale` : Scale up + slide (pour titres)

**Props :**
- `delay` : Délai en ms avant déclenchement
- `variant` : Type d'animation
- `immediate` : `true` = au mount, `false` = au scroll
- `className` : Classes CSS additionnelles

---

### 2. AnimatedLink

Link avec micro-interactions intégrées.

```tsx
import { AnimatedLink } from '@/components/ui/animated-link';

// Lien subtil (navigation)
<AnimatedLink href="/guides" variant="subtle">
  Voir les guides
</AnimatedLink>

// Lien avec lift effect (CTA cards)
<AnimatedLink href="/demos" variant="lift">
  Découvrir les démos
</AnimatedLink>

// Bouton avec scale feedback
<AnimatedLink href="/article" variant="scale">
  Lire l'article
</AnimatedLink>
```

**Variants :**
- `subtle` : Changement de couleur uniquement
- `lift` : Élévation + shadow
- `scale` : Scale up/down au hover/click

---

## Hooks Personnalisés

### useAnimation

Déclenche une animation après un délai.

```tsx
import { useAnimation } from '@/hooks/use-animation';

function MyComponent() {
  const isReady = useAnimation(300); // Démarre après 300ms

  return (
    <div className={isReady ? 'animate-in' : 'opacity-0'}>
      Contenu animé
    </div>
  );
}
```

### useReducedMotion

Détecte si l'utilisateur préfère moins d'animations.

```tsx
import { useReducedMotion } from '@/hooks/use-animation';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={prefersReducedMotion ? '' : 'animate-complex'}>
      Contenu
    </div>
  );
}
```

### useStaggerAnimation

Génère des délais échelonnés pour listes.

```tsx
import { useStaggerAnimation } from '@/hooks/use-animation';

function ItemList({ items }) {
  const delays = useStaggerAnimation(items.length, 100);

  return items.map((item, i) => (
    <AnimatedSection key={item.id} delay={delays[i]}>
      {item.content}
    </AnimatedSection>
  ));
}
```

---

## Classes CSS Utilitaires

### Micro-interactions

```tsx
// Bouton avec press effect
<button className="btn-press">
  Click me
</button>

// Lien avec underline animation
<a className="link-hover">
  Hover me
</a>

// Card avec lift effect
<div className="card-lift">
  Content
</div>
```

### Animations Tailwind

Utilisez les classes utilitaires depuis `lib/animation-config.ts` :

```tsx
import { TAILWIND_TRANSITIONS } from '@/lib/animation-config';

// Bouton
<button className={TAILWIND_TRANSITIONS.buttonPress}>
  Submit
</button>

// Card
<div className={TAILWIND_TRANSITIONS.cardLift}>
  Card content
</div>

// Lien
<a className={TAILWIND_TRANSITIONS.linkHover}>
  Link
</a>
```

---

## Animations Spécifiques par Type de Page

### Pages de Guides (CourseLayout)

**Hero section** : Animation immédiate avec stagger
```tsx
<AnimatedSection delay={0} immediate={true}>
  <h1>Titre du guide</h1>
</AnimatedSection>
<AnimatedSection delay={100} immediate={true}>
  <p>Description</p>
</AnimatedSection>
```

**Sections de contenu** : Animation au scroll
```tsx
<AnimatedSection delay={0} immediate={false}>
  <section>Section content</section>
</AnimatedSection>
```

**Cartes de section** : Hover effect déjà intégré
```tsx
// Déjà appliqué dans CourseLayout
className="... transition-all duration-300 hover:shadow-xl"
```

---

### Pages de Démos

**Header** : Animation scale dramatique pour titres
```tsx
<AnimatedSection delay={200} variant="scale" immediate={true}>
  <h1 className="text-7xl font-black bg-gradient-to-br ...">
    Titre de la démo
  </h1>
</AnimatedSection>
```

**Callouts & CTAs** : Glow pulse effect
```tsx
<div className="... animate-glow-pulse">
  <Activity className="..." />
  Mesures réelles, pas de simulation
</div>
```

**Liens retour** : Micro-interaction subtile
```tsx
<AnimatedLink
  href="/guides/parent#section"
  variant="subtle"
  className="inline-flex items-center gap-2 ..."
>
  <ArrowLeft className="w-4 h-4" />
  Retour au guide
</AnimatedLink>
```

---

### Pages d'Articles (Blog)

**Header** : Fade + slide up
```tsx
<AnimatedSection delay={0} variant="slideUp">
  <ArticleHeader metadata={metadata} />
</AnimatedSection>
```

**Contenu** : Animation scroll reveal progressive
```tsx
<AnimatedSection delay={100} immediate={false}>
  <div className="rounded-2xl bg-white/50 ...">
    <Content />
  </div>
</AnimatedSection>
```

**Sidebar ToC** : Transitions sur liens actifs
```tsx
// Déjà géré dans ArticleInteractive
className="transition-all duration-200 border-l-2"
```

---

## Keyframes CSS Personnalisées

Toutes définies dans `app/globals.css` :

```css
/* Entrées */
@keyframes slideInUp { ... }           /* Slide from bottom */
@keyframes slideInUp-title { ... }     /* Scale + slide (titres) */
@keyframes fadeInItem { ... }          /* Fade subtil pour items */

/* Effects */
@keyframes glow-pulse { ... }          /* Pulsation avec glow */
```

Usage :
```tsx
<div className="animate-[slideInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
  Animated content
</div>
```

---

## Bonnes Pratiques

### ✅ À FAIRE

1. **Utiliser `transform` et `opacity` uniquement** pour les animations
2. **Respecter les durées** : 100-800ms maximum
3. **Tester sur mobile** : 60fps minimum requis
4. **Utiliser immediate={false}** pour contenu hors viewport
5. **Préférer stagger subtil** (100ms) pour listes

### ❌ À ÉVITER

1. **JAMAIS animer** `width`, `height`, `padding`, `margin`, `top`, `left`
2. **JAMAIS utiliser bounce/elastic** easing (daté et distrayant)
3. **JAMAIS dépasser 800ms** de durée (sensation de lag)
4. **JAMAIS ignorer prefers-reduced-motion** (déjà géré globalement)
5. **JAMAIS animer tout** - l'animation doit avoir un but précis

---

## Exemples Complets

### Hero Section avec Stagger

```tsx
import { AnimatedSection } from '@/components/ui/animated-section';
import { ANIMATION_DELAYS } from '@/lib/animation-config';

function HeroSection() {
  const { normal } = ANIMATION_DELAYS.stagger;

  return (
    <div>
      <AnimatedSection delay={0} variant="fadeIn">
        <span className="text-xs uppercase">Catégorie</span>
      </AnimatedSection>

      <AnimatedSection delay={normal} variant="scale">
        <h1 className="text-7xl font-black">Titre Principal</h1>
      </AnimatedSection>

      <AnimatedSection delay={normal * 2}>
        <p className="text-xl text-muted-foreground">Description</p>
      </AnimatedSection>

      <AnimatedSection delay={normal * 3}>
        <button>Call to Action</button>
      </AnimatedSection>
    </div>
  );
}
```

### Card Grid avec Scroll Reveal

```tsx
import { AnimatedSection } from '@/components/ui/animated-section';

function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {items.map((item, i) => (
        <AnimatedSection
          key={item.id}
          delay={i * 50}  // Stagger rapide pour grilles
          immediate={false}  // Au scroll
        >
          <ContentCard {...item} />
        </AnimatedSection>
      ))}
    </div>
  );
}
```

---

## Débogage & Performance

### Vérifier les Performances

```tsx
// Dans DevTools > Performance
// 1. Enregistrer pendant animation
// 2. Chercher "Rendering" dans timeline
// 3. Vérifier FPS (doit être 60fps constant)
```

### Inspecter Reduced Motion

```tsx
// Dans DevTools > Rendering
// Cocher "Emulate CSS media feature prefers-reduced-motion"
// Vérifier que animations sont désactivées
```

---

## Ressources

- [Animation Config](../../lib/animation-config.ts) - Timings et easing centralisés
- [Hooks](../../hooks/use-animation.ts) - Hooks personnalisés
- [CSS Keyframes](../../app/globals.css) - Keyframes définies
- [AnimatedSection](../../components/ui/animated-section.tsx) - Composant principal

---

Dernière mise à jour : Février 2026
