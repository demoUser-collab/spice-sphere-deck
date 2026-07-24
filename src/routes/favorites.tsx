import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store";
import { RECIPES } from "@/data/mock";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — Recipe Hub" },
      { name: "description", content: "Every recipe you've saved, in one place." },
      { property: "og:title", content: "Favorites — Recipe Hub" },
      { property: "og:description", content: "Every recipe you've saved, in one place." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const favorites = useAppStore((s) => s.favorites);
  const list = RECIPES.filter((r) => favorites.includes(r.id));
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionTitle eyebrow="Saved for later" title="Your favorites" description={`${list.length} recipe${list.length === 1 ? "" : "s"} saved.`} />
      {list.length === 0 ? (
        <div className="grid place-items-center rounded-4xl border border-dashed border-border py-24 text-center">
          <Heart className="h-10 w-10 text-brand" />
          <h3 className="mt-4 font-display text-2xl">No favorites yet</h3>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Tap the bookmark icon on any recipe to save it here.
          </p>
          <Link to="/search" className="mt-4 rounded-full bg-brand px-5 py-2 text-sm font-medium text-brand-foreground">Discover recipes</Link>
        </div>
      ) : (
        <RecipeGrid recipes={list} />
      )}
    </div>
  );
}
