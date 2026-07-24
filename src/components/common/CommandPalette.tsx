import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { RECIPES } from "@/data/mock";
import { POPULAR_SEARCHES } from "@/data/mock";
import { useAppStore } from "@/store";
import { Clock, Sparkles, Utensils } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const recent = useAppStore((s) => s.recentSearches);
  const push = useAppStore((s) => s.pushSearch);

  const go = (q: string) => {
    push(q);
    onOpenChange(false);
    navigate({ to: "/search", search: { q } as never });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search recipes, ingredients, cuisines…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {recent.length > 0 && (
          <CommandGroup heading="Recent">
            {recent.map((r) => (
              <CommandItem key={r} onSelect={() => go(r)}>
                <Clock className="mr-2 h-4 w-4" />
                {r}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading="Popular">
          {POPULAR_SEARCHES.map((p) => (
            <CommandItem key={p} onSelect={() => go(p)}>
              <Sparkles className="mr-2 h-4 w-4" />
              {p}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Recipes">
          {RECIPES.slice(0, 6).map((r) => (
            <CommandItem
              key={r.id}
              onSelect={() => {
                onOpenChange(false);
                navigate({ to: "/recipes/$id", params: { id: r.id } });
              }}
            >
              <Utensils className="mr-2 h-4 w-4" />
              {r.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
