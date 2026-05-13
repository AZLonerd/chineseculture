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
            className="border rounded p-4 shadow hover:shadow-lg transition"
        >
            {word}
        </Link>
    );
}