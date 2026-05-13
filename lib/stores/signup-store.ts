"use client";

import { create } from "zustand";

type SignupStore = {
  username: string;
  setUsername: (username: string) => void;
  clearUsername: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  username: "",
  setUsername: (username) => set({ username }),
  clearUsername: () => set({ username: "" }),
}));

