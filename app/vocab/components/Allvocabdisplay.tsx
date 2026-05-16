// app/vocab/Vocabcard.tsx

"use client"

import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import VocabCard from "./VocabCard";

type VocabItem = {
    id: string | number;
    vocab_number: string;
    word: string;
};

export default function Allvocabtodisplay({
    vocablist,
}: {
    vocablist: VocabItem[];
}) {
    const [query, setQuery] = useState("");

    const filteredVocabs = vocablist.filter((vocab) => {
        const searchTerm = query.trim().toLowerCase();

        if (!searchTerm) {
            return true;
        }

        return (
            vocab.word.toLowerCase().includes(searchTerm) ||
            vocab.vocab_number.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <section className="mt-8 space-y-5">
            <div className="space-y-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        Browse Vocabulary
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                        All vocabs
                    </h2>
                </div>

                <div className="mythic-surface-soft relative rounded-2xl p-2">
                    <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input

                        placeholder="Search by word or vocab number"
                        className="h-12 border-0 bg-transparent pl-11 text-sm shadow-none focus-visible:ring-0"
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredVocabs.map((vocab) => (
                    <VocabCard key={vocab.id} id={vocab.vocab_number} word={vocab.word} />
                ))}
            </div>

        </section>
    );
}
