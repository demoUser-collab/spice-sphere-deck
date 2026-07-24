import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — Recipe Hub" },
      { name: "description", content: "Reset your Recipe Hub password." },
      { property: "og:title", content: "Forgot password — Recipe Hub" },
      { property: "og:description", content: "Reset your Recipe Hub password." },
    ],
  }),
  component: ForgotPage,
});

const schema = z.object({ email: z.string().email("Enter a valid email") });

function ForgotPage() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "" } });
  const onSubmit = form.handleSubmit(async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("If that email exists, we've sent a reset link.");
  });
  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <div className="glass-strong rounded-4xl p-8 sm:p-10">
        <h1 className="font-display text-3xl">Forgot your password?</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1.5 h-11" {...form.register("email")} />
            {form.formState.errors.email && <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <Button type="submit" className="h-11 w-full rounded-full">Send reset link</Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-brand hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
