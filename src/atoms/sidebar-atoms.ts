import { atom } from 'jotai';

export const isSidebarOpenAtom = atom(false);

export const openSidebarAtom = atom(
  (get) => get(isSidebarOpenAtom),
  (_, set) => {
    set(isSidebarOpenAtom, true);
  }
);

export const closeSidebarAtom = atom(
  (get) => get(isSidebarOpenAtom),
  (_, set) => {
    set(isSidebarOpenAtom, false);
  }
);

export const toggleSidebarAtom = atom(
  (get) => get(isSidebarOpenAtom),
  (get, set) => {
    set(isSidebarOpenAtom, !get(isSidebarOpenAtom));
  }
);
