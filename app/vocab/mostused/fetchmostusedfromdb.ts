"use server";

type MostUsedVocab = {
    id?: string | number;
    vocab_number?: string | number;
    word?: string | null;
    definition?: string | null;
    usage_rate?: number | null;
};

export async function Fetchmostusedfromdb(): Promise<MostUsedVocab[]> {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    if (!baseUrl || !apiKey) {
        return [];
    }

    const url = `${baseUrl}/rest/v1/vocabularies?select=*&usage_rate=eq.5`;

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
            console.error("Error fetching most used vocab:", res.status, res.statusText);
            return [];
        }

        const data: MostUsedVocab[] = await res.json();
        return data ?? [];
    } catch (err) {
        console.error("Fetch failed for most used vocab:", err);
        return [];
    }
}
