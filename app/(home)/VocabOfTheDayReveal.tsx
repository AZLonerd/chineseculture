"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import VocabCard from "@/app/vocab/components/VocabCard";
import { Fetchvocaboftheday } from "@/app/vocab/lib/fetchvocaboftheday";

type VocabOfTheDayItem = {
  id: string | number;
  vocab_number: string | number;
  word: string;
  definition: string | null;
};

export default function VocabOfTheDayReveal() {
  const [vocab, setVocab] = useState<VocabOfTheDayItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReveal = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setLoading(true);

    try {
      const data = await Fetchvocaboftheday();
      setVocab(data?.[0] ?? null);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mythic-surface-soft space-y-4 rounded-3xl p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
          <CalendarDays size={22} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Daily Pick
          </p>
          <h2 className="text-lg font-semibold leading-tight text-foreground">
            Vocab of the day
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Reveal today&apos;s featured word and learn it in context.
          </p>
        </div>

        <Button type="button" variant="outline" disabled={loading} onClick={handleReveal}>
          {loading ? "Loading..." : isOpen ? "Hide" : "Reveal"}
        </Button>
      </div>

      {isOpen ? (
        vocab ? (
          <VocabCard
            id={String(vocab.vocab_number)}
            word={vocab.word}
            definition={vocab.definition ?? ""}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            No vocab of the day is available right now.
          </p>
        )
      ) : null}
    </section>
  );
}
