import { createFileRoute, notFound } from "@tanstack/react-router";
import { getRecipe } from "@/services/recipes.service";
import type { Recipe } from "@/types";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/edit/$id")({
  head: () => ({
    meta: [
      { title: "Edit recipe — Recipe Hub" },
      { name: "description", content: "Update your recipe details." },
      { property: "og:title", content: "Edit recipe — Recipe Hub" },
      { property: "og:description", content: "Update your recipe details." },
    ],
  }),
  loader: async ({ params }): Promise<{ recipe: Recipe }> => {
    const r = await getRecipe(params.id);
    if (!r) throw notFound();
    return { recipe: r };
  },
  component: EditPage,
});

function EditPage() {
  const { recipe } = Route.useLoaderData() as { recipe: Recipe };
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <SectionTitle eyebrow="Edit" title={`Editing: ${recipe.title}`} />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Recipe updated"); }} className="glass rounded-3xl p-6 space-y-4">
        <div>
          <Label>Title</Label>
          <Input defaultValue={recipe.title} className="mt-1.5" />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea defaultValue={recipe.description} className="mt-1.5" rows={3} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div><Label>Prep (min)</Label><Input type="number" defaultValue={recipe.prepTime} className="mt-1.5" /></div>
          <div><Label>Cook (min)</Label><Input type="number" defaultValue={recipe.cookTime} className="mt-1.5" /></div>
          <div><Label>Servings</Label><Input type="number" defaultValue={recipe.servings} className="mt-1.5" /></div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" className="rounded-full">Discard</Button>
          <Button type="submit" className="rounded-full">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
