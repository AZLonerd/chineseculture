"use server";

import { createClient } from "@/lib/supabase/server";

export async function Addsavetodb(vocabid: string | number) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("no user found");
        return { error: "not_logged_in" };
    }

    const { data: existingSave, error: fetchError } = await supabase
        .from("vocab_save")
        .select("id")
        .eq("user_id", user.id)
        .eq("vocab_id", vocabid)
        .maybeSingle();

    if (fetchError) {
        console.log("save lookup error:", fetchError);
        return { error: fetchError };
    }

    if (existingSave) {
        const { error: deleteError } = await supabase
            .from("vocab_save")
            .delete()
            .eq("user_id", user.id)
            .eq("vocab_id", vocabid);

        if (deleteError) {
            console.log("delete save error:", deleteError);
            return { error: deleteError };
        }

        return { saved: false };
    }

    const { error: insertError } = await supabase.from("vocab_save").insert({
        user_id: user.id,
        vocab_id: vocabid,
    });

    if (insertError) {
        console.log("insert save error:", insertError);
        return { error: insertError };
    }

    return { saved: true };
}
