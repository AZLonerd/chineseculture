"use server"

import { createClient } from "@/lib/supabase/server"
export async function Fetchmostusedfromdb() {


    const supabase = await createClient();

    const { data, error } = await supabase.from
        ("vocabularies").select("*")
        .eq("usage_rate", 5);


    if (error) {
        console.log(error)
    }
    console.log(data)
    return data;




}