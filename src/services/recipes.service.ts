import { api, delay } from "./api";
import { RECIPES, COLLECTIONS, CATEGORIES_DATA, CHEFS, REVIEWS } from "@/data/mock";
import type { Recipe } from "@/types";

export interface RecipeFilters {
  q?: string;
  cuisine?: string;
  category?: string;
  difficulty?: string;
  mealType?: string;
  maxTime?: number;
  maxCalories?: number;
  includeIngredients?: string[];
  excludeIngredients?: string[];
  sort?: string;
}

// Placeholder REST endpoints (not called; here for future integration)
export const RECIPE_ENDPOINTS = {
  list: () => api.get("/recipes"),
  detail: (id: string) => api.get(`/recipes/${id}`),
  search: (params: RecipeFilters) => api.get("/recipes/search", { params }),
  byIngredients: (ingredients: string[]) => api.post("/recipes/by-ingredients", { ingredients }),
  create: (data: Partial<Recipe>) => api.post("/recipes", data),
  update: (id: string, data: Partial<Recipe>) => api.put(`/recipes/${id}`, data),
  remove: (id: string) => api.delete(`/recipes/${id}`),
};

// Mock implementations (used until backend ships)
export async function listRecipes() {
  return delay(RECIPES);
}

export async function getRecipe(id: string) {
  const r = RECIPES.find((r) => r.id === id || r.slug === id);
  return delay(r ?? null);
}

export async function searchRecipes(filters: RecipeFilters) {
  let out = [...RECIPES];
  const q = filters.q?.toLowerCase().trim();
  if (q) out = out.filter((r) =>
    r.title.toLowerCase().includes(q) ||
    r.tags.some((t) => t.toLowerCase().includes(q)) ||
    r.ingredients.some((i) => i.name.toLowerCase().includes(q))
  );
  if (filters.cuisine) out = out.filter((r) => r.cuisine === filters.cuisine);
  if (filters.category) out = out.filter((r) => r.category === filters.category);
  if (filters.difficulty) out = out.filter((r) => r.difficulty === filters.difficulty);
  if (filters.mealType) out = out.filter((r) => r.mealType === filters.mealType);
  if (filters.maxTime) out = out.filter((r) => r.totalTime <= filters.maxTime!);
  if (filters.maxCalories) out = out.filter((r) => r.nutrition.calories <= filters.maxCalories!);
  if (filters.includeIngredients?.length) {
    out = out.filter((r) =>
      filters.includeIngredients!.every((ing) =>
        r.ingredients.some((i) => i.name.toLowerCase().includes(ing.toLowerCase()))
      )
    );
  }
  if (filters.excludeIngredients?.length) {
    out = out.filter((r) =>
      !filters.excludeIngredients!.some((ing) =>
        r.ingredients.some((i) => i.name.toLowerCase().includes(ing.toLowerCase()))
      )
    );
  }
  switch (filters.sort) {
    case "recent": out.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)); break;
    case "rating": out.sort((a, b) => b.rating - a.rating); break;
    case "quick": out.sort((a, b) => a.totalTime - b.totalTime); break;
    default: out.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return delay(out);
}

export async function listCollections() { return delay(COLLECTIONS); }
export async function listCategories() { return delay(CATEGORIES_DATA); }
export async function listChefs() { return delay(CHEFS); }
export async function listReviewsFor(_recipeId: string) { return delay(REVIEWS); }
