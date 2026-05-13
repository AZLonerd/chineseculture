// app/vocab/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";



export default async function VocabById({ params }: any) {
    const supabase = await createClient();
    const { data: vocab, error } = await supabase
        .from("vocabularies")
        .select("id, word, meaning")
        .eq("id", params.id)
        .single();

    if (error || !vocab) return <div>Vocab not found</div>;

}
