"use server";

import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function VocabDetails({ params }: Props) {
    const { id } = await params;

    const supabase = await createClient();

    const { data: vocab, error } = await supabase
        .from("vocabularies")
        .select("word, definition")
        .eq("vocab_number", id)
        .single();

    if (error || !vocab) {
        return <div>Vocab not found</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{vocab.word}</h1>
            <p className="mt-2">{vocab.definition}</p>
        </div>
    );
}