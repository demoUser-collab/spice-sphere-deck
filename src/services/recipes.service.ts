import { api, delay } from "./api";
import { RECIPES, COLLECTIONS, CATEGORIES_DATA, CHEFS, REVIEWS, POPULAR_SEARCHES } from "@/data/mock";
import { normalize, scoreTerm } from "@/lib/fuzzy";
import type { Recipe } from "@/types";

export interface RecipeFilters {
  q?: string;
  cuisine?: string;
  category?: string;
  difficulty?: string;
  mealType?: string;
  maxTime?: number;
  maxCalories?: number;
  minRating?: number;
  tags?: string[];
  includeIngredients?: string[];
  excludeIngredients?: string[];
  sort?: string;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  /** Populated when a query returned nothing — "did you mean" style fallbacks. */
  suggestions?: string[];
  recommendations?: T[];
}

/** Placeholder REST endpoints — swap the mock bodies below for these to go live. */
export const RECIPE_ENDPOINTS = {
  list: () => api.get("/recipes"),
  detail: (id: string) => api.get(`/recipes/${id}`),
  search: (params: RecipeFilters) => api.get("/recipes/search", { params }),
  byIngredients: (ingredients: string[]) => api.post("/recipes/by-ingredients", { ingredients }),
  create: (data: Partial<Recipe>) => api.post("/recipes", data),
  update: (id: string, data: Partial<Recipe>) => api.put(`/recipes/${id}`, data),
  remove: (id: string) => api.delete(`/recipes/${id}`),
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Simulated network conditions. Set VITE_MOCK_ERROR_RATE to exercise error UI. */
const ERROR_RATE = Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? 0);

async function request<T>(data: T, ms = 280 + Math.random() * 320): Promise<T> {
  if (ERROR_RATE > 0 && Math.random() < ERROR_RATE) {
    await delay(null, 200);
    throw new ApiError("The kitchen is busy — request failed. Please retry.", 503);
  }
  return delay(data, ms);
}

// ---------- scoring ----------

function relevance(recipe: Recipe, q: string): number {
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return 1;
  let total = 0;
  for (const term of terms) {
    const best = Math.max(
      scoreTerm(term, recipe.title, 3),
      scoreTerm(term, recipe.cuisine, 2),
      scoreTerm(term, recipe.category, 2),
      scoreTerm(term, recipe.mealType, 1.5),
      scoreTerm(term, recipe.difficulty, 1.2),
      ...recipe.tags.map((t) => scoreTerm(term, t, 1.5)),
      ...recipe.ingredients.map((i) => scoreTerm(term, i.name, 2))
    );
    if (best === 0) return 0; // every term must match something
    total += best;
  }
  return total;
}

function applyFilters(list: Recipe[], f: RecipeFilters): Recipe[] {
  let out = list;
  if (f.cuisine) out = out.filter((r) => r.cuisine === f.cuisine);
  if (f.category) out = out.filter((r) => r.category === f.category);
  if (f.difficulty) out = out.filter((r) => r.difficulty === f.difficulty);
  if (f.mealType) out = out.filter((r) => r.mealType === f.mealType);
  if (f.maxTime) out = out.filter((r) => r.totalTime <= f.maxTime!);
  if (f.maxCalories) out = out.filter((r) => r.nutrition.calories <= f.maxCalories!);
  if (f.minRating) out = out.filter((r) => r.rating >= f.minRating!);
  if (f.tags?.length) out = out.filter((r) => f.tags!.every((t) => r.tags.includes(t)));
  if (f.includeIngredients?.length) {
    out = out.filter((r) =>
      f.includeIngredients!.every((ing) =>
        r.ingredients.some((i) => normalize(i.name).includes(normalize(ing)))
      )
    );
  }
  if (f.excludeIngredients?.length) {
    out = out.filter((r) =>
      !f.excludeIngredients!.some((ing) =>
        r.ingredients.some((i) => normalize(i.name).includes(normalize(ing)))
      )
    );
  }
  return out;
}

function sortRecipes(list: Recipe[], sort?: string) {
  const out = [...list];
  switch (sort) {
    case "recent": out.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)); break;
    case "rating": out.sort((a, b) => b.rating - a.rating); break;
    case "quick": out.sort((a, b) => a.totalTime - b.totalTime); break;
    case "calories": out.sort((a, b) => a.nutrition.calories - b.nutrition.calories); break;
    case "relevance": break;
    default: out.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return out;
}

// ---------- public API ----------

export async function listRecipes() {
  return request(RECIPES);
}

export async function getRecipe(id: string) {
  const r = RECIPES.find((r) => r.id === id || r.slug === id);
  return request(r ?? null);
}

/** Flat search (kept for existing callers). */
export async function searchRecipes(filters: RecipeFilters) {
  const res = await searchRecipesPaged({ ...filters, pageSize: filters.pageSize ?? 500 });
  return res.items;
}

export async function searchRecipesPaged(filters: RecipeFilters): Promise<Paginated<Recipe>> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? 12;

  let out = applyFilters(RECIPES, filters);
  const q = filters.q?.trim();

  if (q) {
    out = out
      .map((r) => ({ r, s: relevance(r, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.r);
    if (filters.sort && filters.sort !== "popular") out = sortRecipes(out, filters.sort);
  } else {
    out = sortRecipes(out, filters.sort);
  }

  const total = out.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = out.slice((page - 1) * pageSize, page * pageSize);

  const empty = total === 0;
  return request({
    items,
    total,
    page,
    pageSize,
    totalPages,
    suggestions: empty && q ? suggestFor(q) : undefined,
    recommendations: empty ? sortRecipes(RECIPES, "rating").slice(0, 4) : undefined,
  });
}

/** Autocomplete: titles, cuisines, categories, tags and ingredients. */
export function autocomplete(q: string, limit = 8): string[] {
  const t = normalize(q);
  if (t.length < 2) return [];
  const pool = new Set<string>();
  for (const r of RECIPES) {
    for (const v of [r.title, r.cuisine, r.category, ...r.tags, ...r.ingredients.map((i) => i.name)]) {
      if (scoreTerm(t, v) >= 34) pool.add(v);
      if (pool.size > limit * 6) break;
    }
  }
  return [...pool]
    .sort((a, b) => scoreTerm(t, b) - scoreTerm(t, a) || a.length - b.length)
    .slice(0, limit);
}

function suggestFor(q: string): string[] {
  const alt = autocomplete(q, 4);
  return alt.length ? alt : POPULAR_SEARCHES.slice(0, 4);
}

export function trendingSearches(limit = 6): string[] {
  return RECIPES.filter((r) => r.trending).slice(0, limit).map((r) => r.title);
}

export async function listTrending() { return request(RECIPES.filter((r) => r.trending).slice(0, 8)); }
export async function listSeasonal(season: string) {
  return request(RECIPES.filter((r) => r.tags.includes(season)).slice(0, 8));
}
export async function listByIds(ids: string[]) {
  return request(ids.map((id) => RECIPES.find((r) => r.id === id)).filter(Boolean) as Recipe[]);
}
export async function listCollections() { return request(COLLECTIONS); }
export async function listCategories() { return request(CATEGORIES_DATA); }
export async function listChefs() { return request(CHEFS); }
export async function listReviewsFor(_recipeId: string) { return request(REVIEWS); }
