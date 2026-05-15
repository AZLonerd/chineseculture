import Link from "next/link";
import { Rocket, User, Users } from "lucide-react";
import type { ReactNode } from "react";

export default function Sidebar() {
  return (
    <aside className="mythic-surface-soft h-full w-full p-6 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-4">
          <SidebarButton href="/celebrities" icon={<User size={18} />} label="Most liked" />
          <SidebarButton href="/characters" icon={<Users size={18} />} label="Most used" />
          <SidebarButton href="/concepts" icon={<Rocket size={18} />} label="Trending" />
        </div>

        <div className="space-y-3 pt-6 text-sm text-muted-foreground">
          <Link href="/pdb-wiki" className="block hover:text-primary transition-colors">
            Pdb Wiki
          </Link>

          <Link
            href="/personality-development"
            className="block hover:text-primary transition-colors"
          >
            Personality Development
          </Link>

          <Link
            href="/personality-compatibility"
            className="block hover:text-primary transition-colors"
          >
            Personality Compatibility
          </Link>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">© 2026 ChinaYaCulture</div>
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
        px-4 py-3
        rounded-full
        border border-secondary/35
        bg-gradient-to-r from-secondary/12 via-accent/10 to-primary/10
        text-foreground
        hover:from-secondary/18 hover:via-accent/14 hover:to-primary/14
        hover:border-secondary/60
        hover:shadow-[0_0_18px_hsl(var(--secondary)/0.35)]
        transition-all duration-300
      "
    >
      <span className="p-2 rounded-full bg-primary/10 border border-primary/25 text-primary">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
