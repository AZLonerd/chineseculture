"use client";


//this component is a connection from frontend to backend. 

import { useState } from "react";
import { useParams } from "next/navigation";
import { MessageSquareMore, Sparkles } from "lucide-react";

import { Insertcommentstodb } from "@/app/vocab/lib/insertcommentstodb";
import {
  type CommentItem,
  useCommentsStore,
} from "@/lib/stores/comments-store";
import { useSignupStore } from "@/lib/stores/signup-store";
import { Button } from "@/components/ui/button";

function getInsertedComment(
  insertedComment: CommentItem | CommentItem[] | null | undefined,
) {
  if (Array.isArray(insertedComment)) {
    return insertedComment[0];
  }

  return insertedComment;
}

export default function Commentsinputbox() {
  const params = useParams<{ id: string }>();
  const [commentcontent, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addComment = useCommentsStore((state) => state.addComment);
  const username = useSignupStore((state) => state.username);

  const handleSubmit = async () => {
    const trimmedComment = commentcontent.trim();

    if (!trimmedComment) {
      return;
    }

    try {
      setIsSubmitting(true);
      const vocabNumber = Number(params.id);
      const insertedComment = getInsertedComment(
        (await Insertcommentstodb(vocabNumber, trimmedComment)) as
        | CommentItem
        | CommentItem[]
        | null
        | undefined,
      );

      addComment(
        insertedComment ?? {
          id: crypto.randomUUID(),
          content: trimmedComment,
          vocab_number: vocabNumber,
          parent_comment: null,
          username: username || null,
          ifliked: false
        },
      );
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mythic-surface space-y-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Join The Discussion
          </p>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-primary/25 bg-primary/12 text-primary shadow-[0_10px_24px_hsl(var(--primary)/0.12)]">
              <MessageSquareMore className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Leave a comment
              </h2>
              <p className="text-sm text-muted-foreground">
                Add context, ask a question, or share what this vocab reminds you of.
              </p>
            </div>
          </div>
        </div>

        <span className="hidden rounded-full border border-secondary/35 bg-secondary/10 px-3 py-1 text-xs font-medium text-foreground sm:inline-flex">
          Community
        </span>
      </div>

      <div className="mythic-surface-soft rounded-2xl p-3">
        <textarea
          value={commentcontent}
          onChange={(e) => setComment(e.target.value)}
          placeholder="insert some comments"
          rows={5}
          className="min-h-[120px] w-full resize-y border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Keep it thoughtful and helpful for other learners.
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {commentcontent.trim().length}/300
          </span>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !commentcontent.trim()}
          >
            {isSubmitting ? "Posting..." : "Post comment"}
          </Button>
        </div>
      </div>
    </section>
  );
}
