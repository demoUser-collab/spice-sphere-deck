import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { UploadCloud, X, Plus, GripVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CUISINES, CATEGORIES, DIFFICULTIES, MEAL_TYPES } from "@/constants";
import { toast } from "sonner";
import { SectionTitle } from "@/components/common/SectionTitle";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload a recipe — Recipe Hub" },
      { name: "description", content: "Share your recipe with the community." },
      { property: "og:title", content: "Upload a recipe — Recipe Hub" },
      { property: "og:description", content: "Share your recipe with the community." },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [ingredients, setIngredients] = useState([{ q: "", u: "cup", n: "" }]);
  const [steps, setSteps] = useState([""]);
  const [preview, setPreview] = useState(false);

  const onFile = (f: File) => {
    const url = URL.createObjectURL(f);
    setImage(url);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="Share your cooking" title="Upload a recipe" />
        <Button variant="outline" onClick={() => setPreview((v) => !v)} className="rounded-full">
          <Eye className="mr-2 h-4 w-4" /> {preview ? "Edit" : "Preview"}
        </Button>
      </div>

      <motion.div layout className="mt-4 space-y-6">
        {/* Image */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
          className={`relative overflow-hidden rounded-4xl border-2 border-dashed p-2 transition ${drag ? "border-brand bg-brand/5" : "border-border bg-card/40"}`}
        >
          {image ? (
            <div className="relative aspect-video overflow-hidden rounded-3xl">
              <img src={image} alt="" className="h-full w-full object-cover" />
              <button onClick={() => setImage(null)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white"><X className="h-4 w-4" /></button>
            </div>
          ) : (
            <label className="grid aspect-video cursor-pointer place-items-center rounded-3xl bg-muted/50 text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand"><UploadCloud className="h-6 w-6" /></div>
                <div className="mt-3 font-medium">Drag & drop a photo</div>
                <div className="text-xs text-muted-foreground">or click to browse — JPEG/PNG up to 8MB</div>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && onFile(e.target.files[0])} />
            </label>
          )}
        </div>

        {/* Basics */}
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display text-xl">The basics</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Recipe title"><Input placeholder="e.g. Miso Butter Ramen" /></Field>
            <Field label="Short description"><Input placeholder="A sentence about this dish" /></Field>
            <Field label="Cuisine">
              <Select><SelectTrigger className="rounded-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                <SelectContent>{CUISINES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Category">
              <Select><SelectTrigger className="rounded-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Difficulty">
              <Select><SelectTrigger className="rounded-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                <SelectContent>{DIFFICULTIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Meal type">
              <Select><SelectTrigger className="rounded-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                <SelectContent>{MEAL_TYPES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Prep (min)"><Input type="number" placeholder="15" /></Field>
            <Field label="Cook (min)"><Input type="number" placeholder="25" /></Field>
            <Field label="Servings"><Input type="number" placeholder="4" /></Field>
          </div>
        </div>

        {/* Ingredients */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Ingredients</h3>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => setIngredients([...ingredients, { q: "", u: "cup", n: "" }])}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            {ingredients.map((_, i) => (
              <div key={i} className="grid grid-cols-[auto_80px_100px_1fr_auto] items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="2" />
                <Input placeholder="cup" />
                <Input placeholder="all-purpose flour" />
                <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setIngredients(ingredients.filter((_, j) => j !== i))} aria-label="Remove"><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Steps</h3>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => setSteps([...steps, ""])}>
              <Plus className="mr-1 h-4 w-4" /> Add step
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {steps.map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-warm text-white">{i + 1}</div>
                <Textarea placeholder="Describe this step in one or two sentences" rows={2} />
                <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setSteps(steps.filter((_, j) => j !== i))} aria-label="Remove"><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition */}
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display text-xl">Nutrition <span className="text-sm font-normal text-muted-foreground">— optional</span></h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {["calories", "protein", "carbs", "fat", "fiber", "sugar"].map((k) => (
              <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}><Input type="number" placeholder="0" /></Field>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="rounded-full">Save draft</Button>
          <Button className="rounded-full" onClick={() => toast.success("Recipe published!")}>Publish</Button>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
