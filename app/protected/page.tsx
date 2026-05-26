import { Suspense } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

async function ProtectedPageRedirect() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  redirect("/protected/dashboard");

  return null;
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Checking your session...</div>}>
      <ProtectedPageRedirect />
    </Suspense>
  );
}
