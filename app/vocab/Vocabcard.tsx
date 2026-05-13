// app/vocab/Vocabcard.tsx
import Link from "next/link";

export default function Vocabcard({ vocablist }: any) {
    return (
        <div className="flex flex-col gap-2">
            {vocablist.map((vocab) => (
                <Link
                    key={vocab.id}
                    href={`/vocab/${vocab.id}`} // navigate to /vocab/<id>
                    className="mythic-surface-soft px-3 py-2 hover:bg-accent/20 transition-colors rounded"
                >
                    {vocab.word}
                </Link>
            ))}
        </div>
    );
}