

import Allvocabtodisplay from "../components/Allvocabdisplay";

export const revalidate = 60;

export default async function VocabList() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vocabularies?select=*`;

    const headers = {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}`,
    };

    try {
        const res = await fetch(url, {
            headers,
            // Next.js fetch cache control: revalidate after 60 seconds
            next: { revalidate: 60 },

        });

        if (!res.ok) {
            console.error("Error fetching vocab types:", res.status);
        }


        const data = await res.json();

        return <Allvocabtodisplay vocablist={data ?? []} />;
    } catch (err) {
        console.error("Fetch failed for vocab types:", err);
        return <div>Error loading vocab.</div>;
    }
}