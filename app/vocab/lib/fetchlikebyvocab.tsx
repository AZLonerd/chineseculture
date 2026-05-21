"use server";

import { createClient } from "@/lib/supabase/server";

export async function Fetchlikebyvocab(vocabid: string | number) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    // get total likes
    const { data, error } = await supabase
        .from("vocab_likes")
        .select("id")
        .eq("vocab_id", vocabid);

    if (error) {
        console.log("error fetching likes:", error);
        return [false, 0];
    }

    let ifalreadyliked = false;

    if (user) {
        const { data: result, error } = await supabase
            .from("vocab_likes")
            .select("id")
            .eq("user_id", user.id)
            .eq("vocab_id", vocabid)
            .maybeSingle();

        if (result) {
            ifalreadyliked = true;
        }
    }

    const amountoflikes = data?.length ?? 0;

    return [ifalreadyliked, amountoflikes];
}