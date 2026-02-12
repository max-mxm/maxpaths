# Guide Impeccable - Refonte Visuelle Complète

## Objectif

Workflow complet pour transformer l'interface avec les skills Impeccable.
Chaque commande se lance via `/impeccable:<skill>` dans Claude Code.

---

## Phase 1 : Fondations

### 1. `/impeccable:teach-impeccable`

**But** : Configuration initiale. Analyse le projet et sauvegarde le contexte design (couleurs brand, typographie, tokens) dans la config AI.

> A faire une seule fois. Etablit les guidelines persistantes pour toutes les commandes suivantes.

### 2. `/impeccable:audit`

**But** : Audit complet de l'interface actuelle. Identifie tous les problemes d'accessibilite, performance, theming et responsive. Genere un rapport avec severite et recommandations.

> Le diagnostic avant toute intervention. Permet de prioriser les corrections.

---

## Phase 2 : Structure et Coherence

### 3. `/impeccable:normalize`

**But** : Aligner l'existant sur le design system. Corriger les inconsistances de spacing, typographie, couleurs, composants.

> Nettoie la base avant d'ajouter du style. Assure la coherence globale.

### 4. `/impeccable:simplify`

**But** : Eliminer la complexite visuelle inutile. Retirer les elements superflus, simplifier les layouts trop charges.

> Moins c'est plus. Un design epure est plus facile a enrichir ensuite.

### 5. `/impeccable:extract`

**But** : Extraire les composants reutilisables, tokens et patterns dans le design system. Consolider ce qui peut etre systematise.

> Cree une bibliotheque coherente pour la suite du travail.

---

## Phase 3 : Impact Visuel

### 6. `/impeccable:bolder`

**But** : Amplifier le design pour le rendre plus percutant. Renforcer la hierarchie visuelle, augmenter les contrastes, affirmer l'identite.

> Transforme un design "safe" en quelque chose de memorable.

### 7. `/impeccable:colorize`

**But** : Ajouter de la couleur strategique. Exploiter les brand colors (teal `#009688` + violet `#7c3aed`) pour creer du rythme visuel.

> Donne vie a l'interface avec les gradients et accents de la marque.

### 8. `/impeccable:animate`

**But** : Ajouter des animations et micro-interactions qui servent l'UX. Transitions, feedback visuel, mouvements fonctionnels.

> Les animations guident l'utilisateur et rendent l'interface reactive.

---

## Phase 4 : UX et Adaptativite

### 9. `/impeccable:clarify`

**But** : Ameliorer tout le copy UX : labels, messages d'erreur, microcopy, instructions. Rendre l'interface auto-explicative.

> Un bon design n'a pas besoin de documentation.

### 10. `/impeccable:adapt`

**But** : Assurer que tout fonctionne sur mobile, tablette, desktop et dans differents contextes. Responsive design complet.

> Critique : les cours doivent etre consultables sur tous les appareils.

### 11. `/impeccable:onboard`

**But** : Concevoir les parcours d'onboarding, les empty states et les premieres experiences utilisateur.

> La premiere impression determine l'adoption.

---

## Phase 5 : Robustesse

### 12. `/impeccable:harden`

**But** : Renforcer la resilience : gestion d'erreurs, i18n, overflow texte, cas limites. Rendre l'interface production-ready.

> Gerer les cas reels : textes longs, connexion lente, etats vides, erreurs serveur.

### 13. `/impeccable:optimize`

**But** : Optimiser la performance : vitesse de chargement, rendu, images, bundle size, animations fluides.

> La performance est une feature UX.

---

## Phase 6 : Finition

### 14. `/impeccable:delight`

**But** : Ajouter des moments de joie et de personnalite. Les touches finales qui rendent l'experience memorable.

> Les details qui font qu'on aime utiliser un produit.

### 15. `/impeccable:polish`

**But** : Passe finale de qualite. Corriger les derniers pixels : alignements, espacements, coherence des details.

> La derniere verification avant mise en production.

---

## Commandes Correctives (a la demande)

| Commande | Quand l'utiliser |
|----------|-----------------|
| `/impeccable:quieter` | Si le design est devenu trop agressif apres `bolder` |
| `/impeccable:critique` | Pour obtenir un avis UX detaille sur une page specifique |
| `/impeccable:frontend-design` | Pour creer un composant/page from scratch avec haute qualite |

---

## Conseils d'execution

- **Une commande a la fois** : chaque skill modifie potentiellement beaucoup de fichiers. Valider avant de passer a la suivante.
- **Commit entre chaque phase** : permet de revenir en arriere si un skill va trop loin.
- **Cibler par page/composant** : preciser dans le prompt quelle partie de l'app traiter (ex: "applique sur la page cours-detail").
- **Iterer** : certains skills comme `bolder` + `quieter` peuvent s'equilibrer par iterations.
- **Tester sur mobile** : apres chaque phase, verifier le rendu responsive.
