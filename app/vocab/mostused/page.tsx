import { Suspense } from "react"
import { Fetchmostusedfromdb } from "./fetchmostusedfromdb"
import VocabCard from "../components/VocabCard"

async function MostUsedGrid() {
    const mostused = await Fetchmostusedfromdb();

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mostused?.map((ele: any, index: number) => {
                const id = ele.vocab_number ?? ele.id ?? String(index);
                const word = ele.word ?? ele.definition ?? "Untitled vocab";

                return (
                    <VocabCard key={id} id={String(id)} word={word} />
                )
            })}
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading most used vocab...</div>}>
            <MostUsedGrid />
        </Suspense>
    )
}
