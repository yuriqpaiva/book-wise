import { atom } from 'jotai';

export const isBookDrawerOpenAtom = atom(false);

export const openBookDrawerAtom = atom(null, (get, set) => {
  set(isBookDrawerOpenAtom, true);
});

export const closeBookDrawerAtom = atom(null, (get, set) => {
  set(isBookDrawerOpenAtom, false);
});
