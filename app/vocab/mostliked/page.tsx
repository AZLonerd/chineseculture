import { Suspense } from "react"
import { Fetchmostlikedvocab } from './fetchmostlikedvocab'
import VocabCard from '../components/VocabCard'

async function MostLikedGrid() {
    const mostlikedvocab = await Fetchmostlikedvocab();

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mostlikedvocab?.map((ele: any, index: number) => {
                const id = ele.vocab_number
                const word = ele.word ?? ele.definition ?? "Untitled vocab";

                return <VocabCard key={id} id={String(id)} word={word} />
            })}
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading most liked vocab...</div>}>
            <MostLikedGrid />
        </Suspense>
    )
}
