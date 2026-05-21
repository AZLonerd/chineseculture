"use server";

import { createClient } from "@/lib/supabase/server";
import { VocabLikeButton } from "../components/VocabLikeButton";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function VocabDetails({ params }: Props) {
    const { id } = await params;

    const supabase = await createClient();

    const { data: vocab, error } = await supabase
        .from("vocabularies")
        .select("id, word, definition")
        .eq("vocab_number", id)
        .single();

    if (error || !vocab) {
        return <div>Vocab not found</div>;
    }


    return (
        <section className="mythic-surface space-y-4 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        Vocabulary Spotlight
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        {vocab.word}
                    </h1>
                </div>

                <VocabLikeButton vocabid={vocab.id} initialLikes={0} />
            </div>

            <p className="text-sm leading-7 text-foreground/90">{vocab.definition}</p>
        </section>
    );
}
