import { Suspense } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import SavedVocabsPanel from "./SavedVocabsPanel";

type SavedVocab = {
  id: string | number;
  vocab_number: string;
  word: string;
  definition: string | null;
};

async function DashboardSavedVocabs() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: savedRows, error: savedRowsError } = await supabase
    .from("vocab_save")
    .select("vocab_id")
    .eq("user_id", user.id);

  if (savedRowsError) {
    console.log("error fetching saved vocabs:", savedRowsError);
  }

  const savedIds =
    savedRows?.map((row) => row.vocab_id).filter((id) => id !== null) ?? [];

  let savedVocabs: SavedVocab[] = [];

  if (savedIds.length > 0) {
    const { data: vocabData, error: vocabError } = await supabase
      .from("vocabularies")
      .select("id, vocab_number, word, definition")
      .in("id", savedIds);

    if (vocabError) {
      console.log("error fetching saved vocab details:", vocabError);
    } else {
      savedVocabs = (vocabData ?? []).sort((a, b) =>
        String(a.vocab_number).localeCompare(String(b.vocab_number), undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      );
    }
  }

  return <SavedVocabsPanel savedVocabs={savedVocabs} />;
}

function SavedVocabsFallback() {
  return (
    <section className="space-y-4 rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Saved Vocab
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
          Your saved vocabulary
        </h2>
      </div>

      <p className="text-sm text-muted-foreground">Loading saved vocabs...</p>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <div className="mythic-surface w-full max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your saved vocabulary is available here when you are signed in.
        </p>
      </div>

      <Suspense fallback={<SavedVocabsFallback />}>
        <DashboardSavedVocabs />
      </Suspense>
    </div>
  );
}
