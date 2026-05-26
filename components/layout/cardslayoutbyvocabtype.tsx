import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Category = {
  title: string;
  type_number: string | number;
};

export default async function FourCardsHorizontal() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vocab_types")
    .select("title, type_number")
    .limit(4);

  if (error) {
    return <div>Failed to load categories.</div>;
  }

  const categories: Category[] = data ?? [];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {categories.map((category) => (
        <Link
          key={category.type_number}
          href={`/vocab/categories/${category.type_number}`}
          className="mythic-surface-soft group block rounded-2xl px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_18px_hsl(var(--primary)/0.16)] hover:[background-image:linear-gradient(145deg,hsl(var(--card)/0.88),hsl(var(--background)/0.76)),linear-gradient(135deg,hsl(var(--primary)/0.1),hsl(var(--secondary)/0.12))]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                {String(category.type_number).padStart(2, "0")}
              </div>
              <h2 className="text-base font-semibold leading-tight text-foreground">
                {category.title}
              </h2>
              <p className="text-xs leading-5 text-muted-foreground">
                Jump into this vocab set.
              </p>
            </div>
            <span className="pt-1 text-base text-primary/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
              &rarr;
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
