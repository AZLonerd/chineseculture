import { createClient } from "@/lib/supabase/server";
import Vocabcard from "./Vocabcard";

export default async function VocabList() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vocabularies")
        .select();

    console.log(data)

    if (error) {
        console.error("Error fetching vocab:", error);
        return <div>Error loading vocab.</div>;
    }

    return <Vocabcard vocablist={data ?? []} />;
}