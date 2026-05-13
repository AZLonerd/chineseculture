import { Suspense } from "react";
import VocabList from "./fetchallvocab";

export default function Page() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Vocabulary List</h1>
            <Suspense fallback={<div>Loading vocab...</div>}>
                <VocabList />
            </Suspense>
        </div>
    );
}