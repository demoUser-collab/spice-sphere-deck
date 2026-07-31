export type Difficulty = "Easy" | "Medium" | "Hard";
export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

export interface Step {
  id: string;
  order: number;
  text: string;
  durationMin?: number;
  /** Why this step matters — shown in the expandable coaching panel. */
  why?: string;
  /** Visual / aroma cue that tells you the step is done. */
  cue?: string;
  /** Common beginner mistake at this step. */
  mistake?: string;
  /** Tip to avoid that mistake, or an optional variation. */
  tip?: string;
}

export interface Substitution {
  from: string;
  to: string;
}


export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  recipeCount: number;
  followers: number;
}

export interface Review {
  id: string;
  user: { name: string; avatar: string };
  rating: number;
  comment: string;
  date: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  author: Chef;
  rating: number;
  reviewCount: number;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: Difficulty;
  cuisine: string;
  category: string;
  mealType: MealType;
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
  nutrition: Nutrition;
  featured?: boolean;
  trending?: boolean;
  createdAt: string;
  /** Beginner-coaching content (mock-generated, backend-replaceable). */
  tips?: string[];
  chefNotes?: string;
  substitutions?: Substitution[];
  storage?: string;
  reheating?: string;
  serving?: string;
  pairings?: string[];
  allergens?: string[];
  equipment?: string[];

}

export interface Category {
  id: string;
  name: string;
  image: string;
  recipeCount: number;
  color: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  cover: string;
  recipeIds: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type: "like" | "comment" | "follow" | "system";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedAt: string;
}
