"use client"

import { Categorycard } from "./Categorycard";
type Category = {
    title: string;
    type_number: string | number;
};

export default function AllCategoriesdisplay({
    allcategories,
}: {
    allcategories: Category[];
}) {
    console.log("CLIENT DATA:", allcategories);

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {allcategories?.map((val) => (
                <Categorycard key={val.type_number} Category={val} />
            ))}
        </div>
    );
}
