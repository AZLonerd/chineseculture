"use client";


//this is the component that is the connection between frontend and backend;
// it imports insertrepliestodb(db function) and use it when user isSubmitting
// since it is also a client component, it will also update the frontend using 
//zustand.


import { useState } from "react";
import { CornerDownRight, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    type CommentItem,
    useCommentsStore,
} from "@/lib/stores/comments-store";
import { useSignupStore } from "@/lib/stores/signup-store";


import { Insertrepliestodb } from "@/app/vocab/lib/insertrepliestodb";



type ReplyinputboxProps = {
    commentId: number | string;
    onReplySubmitted?: () => void;
};

function getInsertedReply(
    insertedReply: CommentItem | CommentItem[] | null | undefined,
) {


    if (Array.isArray(insertedReply)) {
        return insertedReply[0];
    }

    return insertedReply;
}

export default function Replyinputbox({
    commentId,
    onReplySubmitted,
}: ReplyinputboxProps) {
    const [replyContent, setReplyContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addComment = useCommentsStore((state) => state.addComment);
    const username = useSignupStore((state) => state.username);

    const params = useParams<{ id: string }>();
    const paramNumber = Number(params.id);



    const handleSubmit = async () => {
        const trimmedReply = replyContent.trim();

        if (!trimmedReply) {
            return;
        }

        try {
            setIsSubmitting(true);
            const insertedReply = getInsertedReply(
                (await Insertrepliestodb(
                    paramNumber,
                    commentId,
                    trimmedReply,
                )) as
                | CommentItem
                | CommentItem[]
                | null
                | undefined,
            );

            addComment(
                insertedReply ?? {
                    id: crypto.randomUUID(),
                    content: trimmedReply,
                    vocab_number: paramNumber,
                    username: username || null,
                    parent_id: commentId,
                    parent_comment: commentId,
                    ifliked: false,
                },
            );
            setReplyContent("");
            onReplySubmitted?.();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mythic-surface-soft mt-4 space-y-3 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <CornerDownRight className="h-3.5 w-3.5 text-primary" />
                Reply to this comment
            </div>

            <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a thoughtful reply"
                rows={3}
                className="min-h-[96px] w-full resize-y rounded-xl border border-border/50 bg-background/25 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Keep replies helpful and specific.
                </div>

                <Button
                    type="button"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !replyContent.trim()}
                >
                    {isSubmitting ? "Replying..." : "Post reply"}
                </Button>
            </div>
        </section>
    );
}
