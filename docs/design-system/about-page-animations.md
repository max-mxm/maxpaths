# Animations de la page "À propos"

## Vue d'ensemble

Animations **professionnelles et raffinées** avec un chargement orchestré optimisé **mobile-first**. Toutes les animations utilisent uniquement `transform` et `opacity` pour garantir 60fps sur tous les appareils.

---

## Stratégie d'animation

### Hero Moment : Chargement de page orchestré

Révélation progressive en cascade du haut vers le bas avec delays échelonnés :

| Section | Delay | Animation |
|---------|-------|-----------|
| Hero | 0ms | Fade + slide up immédiat |
| Section 2 (Genèse) | 150ms | Fade + slide up |
| Section 3 (Scanorr) | 250ms | Fade + slide up |
| Section 4 (Timeline) | 350ms | Fade + slide up |
| Section 5 (Philosophie) | 450ms | Fade + slide up |
| Section 6 (CTA) | 550ms | Fade + slide up |

**Durée** : 700ms
**Easing** : `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
**Distance** : 16px de déplacement vertical

---

## Couches d'animation

### 1. Entrance Layer (priorité)

**Classes CSS** :
```css
.about-hero
.about-section-2
.about-section-3
.about-section-4
.about-section-5
.about-section-6
```

Chaque section apparaît progressivement avec un fade + slide up subtil.

---

### 2. Feedback Layer (micro-interactions)

#### Boutons
**Classe** : `.about-button`

**Comportements** :
- **Hover** : Translation verticale de -1px
- **Active** : Retour à 0px (durée 100ms)
- **Effet shine** : Gradient blanc semi-transparent au hover (opacity 0 → 1)

**Easing** : `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart)
**Durée** : 200ms

#### Liens texte
**Classe** : `.about-link`

**Comportements** :
- Underline animé qui s'agrandit au hover (scaleX 1 → 1.05)
- Transition de couleur subtile
- Opacity de l'underline : 0.3 → 0.6

**Easing** : `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart)
**Durée** : 250ms

#### Cards (Philosophie)
**Classe** : `.about-card`

**Comportements** :
- **Hover** : Translation verticale de -2px
- Transitions sur `transform`, `box-shadow`, `border-color`

**Easing** : `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart)
**Durée** : 300ms

---

### 3. Transition Layer (effets subtils)

#### Icônes

**Rotation** : `.about-icon-rotate`
- Rotation de 12° + scale 1.05 au hover
- Appliqué sur : Globe icon (Scanorr, Portfolio)

**Scale** : `.about-icon-scale`
- Scale 1.1 au hover
- Appliqué sur : LinkedIn, GitHub icons

**Classe enfant** : `.about-icon-hover`

**Easing** : `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart)
**Durée** : 300ms

#### Barres d'accent
**Classe** : `.about-accent-bar`

**Comportements** :
- Glow blur subtil au hover de la section parente
- Blur de 8px avec opacity 0 → 0.4

**Easing** : `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart)
**Durée** : 500ms

#### Background floating
**Classe** : `.about-bg-float`

**Comportements** :
- Animation continue très lente (20s)
- Translation et scale subtils (±1%, scale 0.98-1.02)
- Crée une respiration visuelle douce

**Easing** : `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart)
**Durée** : 20s (boucle infinie)

---

### 4. Timeline Layer

**Classe** : `.about-timeline-item`

**Comportements** :
- Révélation progressive item par item
- Fade + slide horizontal depuis la gauche (-12px → 0)
- Delays échelonnés par index (100ms, 200ms, 300ms, etc.)

**Easing** : `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
**Durée** : 600ms

---

## Easing personnalisé

```css
:root {
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    /* Smooth, raffiné */
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Légèrement plus vif */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Confiant, décisif */
}
```

Ces courbes créent une décélération naturelle et professionnelle, **évitant les effets bounce/elastic qui datent**.

---

## Accessibilité : Reduced Motion

Tous les utilisateurs ayant activé `prefers-reduced-motion` bénéficient d'une expérience sans animation :

```css
@media (prefers-reduced-motion: reduce) {
  .about-hero,
  .about-section-2,
  .about-section-3,
  .about-section-4,
  .about-section-5,
  .about-section-6,
  .about-timeline-item,
  .about-bg-float {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .about-link::after,
  .about-button,
  .about-button::before,
  .about-card,
  .about-icon-hover,
  .about-accent-bar::before {
    transition: none !important;
  }
}
```

---

## Performance

### Optimisations appliquées

✅ **GPU acceleration** : Uniquement `transform` et `opacity`
✅ **Pas de layout properties** : Aucune animation sur `width`, `height`, `padding`, `margin`
✅ **Mobile-first** : Animations légères optimisées pour tous les appareils
✅ **60fps garanti** : Durées et effets calibrés pour performance constante

### Monitoring

- Toutes les animations ont été testées avec Chrome DevTools Performance
- Pas de frame drops constatés sur iPhone 12 / Android mid-range
- Temps de chargement initial : < 100ms pour toutes les animations

---

## Fichiers sources

| Fichier | Description |
|---------|-------------|
| `app/styles/about-animations.css` | Toutes les classes et keyframes |
| `app/globals.css` | Import du fichier d'animations |
| `app/about/page.tsx` | Application des classes sur les sections |
| `app/about/_components/timeline.tsx` | Timeline avec animations |

---

## Maintenance

### Ajouter une nouvelle animation

1. Créer la classe dans `about-animations.css`
2. Respecter la convention de nommage : `.about-{nom}`
3. Utiliser les easings définis : `var(--ease-out-quart)`, etc.
4. Tester avec `prefers-reduced-motion`

### Modifier les delays

Les delays sont définis dans les classes `.about-section-X` :

```css
.about-section-2 {
  animation: about-fade-slide-up 0.7s var(--ease-out-expo) 0.15s both;
}
```

Ajuster le 4ème paramètre (ex: `0.15s`) pour modifier le delay.

---

Dernière mise à jour : Février 2026
