
"use server"

import { createClient } from "@/lib/supabase/server"
export async function Fetchmosttrendingvocab() {

    const supabase = await createClient();

    const { data, error } = await supabase.from("vocabularies").select("*").eq("istrending", true);

    return data;

}