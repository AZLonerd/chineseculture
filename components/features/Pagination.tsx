"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationComponentProps) {

    const generatePages = () => {
        const pages = []

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }

        return pages
    }

    return (
        <Pagination>
            <PaginationContent>

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) {
                                onPageChange(currentPage - 1)
                            }
                        }}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {generatePages().map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                                e.preventDefault()
                                onPageChange(page)
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages) {
                                onPageChange(currentPage + 1)
                            }
                        }}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}
