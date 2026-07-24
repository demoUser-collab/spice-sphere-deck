import type { Recipe, Category, Chef, Collection, AppNotification, Review, User } from "@/types";

const img = (seed: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// Curated Unsplash food photo IDs
const IMGS = [
  "1546069901-ba9599a7e63c", // burger bowl
  "1512621776951-a57141f2eefd", // salad
  "1567620905732-2d1ec7ab7445", // pancakes
  "1565958011703-44f9829ba187", // pasta
  "1476124369491-e7addf5db371", // steak
  "1504674900247-0877df9cc836", // pizza
  "1490645935967-10de6ba17061", // buddha bowl
  "1490474418585-ba9bad8fd0ea", // ramen
  "1519708227418-c8fd9a32b7a2", // avocado toast
  "1540189549336-e6e99c3679fe", // salad2
  "1467003909585-2f8a72700288", // sushi
  "1473093295043-cdd812d0e601", // pasta2
  "1484723091739-30a097e8f929", // pancakes2
  "1482049016688-2d3e1b311543", // tacos
  "1499636136210-6f4ee915583e", // dessert
  "1495474472287-4d71bcdd2085", // coffee cake
];

export const CHEFS: Chef[] = [
  { id: "c1", name: "Amara Okafor", avatar: "https://i.pravatar.cc/200?img=47", bio: "Weeknight dinners, no compromises.", recipeCount: 82, followers: 12400 },
  { id: "c2", name: "Kenji Tanaka", avatar: "https://i.pravatar.cc/200?img=12", bio: "Japanese comfort, reimagined.", recipeCount: 64, followers: 22100 },
  { id: "c3", name: "Sofia Ramos", avatar: "https://i.pravatar.cc/200?img=32", bio: "Mediterranean-forward, plant-heavy.", recipeCount: 121, followers: 34500 },
  { id: "c4", name: "Elliot Chen", avatar: "https://i.pravatar.cc/200?img=68", bio: "Baker & pastry nerd.", recipeCount: 47, followers: 9800 },
  { id: "c5", name: "Priya Nair", avatar: "https://i.pravatar.cc/200?img=25", bio: "Bold South Indian flavors.", recipeCount: 93, followers: 18700 },
  { id: "c6", name: "Luca Bianchi", avatar: "https://i.pravatar.cc/200?img=53", bio: "Fresh pasta every day.", recipeCount: 58, followers: 15300 },
];

export const CATEGORIES_DATA: Category[] = [
  { id: "cat1", name: "Breakfast", image: img(IMGS[2]), recipeCount: 48, color: "warm" },
  { id: "cat2", name: "Pasta", image: img(IMGS[3]), recipeCount: 92, color: "brand" },
  { id: "cat3", name: "Salads", image: img(IMGS[1]), recipeCount: 63, color: "herb" },
  { id: "cat4", name: "Desserts", image: img(IMGS[14]), recipeCount: 71, color: "berry" },
  { id: "cat5", name: "Grill", image: img(IMGS[4]), recipeCount: 38, color: "brand" },
  { id: "cat6", name: "Bowls", image: img(IMGS[6]), recipeCount: 54, color: "herb" },
  { id: "cat7", name: "Pizza", image: img(IMGS[5]), recipeCount: 29, color: "warm" },
  { id: "cat8", name: "Sushi", image: img(IMGS[10]), recipeCount: 22, color: "brand" },
];

const RECIPE_SEEDS: Array<Partial<Recipe> & { title: string; cuisine: string; category: string; mealType: Recipe["mealType"]; difficulty: Recipe["difficulty"]; imgIdx: number; }> = [
  { title: "Silky Cacio e Pepe", cuisine: "Italian", category: "Pasta", mealType: "Dinner", difficulty: "Medium", imgIdx: 3 },
  { title: "Miso Butter Ramen", cuisine: "Japanese", category: "Noodles", mealType: "Lunch", difficulty: "Medium", imgIdx: 7 },
  { title: "Charred Corn Tacos", cuisine: "Mexican", category: "Quick", mealType: "Dinner", difficulty: "Easy", imgIdx: 13 },
  { title: "Buttermilk Pancakes", cuisine: "American", category: "Breakfast", mealType: "Breakfast", difficulty: "Easy", imgIdx: 2 },
  { title: "Green Goddess Bowl", cuisine: "Mediterranean", category: "Bowls", mealType: "Lunch", difficulty: "Easy", imgIdx: 6 },
  { title: "Wood-Fired Margherita", cuisine: "Italian", category: "Pizza", mealType: "Dinner", difficulty: "Medium", imgIdx: 5 },
  { title: "Herb-Crusted Ribeye", cuisine: "French", category: "Grill", mealType: "Dinner", difficulty: "Hard", imgIdx: 4 },
  { title: "Avocado Toast, Elevated", cuisine: "American", category: "Breakfast", mealType: "Breakfast", difficulty: "Easy", imgIdx: 8 },
  { title: "Rainbow Chopped Salad", cuisine: "Mediterranean", category: "Salads", mealType: "Lunch", difficulty: "Easy", imgIdx: 9 },
  { title: "Salmon Nigiri Set", cuisine: "Japanese", category: "Sushi", mealType: "Dinner", difficulty: "Hard", imgIdx: 10 },
  { title: "Cast-Iron Lasagna", cuisine: "Italian", category: "Pasta", mealType: "Dinner", difficulty: "Medium", imgIdx: 11 },
  { title: "Fluffy Blueberry Stack", cuisine: "American", category: "Breakfast", mealType: "Breakfast", difficulty: "Easy", imgIdx: 12 },
  { title: "Dark Chocolate Tart", cuisine: "French", category: "Dessert", mealType: "Dessert", difficulty: "Medium", imgIdx: 14 },
  { title: "Brown Butter Coffee Cake", cuisine: "American", category: "Dessert", mealType: "Dessert", difficulty: "Easy", imgIdx: 15 },
  { title: "Smoky Black Bean Burger", cuisine: "American", category: "Vegetarian", mealType: "Dinner", difficulty: "Easy", imgIdx: 0 },
  { title: "Coconut Dal Tadka", cuisine: "Indian", category: "Vegetarian", mealType: "Dinner", difficulty: "Easy", imgIdx: 6 },
];

function makeIngredients(names: string[]): Recipe["ingredients"] {
  return names.map((n, i) => ({
    id: `i${i}`,
    name: n,
    quantity: [1, 2, 200, 1.5, 3, 100][i % 6],
    unit: ["cup", "tbsp", "g", "tsp", "pcs", "ml"][i % 6],
  }));
}

function makeSteps(count: number): Recipe["steps"] {
  const templates = [
    "Prep and measure everything before you start.",
    "Bring the pan to medium-high and add the fat.",
    "Sauté aromatics until fragrant, about 2 minutes.",
    "Add the main component and season generously.",
    "Reduce heat, cover, and let it develop flavor.",
    "Finish with acid and fresh herbs off the heat.",
    "Plate, garnish, and serve immediately.",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `s${i}`,
    order: i + 1,
    text: templates[i % templates.length],
    durationMin: [5, 10, 3, 12, 8, 4, 2][i % 7],
  }));
}

export const RECIPES: Recipe[] = RECIPE_SEEDS.map((seed, i) => {
  const prep = 10 + (i % 5) * 3;
  const cook = 15 + (i % 6) * 5;
  const image = img(IMGS[seed.imgIdx]);
  return {
    id: `r${i + 1}`,
    slug: seed.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: seed.title,
    description:
      "A crowd-pleaser built around real technique and pantry staples. Balanced, weeknight-friendly, and endlessly adaptable.",
    image,
    gallery: [image, img(IMGS[(seed.imgIdx + 1) % IMGS.length]), img(IMGS[(seed.imgIdx + 3) % IMGS.length])],
    author: CHEFS[i % CHEFS.length],
    rating: 4.2 + ((i * 7) % 8) / 10,
    reviewCount: 40 + ((i * 13) % 400),
    prepTime: prep,
    cookTime: cook,
    totalTime: prep + cook,
    servings: 2 + (i % 5),
    difficulty: seed.difficulty,
    cuisine: seed.cuisine,
    category: seed.category,
    mealType: seed.mealType,
    tags: ["Weeknight", "Comfort", "Crowd-pleaser", "Make-ahead"].slice(0, 2 + (i % 3)),
    ingredients: makeIngredients([
      "Olive oil", "Garlic", "Onion", "Kosher salt", "Black pepper",
      "Fresh herbs", "Lemon", "Butter",
    ]),
    steps: makeSteps(5 + (i % 3)),
    nutrition: {
      calories: 320 + (i * 27) % 400,
      protein: 12 + (i % 20),
      carbs: 30 + (i % 40),
      fat: 8 + (i % 15),
      fiber: 3 + (i % 6),
      sugar: 2 + (i % 10),
    },
    featured: i < 4,
    trending: i % 3 === 0,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});

export const COLLECTIONS: Collection[] = [
  { id: "col1", name: "30-Minute Wonders", description: "Fast, from-scratch dinners.", cover: img(IMGS[3]), recipeIds: RECIPES.slice(0, 6).map(r => r.id) },
  { id: "col2", name: "Cozy Autumn", description: "Warming bowls and slow bakes.", cover: img(IMGS[7]), recipeIds: RECIPES.slice(2, 8).map(r => r.id) },
  { id: "col3", name: "Bright & Fresh", description: "Salads, herbs, and citrus.", cover: img(IMGS[1]), recipeIds: RECIPES.slice(4, 10).map(r => r.id) },
  { id: "col4", name: "Weekend Baking", description: "Projects worth the time.", cover: img(IMGS[14]), recipeIds: RECIPES.slice(6, 12).map(r => r.id) },
];

export const REVIEWS: Review[] = Array.from({ length: 8 }, (_, i) => ({
  id: `rv${i}`,
  user: { name: ["Jamie L.", "Priya S.", "Marco B.", "Anya K.", "Ken T.", "Rosa D.", "Miles W.", "Ellie P."][i], avatar: `https://i.pravatar.cc/100?img=${20 + i}` },
  rating: 4 + ((i * 3) % 2),
  comment: [
    "Made this twice this week. The technique for the sauce is a game-changer.",
    "Weeknight dinner MVP. Kids devoured it.",
    "Perfectly written recipe. Timings were spot-on.",
    "Restaurant-quality result at home. So happy.",
    "Swapped the herbs for what I had and it still sang.",
    "The photos don't lie — mine looked identical.",
    "Best version of this I've cooked. Bookmarking.",
    "Simple ingredients, huge payoff. Loved it.",
  ][i],
  date: new Date(Date.now() - i * 3 * 86400000).toISOString(),
}));

export const NOTIFICATIONS: AppNotification[] = [
  { id: "n1", title: "New follower", body: "Sofia Ramos started following you.", read: false, createdAt: new Date().toISOString(), type: "follow" },
  { id: "n2", title: "Recipe liked", body: "Your Cacio e Pepe got 24 new likes.", read: false, createdAt: new Date(Date.now() - 3600e3).toISOString(), type: "like" },
  { id: "n3", title: "New comment", body: "Marco B. left a review on your ramen.", read: true, createdAt: new Date(Date.now() - 86400e3).toISOString(), type: "comment" },
  { id: "n4", title: "Weekly digest", body: "5 new trending recipes in your feed.", read: true, createdAt: new Date(Date.now() - 3 * 86400e3).toISOString(), type: "system" },
];

export const CURRENT_USER: User = {
  id: "u1",
  name: "Alex Rivera",
  email: "alex@recipehub.dev",
  avatar: "https://i.pravatar.cc/200?img=8",
  bio: "Home cook. Weeknight optimizer. Perpetually out of garlic.",
  joinedAt: "2023-04-11T00:00:00.000Z",
};

export const POPULAR_SEARCHES = ["pasta", "chicken thighs", "chocolate", "sheet pan", "one pot", "meal prep", "vegan", "sourdough"];
export const SUGGESTED_INGREDIENTS = ["Chicken", "Tomato", "Garlic", "Olive oil", "Onion", "Egg", "Rice", "Pasta", "Lemon", "Butter", "Parmesan", "Basil", "Ginger", "Soy sauce", "Chickpeas", "Spinach"];
