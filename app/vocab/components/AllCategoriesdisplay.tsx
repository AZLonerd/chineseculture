"use client"

import Link from "next/link";
export default function AllCategoriesdisplay({ allcategories }: any) {
    console.log("CLIENT DATA:", allcategories);

    return (
        <div className="flex">
            {allcategories?.map((val: any) => (

                <Link href={`vocab/categories/${val.type_number}`} >{val.title}</Link>

            ))}
        </div>
    );
}