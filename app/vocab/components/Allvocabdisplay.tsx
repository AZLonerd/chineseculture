// app/vocab/Vocabcard.tsx

"use client"

import VocabCard from "./VocabCard";

export default function Allvocabtodisplay({ vocablist }: any) {

    console.log(vocablist)
    return (
        <div className="flex flex-col gap-2">
            {vocablist.map((vocab: any) => (
                <VocabCard key={vocab.id} id={vocab.vocab_number} word={vocab.word} />
            ))}
        </div>
    );
}
