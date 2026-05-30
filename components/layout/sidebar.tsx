import Link from "next/link";
import { Rocket, User, Users } from "lucide-react";
import type { ReactNode } from "react";

export default function Sidebar() {
  return (
    <aside className="mythic-surface-soft flex h-auto w-full flex-col justify-between gap-8 p-5 sm:p-6 xl:h-[80vh]">
      <div className="space-y-6">
        <div className="space-y-4">
          <SidebarButton href="/vocab/mostliked" icon={<User size={18} />} label="Most liked vocabs" />
          <SidebarButton href="/vocab/mostused" icon={<Users size={18} />} label="Most frequently used" />
          <SidebarButton href="/vocab/trending" icon={<Rocket size={18} />} label="Newest trends" />
        </div>

        <div className="space-y-3 pt-6 text-sm text-muted-foreground">
          <Link href="/about" className="block transition-colors hover:text-primary">
            About us
          </Link>

          <Link href="/privacy-policy" className="block transition-colors hover:text-primary">
            Privacy policy
          </Link>

          <Link href="/submit-definition" className="block transition-colors hover:text-primary">
            Submit definition
          </Link>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">(c) 2026 ChinaYaCulture</div>
    </aside>
  );
}

function SidebarButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-3
        rounded-full
        border border-secondary/35
        bg-gradient-to-r from-secondary/12 via-accent/10 to-primary/10
        px-4 py-3
        text-foreground
        transition-all duration-300
        hover:border-secondary/60
        hover:from-secondary/18 hover:via-accent/14 hover:to-primary/14
        hover:shadow-[0_0_18px_hsl(var(--secondary)/0.35)]
      "
    >
      <span className="rounded-full border border-primary/25 bg-primary/10 p-2 text-primary">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
