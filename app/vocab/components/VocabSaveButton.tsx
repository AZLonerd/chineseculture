"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

import { Addsavetodb } from "../lib/addsavetodb";

type VocabSaveButtonProps = {
  vocabid: string | number;
};

export function VocabSaveButton({ vocabid }: VocabSaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const loadSavedState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsSaved(false);
        return;
      }

      const { data: savedVocab } = await supabase
        .from("vocab_save")
        .select("id")
        .eq("user_id", user.id)
        .eq("vocab_id", vocabid)
        .maybeSingle();

      setIsSaved(Boolean(savedVocab));
    };

    void loadSavedState();
  }, [vocabid]);

  const handleSaveToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await Addsavetodb(vocabid);

      if (result?.error || typeof result?.saved !== "boolean") return;

      setIsSaved(result.saved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={loading}
      className={cn(
        "rounded-full border-primary/20 bg-primary/5 px-4 text-foreground hover:bg-primary/10",
        isSaved && "border-accent/30 bg-accent/10",
      )}
      onClick={handleSaveToggle}
    >
      <Bookmark
        className={cn(
          "h-4 w-4 transition-all",
          isSaved ? "fill-accent text-accent" : "text-accent",
        )}
      />

      {isSaved ? "Saved" : "Save"}
    </Button>
  );
}
