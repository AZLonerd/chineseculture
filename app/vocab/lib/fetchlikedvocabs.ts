"use server";

import { createClient } from "@/lib/supabase/server";

type LikedVocab = {
  id: string | number;
  vocab_number: string | number;
  word: string;
  definition: string | null;
};

export async function Fetchlikedvocabs(): Promise<LikedVocab[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: likedRows, error: likedRowsError } = await supabase
    .from("vocab_likes")
    .select("vocab_id")
    .eq("user_id", user.id);

  if (likedRowsError) {
    console.log("error fetching liked vocabs:", likedRowsError);
    return [];
  }

  const likedIds =
    likedRows?.map((row) => row.vocab_id).filter((id) => id !== null) ?? [];

  if (likedIds.length === 0) {
    return [];
  }

  const { data: vocabData, error: vocabError } = await supabase
    .from("vocabularies")
    .select("id, vocab_number, word, definition")
    .in("id", likedIds);

  if (vocabError) {
    console.log("error fetching liked vocab details:", vocabError);
    return [];
  }

  return (vocabData ?? []).sort((a, b) =>
    String(a.vocab_number).localeCompare(String(b.vocab_number), undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}
