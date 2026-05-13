"use client";

import Link from "next/link";

type VocabTypeCardProps = {
  title: string;
  description: string;
  href: string;
};

function VocabTypeCard({ title, description, href }: VocabTypeCardProps) {
  return (
    <Link
      href={href}
      className="mythic-surface-soft group w-full min-w-[220px] max-w-[260px] px-5 py-4 transition-all duration-200 hover:bg-accent/20 hover:shadow-[0_0_22px_hsl(var(--secondary)/0.25)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold tracking-tight">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
        <span className="text-primary/80 transition-colors group-hover:text-primary">
          →
        </span>
      </div>
    </Link>
  );
}

const vocabTypeCards: VocabTypeCardProps[] = [
  {
    title: "English Abbreviations",
    description: "Short forms used daily",
    href: "/vocab/type/English_abbreviation",
  },
  {
    title: "Commonly Used",
    description: "Everyday slang and phrases",
    href: "/vocab/type/Commonly_used",
  },
  {
    title: "Internet Slang",
    description: "Online memes and modern terms",
    href: "/vocab/type/Internet_slang",
  },
  {
    title: "Trending",
    description: "What people are saying now",
    href: "/vocab/trending",
  },
];

export default function FourCardsHorizontal() {
  return (
    <section className="flex flex-wrap gap-4">
      {vocabTypeCards.map((card) => (
        <VocabTypeCard key={card.href} {...card} />
      ))}
    </section>
  );
}

