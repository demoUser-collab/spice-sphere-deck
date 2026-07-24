import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/services/recipes.service";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CUISINES } from "@/constants";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Recipe Hub" },
      { name: "description", content: "Browse every recipe category, from pasta to desserts." },
      { property: "og:title", content: "Categories — Recipe Hub" },
      { property: "og:description", content: "Browse every recipe category, from pasta to desserts." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data = [] } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionTitle eyebrow="Explore" title="All categories" description="Pick a category to see recipes in that style." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((c) => (
          <Link key={c.id} to="/search" search={{ q: c.name } as never} className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
            <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="font-display text-2xl">{c.name}</div>
              <div className="text-xs opacity-80">{c.recipeCount} recipes</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <SectionTitle eyebrow="By cuisine" title="Popular cuisines" />
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((c) => (
            <Link key={c} to="/search" search={{ q: c } as never} className="rounded-full glass px-4 py-2 text-sm transition hover:bg-accent">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
