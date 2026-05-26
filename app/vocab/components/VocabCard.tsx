"use client";
import Link from "next/link";

type VocabCardProps = {
    id: string;
    word: string;
    definition?: string;
};

export default function VocabCard({ id, word, definition }: VocabCardProps) {
    return (
        <Link
            href={`/vocab/${id}`}
            className="block min-h-[120px] max-w-[360px] rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
            <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        Vocab
                    </p>
                    <h3 className="text-lg font-semibold leading-tight text-foreground">{word}</h3>
                </div>
                {definition ? (
                    <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">
                        {definition}
                    </p>
                ) : null}
            </div>
        </Link>
    );
}
