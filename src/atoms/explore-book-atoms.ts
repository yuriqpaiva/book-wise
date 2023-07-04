import { ExploreBookData } from "@/app/(internal)/explore/page";
import { atom } from "jotai";

export const exploreBooksAtom = atom<ExploreBookData[]>([]);