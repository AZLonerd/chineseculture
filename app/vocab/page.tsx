import { Suspense } from "react";
import Navbar from "@/components/features/navbar";
import VocabPageShell from "./components/VocabPageShell";
import CategoriesList from "./lib/fetchallcategories";
import VocabList from "./lib/fetchallvocab";

export default function Page() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <VocabPageShell>
                <Suspense fallback={<div>Loading vocab...</div>}>
                    <CategoriesList />
                    <VocabList />
                </Suspense>
            </VocabPageShell>
        </main>
    );
}
