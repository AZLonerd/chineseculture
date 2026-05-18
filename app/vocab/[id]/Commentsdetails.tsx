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

        .select("*")
        .eq("vocab_number", vocabnumber);


    if (error) {
        console.log("error occurred")
    }

    console.log(data)

    return (
        <div>
            <Commentsinputbox />
            <Allcommentsdisplay Allcomments={data} />


        </div>
    )
}
