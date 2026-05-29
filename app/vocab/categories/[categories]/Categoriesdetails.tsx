
"use server"
import { createClient } from "@/lib/supabase/server";
import VocabCard from "../../components/VocabCard";

type Vocab = {
    vocab_number: string | number;
    word: string;
    definition: string;
};

type Props = {
    params: Promise<{ categories: string }>;
};

export default async function Categoriesdetails({ params }: Props) {


    const { categories } = await params;
    const supabase = await createClient();
    const { data: categoryData, error: categoryError } = await supabase
        .from("vocab_types")
        .select("title, description")
        .eq("type_number", categories)
        .maybeSingle();

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



    if (error || categoryError) {
        return <div>Failed to load category vocab.</div>;
    }

    const vocabs: Vocab[] =
        data?.flatMap((item) =>
            Array.isArray(item.vocabularies)
                ? item.vocabularies
                : item.vocabularies
                    ? [item.vocabularies]
                    : [],
        ) ?? [];

    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Category
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                    {categoryData?.title ?? "Category"}
                </h1>
            </div>

            <div className="mythic-surface-soft rounded-2xl p-5 text-sm leading-7 text-muted-foreground">
                {categoryData?.description ?? "No description available for this category yet."}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {vocabs.map((vocab) => (
                    <VocabCard
                        key={vocab.vocab_number}
                        id={String(vocab.vocab_number)}
                        word={vocab.word}
                    />
                ))}
            </div>
        </div>
    );
}
