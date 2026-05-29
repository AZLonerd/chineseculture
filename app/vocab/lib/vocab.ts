// lib/vocab.ts
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export const getVocabById = unstable_cache(
    async (id: any) => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("vocabularies")
            .select("id, word, definition, example, pinyin, directtranslation, usage_rate, image")
            .eq("vocab_number", id)
            .single();

        if (error) throw error;
        return data;
    },
    ["vocab-by-id"],
    {
        revalidate: 60,
    }
);