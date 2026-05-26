"use server";

import { createClient } from "@/lib/supabase/server";

type VocabOfTheDay = {
    id: string | number;
    vocab_number: string | number;
    word: string;
    definition: string | null;
};

export async function Fetchvocaboftheday(): Promise<VocabOfTheDay[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vocab_of_theday")
        .select(`
            vocabularies (
                id,
                vocab_number,
                word,
                definition
            )
        `)
        .eq("isvocaboftheday", true);

    if (error) {
        console.log(error);
        return [];
    }

    return (
        data?.flatMap((item) =>
            Array.isArray(item.vocabularies)
                ? item.vocabularies
                : item.vocabularies
                    ? [item.vocabularies]
                    : [],
        ) ?? []
    );
}
