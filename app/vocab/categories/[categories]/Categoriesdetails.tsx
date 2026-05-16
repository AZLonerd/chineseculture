import { createClient } from "@/lib/supabase/server";
import VocabCard from "../../components/VocabCard";


type Props = {
    params: Promise<{ categories: string }>;
};

export default async function Categoriesdetails({ params }: Props) {
    const { categories } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vocab_type_links")
        .select(`
            vocabularies (
                vocab_number,
                word,
                definition
            )
        `)
        .eq("category_number", categories);



    if (error) {
        return <div>Failed to load category vocab.</div>;
    }

    const vocabs = data
        ?.map((item) => item.vocabularies)
        .filter(Boolean);

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {vocabs?.map((vocab) => (
                <VocabCard
                    key={vocab.vocab_number}
                    id={vocab.vocab_number}
                    word={vocab.word}
                />
            ))}
        </div>
    );
}
