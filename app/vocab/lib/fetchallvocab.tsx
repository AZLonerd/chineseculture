"use server"
import { createClient } from "@/lib/supabase/server";
import Allvocabtodisplay from "../components/Allvocabdisplay";
export default async function VocabList() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vocabularies")
        .select("*");


    if (error) {
        console.error("Error fetching vocab:", error);
        return <div>Error loading vocab.</div>;
    }


    //pass all vocabs to allvocabstodisplay component;
    return <Allvocabtodisplay vocablist={data ?? []} />;
}