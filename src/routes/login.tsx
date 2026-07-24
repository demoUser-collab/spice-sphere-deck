import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Mail, Lock, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockLogin } from "@/services/auth.service";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Recipe Hub" },
      { name: "description", content: "Welcome back. Log in to your Recipe Hub account." },
      { property: "og:title", content: "Log in — Recipe Hub" },
      { property: "og:description", content: "Welcome back to Recipe Hub." },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
type Form = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });
  const onSubmit = form.handleSubmit(async (values) => {
    await mockLogin(values.email, values.password);
    toast.success("Welcome back!");
    navigate({ to: "/" });
  });

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-4xl p-8 sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-warm text-white"><ChefHat className="h-5 w-5" /></span>
          Recipe Hub
        </Link>
        <h1 className="mt-6 font-display text-3xl sm:text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Log in to save recipes and pick up where you left off.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@kitchen.com" className="h-11 pl-9" {...form.register("email")} />
            </div>
            {form.formState.errors.email && <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-brand hover:underline">Forgot?</Link>
            </div>
            <div className="relative mt-1.5">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" className="h-11 pl-9" {...form.register("password")} />
            </div>
            {form.formState.errors.password && <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting} className="h-11 w-full rounded-full">
            {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          New here? <Link to="/register" className="font-medium text-brand hover:underline">Create an account</Link>
        </div>
      </motion.div>

      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-4xl lg:block">
        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <div className="font-display text-3xl">Real recipes.<br />Real cooks.</div>
        </div>
      </div>
    </div>
  );
}
