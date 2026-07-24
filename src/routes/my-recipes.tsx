import { createFileRoute } from "@tanstack/react-router";
import { RECIPES } from "@/data/mock";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { SectionTitle } from "@/components/common/SectionTitle";

export const Route = createFileRoute("/my-recipes")({
  head: () => ({
    meta: [
      { title: "My recipes — Recipe Hub" },
      { name: "description", content: "Recipes you've published." },
      { property: "og:title", content: "My recipes — Recipe Hub" },
      { property: "og:description", content: "Recipes you've published." },
    ],
  }),
  component: MyRecipesPage,
});

function MyRecipesPage() {
  const list = RECIPES.slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionTitle eyebrow="Your kitchen" title="My recipes" description={`${list.length} recipes published.`} />
      <RecipeGrid recipes={list} />
    </div>
  );
}
