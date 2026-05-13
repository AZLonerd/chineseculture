import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default async function ProtectedPage() {
  const claimsJson = await UserDetails();
  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <section className="mythic-surface w-full max-w-3xl p-6">
        <h1 className="text-xl font-semibold tracking-tight">Your session</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Claims returned from Supabase for the current user.
        </p>
        <pre className="mt-4 max-h-[60vh] overflow-auto rounded-lg border border-border/60 bg-background/40 p-4 text-xs text-muted-foreground">
          {claimsJson}
        </pre>
      </section>
    </div>
  );
}
