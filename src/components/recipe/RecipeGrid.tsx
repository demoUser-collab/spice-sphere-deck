import type { Recipe } from "@/types";
import { RecipeCard } from "./RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";

export function RecipeGrid({
  recipes,
  loading,
  emptyLabel = "No recipes found.",
}: {
  recipes: Recipe[];
  loading?: boolean;
  emptyLabel?: string;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] rounded-3xl" />
        ))}
      </div>
    );
  }
  if (!recipes.length) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed border-border/60 py-20 text-center">
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
