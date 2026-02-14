import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function BundleOptimizationSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          L&apos;optimisation du bundle est critique pour les performances. React 19 avec Server Components
          réduit drastiquement la taille du JavaScript côté client.
        </p>
      </div>

      <CodeBlock
        code={`// Tree-shaking et imports sélectifs
// ❌ Import tout
import * as _ from 'lodash';

// ✅ Import sélectif
import { debounce } from 'lodash-es';

// ✅ Encore mieux : alternatives lightweight
import debounce from 'just-debounce-it'; // 200 bytes vs 70KB`}
        language="tsx"
        filename="Imports optimisés"
        highlightLines={[5, 8]}
        category="optimization"
      />

      <CodeBlock
        code={`// Code Splitting avec React.lazy()
import React, { Suspense } from 'react';

const HeavyChart = React.lazy(() => import('@/components/heavy-chart'));

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Chargement du graphique...</p>}>
        <HeavyChart /> {/* Chargé seulement quand nécessaire */}
      </Suspense>
    </div>
  );
}`}
        language="tsx"
        filename="Code splitting"
        highlightLines={[4, 5, 6]}
        category="optimization"
      />

      <ConceptCard
        title="Bundle Analysis"
        description="Analyser votre bundle pour identifier les gros modules."
        category="optimization"
      >
        <p className="text-sm text-foreground/80">
          Utiliser webpack-bundle-analyzer, source-map-explorer ou bundle-stats pour visualiser la taille de chaque module
          et identifier les opportunités d&apos;optimisation.
        </p>
      </ConceptCard>
    </div>
  );
}
