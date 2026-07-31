import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Filter, Search as SearchIcon, X, TrendingUp } from "lucide-react";
import { z } from "zod";
import { searchRecipesPaged, autocomplete, trendingSearches, type RecipeFilters } from "@/services/recipes.service";
import { CUISINES, CATEGORIES, DIFFICULTIES, MEAL_TYPES, SORT_OPTIONS } from "@/constants";
import { POPULAR_SEARCHES } from "@/data/mock";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppStore } from "@/store";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Discover recipes — Recipe Hub" },
      { name: "description", content: "Search thousands of recipes by name, ingredient, cuisine, and more." },
      { property: "og:title", content: "Discover recipes — Recipe Hub" },
      { property: "og:description", content: "Search thousands of recipes by name, ingredient, cuisine, and more." },
    ],
  }),
  validateSearch: searchSchema,
  component: SearchPage,
});

const PAGE_SIZE = 12;

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState(search.q ?? "");
  const [cuisine, setCuisine] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [mealType, setMealType] = useState<string>("");
  const [maxTime, setMaxTime] = useState<number>(180);
  const [maxCalories, setMaxCalories] = useState<number>(1200);
  const [sort, setSort] = useState<string>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [focused, setFocused] = useState(false);

  const debouncedQ = useDebounce(q, 250);
  const pushSearch = useAppStore((s) => s.pushSearch);
  const recent = useAppStore((s) => s.recentSearches);

  const suggestions = useMemo(() => autocomplete(q), [q]);
  const trending = useMemo(() => trendingSearches(5), []);

  const filters: RecipeFilters = useMemo(
    () => ({
      q: debouncedQ,
      cuisine: cuisine || undefined,
      category: category || undefined,
      difficulty: difficulty || undefined,
      mealType: mealType || undefined,
      maxTime: maxTime < 180 ? maxTime : undefined,
      maxCalories: maxCalories < 1200 ? maxCalories : undefined,
      sort,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debouncedQ, cuisine, category, difficulty, mealType, maxTime, maxCalories, sort, page]
  );

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["search", filters],
    queryFn: () => searchRecipesPaged(filters),
    placeholderData: keepPreviousData,
  });

  const applyQuery = (v: string) => {
    setQ(v);
    setPage(1);
    setFocused(false);
    if (v.trim()) pushSearch(v);
    navigate({ to: "/search", search: { q: v } });
  };

  const onFilterChange = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setPage(1); };

  const clearAll = () => {
    setQ(""); setCuisine(""); setCategory(""); setDifficulty(""); setMealType("");
    setMaxTime(180); setMaxCalories(1200); setSort("popular"); setPage(1);
    navigate({ to: "/search", search: {} });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionTitle eyebrow="Search" title="Discover recipes" description="Filter by cuisine, category, time, calories, and more." />

      <div className="glass-strong sticky top-16 z-30 mb-6 rounded-3xl p-3 shadow-soft">
        <div className="flex items-center gap-2">
          <SearchIcon className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden />
          <div className="relative flex-1">
            <Input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 120)}
              onKeyDown={(e) => { if (e.key === "Enter") applyQuery(q); if (e.key === "Escape") setFocused(false); }}
              placeholder="Search recipes, ingredients, cuisines…"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
              aria-label="Search recipes"
              role="combobox"
              aria-expanded={focused && suggestions.length > 0}
              aria-autocomplete="list"
            />
            {focused && suggestions.length > 0 && (
              <ul
                role="listbox"
                aria-label="Search suggestions"
                className="glass-strong absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-2xl border border-border py-1 shadow-soft"
              >
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      role="option"
                      aria-selected={false}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyQuery(s)}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-accent"
                    >
                      <SearchIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden /> {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Select value={sort} onValueChange={onFilterChange(setSort)}>
            <SelectTrigger className="hidden h-10 w-40 rounded-full sm:flex" aria-label="Sort results"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowFilters((v) => !v)} className="h-10 rounded-full" aria-expanded={showFilters}>
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        {!q && recent.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 px-2 text-xs text-muted-foreground">
            <span>Recent:</span>
            {recent.map((r) => (
              <button key={r} onClick={() => applyQuery(r)} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs">{r}</button>
            ))}
          </div>
        )}
        {!q && (
          <>
            <div className="mt-2 flex flex-wrap items-center gap-2 px-2 text-xs text-muted-foreground">
              <span>Popular:</span>
              {POPULAR_SEARCHES.slice(0, 6).map((p) => (
                <button key={p} onClick={() => applyQuery(p)} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs">{p}</button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 px-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" aria-hidden /> Trending:</span>
              {trending.map((p) => (
                <button key={p} onClick={() => applyQuery(p)} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs">{p}</button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <motion.aside
          initial={false}
          animate={{ height: showFilters ? "auto" : undefined }}
          className={`${showFilters ? "block" : "hidden"} lg:block`}
          aria-label="Filters"
        >
          <div className="glass rounded-3xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={clearAll} className="text-xs text-muted-foreground underline-offset-2 hover:underline">Clear all</button>
            </div>

            <FilterGroup label="Cuisine">
              <ChipRow value={cuisine} onChange={onFilterChange(setCuisine)} options={CUISINES as unknown as string[]} />
            </FilterGroup>
            <FilterGroup label="Category">
              <ChipRow value={category} onChange={onFilterChange(setCategory)} options={CATEGORIES as unknown as string[]} />
            </FilterGroup>
            <FilterGroup label="Difficulty">
              <ChipRow value={difficulty} onChange={onFilterChange(setDifficulty)} options={DIFFICULTIES as unknown as string[]} />
            </FilterGroup>
            <FilterGroup label="Meal type">
              <ChipRow value={mealType} onChange={onFilterChange(setMealType)} options={MEAL_TYPES as unknown as string[]} />
            </FilterGroup>

            <FilterGroup label={`Max time · ${maxTime === 180 ? "Any" : `${maxTime}m`}`}>
              <Slider value={[maxTime]} onValueChange={(v) => { setMaxTime(v[0]); setPage(1); }} min={10} max={180} step={5} aria-label="Maximum total time" />
            </FilterGroup>
            <FilterGroup label={`Max calories · ${maxCalories === 1200 ? "Any" : `${maxCalories} kcal`}`}>
              <Slider value={[maxCalories]} onValueChange={(v) => { setMaxCalories(v[0]); setPage(1); }} min={100} max={1200} step={50} aria-label="Maximum calories" />
            </FilterGroup>
          </div>
        </motion.aside>

        <div>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground" aria-live="polite">
            <span>{isLoading ? "Searching…" : `${data?.total ?? 0} recipes`}{isFetching && !isLoading ? " · updating" : ""}</span>
            {data && data.totalPages > 1 && <span>Page {data.page} of {data.totalPages}</span>}
          </div>

          {isError ? (
            <div className="glass grid place-items-center rounded-3xl py-20 text-center">
              <p className="text-sm text-muted-foreground">Something went wrong loading recipes.</p>
              <Button className="mt-4 rounded-full" onClick={() => refetch()}>Try again</Button>
            </div>
          ) : (
            <>
              <RecipeGrid recipes={data?.items ?? []} loading={isLoading} emptyLabel="No recipes match those filters. Try clearing a few." />

              {!isLoading && data?.total === 0 && (
                <div className="mt-6">
                  {data.suggestions?.length ? (
                    <p className="text-sm text-muted-foreground">
                      Did you mean:{" "}
                      {data.suggestions.map((s) => (
                        <button key={s} onClick={() => applyQuery(s)} className="mx-1 text-brand underline-offset-2 hover:underline">{s}</button>
                      ))}
                    </p>
                  ) : null}
                  {data.recommendations?.length ? (
                    <div className="mt-6">
                      <SectionTitle title="Top rated instead" />
                      <RecipeGrid recipes={data.recommendations} />
                    </div>
                  ) : null}
                </div>
              )}

              {data && data.totalPages > 1 && (
                <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                  <Button variant="outline" className="rounded-full" disabled={data.page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                  <span className="px-2 text-sm text-muted-foreground">{data.page} / {data.totalPages}</span>
                  <Button variant="outline" className="rounded-full" disabled={data.page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function ChipRow({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(value === o ? "" : o)}
          aria-pressed={value === o}
          className={`rounded-full border px-3 py-1 text-xs transition ${
            value === o ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card hover:bg-accent"
          }`}
        >
          {o}
          {value === o && <X className="ml-1 -mr-0.5 inline h-3 w-3" aria-hidden />}
        </button>
      ))}
    </div>
  );
}
