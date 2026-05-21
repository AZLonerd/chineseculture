
"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";


export async function Deletelikestodb(commentid: string | number) {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("../../auth/sign-up")


    }
    await supabase.from("vocab_comment_likes").delete().eq("comment_id", commentid).eq("user_id", user.id)

}