"use client";

import type { ReactNode } from "react";

import Sidebar from "@/components/layout/sidebar";

type VocabPageShellProps = {
  children: ReactNode;
};

export default function VocabPageShell({ children }: VocabPageShellProps) {
  return (
    <div className="flex gap-6 px-6 py-6">
      <div className="hidden xl:block xl:w-[20%] xl:flex-none">
        <div className="sticky top-6 h-[calc(100vh-3rem)]">
          <Sidebar />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Vocabulary List</h1>
        </div>

        {children}
      </div>
    </div>
  );
}
