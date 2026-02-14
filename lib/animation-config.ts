/**
 * Configuration centralisée des animations
 *
 * Principes:
 * - Performance mobile-first: durées courtes, GPU-accelerated (transform + opacity)
 * - Easing: ease-out-expo pour décélération naturelle
 * - Respect prefers-reduced-motion (géré dans globals.css)
 */

export const ANIMATION_TIMINGS = {
  // Feedback instantané (100-150ms)
  instant: 100,
  buttonPress: 150,
  toggleSwitch: 150,

  // Changements d'état (200-300ms)
  hover: 200,
  colorTransition: 200,
  menuOpen: 250,
  tabSwitch: 300,

  // Changements de layout (300-500ms)
  accordion: 300,
  modal: 400,
  drawer: 400,
  heightTransition: 400,

  // Animations d'entrée (500-800ms)
  pageLoad: 600,
  heroSection: 800,
  scrollReveal: 600,
} as const;

export const ANIMATION_DELAYS = {
  // Délais pour choreographie staggered
  stagger: {
    quick: 50,   // Pour petites listes (< 5 items)
    normal: 100, // Default - bon équilibre
    slow: 150,   // Pour hero sections avec peu d'éléments
  },
} as const;

export const EASING_FUNCTIONS = {
  // Recommended - Natural deceleration
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)', // Notre standard

  // Entrées
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',

  // Bidirectionnel
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
} as const;

/**
 * Helper pour générer des transition CSS
 */
export function createTransition(
  properties: string[],
  duration: keyof typeof ANIMATION_TIMINGS = 'hover',
  easing: keyof typeof EASING_FUNCTIONS = 'easeOutExpo'
): string {
  const durationMs = ANIMATION_TIMINGS[duration];
  const easingFn = EASING_FUNCTIONS[easing];

  return properties
    .map(prop => `${prop} ${durationMs}ms ${easingFn}`)
    .join(', ');
}

/**
 * Classes utilitaires Tailwind recommandées
 */
export const TAILWIND_TRANSITIONS = {
  // Micro-interactions
  buttonPress: 'transition-transform duration-150 active:scale-97',
  linkHover: 'transition-colors duration-200 hover:text-primary',

  // Cards & Containers
  cardLift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  cardSubtle: 'transition-shadow duration-300 hover:shadow-lg',

  // Navigation
  navItem: 'transition-all duration-200 hover:bg-accent',
  tabSwitch: 'transition-all duration-300',

  // Modals & Overlays
  backdrop: 'transition-opacity duration-200',
  slideIn: 'transition-transform duration-400',
} as const;
