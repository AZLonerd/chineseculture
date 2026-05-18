"use client";

import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

import Replyinputbox from "@/components/Comments/Replyinputbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type CommentItem } from "@/lib/stores/comments-store";

import { Insertlikestodb } from "../lib/insertlikestodb";

type CommentcardProps = {
  comment: CommentItem;
};

function getCommentAuthor(comment: CommentItem) {
  return (
    comment.display_name ||
    comment.username ||
    comment.user_email ||
    "Community Member"
  );
}

function getCommentInitial(author: string) {
  return author.trim().charAt(0).toUpperCase() || "C";
}

function formatCommentDate(createdAt?: string | null) {
  if (!createdAt) {
    return "Just shared";
  }

  const parsedDate = new Date(createdAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently shared";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}



export function Commentcard({ comment }: CommentcardProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const author = getCommentAuthor(comment);
  const isReply = comment.parent_comment !== null && comment.parent_comment !== undefined;

  const currentcommentid = comment.id;
  const likes = comment.like_count ?? 0;



  return (
    <article className="mythic-surface-soft group relative overflow-hidden rounded-[1.5rem] p-5 transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--primary)/0.18)]">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/25 bg-primary/12 text-sm font-semibold text-primary shadow-[0_12px_28px_hsl(var(--primary)/0.14)]">
          {getCommentInitial(author)}
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {author}
                </h3>

                <span className="rounded-full border border-secondary/25 bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  {isReply ? "Reply" : "Comment"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCommentDate(comment.created_at)}
              </p>
            </div>


          </div>

          <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90">
            {comment.content}
          </p>

          <div className="flex flex-wrap items-center gap-3 border-t border-border/50 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full border-primary/20 bg-primary/5 px-3 text-foreground hover:bg-primary/10",
              )}
            >
              <Heart className="h-4 w-4 text-secondary" />
              Like
              <span className="text-xs text-muted-foreground">{likes}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full px-3 text-muted-foreground hover:bg-accent/40 hover:text-foreground"
              onClick={() => setShowReplyInput((current) => !current)}
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              {showReplyInput ? "Close reply" : "Reply"}
            </Button>
          </div>

          {showReplyInput ? (
            <Replyinputbox
              commentId={currentcommentid}
              onReplySubmitted={() => setShowReplyInput(false)}
            />
          ) : null}

          {comment.replies && comment.replies.length > 0 ? (
            <div className="space-y-3 border-l border-border/50 pl-4">
              {comment.replies.map((reply) => (
                <Commentcard key={reply.id} comment={reply} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
