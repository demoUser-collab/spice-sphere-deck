import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, Flame, Heart, Star } from "lucide-react";
import type { Recipe } from "@/types";
import { formatMinutes } from "@/utils/format";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

interface Props {
  recipe: Recipe;
  featured?: boolean;
}

export function RecipeCard({ recipe, featured }: Props) {
  const favorites = useAppStore((s) => s.favorites);
  const toggle = useAppStore((s) => s.toggleFavorite);
  const isFav = favorites.includes(recipe.id);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-glow",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <Link
        to="/recipes/$id"
        params={{ id: recipe.id }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-3xl"
      >
        <div className={cn("relative overflow-hidden", featured ? "aspect-[4/5]" : "aspect-[4/3]")}>
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="glass-strong rounded-full px-3 py-1 text-xs font-medium text-foreground">
              {recipe.cuisine}
            </span>
            {recipe.trending && (
              <span className="rounded-full bg-brand/90 px-3 py-1 text-xs font-medium text-brand-foreground">
                Trending
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(recipe.id);
            }}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-strong transition hover:scale-105"
          >
            <Heart className={cn("h-4 w-4", isFav ? "fill-brand text-brand" : "text-foreground")} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <h3 className={cn("font-display leading-tight", featured ? "text-2xl sm:text-3xl" : "text-lg")}>
              {recipe.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/85">
              <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warm text-warm" />{recipe.rating.toFixed(1)}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatMinutes(recipe.totalTime)}</span>
              <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" />{recipe.nutrition.calories} kcal</span>
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
