"use client"
import Link from "next/link"
import { Menu } from "lucide-react"

import { AuthButton } from "@/components/auth-button"
import Searchbar from "../layout/searchbar"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet"

const Navbar = () => {
    return (
        <nav className="w-full border-b mythic-divider bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/25 px-4 py-3">
            <div className="flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-6">

                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="ChinaYaCulture Home"
                        className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-gradient-to-br from-primary/80 via-secondary/40 to-background shadow-sm"
                    >
                        <span className="text-[10px] font-bold tracking-[0.25em] text-primary-foreground">
                            CY
                        </span>
                    </Link>


                    <div className="hidden md:flex items-center gap-6">

                        <Link href="/vocab" className="hover:text-primary">
                            Vocab
                        </Link>


                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="hover:text-primary">
                                    Culture
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link href="/culture/shows">Shows</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/culture/books">Books</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/culture/movies">Movies</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>


                <div className="hidden md:block w-1/3">
                    <Searchbar />
                </div>


                <div className="flex items-center gap-3">

                    <div className="hidden md:block">
                        <AuthButton />
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-72">
                                <div className="flex flex-col gap-4 mt-6">

                                    <Searchbar />

                                    <Link href="/vocab">Vocab</Link>
                                    <Link href="/culture/shows">Shows</Link>
                                    <Link href="/culture/books">Books</Link>
                                    <Link href="/culture/movies">Movies</Link>

                                    <div className="pt-4 border-t">
                                        <AuthButton />
                                    </div>

                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
