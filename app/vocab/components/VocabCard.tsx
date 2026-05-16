"use client";
import Link from "next/link";

type VocabCardProps = {
    id: string;
    word: string;
};

export default function VocabCard({ id, word }: VocabCardProps) {
    return (
        <Link
            href={`/vocab/${id}`}
            className="block w-full border rounded p-4 shadow transition hover:shadow-lg"
        >
            {word}
        </Link>
    );
}
