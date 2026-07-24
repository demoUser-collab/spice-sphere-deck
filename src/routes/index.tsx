import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Search, Sparkles, Flame, Leaf, Clock, ChefHat, Star, ArrowRight, Utensils, Salad, Cake,
} from "lucide-react";
import { listRecipes, listCollections, listCategories, listChefs } from "@/services/recipes.service";
import { REVIEWS, POPULAR_SEARCHES } from "@/data/mock";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatMinutes, formatNumber } from "@/utils/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recipe Hub — Cook something worth remembering" },
      { name: "description", content: "Discover recipes that actually work. Beautiful, fast, and made for weeknights." },
      { property: "og:title", content: "Recipe Hub" },
      { property: "og:description", content: "Discover recipes that actually work." },
    ],
  }),
  component: HomePage,
});

const filterChips = [
  { label: "Quick", icon: Clock },
  { label: "Healthy", icon: Leaf },
  { label: "Vegetarian", icon: Salad },
  { label: "Dessert", icon: Cake },
  { label: "Trending", icon: Flame },
];

function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { data: recipes = [], isLoading } = useQuery({ queryKey: ["recipes"], queryFn: listRecipes });
  const { data: collections = [] } = useQuery({ queryKey: ["collections"], queryFn: listCollections });
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  const { data: chefs = [] } = useQuery({ queryKey: ["chefs"], queryFn: listChefs });

  const featured = recipes.filter((r) => r.featured).slice(0, 5);
  const trending = recipes.filter((r) => r.trending).slice(0, 8);
  const quick = [...recipes].sort((a, b) => a.totalTime - b.totalTime).slice(0, 4);
  const healthy = recipes.filter((r) => r.nutrition.calories < 500).slice(0, 4);
  const vegetarian = recipes.filter((r) => r.category === "Vegetarian" || r.tags.includes("Vegetarian")).slice(0, 4);
  const desserts = recipes.filter((r) => r.mealType === "Dessert").slice(0, 4);
  const recent = [...recipes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 4);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } as never });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-foreground/80">
                <Sparkles className="h-3.5 w-3.5 text-brand" /> New: AI-powered ingredient search
              </span>
              <h1 className="mt-5 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                Cook something <span className="text-gradient">worth remembering.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Beautifully tested recipes for real weeknights. Search by ingredients,
                cook with a built-in timer, and save every recipe you love.
              </p>

              <form onSubmit={onSubmit} className="mt-8 max-w-xl">
                <div className="glass-strong flex items-center gap-2 rounded-full p-2 shadow-soft">
                  <Search className="ml-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="What are you craving? e.g. lemon chicken"
                    className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                    aria-label="Search recipes"
                  />
                  <Button type="submit" className="h-11 rounded-full px-6">Search</Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.slice(0, 6).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => navigate({ to: "/search", search: { q: p } as never })}
                      className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-foreground/80 transition hover:bg-accent"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </form>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Utensils className="h-4 w-4 text-brand" /> 12,400+ recipes</div>
                <div className="flex items-center gap-2"><ChefHat className="h-4 w-4 text-brand" /> 380 chefs</div>
                <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-warm text-warm" /> 4.8 avg rating</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4">
                {featured[0] && (
                  <Link to="/recipes/$id" params={{ id: featured[0].id }} className="col-span-6 row-span-4 overflow-hidden rounded-3xl shadow-glow">
                    <div className="relative h-full">
                      <img src={featured[0].image} alt={featured[0].title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <div className="text-xs uppercase tracking-widest opacity-80">Featured today</div>
                        <div className="mt-1 font-display text-2xl sm:text-3xl">{featured[0].title}</div>
                      </div>
                    </div>
                  </Link>
                )}
                {featured.slice(1, 3).map((r) => (
                  <Link key={r.id} to="/recipes/$id" params={{ id: r.id }} className="col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-soft">
                    <div className="relative h-full">
                      <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-sm font-medium leading-tight">{r.title}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-warm/30 via-transparent to-berry/30 blur-3xl" />
            </motion.div>
          </div>

          {/* filter chips */}
          <div className="mt-14 flex flex-wrap gap-2">
            {filterChips.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                to="/search"
                search={{ q: label } as never}
                className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition hover:bg-accent"
              >
                <Icon className="h-4 w-4 text-brand" /> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Editors' pick" title="Featured recipes" href="/search" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(isLoading ? featured : featured).slice(0, 4).map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </section>

      {/* TRENDING carousel */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <SectionTitle eyebrow="Trending today" title="What everyone's cooking" href="/search" />
        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {trending.map((r) => (
            <div key={r.id} className="w-72 shrink-0 snap-start">
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      </section>

      {/* Recommended (What Can I Cook promo) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand via-brand to-warm p-8 text-brand-foreground sm:p-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> AI-inspired
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">What can I cook tonight?</h2>
              <p className="mt-4 max-w-md text-white/90">
                Tell us what's in your pantry and we'll surface recipes you can actually make right now — no groceries needed.
              </p>
              <Link to="/ingredient-search" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground">
                Try it now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                {["Chicken", "Tomato", "Basil", "Olive oil", "Garlic", "Parmesan"].map((i) => (
                  <div key={i} className="rounded-2xl bg-white/15 px-3 py-4 text-center text-sm font-medium backdrop-blur">
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
      </section>

      {/* Quick / Healthy / Vegetarian rows */}
      {[
        { title: "Quick meals", eyebrow: "Under 30 min", items: quick, href: "/search" },
        { title: "Healthy & light", eyebrow: "Fewer than 500 kcal", items: healthy, href: "/search" },
        { title: "Vegetarian favorites", eyebrow: "Plant-forward", items: vegetarian, href: "/search" },
        { title: "Something sweet", eyebrow: "Dessert", items: desserts, href: "/search" },
      ].map((row) => (
        <section key={row.title} className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <SectionTitle eyebrow={row.eyebrow} title={row.title} href={row.href} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {row.items.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </section>
      ))}

      {/* Popular cuisines / Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Browse" title="Popular cuisines & categories" href="/categories" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <Link key={c.id} to="/search" search={{ q: c.name } as never} className="group relative aspect-square overflow-hidden rounded-2xl">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <div className="font-display text-lg">{c.name}</div>
                <div className="text-[11px] opacity-80">{c.recipeCount} recipes</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seasonal */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-4xl glass-strong p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">In season now</span>
              <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Autumn table</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Warming spices, root vegetables, and slow bakes. Recipes chosen for the produce coming into peak.
              </p>
            </div>
            <Link to="/collections" className="inline-flex items-center gap-2 text-sm font-medium">
              Browse collections <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </section>

      {/* Chefs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="People to follow" title="Popular chefs" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {chefs.map((c) => (
            <div key={c.id} className="rounded-3xl glass p-5 text-center">
              <img src={c.avatar} alt={c.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
              <div className="mt-3 font-medium">{c.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.recipeCount} recipes · {formatNumber(c.followers)} followers</div>
              <Button variant="outline" size="sm" className="mt-3 h-8 rounded-full text-xs">Follow</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Recipe collections" title="Curated for the way you cook" href="/collections" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link key={c.id} to="/collections" className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <img src={c.cover} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="font-display text-2xl">{c.name}</div>
                <div className="mt-1 text-xs opacity-80">{c.recipeIds.length} recipes · {c.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-4xl border border-border bg-card p-8 text-center shadow-soft sm:p-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Weekly digest</span>
          <h2 className="mt-2 font-display text-4xl">One brilliant recipe. Every Sunday.</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            No spam. Just one recipe hand-picked for the week ahead, plus a note from our chefs.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-6 flex max-w-md gap-2">
            <Input type="email" placeholder="you@kitchen.com" className="h-12 rounded-full px-5" aria-label="Email address" />
            <Button className="h-12 rounded-full px-6">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Loved by home cooks" title="What people say" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 6).map((r) => (
            <div key={r.id} className="rounded-3xl glass p-6">
              <div className="flex gap-1 text-warm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < r.rating ? "fill-warm" : "opacity-25")} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{r.comment}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={r.user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                <div className="text-sm">
                  <div className="font-medium">{r.user.name}</div>
                  <div className="text-xs text-muted-foreground">{formatMinutes(30)} ago</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="rounded-3xl glass p-2">
          {[
            { q: "Is Recipe Hub free to use?", a: "Yes — browsing, saving, and cooking are always free. A future Pro tier adds meal planning and pantry sync." },
            { q: "Can I upload my own recipes?", a: "Absolutely. Head to Upload Recipe and use our step-by-step builder to publish beautifully formatted recipes." },
            { q: "Do you support metric and imperial units?", a: "Yes. Every recipe supports both, and the ingredient scaler adjusts quantities as you change servings." },
            { q: "How do I follow a chef?", a: "Open any chef's profile and hit Follow. Their new recipes will appear in your feed." },
            { q: "Do you have a mobile app?", a: "The web app is installable as a PWA on iOS and Android. A native app is on our roadmap." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-none">
              <AccordionTrigger className="rounded-2xl px-4 hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
