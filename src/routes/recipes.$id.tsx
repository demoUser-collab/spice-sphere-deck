import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import {
  Clock, Users, Flame, Star, Heart, Bookmark, Share2, Printer,
  ChefHat, Play, Pause, RotateCcw, Minus, Plus,
} from "lucide-react";
import { getRecipe, listReviewsFor, listRecipes } from "@/services/recipes.service";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { SectionTitle } from "@/components/common/SectionTitle";
import { formatMinutes } from "@/utils/format";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/recipes/$id")({
  loader: async ({ params }) => {
    const recipe = await getRecipe(params.id);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Recipe not found — Recipe Hub" }, { name: "robots", content: "noindex" }] };
    const r = loaderData.recipe;
    return {
      meta: [
        { title: `${r.title} — Recipe Hub` },
        { name: "description", content: r.description },
        { property: "og:title", content: r.title },
        { property: "og:description", content: r.description },
        { property: "og:image", content: r.image },
        { name: "twitter:image", content: r.image },
      ],
    };
  },
  component: RecipeDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="font-display text-3xl">Recipe not found</h1>
      <Link to="/" className="mt-4 inline-block text-brand">Go home</Link>
    </div>
  ),
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const { data: reviews = [] } = useQuery({ queryKey: ["reviews", recipe.id], queryFn: () => listReviewsFor(recipe.id) });
  const { data: allRecipes = [] } = useQuery({ queryKey: ["recipes"], queryFn: listRecipes });

  const favorites = useAppStore((s) => s.favorites);
  const likes = useAppStore((s) => s.likes);
  const toggleFav = useAppStore((s) => s.toggleFavorite);
  const toggleLike = useAppStore((s) => s.toggleLike);
  const pushViewed = useAppStore((s) => s.pushViewed);
  const isFav = favorites.includes(recipe.id);
  const isLiked = likes.includes(recipe.id);

  const [servings, setServings] = useState(recipe.servings);
  const [activeImg, setActiveImg] = useState(0);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const scale = servings / recipe.servings;

  useEffect(() => { pushViewed(recipe.id); }, [recipe.id, pushViewed]);

  const similar = useMemo(
    () => allRecipes.filter((r) => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.category === recipe.category)).slice(0, 4),
    [allRecipes, recipe]
  );

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* HERO */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.3, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/3] overflow-hidden rounded-4xl shadow-glow"
          >
            <img src={recipe.gallery[activeImg]} alt={recipe.title} className="h-full w-full object-cover" />
          </motion.div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {recipe.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "aspect-[4/3] overflow-hidden rounded-2xl border-2 transition",
                  i === activeImg ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
                )}
                aria-label={`Image ${i + 1}`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{recipe.cuisine}</Badge>
            <Badge variant="secondary" className="rounded-full">{recipe.category}</Badge>
            <Badge className="rounded-full">{recipe.difficulty}</Badge>
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{recipe.title}</h1>
          <p className="mt-4 text-muted-foreground">{recipe.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <img src={recipe.author.avatar} alt={recipe.author.name} className="h-11 w-11 rounded-full object-cover" />
            <div>
              <div className="text-sm font-medium">{recipe.author.name}</div>
              <div className="text-xs text-muted-foreground">Chef · {recipe.author.recipeCount} recipes</div>
            </div>
            <div className="ml-auto flex items-center gap-1 rounded-full glass px-3 py-1.5 text-sm">
              <Star className="h-4 w-4 fill-warm text-warm" />
              <span className="font-medium">{recipe.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({recipe.reviewCount})</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Clock} label="Prep" value={formatMinutes(recipe.prepTime)} />
            <Stat icon={ChefHat} label="Cook" value={formatMinutes(recipe.cookTime)} />
            <Stat icon={Users} label="Servings" value={String(recipe.servings)} />
            <Stat icon={Flame} label="Calories" value={`${recipe.nutrition.calories} kcal`} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              onClick={() => { toggleFav(recipe.id); toast.success(isFav ? "Removed from favorites" : "Saved to favorites"); }}
              variant={isFav ? "default" : "outline"}
              className="rounded-full"
            >
              <Bookmark className={cn("mr-2 h-4 w-4", isFav && "fill-current")} />
              {isFav ? "Saved" : "Save"}
            </Button>
            <Button
              onClick={() => toggleLike(recipe.id)}
              variant={isLiked ? "default" : "outline"}
              className="rounded-full"
            >
              <Heart className={cn("mr-2 h-4 w-4", isLiked && "fill-current")} />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                if (navigator.share) navigator.share({ title: recipe.title, url: window.location.href }).catch(() => {});
                else { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        {/* Ingredients */}
        <aside className="glass-strong h-fit rounded-3xl p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Ingredients</h2>
            <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setServings(Math.max(1, servings - 1))} aria-label="Decrease servings"><Minus className="h-3 w-3" /></Button>
              <span className="w-8 text-center text-sm">{servings}</span>
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setServings(servings + 1)} aria-label="Increase servings"><Plus className="h-3 w-3" /></Button>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-border/60">
            {recipe.ingredients.map((ing) => {
              const isChecked = checked.has(ing.id);
              return (
                <li key={ing.id}>
                  <label className="flex cursor-pointer items-center gap-3 py-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const next = new Set(checked);
                        next.has(ing.id) ? next.delete(ing.id) : next.add(ing.id);
                        setChecked(next);
                      }}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                    />
                    <span className={cn("flex-1 text-sm", isChecked && "text-muted-foreground line-through")}>
                      <span className="font-medium">{(ing.quantity * scale).toFixed(ing.quantity < 1 ? 2 : 0)} {ing.unit}</span>{" "}
                      {ing.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          <Button variant="outline" className="mt-4 w-full rounded-full">Add all to shopping list</Button>
        </aside>

        {/* Right side: tabs (steps, nutrition, reviews) + timer */}
        <div>
          <CookingTimer />

          <Tabs defaultValue="steps" className="mt-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="steps">Steps</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({recipe.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="steps" className="mt-6">
              <ol className="space-y-4">
                {recipe.steps.map((s) => (
                  <li key={s.id} className="glass flex gap-4 rounded-3xl p-5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-warm font-display text-white">
                      {s.order}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground/90">{s.text}</p>
                      {s.durationMin != null && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" /> {s.durationMin} min
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </TabsContent>
            <TabsContent value="nutrition" className="mt-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Object.entries(recipe.nutrition).map(([k, v]) => (
                  <div key={k} className="rounded-3xl glass p-5">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
                    <div className="mt-2 font-display text-3xl">{v}{k === "calories" ? "" : "g"}</div>
                    <div className="mt-1 text-xs text-muted-foreground">per serving</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="grid gap-4">
                {reviews.map((r) => (
                  <div key={r.id} className="glass rounded-3xl p-5">
                    <div className="flex items-center gap-3">
                      <img src={r.user.avatar} alt="" className="h-9 w-9 rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{r.user.name}</div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating ? "fill-warm text-warm" : "text-muted-foreground/40")} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-foreground/85">{r.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-12 flex flex-wrap gap-2">
        {recipe.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">#{t}</Badge>
        ))}
      </div>

      {/* Similar */}
      <div className="mt-16">
        <SectionTitle eyebrow="Keep going" title="Similar recipes" href="/search" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </article>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 font-display text-lg">{value}</div>
    </div>
  );
}

function CookingTimer() {
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : (setRunning(false), 0))), 1000);
    return () => clearInterval(t);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="glass-strong flex items-center gap-4 rounded-3xl p-5">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-warm text-white">
        <Clock className="h-6 w-6" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Cooking timer</div>
        <div className="font-display text-3xl tabular-nums">{mm}:{ss}</div>
      </div>
      <div className="ml-auto flex gap-2">
        {[3, 5, 10].map((m) => (
          <Button key={m} variant="outline" size="sm" className="rounded-full" onClick={() => { setSeconds(m * 60); setRunning(false); }}>{m}m</Button>
        ))}
        <Button size="icon" onClick={() => setRunning((v) => !v)} className="rounded-full" aria-label={running ? "Pause" : "Start"}>
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button size="icon" variant="outline" onClick={() => { setSeconds(300); setRunning(false); }} className="rounded-full" aria-label="Reset">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
