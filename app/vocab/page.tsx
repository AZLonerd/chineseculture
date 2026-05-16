import { Suspense } from "react";
import Navbar from "@/components/features/navbar";
import CategoriesList from "./lib/fetchallcategories";
import VocabList from "./lib/fetchallvocab";

export default function Page() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="px-4 py-6 md:px-6">
                <h1 className="mb-4 text-2xl font-bold">Vocabulary List</h1>

                <Suspense fallback={<div>Loading vocab...</div>}>
                    <CategoriesList />
                    <VocabList />
                </Suspense>
            </div>
        </main>
    );
}
