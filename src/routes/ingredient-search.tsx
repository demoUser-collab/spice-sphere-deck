import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Ban, Check, Sparkles } from "lucide-react";
import { RECIPES, SUGGESTED_INGREDIENTS } from "@/data/mock";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchRecipes } from "@/services/recipes.service";

export const Route = createFileRoute("/ingredient-search")({
  head: () => ({
    meta: [
      { title: "What Can I Cook? — Recipe Hub" },
      { name: "description", content: "Add ingredients from your pantry and find recipes you can make right now." },
      { property: "og:title", content: "What Can I Cook? — Recipe Hub" },
      { property: "og:description", content: "Add ingredients from your pantry and find recipes you can make right now." },
    ],
  }),
  component: IngredientSearchPage,
});

function IngredientSearchPage() {
  const [include, setInclude] = useState<string[]>(["Chicken", "Garlic"]);
  const [exclude, setExclude] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState(RECIPES.slice(0, 8));
  const [searched, setSearched] = useState(false);

  const search = useMutation({
    mutationFn: () => searchRecipes({ includeIngredients: include, excludeIngredients: exclude }),
    onSuccess: (data) => { setResults(data); setSearched(true); },
  });

  const addIngredient = (name: string, list: "include" | "exclude") => {
    const clean = name.trim();
    if (!clean) return;
    if (list === "include") {
      if (!include.includes(clean)) setInclude([...include, clean]);
      setExclude(exclude.filter((x) => x !== clean));
    } else {
      if (!exclude.includes(clean)) setExclude([...exclude, clean]);
      setInclude(include.filter((x) => x !== clean));
    }
    setInput("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionTitle
        eyebrow="Pantry mode"
        title={<>What can I cook <span className="text-gradient">tonight?</span></>}
        description="Tell us what's in your kitchen and we'll surface recipes you can actually make right now."
      />

      <div className="glass-strong rounded-4xl p-6 sm:p-8 shadow-soft">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addIngredient(input, "include");
          }}
          className="flex flex-wrap gap-2"
        >
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4">
            <Sparkles className="h-4 w-4 text-brand" />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type an ingredient and press Enter (e.g. tomato)"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
              aria-label="Add ingredient"
            />
          </div>
          <Button type="submit" className="h-11 rounded-full px-5"><Plus className="mr-1 h-4 w-4" /> Add</Button>
        </form>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <PantryList
            title="Include"
            accent="brand"
            items={include}
            onRemove={(x) => setInclude(include.filter((v) => v !== x))}
            emptyLabel="Add ingredients you have."
          />
          <PantryList
            title="Exclude"
            accent="destructive"
            items={exclude}
            onRemove={(x) => setExclude(exclude.filter((v) => v !== x))}
            emptyLabel="Optional — ingredients to avoid."
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Suggested ingredients
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_INGREDIENTS.map((s) => (
              <button
                key={s}
                onClick={() => addIngredient(s, "include")}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition hover:bg-accent"
              >
                <Plus className="h-3.5 w-3.5" /> {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            {include.length} include · {exclude.length} exclude
          </div>
          <Button onClick={() => search.mutate()} className="rounded-full px-6" disabled={search.isPending}>
            {search.isPending ? "Finding matches…" : "Find recipes"}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle title={searched ? "Recipes you can make" : "Recommended matches"} />
        <RecipeGrid recipes={results} loading={search.isPending} emptyLabel="No matches — try removing some ingredients." />
      </div>
    </div>
  );
}

function PantryList({
  title, items, onRemove, emptyLabel, accent,
}: {
  title: string; items: string[]; onRemove: (v: string) => void; emptyLabel: string; accent: "brand" | "destructive";
}) {
  const icon = accent === "brand" ? Check : Ban;
  const Icon = icon;
  return (
    <div className="rounded-3xl border border-border bg-card/60 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon className={`h-4 w-4 ${accent === "brand" ? "text-brand" : "text-destructive"}`} />
        {title}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {items.map((i) => (
              <motion.button
                key={i}
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={() => onRemove(i)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm ${
                  accent === "brand" ? "bg-brand/10 text-foreground" : "bg-destructive/10 text-foreground"
                }`}
              >
                {i} <X className="h-3.5 w-3.5 opacity-60" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
