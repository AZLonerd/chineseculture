import { Suspense } from "react";
import Navbar from "@/components/features/navbar";
import VocabPageShell from "../components/VocabPageShell";
import { Fetchmostlikedvocab } from "./fetchmostlikedvocab";
import VocabCard from "../components/VocabCard";

async function MostLikedGrid() {
    const mostlikedvocab = await Fetchmostlikedvocab();

    return (
        <section className="mt-8 space-y-5">
            <div className="space-y-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        Popular Vocabulary
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                        Most liked vocab
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Most liked vocab by users.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {mostlikedvocab?.map((ele: any, index: number) => {
                const id = ele.vocab_number
                const word = ele.word ?? ele.definition ?? "Untitled vocab";

                return <VocabCard key={id} id={String(id)} word={word} />
            })}
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <VocabPageShell>
                <Suspense fallback={<div>Loading most liked vocab...</div>}>
                    <MostLikedGrid />
                </Suspense>
            </VocabPageShell>
        </main>
    );
}
