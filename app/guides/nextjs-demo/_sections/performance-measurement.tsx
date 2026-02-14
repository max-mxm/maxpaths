import Link from 'next/link';
import { ArrowRight, Timer } from 'lucide-react';
import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';

export function PerformanceMeasurementSection() {
  return (
    <div className="space-y-8">
      <h2 id="performance-measurement" className="group">
        Mesure et Comparaison des Performances
        <a
          href="#performance-measurement"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary"
        >
          #
        </a>
      </h2>

      <p className="text-foreground/80 leading-relaxed">
        Mesurer les performances de vos composants React est essentiel pour
        prendre des decisions d&apos;optimisation eclairees. Cette section vous
        montre comment utiliser les outils de profilage et comparer
        concretement differentes strategies d&apos;optimisation.
      </p>

      <ConceptCard
        title="Pourquoi mesurer les performances ?"
        description="L'optimisation prematuree est la racine de tous les maux, mais l'optimisation informee est essentielle"
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>Identifier les bottlenecks</strong> : Concentrez vos
            efforts la ou ils ont le plus d&apos;impact
          </li>
          <li>
            <strong>Valider les hypotheses</strong> : Une optimisation peut
            parfois ralentir le code
          </li>
          <li>
            <strong>Suivre les regressions</strong> : Detectez les degradations
            de performance au fil du temps
          </li>
          <li>
            <strong>Communiquer l&apos;impact</strong> : Chiffrez les ameliorations
            pour justifier le temps investi
          </li>
        </ul>
      </ConceptCard>

      <h3 id="tools-available" className="group">
        Outils de Mesure Disponibles
        <a
          href="#tools-available"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        React et le navigateur offrent plusieurs outils pour mesurer les
        performances :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptCard
          title="React DevTools Profiler"
          description="Outil visuel integre au navigateur"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>Enregistre les sessions de rendu</li>
            <li>Visualise le Flame Graph des composants</li>
            <li>Identifie les composants lents</li>
            <li>Disponible dans Chrome et Firefox</li>
          </ul>
        </ConceptCard>

        <ConceptCard
          title="React Profiler API"
          description="Mesure programmatique des rendus"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>Composant Profiler integre a React</li>
            <li>Callback onRender avec metriques</li>
            <li>Mesure actualDuration et baseDuration</li>
            <li>Utilisable en production</li>
          </ul>
        </ConceptCard>

        <ConceptCard
          title="Performance API"
          description="API native du navigateur"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>performance.mark() pour marquer des points</li>
            <li>performance.measure() pour calculer durees</li>
            <li>Haute precision (microseconde)</li>
            <li>Integre au Performance Panel</li>
          </ul>
        </ConceptCard>

        <ConceptCard
          title="Custom Timers"
          description="Mesures simples avec Date ou performance.now()"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>Date.now() pour simplicite</li>
            <li>performance.now() pour precision</li>
            <li>Facile a integrer dans le code</li>
            <li>Limite au contexte synchrone</li>
          </ul>
        </ConceptCard>
      </div>

      <h3 id="profiler-api-usage" className="group">
        Utilisation de l&apos;API Profiler
        <a
          href="#profiler-api-usage"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Le composant <code className="text-sm">Profiler</code> de React permet
        de mesurer le temps de rendu de vos composants directement dans votre
        application :
      </p>

      <CodeBlock
        code={`import { Profiler, ProfilerOnRenderCallback } from 'react';

function MyComponent() {
  const onRender: ProfilerOnRenderCallback = (
    id,                    // "id" du Profiler qui vient de commit
    phase,                 // "mount" ou "update"
    actualDuration,        // Temps passe a render cette mise a jour
    baseDuration,          // Temps estime sans memoization
    startTime,             // Quand React a commence a render
    commitTime             // Quand React a commite cette mise a jour
  ) => {
    console.log(\`\${id} (\${phase}): \${actualDuration.toFixed(2)}ms\`);

    // Envoyez ces metriques a votre service d'analytics
    if (actualDuration > 100) {
      console.warn('Rendu lent detecte !');
    }
  };

  return (
    <Profiler id="MyComponent" onRender={onRender}>
      <div>
        {/* Votre composant ici */}
      </div>
    </Profiler>
  );
}`}
        language="typescript"
        filename="profiler-usage.tsx"
        category="optimization"
      />

      <ConceptCard
        title="Difference entre actualDuration et baseDuration"
        description="Comprendre les metriques de performance"
        category="optimization"
      >
        <div className="text-sm text-foreground/80 space-y-2 mt-2">
          <p>
            <strong>actualDuration</strong> : Temps reel passe a rendre le
            composant et ses enfants. Ce temps inclut les benefices des
            optimisations comme React.memo et useMemo.
          </p>
          <p>
            <strong>baseDuration</strong> : Temps estime si aucun composant
            n&apos;etait memorise. React le calcule en additionnant les durees de
            rendu les plus recentes de chaque composant.
          </p>
          <p className="mt-2 p-2 bg-muted rounded-lg">
            Si <code>actualDuration</code> est beaucoup plus petit que{' '}
            <code>baseDuration</code>, vos optimisations fonctionnent bien !
          </p>
        </div>
      </ConceptCard>

      {/* CTA vers le simulateur standalone */}
      <h3 id="interactive-demo" className="group">
        Demo Interactive : Comparaison des Strategies
        <a
          href="#interactive-demo"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Testez par vous-meme les differences entre les strategies d&apos;optimisation
        sur une liste de produits avec recherche en temps reel.
      </p>

      <Link
        href="/demos/simulateur-performance"
        className="group block my-6 p-6 bg-muted/30 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                Ouvrir le simulateur de performance
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Comparez React.memo, useMemo et useCallback avec des mesures reelles
              de temps de rendu sur un benchmark interactif.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>

      <h3 id="results-analysis" className="group">
        Analyse des Resultats
        <a
          href="#results-analysis"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Les resultats du simulateur montrent clairement l&apos;impact de
        chaque optimisation :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptCard
          title="Sans optimisation"
          description="Temps de rendu : ~100-150ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Problemes :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Filtrage recalcule a chaque render</li>
              <li>Tous les items re-render systematiquement</li>
              <li>Calculs couteux repetes inutilement</li>
            </ul>
          </div>
        </ConceptCard>

        <ConceptCard
          title="Avec React.memo"
          description="Temps de rendu : ~40-60ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Amelioration ~50% :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Items ne re-render que si changes</li>
              <li>Filtrage toujours couteux</li>
              <li>Bon compromis effort/resultat</li>
            </ul>
          </div>
        </ConceptCard>

        <ConceptCard
          title="Avec useMemo"
          description="Temps de rendu : ~30-50ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Amelioration ~60% :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Filtrage optimise</li>
              <li>Items re-render toujours</li>
              <li>Utile pour listes tres longues</li>
            </ul>
          </div>
        </ConceptCard>

        <ConceptCard
          title="Tout optimise"
          description="Temps de rendu : ~5-15ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Amelioration ~90% :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Combinaison de toutes les optimisations</li>
              <li>Performance optimale</li>
              <li>Necessite plus de code</li>
            </ul>
          </div>
        </ConceptCard>
      </div>

      <ConceptCard
        title="Quand optimiser ?"
        description="Regles pragmatiques pour decider"
        category="best-practices"
      >
        <div className="text-sm text-foreground/80 space-y-2 mt-2">
          <p>
            <strong>Optimisez si :</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Le temps de rendu depasse 50ms de maniere reguliere</li>
            <li>
              Les utilisateurs se plaignent de ralentissements ou de lag
            </li>
            <li>Le composant est rendu frequemment (ex: scroll, hover)</li>
            <li>Le profiler DevTools montre un bottleneck clair</li>
          </ul>
          <p className="mt-3">
            <strong>N&apos;optimisez PAS si :</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Le rendu prend moins de 16ms (60 FPS)</li>
            <li>Le composant est rarement affiche</li>
            <li>L&apos;optimisation complexifie excessivement le code</li>
            <li>Vous n&apos;avez pas mesure le probleme</li>
          </ul>
        </div>
      </ConceptCard>

      <h3 id="dev-vs-prod" className="group">
        Difference Dev vs Production
        <a
          href="#dev-vs-prod"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Les performances en mode developpement ne refletent PAS les
        performances en production :
      </p>

      <CodeBlock
        code={`// Mode Developpement
- React inclut des warnings et checks supplementaires
- Source maps et stack traces detaillees
- Hot Module Replacement actif
- Double render en Strict Mode (React 18+)
→ 2-3x plus lent que production

// Mode Production
- Code minifie et optimise
- Tree-shaking applique
- Pas de dev warnings
- Un seul render par update
→ Performance reelle pour les utilisateurs

// Toujours tester en production !
npm run build
npm run start`}
        language="bash"
        filename="dev-vs-prod.sh"
        category="optimization"
      />

      <ConceptCard
        title="Best Practice : Mesurer en Production"
        description="Utilisez des outils de Real User Monitoring (RUM)"
        category="best-practices"
      >
        <div className="text-sm text-foreground/80 space-y-2 mt-2">
          <p>Pour mesurer les performances reelles :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Vercel Analytics</strong> : Core Web Vitals automatiques
            </li>
            <li>
              <strong>Google Lighthouse</strong> : Audit complet de performance
            </li>
            <li>
              <strong>WebPageTest</strong> : Tests multi-localisations
            </li>
            <li>
              <strong>Custom RUM</strong> : Profiler API + analytics backend
            </li>
          </ul>
        </div>
      </ConceptCard>
    </div>
  );
}
