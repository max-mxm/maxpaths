# Design System - Kourso

Documentation complète du système de design : couleurs, typographie, thème, et guidelines visuelles.

---

## 🎨 Fichiers

### [colors.md](./colors.md)
Palette complète de couleurs pour les modes light et dark.

**Contenu** :
- Couleurs principales (teal `#009688`, violet `#7c3aed`)
- Couleurs de fond, bordures, accentuation
- Couleurs de graphique
- Variables CSS
- Sidebar (référence future)

**Quand consulter** :
- Ajout d'une nouvelle couleur
- Travail sur le thème dark/light
- Modification de styles existants
- Questions sur les variables CSS

---

### [typography.md](./typography.md)
Système typographique complet.

**Contenu** :
- Polices (Inter, serif, monospace)
- Radius (bordures arrondies)
- Hiérarchie typographique
- Bonnes pratiques de lisibilité
- Configuration Tailwind

**Quand consulter** :
- Ajout de texte ou titres
- Modification de la typographie
- Questions sur les polices
- Travail sur la hiérarchie visuelle

---

### [categories.md](./categories.md)
Couleurs et gradients des catégories de cours.

**Contenu** :
- 5 gradients distincts par catégorie
- Codes couleurs exacts
- Implémentation dans CourseLayout
- Guidelines d'accessibilité
- Comment ajouter une nouvelle catégorie

**Quand consulter** :
- Création/modification de catégories
- Travail sur les cours
- Questions sur les gradients
- Ajout de nouvelles sections

---

## 🎯 Couleurs Principales

### Palette de Base
- **Teal** : `rgb(0, 150, 136)` - Couleur primaire
- **Violet** : `rgb(124, 58, 237)` - Couleur secondaire de marque
- **Blanc** : `rgb(255, 255, 255)` - Fond light mode
- **Noir** : `rgb(10, 10, 10)` - Fond dark mode

### Gradients des Catégories
1. **Fondamentaux** : Teal → Violet
2. **Modes de Rendu** : Bleu → Cyan
3. **Optimisations** : Orange → Ambre
4. **Bonnes Pratiques** : Violet → Rose
5. **Avancé** : Rouge → Rose

---

## 📝 Typographie

### Polices
- **Sans** : Inter (par défaut)
- **Serif** : Georgia, Cambria
- **Mono** : SFMono-Regular, Menlo, Monaco

### Radius
- **Small** : 4px
- **Medium** : 6px
- **Large** : 8px (défaut)

---

## 🌓 Thème Dark/Light

### Système de Thème
Le projet utilise `next-themes` avec :
- Mode light (clair)
- Mode dark (sombre)
- Mode system (suit l'OS)

### Composants
- `ThemeProvider` : Wrapper global dans `app/layout.tsx`
- `ThemeToggle` : Bouton de basculement
- Variables CSS : Définies dans `app/styles/shadcn-ui.css`

### Usage
```tsx
import { useTheme } from 'next-themes';

function MonComposant() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Changer de thème
    </button>
  );
}
```

---

## 🎨 Variables CSS

Toutes les variables sont définies dans :
- `app/styles/shadcn-ui.css` - Couleurs light/dark
- `app/styles/theme.css` - Configuration du thème
- `app/styles/theme.utilities.css` - Utilitaires personnalisés

### Exemple d'Usage
```css
.mon-composant {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}
```

---

## 📏 Guidelines

### Cohérence
- Toujours utiliser les variables CSS (`hsl(var(--primary))`)
- Ne jamais hard-coder les couleurs
- Respecter la hiérarchie typographique
- Utiliser les radius définis

### Accessibilité
- Ratio de contraste minimum 4.5:1 (WCAG AA)
- Tester en mode light et dark
- Vérifier avec Lighthouse et axe DevTools
- Assurer la navigation au clavier

### Responsive
- Mobile-first approach
- Breakpoints Tailwind standard
- Tester sur différentes tailles d'écran

---

## 🔗 Voir Aussi

- [Architecture](../architecture/) - Structure des cours
- [Guides](../guides/) - Amélioration de l'UI avec Impeccable
- [Shadcn UI](https://ui.shadcn.com/) - Composants utilisés

---

Dernière mise à jour : Février 2026
