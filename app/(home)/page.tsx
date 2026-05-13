import { EnvVarWarning } from "@/components/env-var-warning";

import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import Navbar from "@/components/features/navbar";
import Bigcardforintro from "@/components/features/bigcardforintro";
import Sidebar from "@/components/layout/sidebar";
import FourCardsHorizontal from "@/components/layout/cardslayoutbyvocabtype";

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
        <div className="w-[30%]">
          <div className="sticky top-6 h-[calc(100vh-3rem)]">
            <Sidebar />
          </div>
        </div>

        <div className="w-[55%] space-y-6">
          <Bigcardforintro />
          <FourCardsHorizontal />
        </div>
      </div>


    </main>
  );
}
