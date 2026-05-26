import { EnvVarWarning } from "@/components/env-var-warning";

import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import Navbar from "@/components/features/navbar";
import Bigcardforintro from "@/components/features/bigcardforintro";
import Sidebar from "@/components/layout/sidebar";
import FourCardsHorizontal from "@/components/layout/cardslayoutbyvocabtype";
import VocabOfTheDayReveal from "./VocabOfTheDayReveal";


import { Analytics } from '@vercel/analytics/next';

function VocabCategoryCardsFallback() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="mythic-surface-soft rounded-2xl px-4 py-4"
        >
          <div className="flex animate-pulse items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-9 w-9 rounded-xl border border-primary/15 bg-primary/10" />
              <div className="h-4 w-28 rounded-full bg-foreground/10" />
              <div className="h-3 w-24 rounded-full bg-foreground/10" />
            </div>
            <div className="mt-1 h-4 w-4 rounded-full bg-primary/10" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default function Home() {


  return (
    <main className="min-h-screen">

      <div className="flex">
        {!hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense>
            <Navbar />
          </Suspense>
        )}
      </div>
      <div className="flex gap-6 px-6 py-6">
        <div className="w-[20%]">
          <div className="sticky top-6 h-[calc(100vh-3rem)]">
            <Sidebar />
          </div>
        </div>

        <div className="w-[55%] space-y-6">
          <Bigcardforintro />
          <Suspense fallback={<VocabCategoryCardsFallback />}>
            <FourCardsHorizontal />
          </Suspense>
        </div>

        <div className="w-[20%]">
          <div className="sticky top-6">
            <VocabOfTheDayReveal />
          </div>
        </div>
      </div>


      <Analytics />

    </main>


  );
}
