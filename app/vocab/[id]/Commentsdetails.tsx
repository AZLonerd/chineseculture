"use server"

import Commentsinputbox from "@/components/Comments/Commentsinputbox"
import { createClient } from "@/lib/supabase/server";
import { Allcommentsdisplay } from "../components/Allcommentsdisplay";


//this file fetches everything about the comments in the db
type Props = {
    params: Promise<{ id: string }>;
};


export async function Commentsdetails({ params }: Props) {

    const { id } = await params;
    const vocabnumber = Number(id)

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vocab_comments")
        .select(`
        *,
        vocab_comment_likes(
            comment_id,
            user_id
        )
    `)
        .eq("vocab_number", vocabnumber);

    const { data: { user } } = await supabase.auth.getUser();

    console.log(data)

    if (error) {
        console.log("error occurred")
    }


    const filtereddata = data?.map((ele) => {
        const { vocab_comment_likes, user_id, ...rest } = ele;

        const ifliked = vocab_comment_likes.some(
            (like: any) => like.user_id === user?.id
        );

        return {
            ...rest,
            amountoflikes: vocab_comment_likes.length,
            ifliked
        };
    });

    console.log(filtereddata)

    return (
        <div>
            <Commentsinputbox />
            <Allcommentsdisplay Allcomments={filtereddata ?? []} />


        </div>
    )
}
