"use client";

import { create } from "zustand";

export type CommentItem = {
  id: number | string;
  content: string;
  created_at?: string | null;
  like_count?: number | null;
  vocab_number: string | number;
  parent_id?: number | string | null;
  parent_comment?: number | string | null;
  username: string | null;
  display_name?: string | null;
  user_email?: string | null;
  replies?: CommentItem[];
  [key: string]: unknown;
};



type CommentsStore = {
  comments: CommentItem[];
  flatComments: CommentItem[];
  setComments: (comments: CommentItem[]) => void;
  buildcommentstree: (comments: CommentItem[]) => void;
  addComment: (comment: CommentItem) => void;
  clearComments: () => void;
};

function createCommentsTree(comments: CommentItem[]) {
  const commentMap = new Map<number | string, CommentItem>();
  const rootComments: CommentItem[] = [];

  comments.forEach((comment) => {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
    });
  });

  commentMap.forEach((comment) => {
    const parentId = comment.parent_comment;

    if (parentId === null || parentId === undefined) {
      rootComments.push(comment);
      return;
    }

    const parentComment = commentMap.get(parentId);

    if (!parentComment) {
      rootComments.push(comment);
      return;
    }

    parentComment.replies?.push(comment);
  });

  return rootComments;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
  comments: [],
  flatComments: [],
  setComments: (comments) =>
    set({
      flatComments: comments,
      comments: createCommentsTree(comments),
    }),
  buildcommentstree: (comments) =>
    set({
      flatComments: comments,
      comments: createCommentsTree(comments),
    }),
  addComment: (comment) =>
    set((state) => {
      const updatedComments = [...state.flatComments, comment];

      return {
        flatComments: updatedComments,
        comments: createCommentsTree(updatedComments),
      };
    }),
  clearComments: () => set({ comments: [], flatComments: [] }),
}));
