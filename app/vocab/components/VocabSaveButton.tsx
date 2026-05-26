"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Addsavetodb } from "../lib/addsavetodb";

type VocabSaveButtonProps = {
  vocabid: string | number;
  initialSaved?: boolean;
};

export function VocabSaveButton({
  vocabid,
  initialSaved = false,
}: VocabSaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

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
