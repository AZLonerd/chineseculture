"use server";

type MostTrendingVocab = {
    id?: string | number;
    vocab_number?: string | number;
    word?: string | null;
    definition?: string | null;
    istrending?: boolean | null;
};

export async function Fetchmosttrendingvocab(): Promise<MostTrendingVocab[]> {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    if (!baseUrl || !apiKey) {
        return [];
    }

    const url = `${baseUrl}/rest/v1/vocabularies?select=*&istrending=eq.true`;

    const headers = {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
    };

    try {
        const res = await fetch(url, {
            headers,
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Error fetching trending vocab:", res.status, res.statusText);
            return [];
        }

        const data: MostTrendingVocab[] = await res.json();
        return data ?? [];
    } catch (err) {
        console.error("Fetch failed for trending vocab:", err);
        return [];
    }
}
