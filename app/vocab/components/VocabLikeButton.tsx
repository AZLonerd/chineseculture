"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Insertvocablikestodb } from "../lib/insertvocabliketodb";
import { Fetchlikebyvocab } from "../lib/fetchlikebyvocab";
import { Deletevocablikestodb } from "../lib/deletevocablikestodb";

type VocabLikeButtonProps = {
  vocabid: string;
  initialLikes?: number;
};

export function VocabLikeButton({
  vocabid,
  initialLikes = 0,
}: VocabLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // LOAD STATE
  useEffect(() => {
    async function pulldata() {
      const [ifalreadyliked, amountoflikes] =
        await Fetchlikebyvocab(vocabid);

      setLikes(Number(amountoflikes));
      setIsLiked(Boolean(ifalreadyliked));
    }

    pulldata();
  }, [vocabid]);

  // TOGGLE LIKE
  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    const nextLiked = !isLiked;

    try {
      if (nextLiked) {
        const res = await Insertvocablikestodb(vocabid);
        if (res?.error) return;
      } else {
        const res = await Deletevocablikestodb(vocabid);
        if (res?.error) return;
      }

      // update UI ONLY after success
      setIsLiked(nextLiked);
      setLikes((l) =>
        nextLiked ? l + 1 : Math.max(l - 1, 0)
      );
    } catch (err) {
      console.log("toggle error:", err);
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
        isLiked && "border-secondary/30 bg-secondary/10"
      )}
      onClick={handleLikeToggle}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all",
          isLiked
            ? "fill-secondary text-secondary"
            : "text-secondary"
        )}
      />

      {isLiked ? "Liked" : "Like"}

      <span className="text-xs text-muted-foreground ml-1">
        {likes}
      </span>
    </Button>
  );
}