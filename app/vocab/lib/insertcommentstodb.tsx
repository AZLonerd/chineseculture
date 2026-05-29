"use server"

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function Insertcommentstodb(
    vocabNumber: number,
    commentcontent: string,
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("../../auth/sign-up")
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if (profileError) {
        throw profileError;
    }

    const datatoinsert = {
        user_id: user.id,
        username: profile.username,
        content: commentcontent,
        vocab_number: vocabNumber,
        parent_comment: null,
    }

    const { data, error } = await supabase
        .from("vocab_comments")
        .insert(datatoinsert)
        .select()


    if (error) {
        if (error.message?.includes("up to 5 comments per vocab")) {
            throw new Error("You’ve reached the 5-comment limit for this vocab.");
        }

        throw error
    }

    return data
}
