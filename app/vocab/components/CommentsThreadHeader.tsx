import { MessageSquareMore } from "lucide-react";

type CommentsThreadHeaderProps = {
  // These totals are computed in the parent thread component and passed down
  // so this header can stay presentational.
  totalComments: number;
  totalLikesAcrossThread: number;
};

export function CommentsThreadHeader({
  totalComments,
  totalLikesAcrossThread,
}: CommentsThreadHeaderProps) {
  return (
    // Summary banner for the whole comment thread.
    <div className="mythic-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Community Thread
        </p>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-secondary/25 bg-secondary/10 text-secondary shadow-[0_10px_24px_hsl(var(--secondary)/0.12)]">
            <MessageSquareMore className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Nested comments
            </h2>
            <p className="text-sm text-muted-foreground">
              Read the thread, open replies, and preview nested responses.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Comment total across top-level comments and replies currently shown. */}
        <div className="rounded-full border border-border/60 bg-background/30 px-4 py-2 text-sm text-foreground">
          {totalComments} {totalComments === 1 ? "comment" : "comments"}
        </div>
        {/* Combined likes across every displayed comment card in the thread. */}
        <div className="rounded-full border border-border/60 bg-background/30 px-4 py-2 text-sm text-foreground">
          {totalLikesAcrossThread}{" "}
          {totalLikesAcrossThread === 1 ? "total like" : "total likes"}
        </div>
      </div>
    </div>
  );
}
