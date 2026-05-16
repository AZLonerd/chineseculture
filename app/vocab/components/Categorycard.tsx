import Link from "next/link";

type Category = {
  title: string;
  type_number: string | number;
};

export function Categorycard({ Category }: { Category: Category }) {
  return (
    <Link
      href={`/vocab/categories/${Category.type_number}`}
      className="mythic-surface-soft group relative block overflow-hidden rounded-[1.75rem] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)] hover:[background-image:linear-gradient(145deg,hsl(var(--card)/0.86),hsl(var(--background)/0.72)),linear-gradient(135deg,hsl(var(--primary)/0.14),hsl(var(--secondary)/0.16))]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_38%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.14),transparent_30%)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/12 text-sm font-semibold text-primary shadow-[0_10px_24px_hsl(var(--primary)/0.12)]">
            {String(Category.type_number).padStart(2, "0")}
          </div>

          <span className="rounded-full border border-secondary/35 bg-secondary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-foreground">
            Category
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {Category.title}
          </h2>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Explore focused vocabulary, cultural context, and useful terms in
            this collection.
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-sm text-muted-foreground">
          <span>Open collection</span>
          <span className="text-lg text-primary/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
