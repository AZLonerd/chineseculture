"use server"
import { createClient } from "@/lib/supabase/server";
import AllCategoriesdisplay from "../components/AllCategoriesdisplay";

export default async function CategoriesList() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vocab_types")
        .select("*");

    console.log("DATA:", data, "ERROR:", error);

    if (error) {
        return <div>Error occurred</div>;
    }

    return <AllCategoriesdisplay allcategories={data ?? []} />;
}
