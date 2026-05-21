// app/vocab/Vocabcard.tsx

"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VocabCard from "./VocabCard";

type VocabItem = {
    id: string | number;
    vocab_number: string;
    word: string;
};


const cjkPattern =
    /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2ebef}\u{30000}-\u{323af}\ufa0e\ufa0f\ufa11\ufa13\ufa14\ufa1f\ufa21\ufa23\ufa24\ufa27\ufa28\ufa29\u3006\u3007][\ufe00-\ufe0f\u{e0100}-\u{e01ef}]?/gmu;


function extractCJK(text: string) {
    return text.match(cjkPattern) ?? [];
}
export default function Allvocabtodisplay({
    vocablist,
}: {
    vocablist: VocabItem[];
}) {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredVocabs = vocablist.filter((vocab) => {
        const searchTerm = query.trim().toLowerCase();

        if (!searchTerm) return true;

        const word = vocab.word.toLowerCase();
        const vocabNumber = vocab.vocab_number.toLowerCase();

        const normalMatch = word.includes(searchTerm) || vocabNumber.includes(searchTerm);

        const cjkMatchesWord = extractCJK(vocab.word).some((char) =>
            char.includes(query)
        );

        return normalMatch || cjkMatchesWord;
    });

    const totalPages = Math.max(1, Math.ceil(filteredVocabs.length / itemsPerPage));
    const paginatedVocabs = filteredVocabs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

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
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paginatedVocabs.map((vocab) => (
                    <VocabCard key={vocab.id} id={vocab.vocab_number} word={vocab.word} />
                ))}
            </div>

            {filteredVocabs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No vocabulary matched your search.
                </p>
            ) : (
                <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, filteredVocabs.length)} of{" "}
                        {filteredVocabs.length} vocabs
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>

                        <span className="min-w-20 text-center text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

        </section>
    );
}
