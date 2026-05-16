import { Suspense } from "react";
import Navbar from "@/components/features/navbar";
import Categoriesdetails from "./Categoriesdetails";

export default function Page({
    params,
}: {
    params: Promise<{ categories: string }>;
}) {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="px-4 py-6 md:px-6">
                <Suspense fallback={<div>Loading vocab...</div>}>
                    <Categoriesdetails params={params} />
                </Suspense>
            </div>
        </main>
    );
}
