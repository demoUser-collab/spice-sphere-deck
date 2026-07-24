export const APP_NAME = "Recipe Hub";
export const APP_TAGLINE = "Cook something worth remembering.";

export const CUISINES = [
  "Italian", "Japanese", "Mexican", "Indian", "French",
  "Thai", "Mediterranean", "Chinese", "American", "Middle Eastern",
] as const;

export const CATEGORIES = [
  "Breakfast", "Lunch", "Dinner", "Dessert", "Snacks",
  "Vegetarian", "Vegan", "Gluten-Free", "Healthy", "Quick",
] as const;

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"] as const;

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Recently Added" },
  { value: "rating", label: "Highest Rated" },
  { value: "quick", label: "Quickest" },
] as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Discover" },
  { to: "/ingredient-search", label: "What Can I Cook?" },
  { to: "/categories", label: "Categories" },
  { to: "/collections", label: "Collections" },
] as const;
