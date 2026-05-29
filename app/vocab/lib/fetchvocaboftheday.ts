"use server";

type VocabOfTheDayRow = {
    vocab_id: string;
};

type VocabOfTheDay = {
    id: string | number;
    vocab_number: string | number;
    word: string;
    definition: string | null;
};

export async function Fetchvocaboftheday(): Promise<VocabOfTheDay[]> {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    if (!baseUrl || !apiKey) {
        return [];
    }

    const headers = {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
    };

    const vocabOfTheDayUrl = new URL(`${baseUrl}/rest/v1/vocab_of_theday`);
    vocabOfTheDayUrl.searchParams.set("select", "vocab_id");
    vocabOfTheDayUrl.searchParams.set("isvocaboftheday", "eq.true");

    try {
        const vocabOfTheDayRes = await fetch(vocabOfTheDayUrl.toString(), {
            headers,
            next: { revalidate: 60 },
        });

        if (!vocabOfTheDayRes.ok) {
            console.log(
                "error fetching vocab of the day rows:",
                vocabOfTheDayRes.status,
                vocabOfTheDayRes.statusText,
            );
            return [];
        }

        const vocabOfTheDayData: VocabOfTheDayRow[] = await vocabOfTheDayRes.json();
        const vocabIds = vocabOfTheDayData
            .map((item) => item.vocab_id)
            .filter(Boolean);

        if (vocabIds.length === 0) {
            return [];
        }

        const vocabUrl = new URL(`${baseUrl}/rest/v1/vocabularies`);
        vocabUrl.searchParams.set("select", "id,vocab_number,word,definition");
        vocabUrl.searchParams.set("id", `in.(${vocabIds.join(",")})`);

        const vocabRes = await fetch(vocabUrl.toString(), {
            headers,
            next: { revalidate: 60 },
        });

        if (!vocabRes.ok) {
            console.log("error fetching vocab details:", vocabRes.status, vocabRes.statusText);
            return [];
        }

        const vocabs: VocabOfTheDay[] = await vocabRes.json();
        const vocabMap = new Map(vocabs.map((vocab) => [String(vocab.id), vocab]));

        return vocabIds
            .map((vocabId) => vocabMap.get(vocabId))
            .filter((vocab): vocab is VocabOfTheDay => Boolean(vocab));
    } catch (error) {
        console.log("fetch failed for vocab of the day:", error);
        return [];
    }
}
