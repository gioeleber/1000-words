import { atom } from "jotai";

export const countAtom = atom<null | number>(null);
export const answersAtom = atom<boolean[]>([]);
export const dayAtom = atom<number>(0);
