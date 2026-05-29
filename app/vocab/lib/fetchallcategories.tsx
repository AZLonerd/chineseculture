
import AllCategoriesdisplay from "../components/AllCategoriesdisplay";

export const revalidate = 60;

export default async function CategoriesList() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vocab_types?select=*`;

    const headers = {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""}`,
    };

    try {
        const res = await fetch(url, {
            headers,
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Error fetching vocab types:", res.status, res.statusText);
            return <div>Error occurred</div>;
        }

        const data = await res.json();
        return <AllCategoriesdisplay allcategories={data ?? []} />;
    } catch (err) {
        console.error("Fetch failed for vocab types:", err);
        return <div>Error occurred</div>;
    }
}
