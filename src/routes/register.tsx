import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — Recipe Hub" },
      { name: "description", content: "Join Recipe Hub. Save recipes, follow chefs, and cook better." },
      { property: "og:title", content: "Create your account — Recipe Hub" },
      { property: "og:description", content: "Save recipes, follow chefs, and cook better." },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
type Form = z.infer<typeof schema>;

function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", password: "" } });
  const onSubmit = form.handleSubmit(async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Account created!");
    navigate({ to: "/" });
  });

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-4xl p-8 sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-warm text-white"><ChefHat className="h-5 w-5" /></span>
          Recipe Hub
        </Link>
        <h1 className="mt-6 font-display text-3xl">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">It takes less than a minute. No spam, ever.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" className="mt-1.5 h-11" placeholder="Alex Rivera" {...form.register("name")} />
            {form.formState.errors.name && <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1.5 h-11" placeholder="you@kitchen.com" {...form.register("email")} />
            {form.formState.errors.email && <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="mt-1.5 h-11" placeholder="••••••••" {...form.register("password")} />
            {form.formState.errors.password && <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting} className="h-11 w-full rounded-full">
            {form.formState.isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-brand hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
}
