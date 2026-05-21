"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";



export async function Insertvocablikestodb(vocabid: string | number) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "not_logged_in" };

    const { error } = await supabase.from("vocab_likes").insert({
        vocab_id: vocabid,
        user_id: user.id,
    });

    if (error) {
        console.log("insert error:", error);
        return { error };
    }

    return { success: true };
}