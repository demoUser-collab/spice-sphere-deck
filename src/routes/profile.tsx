import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store";
import { RECIPES } from "@/data/mock";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/utils/format";
import { Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Recipe Hub" },
      { name: "description", content: "Your saved recipes, cooking history, and preferences." },
      { property: "og:title", content: "Your profile — Recipe Hub" },
      { property: "og:description", content: "Your saved recipes, cooking history, and preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const favorites = useAppStore((s) => s.favorites);
  const likes = useAppStore((s) => s.likes);
  const viewed = useAppStore((s) => s.recentlyViewed);

  const favList = RECIPES.filter((r) => favorites.includes(r.id));
  const likedList = RECIPES.filter((r) => likes.includes(r.id));
  const viewedList = viewed.map((id) => RECIPES.find((r) => r.id === id)).filter(Boolean) as typeof RECIPES;

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="glass-strong rounded-4xl p-6 sm:p-10">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <img src={user.avatar} alt="" className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-background sm:h-28 sm:w-28" />
          <div className="min-w-0">
            <h1 className="font-display text-3xl truncate sm:text-4xl">{user.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.bio}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span><b className="text-foreground">{formatNumber(favorites.length)}</b> saved</span>
              <span><b className="text-foreground">{formatNumber(likes.length)}</b> liked</span>
              <span><b className="text-foreground">4</b> recipes</span>
            </div>
          </div>
          <Link to="/settings">
            <Button variant="outline" className="rounded-full"><Settings className="mr-2 h-4 w-4" />Settings</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="saved" className="mt-8">
        <TabsList className="rounded-full">
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
          <TabsTrigger value="viewed">Recently viewed</TabsTrigger>
          <TabsTrigger value="history">Cooking history</TabsTrigger>
        </TabsList>
        <TabsContent value="saved" className="mt-6"><RecipeGrid recipes={favList} emptyLabel="No saved recipes yet." /></TabsContent>
        <TabsContent value="liked" className="mt-6"><RecipeGrid recipes={likedList} emptyLabel="No liked recipes yet." /></TabsContent>
        <TabsContent value="viewed" className="mt-6"><RecipeGrid recipes={viewedList} emptyLabel="Recipes you view will appear here." /></TabsContent>
        <TabsContent value="history" className="mt-6"><RecipeGrid recipes={RECIPES.slice(0, 4)} emptyLabel="Cook a recipe to build your history." /></TabsContent>
      </Tabs>
    </div>
  );
}
