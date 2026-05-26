"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import VocabCard from "@/app/vocab/components/VocabCard";
import { Fetchlikedvocabs } from "@/app/vocab/lib/fetchlikedvocabs";
import { LogoutButton } from "@/components/logout-button";

type SavedVocab = {
  id: string | number;
  vocab_number: string | number;
  word: string;
  definition: string | null;
};

type SavedVocabsPanelProps = {
  savedVocabs: SavedVocab[];
};

export default function SavedVocabsPanel({
  savedVocabs,
}: SavedVocabsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [likedVocabs, setLikedVocabs] = useState<SavedVocab[]>([]);
  const [showLikedVocabs, setShowLikedVocabs] = useState(false);
  const [loadingLikedVocabs, setLoadingLikedVocabs] = useState(false);

  const handleLikedVocabsClick = async () => {
    if (showLikedVocabs) {
      setShowLikedVocabs(false);
      return;
    }

    setLoadingLikedVocabs(true);

    try {
      const liked = await Fetchlikedvocabs();
      setLikedVocabs(liked);
      setShowLikedVocabs(true);
    } finally {
      setLoadingLikedVocabs(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Saved Vocab
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              Your saved vocabulary
            </h2>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "Hide saved vocabs" : "Show saved vocabs"}
          </Button>
        </div>

        {isOpen ? (
          savedVocabs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {savedVocabs.map((vocab) => (
                <VocabCard
                  key={vocab.id}
                  id={String(vocab.vocab_number)}
                  word={vocab.word}
                  definition={vocab.definition ?? ""}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You have not saved any vocab yet.
            </p>
          )
        ) : null}
      </section>

      <section className="space-y-4 rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Liked Vocab
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              Vocabulary you liked
            </h2>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={loadingLikedVocabs}
            onClick={handleLikedVocabsClick}
          >
            {loadingLikedVocabs
              ? "Loading liked vocabs..."
              : showLikedVocabs
                ? "Hide liked vocabs"
                : "Show liked vocabs"}
          </Button>
        </div>

        {showLikedVocabs ? (
          likedVocabs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {likedVocabs.map((vocab) => (
                <VocabCard
                  key={vocab.id}
                  id={String(vocab.vocab_number)}
                  word={vocab.word}
                  definition={vocab.definition ?? ""}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You have not liked any vocab yet.
            </p>
          )
        ) : null}
      </section>

      <section className="space-y-3 rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Account
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Sign out
          </h2>
        </div>

        <div>
          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
