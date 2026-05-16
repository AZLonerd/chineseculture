import { Suspense } from "react";
import VocabDetails from "./Vocabdetails";

import { Commentsdetails } from "./Commentsdetails";
export default function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<div>Loading vocab...</div>}>
            <VocabDetails params={params} />
            <Commentsdetails />
        </Suspense>
    );
}