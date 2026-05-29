import Link from "next/link";

import { Button } from "@/components/ui/button";
import { VocabLikeButton } from "../components/VocabLikeButton";
import { VocabSaveButton } from "../components/VocabSaveButton";

export const revalidate = 60;

type Props = {
    params: Promise<{ id: string }>;
};

export default async function VocabDetails({ params }: Props) {

    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    if (!baseUrl || !apiKey) {
        return <div>Error loading vocab.</div>;
    }

    const headers = {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
    };

    const vocabUrl = new URL(`${baseUrl}/rest/v1/vocabularies`);
    vocabUrl.searchParams.set(
        "select",
        "id, word, definition,example, pinyin, directtranslation,usage_rate, image",
    );
    vocabUrl.searchParams.set("vocab_number", `eq.${id}`);

    const categoryLinksUrl = new URL(`${baseUrl}/rest/v1/vocab_type_links`);
    categoryLinksUrl.searchParams.set(
        "select",
        `
            category_number,
            vocab_types (
                title,
                type_number
            )
        `,
    );
    categoryLinksUrl.searchParams.set("vocab_number", `eq.${id}`);

    try {
        const [vocabRes, categoryLinksRes] = await Promise.all([
            fetch(vocabUrl.toString(), {
                headers,
                next: { revalidate: 60 },
            }),
            fetch(categoryLinksUrl.toString(), {
                headers,
                next: { revalidate: 60 },
            }),
        ]);

        if (!vocabRes.ok) {
            console.error("Error fetching vocab:", vocabRes.status, vocabRes.statusText);
            return <div>Vocab not found</div>;
        }

        if (!categoryLinksRes.ok) {
            console.error(
                "Error fetching vocab categories:",
                categoryLinksRes.status,
                categoryLinksRes.statusText,
            );
        }

        const vocabData = await vocabRes.json();
        const categoryLinks = categoryLinksRes.ok ? await categoryLinksRes.json() : [];
        const vocab = vocabData?.[0];

        if (!vocab) {
            return <div>Vocab not found</div>;
        }

        const categories =
            categoryLinks?.flatMap((item: { vocab_types?: { title: string; type_number: string } | { title: string; type_number: string }[] }) =>
                Array.isArray(item.vocab_types)
                    ? item.vocab_types
                    : item.vocab_types
                        ? [item.vocab_types]
                        : [],
            ) ?? [];

        const usageRate = Math.max(0, Math.min(5, Number(vocab.usage_rate ?? 0)));

        const vocabDetails = [
            {
                label: "Definition",
                value: vocab.definition,
                className: "sm:col-span-2",
            },
            {
                label: "Pinyin",
                value: vocab.pinyin,
            },
            {
                label: "Direct Translation",
                value: vocab.directtranslation,
            },
            {
                label: "Example",
                value: vocab.example,
                className: "sm:col-span-2",
            },
        ].filter((item) => item.value);

        return (
            <section className="mythic-surface mx-auto max-w-[60vw] space-y-4 p-5 mb-4">
                <div>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/vocab">Go back</Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                            Vocabulary Spotlight
                        </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    Usage Rate
                                </p>
                                <div className="flex w-14 gap-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-2 flex-1 rounded-full ${index < usageRate
                                                ? "bg-primary"
                                                : "bg-primary/15"
                                                }`}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                        <VocabSaveButton vocabid={vocab.id} />
                        <VocabLikeButton vocabid={vocab.id} initialLikes={0} />
                    </div>
                </div>

                <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border/60 bg-card/70 p-5 shadow-[0_18px_50px_hsl(var(--foreground)/0.08)]">
                    <div className="flex flex-col gap-4">
                        {categories.length > 0 ? (
                            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
                                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                    Categories
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {categories.map((category: any) => (
                                        <Link
                                            key={category.type_number}
                                            href={`/vocab/categories/${category.type_number}`}
                                            className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary/35 hover:bg-primary/10"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {vocab.image ? (
                            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60">
                                <img
                                    src={vocab.image}
                                    alt={vocab.word}
                                    className="h-auto w-full object-cover"
                                />
                            </div>
                        ) : null}

                        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                Word
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                                {vocab.word}
                            </h2>
                        </div>

                        {vocabDetails.map((detail) => (
                            <div
                                key={detail.label}
                                className="rounded-2xl border border-border/60 bg-background/60 p-4"
                            >
                                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                    {detail.label}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-foreground/90">
                                    {detail.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (err) {
        console.error("Fetch failed for vocab details:", err);
        return <div>Error loading vocab.</div>;
    }
}
