"use server";

type MostLikedVocab = {
    vocab_number: string | number;
    word?: string | null;
    definition?: string | null;
};

export async function Fetchmostlikedvocab(): Promise<MostLikedVocab[]> {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    if (!baseUrl || !apiKey) {
        return [];
    }

    const url = `${baseUrl}/rest/v1/rpc/get_most_liked_vocab`;

    const headers = {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers,
            next: { revalidate: 60 },
            body: JSON.stringify({}),
        });

        if (!res.ok) {
            console.error("Error fetching most liked vocab:", res.status, res.statusText);
            return [];
        }

        const data: MostLikedVocab[] = await res.json();
        return data ?? [];
    } catch (err) {
        console.error("Fetch failed for most liked vocab:", err);
        return [];
    }
}
