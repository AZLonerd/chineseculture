"use server"

import { createClient } from "@/lib/supabase/server"
export async function Fetchmostlikedvocab() {

    const supabase = await createClient();

    const { data, error } = await supabase
        .rpc("get_most_liked_vocab");

    if (error) {
        console.log("error happened")
    }

    console.log(data)

    return data;

}