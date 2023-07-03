import { atom } from 'jotai';

export const signRefAtom = atom(null);

export const isSignModalOpenAtom = atom(false);

export const toggleSignModalAtom = atom(
  (get) => get(isSignModalOpenAtom),
  (_, set) => set(isSignModalOpenAtom, (prev) => !prev)
);
