import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Kourso</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Bienvenue sur Kourso</h2>
            <p className="text-xl text-muted-foreground">
              Une plateforme simple pour afficher et parcourir des cours.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Thème adaptatif</h3>
              <p className="text-muted-foreground">
                Basculez entre les modes clair et sombre selon vos préférences.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Design moderne</h3>
              <p className="text-muted-foreground">
                Interface propre et élégante avec Shadcn UI et Tailwind CSS.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Simple et efficace</h3>
              <p className="text-muted-foreground">
                Accédez rapidement à vos cours sans fonctionnalités superflues.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Prêt à commencer</h3>
              <p className="text-muted-foreground">
                La base est en place, il ne reste plus qu'à ajouter vos cours.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
