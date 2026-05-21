"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";


export async function Deletevocablikestodb(vocabid: string | number) {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "not_logged_in" };

    const { error } = await supabase
        .from("vocab_likes")
        .delete()
        .eq("vocab_id", vocabid)
        .eq("user_id", user.id);

    if (error) {
        console.log("delete error:", error);
        return { error };
    }

    return { success: true };
}