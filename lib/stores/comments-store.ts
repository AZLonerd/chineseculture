"use client";

import { create } from "zustand";

export type CommentItem = {
  id: number | string;
  content: string;
  created_at?: string | null;
  like_count?: number | null;
  amountoflikes?: number | null;
  vocab_number: string | number;
  parent_id?: number | string | null;
  parent_comment?: number | string | null;
  username: string | null;
  display_name?: string | null;
  user_email?: string | null;
  replies?: CommentItem[];
  [key: string]: unknown;
  ifliked: boolean
};



type CommentsStore = {
  comments: CommentItem[];
  flatComments: CommentItem[];
  setComments: (comments: CommentItem[]) => void;
  buildcommentstree: (comments: CommentItem[]) => void;
  addComment: (comment: CommentItem) => void;
  incrementCommentLikes: (commentId: number | string) => void;
  decrementCommentLikes: (commentId: number | string) => void;
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
  incrementCommentLikes: (commentId) =>
    set((state) => {
      const updatedComments = state.flatComments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        const nextAmountOfLikes = (comment.amountoflikes ?? comment.like_count ?? 0) + 1;

        return {
          ...comment,
          amountoflikes: nextAmountOfLikes,
          like_count: nextAmountOfLikes,
        };
      });

      return {
        flatComments: updatedComments,
        comments: createCommentsTree(updatedComments),
      };
    }),
  decrementCommentLikes: (commentId) =>
    set((state) => {
      const updatedComments = state.flatComments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        const currentLikes = comment.amountoflikes ?? comment.like_count ?? 0;
        const nextAmountOfLikes = Math.max(currentLikes - 1, 0);

        return {
          ...comment,
          amountoflikes: nextAmountOfLikes,
          like_count: nextAmountOfLikes,
        };
      });

      return {
        flatComments: updatedComments,
        comments: createCommentsTree(updatedComments),
      };
    }),
  clearComments: () => set({ comments: [], flatComments: [] }),
}));
