
"use client";


//this file set the global comment state in zustand after fetching comments data
//from the db
import { useEffect } from "react";

import {
  type CommentItem,
  useCommentsStore,
} from "@/lib/stores/comments-store";
import { Commentcard } from "./Commentcard";

type AllcommentsdisplayProps = {
  Allcomments?: CommentItem[] | null;
};

export function Allcommentsdisplay({ Allcomments }: AllcommentsdisplayProps) {
  const comments = useCommentsStore((state) => state.comments);
  const setComments = useCommentsStore((state) => state.setComments);

  useEffect(() => {
    setComments(Allcomments ?? []);
  }, [Allcomments, setComments]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">

      </div>

      <div className="space-y-4">
        {comments.map((ele) => {
          return <Commentcard key={ele.id} comment={ele} />;
        })}
      </div>
    </section>
  );
}
