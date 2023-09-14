import { atom } from "jotai";

export const dayAtom = atom<number>(1);
export const sessionAtom = atom<number>(1);
export const countAtom = atom<null | number>(null);
export const answersAtom = atom<{ key: number; answer: boolean }[]>([]);
