import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listCollections } from "@/services/recipes.service";
import { SectionTitle } from "@/components/common/SectionTitle";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Recipe Hub" },
      { name: "description", content: "Curated recipe collections for the way you cook." },
      { property: "og:title", content: "Collections — Recipe Hub" },
      { property: "og:description", content: "Curated recipe collections for the way you cook." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { data = [] } = useQuery({ queryKey: ["collections"], queryFn: listCollections });
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionTitle eyebrow="Curated" title="Recipe collections" description="Handpicked sets for every kind of week." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <div key={c.id} className="group overflow-hidden rounded-3xl bg-card shadow-soft transition hover:shadow-glow">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={c.cover} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-3 text-xs text-muted-foreground">{c.recipeIds.length} recipes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
