"use client";
import { useState } from "react";

type PaginationProps = {
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ total, pageSize, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(total / pageSize);
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="flex gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 rounded-md border border-border/60 text-sm transition-colors ${
                        page === currentPage
                            ? "bg-primary text-primary-foreground border-primary/40"
                            : "bg-secondary/10 text-foreground hover:bg-secondary/15"
                    }`}
                    onClick={() => handleClick(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}
